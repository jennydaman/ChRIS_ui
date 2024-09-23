import type {
  Feed,
  FileBrowserFolder,
  FileBrowserFolderFile,
  FileBrowserFolderLinkFile,
  FileBrowserFolderList,
} from "@fnndsc/chrisapi";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import ChrisAPIClient from "../../../api/chrisapiclient";
import { getFileName } from "../../../api/common";
import {
  clearSelectedPaths,
  setToggleCart,
  startAnonymize,
  startDownload,
  startUpload,
} from "../../../store/cart/cartSlice";
import { createFeed as createFeedSaga } from "../../../store/cart/downloadSaga";
import type { SelectionPayload } from "../../../store/cart/types";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { notification } from "../../Antd";
import { getFolderName } from "../components/FolderCard";
import type { AdditionalValues } from "../components/Operations";
import { type OriginState, useOperationsContext } from "../context";
import useDeletePayload from "../utils/useDeletePayload";
import { fetchFeedForPath } from "./longpress";
import useFeedOperations from "./useFeedOperations";
import { isEmpty } from "lodash";

export interface ModalState {
  type: string;
  isOpen: boolean;
  additionalProps?: Record<string, any>;
}

export const getCurrentTimestamp = () =>
  new Date()
    .toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(/[^a-zA-Z0-9]/g, "_");

