import { PageSection, Title, FileUpload, Button, CodeBlock, CodeBlockCode } from "@patternfly/react-core";
import React from "react";
import Wrapper from "../Layout/PageWrapper";
import axios from "axios";
import ChrisAPIClient from "../../api/chrisapiclient";
import { Progress, ProgressSize } from '@patternfly/react-core';

const UploadHack = () => {

  const [filename, setFilename] = React.useState('');
  const [file, setFile] = React.useState<File>();
  const [progressValue, setProgressValue] = React.useState(0);
  const [progressMax, setProgressMax] = React.useState(1);
  const [result, setResult] = React.useState('not doing anything');

  const client = ChrisAPIClient.getClient();

  const handleFileInputChange = (
    _event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLElement>,
    file: File
  ) => {
    setFile(file);
    setFilename(file.name);
  };

  const streamUploadFile = async () => {
    if (file === undefined) {
      throw Error('file is undefined');
    }
    setResult('uploading, please wait');
    const formData = new FormData();
    formData.append('upload_path', `chris/uploads/${file?.name}`);
    formData.append('fname', file, file.name);

    await client.setUrls(); // mutability nonsense
    const config = {
      //
      headers: {Authorization: 'Token ' + client.auth.token},
      // https://github.com/axios/axios/blob/9588fcdec8aca45c3ba2f7968988a5d03f23168c/examples/upload/index.html#L29
      onUploadProgress: (progressEvent: any) => {
        setProgressValue(progressEvent.loaded);
        setProgressMax(progressEvent.total);
      }
    };
    const res = await axios.post(client.uploadedFilesUrl, formData, config);
    setResult(`finished\n\n${JSON.stringify(res.data, null, 4)}`);
  }

  return (
    <Wrapper>
      <PageSection hasShadowBottom variant="darker">
        <Title style={{ color: "white" }} headingLevel="h1">
          Jennings&apos; large file upload <b>proof-of-concept</b>
        </Title>

        <p>
          How it works:

          <ol>
            <li>Click the &ldquo;Upload&rdquo; button and select a file.</li>
            <li>Click the &ldquo;Submit&rdquo; button to start the upload.</li>
            <li>Watch the progress bar move as the file is streamed from your disk.</li>
            <li>
              After the progress bar fills up, wait a few more seconds while
              CUBE is processing your file (flushing data from Python&apos;s
              cache into object storage).
            </li>
            <li>
              Successful response from CUBE will be displayed below the progress
              bar after CUBE is completely finished responding.
            </li>
          </ol>
        </p>

        <FileUpload
          id="single-file-upload-hack"
          filename={filename}
          filenamePlaceholder="Drag and drop a file or upload a large file"
          onFileInputChange={handleFileInputChange}
          allowEditingUploadedText={false}
          browseButtonText="Upload"
          onClearClick={(e) => setFile(undefined)}
          style={{marginTop: "1em"}}
          />

        <Button
          variant="primary"
          onClick={streamUploadFile}
          isDisabled={(typeof file) === 'undefined'}>
          Submit
        </Button>

        <Progress
          value={progressValue}
          max={progressMax}
          title="Upload Progress"
          size={ProgressSize.lg} />


        <CodeBlock>
          <CodeBlockCode>
            {result}
          </CodeBlockCode>
        </CodeBlock>

      </PageSection>
    </Wrapper>
  )
}

export default UploadHack;
