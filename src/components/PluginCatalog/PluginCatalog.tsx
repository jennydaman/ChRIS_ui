import React, { useEffect } from "react";
import ChrisAPIClient from "../../api/chrisapiclient";
import DisplayPage from "../DisplayPage";
import type { PluginMeta } from "@fnndsc/chrisapi";


const PluginCatalog = () => {
  const [plugins, setPlugins] = React.useState<any>();
  const [pageState, setPageState] = React.useState({
    page: 1,
    perPage: 10,
    search: "",
    searchType: "name",
    itemCount: 0,
  });
  const [loading, setLoading] = React.useState(false);

  const { page, perPage, search, searchType } = pageState;
  const [selectedPlugin, setSelectedPlugin] = React.useState<any>();

  const onSetPage = (_event: any, page: number) => {
    setPageState({
      ...pageState,
      page,
    });
  };
  const onPerPageSelect = (_event: any, perPage: number) => {
    setPageState({
      ...pageState,
      perPage,
    });
  };

  const handleFilterChange = (value: string) => {
    setPageState({
      ...pageState,
      search: value,
    });
  };
  useEffect(() => {
    async function fetchPlugins(
      perPage: number,
      page: number,
      search: string,
      searchType: string
    ) {
      setLoading(true);
      const offset = perPage * (page - 1);
      const params = {
        limit: perPage,
        offset: offset,
        [searchType]: search,
      };
      const client = ChrisAPIClient.getClient();
      const pluginList = await client.getPluginMetas(params);
      const plugins: PluginMeta[] = pluginList.getItems() as PluginMeta[];
      if (plugins) {
        const newPluginPayload = Promise.all(
          plugins.map(async (plugin) => {
            const plugins = await plugin.getPlugins({ limit: 1000 });
            const pluginItems = plugins.getItems();
            let version = "";

            if (pluginItems) {
              version = pluginItems[pluginItems.length - 1].data.version;
            }
            return {
              data: {
                ...plugin.data,
                version,
              },
            };
          })
        );
        setPlugins(await newPluginPayload);
        setPageState((pageState) => {
          return {
            ...pageState,
            itemCount: pluginList.totalCount,
          };
        });
        setLoading(false);
      }
    }

    fetchPlugins(perPage, page, search, searchType);
  }, [perPage, page, search, searchType]);

  const handleSearch = (search: string, searchType: string) => {
    setPageState({
      ...pageState,
      search,
      searchType,
    });
  };

  return (
    <>
      <DisplayPage
        loading={loading}
        pageState={pageState}
        onSetPage={onSetPage}
        onPerPageSelect={onPerPageSelect}
        resources={plugins}
        handleFilterChange={handleFilterChange}
        selectedResource={selectedPlugin}
        setSelectedResource={(plugin: any) => {
          setSelectedPlugin(plugin);
        }}
        title="Plugins"
        handlePluginSearch={handleSearch}
        search={pageState.search}
      />
    </>
  );
};

export default PluginCatalog;