import { PageSection, Title, FileUpload, Button } from "@patternfly/react-core";
import React from "react";
import Wrapper from "../Layout/PageWrapper";
import axios from "axios";
import ChrisAPIClient from "../../api/chrisapiclient";

const UploadHack = () => {

  const [filename, setFilename] = React.useState('');
  const [file, setFile] = React.useState<File>();
  const [isLoading, setIsLoading] = React.useState(false);
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
    const config = {headers: {Authorization: 'Token ' + client.auth.token}};
    const res = await axios.post(client.uploadedFilesUrl, formData, config);
    setResult(`finished: ${JSON.stringify(res.data)}`)
  }

  return (
    <Wrapper>
      <PageSection hasShadowBottom variant="darker">
        <Title style={{ color: "white" }} headingLevel="h1">
          Jennings&apos; large file upload <b>proof-of-concept</b>
        </Title>

        <p>
          Upload URL: {client.uploadedFilesUrl}
        </p>

        <FileUpload
          id="single-file-upload-hack"
          filename={filename}
          filenamePlaceholder="Drag and drop a file or upload a large file"
          onFileInputChange={handleFileInputChange}
          isLoading={isLoading}
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

        <p>
          {result}
        </p>

      </PageSection>
    </Wrapper>
  )
}

export default UploadHack;
