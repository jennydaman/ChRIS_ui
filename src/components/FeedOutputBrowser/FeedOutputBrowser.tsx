import type { PluginInstance } from "@fnndsc/chrisapi";
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateVariant,
  Title,
} from "@patternfly/react-core";
import { Alert } from "../Antd";
import { SpinContainer } from "../Common";
import FileBrowser from "./FileBrowser";
import { useFeedBrowser } from "./useFeedBrowser";
import "./FeedOutputBrowser.css";

export interface FeedOutputBrowserProps {
  handlePluginSelect: (node: PluginInstance) => void;
  explore: boolean;
}

const statusTitles = ["started", "scheduled", "registeringFiles", "created"];

const FeedOutputBrowser: React.FC<FeedOutputBrowserProps> = () => {
  const {
    selected,
    pluginFilesPayload,
    statusTitle,
    handleFileClick,
    filesLoading,
    isError,
    error,
    inValidateFolders,
  } = useFeedBrowser();

  return (
    <div style={{ height: "100%" }} className="feed-output-browser">
      {pluginFilesPayload && selected && !isError ? (
        <FileBrowser
          selected={selected}
          handleFileClick={handleFileClick}
          pluginFilesPayload={pluginFilesPayload}
          filesLoading={filesLoading}
          inValidateFolders={inValidateFolders}
        />
      ) : statusTitle && statusTitles.includes(statusTitle) ? (
        <FetchFilesLoader title="Plugin executing. Files will be fetched when plugin completes" />
      ) : isError ? (
        <Alert type="error" description={error?.message} />
      ) : (
        <EmptyStateLoader title="Files are not available yet..." />
      )}
    </div>
  );
};

export default FeedOutputBrowser;

export const EmptyStateLoader = ({ title }: { title: string }) => {
  return (
    <EmptyState variant={EmptyStateVariant.lg}>
      <Title headingLevel="h4" size="lg" />
      <EmptyStateBody>{title}</EmptyStateBody>
    </EmptyState>
  );
};

const FetchFilesLoader = ({ title }: { title: string }) => {
  return <SpinContainer title={title} />;
};