export const useFolderOperations = (
  origin: OriginState,
  computedPath?: string,
  folderList?: FileBrowserFolderList,
  createFeed?: boolean,
) => {
  const { handleOrigin, invalidateQueries } = useOperationsContext();
  const { selectedPaths } = useAppSelector((state) => state.cart);
  const username = useAppSelector((state) => state.user.username) as string;
  const dispatch = useAppDispatch();

  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    type: "folder",
  });
  const [userRelatedError, setUserRelatedError] = useState<string>("");

  const folderInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [notificationAPI, notificationContextHolder] =
    notification.useNotification();

  const deleteMutation = useDeletePayload(origin, notificationAPI);
  const { handleDuplicateMutation, handleMergeMutation } = useFeedOperations(
    origin,
    notificationAPI,
  );

  const resetInputField = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    isFolder: boolean,
    name?: string,
  ) => {
    const fileList = event.target.files;
    // Process the origin data if applicable
    handleOrigin(origin);
    // Convert selected files to an array for easier manipulation
    const files = Array.from(fileList || []);
    // Generate a unique name based on the timestamp and the provided name (if any)
    const uniqueName = name
      ? `${name}_${getCurrentTimestamp()}`
      : getCurrentTimestamp();
    // Determine the upload path based on the user's preferences (creating a new feed or using an existing path)
    const uploadPath = createFeed
      ? `home/${username}/uploads/${uniqueName}`
      : computedPath;
    // Dispatch the upload action with all relevant details
    dispatch(
      startUpload({
        files,
        isFolder,
        currentPath: uploadPath as string,
        invalidateFunc: invalidateQueries,
        createFeed,
        nameForFeed: name,
      }),
    );
    // Reset the input field after each upload to allow for subsequent uploads
    resetInputField(isFolder ? folderInputRef : fileInputRef);
  };

  const createFolder = async (folderName: string) => {
    handleOrigin(origin);
    const finalPath = `${computedPath}/${folderName}`;

    try {
      await folderList?.post({ path: finalPath });
      invalidateQueries();
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.path?.[0] || "Failed to create a folder.";
      throw new Error(errorMessage);
    }
  };

  const createFeedWithFile = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string,
  ) => {
    const files = Array.from(event.target.files || []);
    const defaultFeedName =
      type === "folder"
        ? `Feed for ${files[0].webkitRelativePath.split("/")[0]}`
        : files.length < 2
          ? `Feed for ${files[0].name}`
          : "Multiple File Upload";

    setModalState({
      type: "createFeedWithFile",
      isOpen: true,
      additionalProps: {
        createFeedWithFile: { event, type, defaultFeedName },
      },
    });
  };

  const createFeedFromMenu = async (inputValue: string) => {
    handleOrigin(origin);
    const pathList = selectedPaths.map((payload) => payload.path);
    await createFeedSaga(pathList, inputValue, invalidateQueries);
  };

  const shareFolder = async (
    targetUsername: string,
    additionalValues?: AdditionalValues,
  ) => {
    const permissions = additionalValues?.share.write ? "w" : "r";
    for (const { payload } of selectedPaths) {
      try {
        if (createFeed) {
          const feed = await fetchFeedForPath(payload.data.path);
          if (feed) {
            await feed.addUserPermission(targetUsername);
          }
        } else {
          await payload.addUserPermission(targetUsername, permissions);
        }
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.username?.[0] ||
          error?.response?.data?.non_field_errors?.[0] ||
          "Failed to share this folder.";
        throw new Error(errorMessage);
      }
    }
  };

  const renameFolder = async (inputValue: string): Promise<void> => {
    handleOrigin(origin);

    for (const { payload, type } of selectedPaths) {
      try {
        if (createFeed) {
          await handleFeedCreation(payload as FileBrowserFolder, inputValue);
        } else {
          await handlePathRename(payload, type, inputValue);
        }
      } catch (error) {
        handleRenameError(error);
      }
    }

    invalidateQueries();
  };

  const handleFeedCreation = async (
    payload: FileBrowserFolder,
    inputValue: string,
  ): Promise<void> => {
    const fileName = getFolderName(payload, payload.data.path);
    const feed = await fetchFeedForPath(fileName);
    if (feed) {
      await feed.put({ name: inputValue });
    }
  };

  const handlePathRename = async (
    payload:
      | FileBrowserFolder
      | FileBrowserFolderFile
      | FileBrowserFolderLinkFile,
    type: string,
    inputValue: string,
  ): Promise<void> => {
    const newPath = `${computedPath}/${inputValue}`;
    const oldPath = type === "folder" ? payload.data.path : payload.data.fname;

    switch (type) {
      case "folder":
        await (payload as FileBrowserFolder).put({
          //@ts-ignore
          path: newPath,
        });
        break;
      case "file":
        await (payload as FileBrowserFolderFile).put({
          new_file_path: newPath,
        });
        break;
      case "link":
        await (payload as FileBrowserFolderLinkFile).put({
          new_link_file_path: newPath,
        });
        break;
      default:
        throw new Error(`Unsupported type: ${type}`);
    }
    dispatch(clearSelectedPaths(oldPath));
  };

  const handleRenameError = (error: any): void => {
    if (error.response?.data) {
      const { path, new_link_file_path, new_file_path } = error.response.data;
      if (path) throw new Error(path[0]);
      if (new_link_file_path) throw new Error(new_link_file_path[0]);
      if (new_file_path) throw new Error(new_file_path[0]);
    }
    throw new Error("Failed to rename this folder"); // If it's not a known error, rethrow it
  };

  const handleModalSubmit = async (
    inputValue: string,
    additionalValues?: AdditionalValues,
  ) => {
    switch (modalState.type) {
      case "group": {
        const client = ChrisAPIClient.getClient();
        await client.adminCreateGroup({ name: inputValue });
        break;
      }
      case "folder":
        await createFolder(inputValue);
        break;
      case "share":
        await shareFolder(inputValue, additionalValues);
        break;

      case "rename": {
        await renameFolder(inputValue);
        break;
      }

      case "createFeedWithFile": {
        const { event, type } =
          modalState.additionalProps?.createFeedWithFile || {};
        await handleUpload(event, type === "folder", inputValue);
        break;
      }
      case "createFeed": {
        await createFeedFromMenu(inputValue);
        break;
      }
      default:
        break;
    }

    setModalState({ isOpen: false, type: "" });
  };

  const handleModalSubmitMutation = useMutation({
    mutationFn: async ({
      inputValue,
      additionalValues,
    }: {
      inputValue: string;
      additionalValues?: AdditionalValues;
    }) => handleModalSubmit(inputValue, additionalValues),
  });

  const getFeedNameForSinglePath = (selectedPayload: SelectionPayload) => {
    const { payload } = selectedPayload;
    const name = payload.data.path || payload.data.fname;
    return getFileName(name);
  };

  const handleOperations = (operationKey: string) => {
    const operationsMap: Record<string, () => void> = {
      createFeed: () => {
        const defaultFeedName =
          selectedPaths.length > 1
            ? "Feed created from your Library"
            : `Feed created for ${getFeedNameForSinglePath(selectedPaths[0])}`;
        setModalState({
          type: "createFeed",
          isOpen: true,
          additionalProps: {
            createFeed: {
              defaultFeedName,
            },
          },
        });
      },
      download: () => {
        handleOrigin(origin);
        dispatch(setToggleCart());
        dispatch(startDownload({ paths: selectedPaths, username: username }));
        invalidateQueries();
      },
      anonymize: () => {
        handleOrigin(origin);
        dispatch(setToggleCart());
        dispatch(startAnonymize({ paths: selectedPaths, username }));
      },
      delete: () => deleteMutation.mutate(selectedPaths),
      newFolder: () => setModalState({ isOpen: true, type: "folder" }),
      fileUpload: () => fileInputRef.current?.click(),
      folderUpload: () => folderInputRef.current?.click(),
      createGroup: () => setModalState({ isOpen: true, type: "group" }),
      merge: handleMergeMutation.mutate,
      share: () => setModalState({ isOpen: true, type: "share" }),
      rename: () => setModalState({ isOpen: true, type: "rename" }),
      duplicate: handleDuplicateMutation.mutate,
    };

    operationsMap[operationKey]?.();
  };

  return {
    modalState,
    userRelatedError,
    folderInputRef,
    fileInputRef,
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, name?: string) =>
      handleUpload(e, false, name),
    createFeedWithFile,
    handleFolderChange: (
      e: React.ChangeEvent<HTMLInputElement>,
      name?: string,
    ) => handleUpload(e, true, name),
    handleModalSubmitMutation,
    handleOperations,
    contextHolder: notificationContextHolder,
    setUserRelatedError,
    setModalState,
  };
};
