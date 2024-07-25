import {
  ActionGroup,
  Button,
  Form,
  FormGroup,
  Modal,
  TextInput,
  Toolbar,
  ToolbarItem,
  ToolbarContent,
  Text,
} from "@patternfly/react-core";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { AddIcon, CloseIcon } from "../../Icons";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  startDownload,
  startUpload,
  clearCart,
} from "../../../store/cart/actions";
import { useTypedSelector } from "../../../store/hooks";
import ChrisAPIClient from "../../../api/chrisapiclient";
import { Fragment } from "react";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "New Folder",
  },
  {
    key: "2",
    label: "File Upload",
  },
  {
    key: "3",
    label: "Folder Upload",
  },
  {
    key: "4",
    label: "Create a Group",
  },
];

const Operations = () => {
  const { selectedPaths } = useTypedSelector((state) => state.cart);
  const [groupModal, setGroupModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const username = useTypedSelector((state) => state.user.username);
  const dispatch = useDispatch();
  const folderInput = useRef<HTMLInputElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const selectedPathsCount = selectedPaths.length;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files || [];
    const files = Array.from(fileList);
    dispatch(
      startUpload({
        files: files,
        isFolder: false,
        currentPath: `home/${username}/uploads/test-upload-cart`,
      }),
    );

    // Reset file input
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  const handleFolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files || [];
    const files = Array.from(fileList);

    dispatch(
      startUpload({
        files: files,
        isFolder: true,
        currentPath: `home/${username}/uploads`,
      }),
    );
    // Reset folder input
    if (folderInput.current) {
      folderInput.current.value = "";
    }
  };

  const toolbarItems = (
    <Fragment>
      <ToolbarItem>
        <Dropdown
          menu={{
            items,
            selectable: true,
            onClick: (info) => {
              if (info.key === "3") {
                folderInput.current?.click();
              }
              if (info.key === "2") {
                fileInput.current?.click();
              }

              if (info.key === "4") {
                setGroupModal(!groupModal);
              }
            },
          }}
        >
          <Button
            icon={
              <AddIcon
                style={{
                  color: "inherit",
                  height: "1em",
                  width: "1em",
                }}
              />
            }
          >
            New
          </Button>
        </Dropdown>
      </ToolbarItem>
      {selectedPaths.length > 0 && (
        <>
          <ToolbarItem>
            <Button>Create Feed</Button>
          </ToolbarItem>
          <ToolbarItem>
            <Button
              onClick={() => {
                dispatch(startDownload(selectedPaths));
              }}
            >
              Download
            </Button>
          </ToolbarItem>
        </>
      )}

      {selectedPathsCount > 0 && (
        <ToolbarItem
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => {
              dispatch(clearCart());
            }}
            variant="link"
            icon={<CloseIcon />}
          />
          <Text>{selectedPathsCount} selected</Text>
        </ToolbarItem>
      )}
    </Fragment>
  );

  return (
    <>
      <Toolbar
        style={{
          paddingLeft: "0",
        }}
        id="action-tray"
      >
        <ToolbarContent
          style={{
            paddingInlineStart: "0",
          }}
        >
          {toolbarItems}
        </ToolbarContent>
      </Toolbar>

      <input
        ref={folderInput}
        type="file"
        style={{ display: "none" }}
        //@ts-ignore
        webkitdirectory="true"
        directory=""
        onChange={handleFolderChange}
        multiple
      />
      <input
        ref={fileInput}
        style={{ display: "none" }}
        type="file"
        onChange={handleFileChange}
        multiple
      />
      {
        <Modal
          isOpen={groupModal}
          variant="small"
          aria-label="set group"
          onClose={() => setGroupModal(!groupModal)}
        >
          <FormGroup>
            <Form>
              <TextInput
                name="group"
                value={groupName}
                onChange={(_e, value) => setGroupName(value)}
                aria-label="Set Group Name"
              />
            </Form>
            <ActionGroup>
              <Button
                onClick={async () => {
                  const client = ChrisAPIClient.getClient();
                  const response = await client.adminCreateGroup({
                    name: groupName,
                  });
                  console.log("Response", response);
                }}
              >
                Confirm
              </Button>
              <Button onClick={() => setGroupModal(!groupModal)}>Cancel</Button>
            </ActionGroup>
          </FormGroup>
        </Modal>
      }
    </>
  );
};

export default Operations;
