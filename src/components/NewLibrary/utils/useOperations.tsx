import type { FileBrowserFolderList } from "@fnndsc/chrisapi";
import { useMutation } from "@tanstack/react-query";
import { create, isEmpty } from "lodash";
import { useContext, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import ChrisAPIClient from "../../../api/chrisapiclient";
import { MainRouterContext } from "../../../routes";
import {
  setToggleCart,
  startAnonymize,
  startDownload,
  startUpload,
} from "../../../store/cart/cartSlice";
import { useTypedSelector } from "../../../store/hooks";
import { notification } from "../../Antd";
import type { AdditionalValues } from "../components/Operations";
import { type OriginState, useOperationsContext } from "../context";
import useDeletePayload from "../utils/useDeletePayload";
import useFeedOperations from "./useFeedOperations";

export const useFolderOperations = (
  origin: OriginState,
  computedPath?: string, // This path is passed to for file upload and folder uploads in the library
  folderList?: FileBrowserFolderList,
  createFeed?: boolean,
) => {
  const { handleOrigin, invalidateQueries } = useOperationsContext();
  const router = useContext(MainRouterContext);
  const { selectedPaths } = useTypedSelector((state) => state.cart);
  const username = useTypedSelector((state) => state.user.username);
  const [modalInfo, setModalInfo] = useState({ isOpen: false, type: "" });
  const [userError, setUserErrors] = useState("");
  const dispatch = useDispatch();
  const folderInput = useRef<HTMLInputElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const [api, contextHolder] = notification.useNotification();

  const deleteMutation = useDeletePayload(origin, api);
  const { handleDuplicateMutation, handleMergeMutation } = useFeedOperations(
    origin,
    api,
  );

  const resetInputField = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const getCurrentTimestamp = () => {
    const timestamp = new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${timestamp.replace(/[^a-zA-Z0-9]/g, "_")}`;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleOrigin(origin);
    const fileList = e.target.files || [];
    const files = Array.from(fileList);
    const uniqueName = getCurrentTimestamp();

    const currentPath = createFeed
      ? `home/${username}/uploads/${uniqueName}`
      : computedPath;

    dispatch(
      startUpload({
        files,
        isFolder: false,
        currentPath: currentPath as string,
        invalidateFunc: invalidateQueries,
        createFeed,
      }),
    );
    resetInputField(fileInput);
  };

  const handleFolderChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleOrigin(origin);
    const fileList = e.target.files || [];
    const files = Array.from(fileList);
    const uniqueName = getCurrentTimestamp();

    const currentPath = createFeed
      ? `home/${username}/uploads/${uniqueName}`
      : computedPath;
    dispatch(
      startUpload({
        files,
        isFolder: true,
        currentPath: currentPath as string,
        invalidateFunc: invalidateQueries,
        createFeed,
      }),
    );
    resetInputField(folderInput);
  };

  const createFolder = async (inputValue: string) => {
    handleOrigin(origin);
    const finalPath = `${computedPath}/${inputValue}`;
    try {
      await folderList?.post({ path: finalPath });
      invalidateQueries();
    } catch (error: any) {
      const path = error?.response?.data?.path;
      const message = !isEmpty(path) ? path[0] : "Failed to create a folder.";
      throw new Error(message);
    }
  };

  const shareFolder = async (
    inputValue: string,
    additionalValues?: AdditionalValues,
  ) => {
    const permissions =
      additionalValues?.share.read && additionalValues?.share.write
        ? "rw"
        : additionalValues?.share.read
          ? "r"
          : "w";

    for (const selectedPayload of selectedPaths) {
      const { payload } = selectedPayload;
      try {
        await payload.addUserPermission(inputValue, permissions);
      } catch (e: any) {
        const username = e?.response?.data?.username;
        const non_field_errors = e?.response?.data?.non_field_errors;
        const message = !isEmpty(username)
          ? username[0]
          : !isEmpty(non_field_errors)
            ? non_field_errors[0]
            : "Failed to share this folder.";
        throw new Error(message);
      }
    }
  };

  const handleModalSubmit = async (
    inputValue: string,
    additionalValues?: AdditionalValues,
  ) => {
    if (modalInfo.type === "group") {
      const client = ChrisAPIClient.getClient();
      await client.adminCreateGroup({ name: inputValue });
      // Todo: Error Handling
    } else if (modalInfo.type === "folder") {
      await createFolder(inputValue);
    } else if (modalInfo.type === "share") {
      await shareFolder(inputValue, additionalValues);
    }
    setModalInfo({ isOpen: false, type: "" });
  };

  const handleModalSubmitMutation = useMutation({
    mutationFn: ({
      inputValue,
      additionalValues,
    }: {
      inputValue: string;
      additionalValues?: AdditionalValues;
    }) => handleModalSubmit(inputValue, additionalValues),
  });

  const handleMerge = () => {
    handleMergeMutation.mutate();
  };

  const handleDuplicate = () => {
    handleDuplicateMutation.mutate();
  };

  const handleOperations = (key: string) => {
    switch (key) {
      case "createFeed": {
        const paths = selectedPaths.map((payload) => payload.path);
        router.actions.createFeedWithData(paths);
        break;
      }

      case "download":
        handleOrigin(origin);
        dispatch(setToggleCart());
        dispatch(
          startDownload({
            paths: selectedPaths,
            username: username as string,
          }),
        );
        // Invalidate the folders after a time limit. This is poorly designed, as this part of the UI assumes
        // that a feed will be created within a certain time frame. Mixing Redux and React Query isn't effective.
        // A better design needs to be considered.
        invalidateQueries();
        break;
      case "anonymize":
        handleOrigin(origin);
        dispatch(setToggleCart());
        dispatch(
          startAnonymize({
            paths: selectedPaths,
            username: username as string,
          }),
        );
        break;
      case "delete":
        deleteMutation.mutate(selectedPaths);
        break;
      case "newFolder":
        setModalInfo({ isOpen: true, type: "folder" });
        break;
      case "fileUpload":
        fileInput.current?.click();
        break;
      case "folderUpload":
        folderInput.current?.click();
        break;
      case "createGroup":
        setModalInfo({ isOpen: true, type: "group" });
        break;
      case "merge": {
        handleMerge();
        break;
      }
      case "share": {
        setModalInfo({ isOpen: true, type: "share" });
        break;
      }

      case "duplicate": {
        handleDuplicate();
        break;
      }
    }
  };

  return {
    modalInfo,
    userError,
    folderInput,
    fileInput,
    handleFileChange,
    handleFolderChange,
    handleModalSubmitMutation,
    handleOperations,
    contextHolder,
    setUserErrors,
    setModalInfo,
  };
};
