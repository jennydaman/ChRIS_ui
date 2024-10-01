import { PageSection } from "@patternfly/react-core";
import React from "react";
import WrapperConnect from "../Wrapper";
import PluginCatalog from "./PluginCatalog";
import "./plugin-catalog.css";
import { InfoSection } from "../Common";
import { Configuration, PluginsApi } from "../../api/cubeGenerated";

const CatalogPage = () => {
  React.useEffect(() => {
    document.title = "Analysis Catalog";
  }, []);

  React.useEffect(() => {
    const config = new Configuration({
      username: "chris",
      password: "chris1234",
      basePath: "http://localhost:8000",
    });
    const pluginsApi = new PluginsApi(config);

    (async () => {
      const name = "pl-mri10yr06mo01da_normal";
      const search = await pluginsApi.pluginsSearchList({ nameExact: name });
      console.dir(search);
      const plugin = (search.results ?? [])[0];
      if (!plugin) {
        console.log(`${name} not found`);
        return;
      }
      const pluginInstance = await pluginsApi.pluginsInstancesCreate({
        id: plugin.id,
        pluginInstanceRequest: {
          computeResourceName: "host",
          title: "typescript is fun",
        },
      });
      console.log(`created plugin instance ID=${pluginInstance.id}`);
    })();
  }, []);

  const TitleComponent = (
    <InfoSection
      title="Installed Plugins"
      content={
        <>
          ChRIS is a platform that runs <b>Plugins</b>. A plugin is a single
          application (similar to <i>apps</i> on a mobile device). Examples of
          ChRIS <b>Plugins</b> are applications that analyze images (like{" "}
          <a href="https://github.com/FNNDSC/pl-fshack">pl-fshack</a> that runs
          a neuro image analysis program called{" "}
          <a href="https://surfer.nmr.mgh.harvard.edu">FreeSurfer</a>). Other{" "}
          <b>Plugins</b> perform operations like zipping files, converting
          medical images from DICOM to jpg, etc. On this page you can browse{" "}
          <b>Plugins</b> available for you to use. For more options, consult the{" "}
          <a href="https://next.chrisstore.co">ChRIS store</a>.
        </>
      }
    />
  );

  return (
    <WrapperConnect titleComponent={TitleComponent}>
      <PageSection>
        <PluginCatalog />
      </PageSection>
    </WrapperConnect>
  );
};

export default CatalogPage;
