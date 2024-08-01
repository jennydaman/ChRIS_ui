import { Button, Text, Tooltip } from "@patternfly/react-core";
import { Drawer, List, Space } from "antd";
import { isEmpty } from "lodash";
import { useDispatch } from "react-redux";
import { getFileName } from "../../../api/common";
import {
  clearDownloadStatus,
  setToggleCart,
} from "../../../store/cart/actions";
import { DownloadTypes } from "../../../store/cart/types";
import { useTypedSelector } from "../../../store/hooks";
import { DotsIndicator, EmptyStateComponent } from "../../Common";
import { CheckCircleIcon, CloseIcon, FileIcon, FolderIcon } from "../../Icons";
import { elipses } from "../utils/longpress";
import { ShowInFolder, TitleNameClipped } from "../utils/longpress";
import "./Cart.css";
import ProgressRing from "./RadialProgress";

const Cart = () => {
  const dispatch = useDispatch();
  const {
    openCart,
    fileUploadStatus,
    folderUploadStatus,
    fileDownloadStatus,
    folderDownloadStatus,
  } = useTypedSelector((state) => state.cart);

  return (
    <Drawer
      width={"700px"}
      title={<>Notification Panel</>}
      open={openCart}
      onClose={() => {
        dispatch(setToggleCart());
      }}
      extra={
        <Space>
          <Button
            style={{ color: "inherit" }}
            variant="danger"
            onClick={() => {
              // Implement clear cart logic here
            }}
          >
            Clear Cart
          </Button>
        </Space>
      }
    >
      {/** Code for File and Folder Downloads */}
      {!isEmpty(fileDownloadStatus) && (
        <List
          className="operation-cart"
          dataSource={Object.entries(fileDownloadStatus)}
          renderItem={([id, status]) => (
            <List.Item
              key={id}
              actions={[
                <Status key={`status-${id}`} currentStatus={status} />,
                <Button
                  onClick={() => {
                    dispatch(clearDownloadStatus(id));
                  }}
                  variant="secondary"
                  size="sm"
                  key={`a-${id}`}
                >
                  Clear
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<FileIcon />}
                title={<TitleNameClipped name={getFileName(status.fileName)} />}
              />
            </List.Item>
          )}
        />
      )}

      {/** Code for Folder Downloads */}
      {!isEmpty(folderDownloadStatus) && (
        <List
          className="operation-cart"
          dataSource={Object.entries(folderDownloadStatus)}
          renderItem={([id, status]) => (
            <List.Item
              key={id}
              actions={[
                <Status key={`status-${id}`} currentStatus={status} />,
                <Button
                  onClick={() => {
                    dispatch(clearDownloadStatus(id));
                  }}
                  variant="secondary"
                  size="sm"
                  key={`a-${id}`}
                >
                  Clear
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<FolderIcon />}
                title={<TitleNameClipped name={getFileName(status.fileName)} />}
              />
            </List.Item>
          )}
        />
      )}

      {/** Code for File and Folder Uploads */}
      <List
        className="operation-cart"
        dataSource={Object.entries(fileUploadStatus)}
        renderItem={([name, status]) => (
          <List.Item
            key={name}
            actions={[
              <div key={`status-${name}`}>{status.currentStep}</div>,
              status.progress === 100 ||
              status.currentStep === "UploadComplete" ? (
                <CheckCircleIcon
                  key={`anon-${name}-progress`}
                  color="#3E8635"
                  width="2em"
                  height="2em"
                />
              ) : (
                <ProgressRing
                  key={`anon-${name}-progress`}
                  value={status.progress}
                />
              ),
              <ShowInFolder key={`anon-${name}-show`} path={status.path} />,
              <Button
                onClick={() => {
                  status.controller.abort();
                }}
                variant="secondary"
                size="sm"
                key={`a-${name}`}
              >
                Cancel
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<FileIcon />}
              title={<TitleNameClipped name={name} />}
            />
          </List.Item>
        )}
      />

      <List
        className="operation-cart"
        dataSource={Object.entries(folderUploadStatus)}
        renderItem={([name, status]) => (
          <List.Item
            key={name}
            actions={[
              <div key={`anon-${name}-progress`}>{status.currentStep}</div>,
              status.done === status.total ||
              status.currentStep === "UploadComplete" ? (
                <CheckCircleIcon
                  key={`anon-${name}-progress`}
                  color="#3E8635"
                  width="2em"
                  height="2em"
                />
              ) : status.currentStep.includes("Cancelled") ? (
                <CloseIcon
                  color="red"
                  width="2em"
                  height="2em"
                  key={`anon-${name}-cancel`}
                />
              ) : (
                <div key={`anon-${name}-progress`}>
                  {status.done}/{status.total}
                </div>
              ),
              <ShowInFolder key={`anon-${name}-show`} path={status.path} />,
              <Button
                onClick={() => {
                  status.controller.abort();
                }}
                variant="secondary"
                size="sm"
                key={`a-${name}`}
              >
                Cancel
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<FolderIcon />}
              title={<TitleNameClipped name={name} />}
            />
          </List.Item>
        )}
      />
      {isEmpty(folderUploadStatus) &&
        isEmpty(fileUploadStatus) &&
        isEmpty(fileDownloadStatus) &&
        isEmpty(folderDownloadStatus) && (
          <EmptyStateComponent title="No data..." />
        )}
    </Drawer>
  );
};

export default Cart;

export const Status = ({
  currentStatus,
}: {
  currentStatus: { step: DownloadTypes; error?: string };
}) => {
  const { step, error } = currentStatus;
  switch (step) {
    case DownloadTypes.started:
      return <DotsIndicator title="" />;
    case DownloadTypes.finished:
      return (
        <Button
          variant="plain"
          icon={<CheckCircleIcon color="#3E8635" width="2em" height="2em" />}
        />
      );
    case DownloadTypes.cancelled:
      return (
        <Tooltip content={error}>
          <Text>{error ? elipses(error, 45) : "Uncaught error"}</Text>
        </Tooltip>
      );
    default:
      return currentStatus ? <DotsIndicator title={step} /> : null;
  }
};
