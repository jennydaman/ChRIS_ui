/*
 * Replace me with something better one day, like a chrs command...
 */

import BrokenClient from "@fnndsc/chrisapi";

const Client = BrokenClient.default; // stupid JavaScript workarounds

const SEARCH = {
  name: "Automatic Fetal Brain Reconstruction Pipeline v1.2.3",
};

const PIPELINE_CONTENT = `
name: "Automatic Fetal Brain Reconstruction Pipeline v1.2.3"
authors: "Jennings Zhang <Jennings.Zhang@childrens.harvard.edu>"
category: "MRI"
description: "Placeholder pipeline for testing the Fetal Reconstruction UI."
locked: true
plugin_tree:
- title: "Unstack folders"
  plugin: pl-unstack-folders v1.0.0
  previous: null
`;

async function main() {
  const auth = {
    token: await Client.getAuthToken(
      "http://localhost:8000/api/v1/auth-token/",
      "chris",
      "chris1234",
    ),
  };
  const client = new Client("http://localhost:8000/api/v1/", auth);
  const pipelines = await client.getPipelines(SEARCH);
  if (pipelines.totalCount < 1) {
    const fname = new Blob([PIPELINE_CONTENT], { type: "application/yaml" });
    const pipeline = await client.uploadPipelineSourceFile(
      { type: "yaml" },
      { fname },
    );
    console.log(pipeline.url);
  } else {
    console.log("Already exists");
  }
}

main();
