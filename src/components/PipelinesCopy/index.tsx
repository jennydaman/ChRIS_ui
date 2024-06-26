import {
  Dropdown,
  DropdownItem,
  DropdownList,
  MenuToggle,
  Pagination,
  TextInput,
} from "@patternfly/react-core";
import SearchIcon from "@patternfly/react-icons/dist/esm/icons/search-icon";
import { useQuery } from "@tanstack/react-query";
import { Alert, Collapse } from "antd";
import { useContext, useState } from "react";
import { fetchPipelines, fetchResources } from "../../api/common";
import { EmptyStateComponent, SpinContainer } from "../Common";
import { ThemeContext } from "../DarkTheme/useTheme";
import "./Pipelines.css";
import PipelinesComponent from "./PipelinesComponent";
import {
  PIPELINEQueryTypes,
  PerPipelinePayload,
  PipelineContext,
  Types,
} from "./context";
import { usePaginate } from "../Feeds/usePaginate";

type LoadingResources = {
  [key: string]: boolean;
};
type LoadingResourceError = {
  [key: string]: string;
};

const PipelinesCopy = () => {
  const { state, dispatch } = useContext(PipelineContext);
  const { isDarkTheme } = useContext(ThemeContext);
  const [loadingResources, setLoadingResources] = useState<LoadingResources>();
  const [resourceError, setResourceError] = useState<LoadingResourceError>();

  const {
    filterState: pageState,
    handlePageSet,
    handlePerPageSet,
    handleFilterChange,
  } = usePaginate();

  const { perPage, page, search } = pageState;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState<string>(
    PIPELINEQueryTypes.NAME[0],
  );

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pipelines", perPage, page, search, dropdownValue],
    queryFn: async () => {
      const fetchedData = await fetchPipelines(
        perPage,
        page,
        search,
        dropdownValue.toLowerCase(),
      );

      return fetchedData;
    },
    refetchOnMount: true,
  });

  const onToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleChange = async (key: string | string[]) => {
    // The pipelines that the user chooses to view appears as a list of ids.
    const filteredPipelines = data?.registeredPipelines.filter((pipeline) =>
      (key as string[]).includes(`${pipeline.data.id}`),
    );

    if (filteredPipelines) {
      // a pipeline has already been selected;
      if (filteredPipelines.length === 0) {
        // Remove the exisiting pipeline
        dispatch({
          type: Types.PipelineToAdd,
          payload: {
            pipeline: undefined,
          },
        });
      } else {
        // add a pipeline
        const pipelineToAdd = filteredPipelines[filteredPipelines.length - 1];
        dispatch({
          type: Types.PipelineToAdd,
          payload: {
            pipeline: pipelineToAdd,
          },
        });
      }
    }

    /* Get this pipelines assosciated to the id's and then fetch all the resources for that particular pipelines 
     to render the tree*/
    if (filteredPipelines && filteredPipelines.length > 0) {
      for (const pipeline of filteredPipelines) {
        const { id } = pipeline.data;
        if (!state.selectedPipeline?.[id]) {
          try {
            setLoadingResources((prev) => ({ ...prev, [id]: true }));
            const data: PerPipelinePayload = await fetchResources(pipeline);
            dispatch({
              type: Types.SetPipelines,
              payload: {
                pipelineId: id,
                ...data,
              },
            });
            setLoadingResources((prev) => ({ ...prev, [id]: false }));
          } catch {
            setResourceError((prev) => ({
              ...prev,
              [id]: "Error fetching resources for this pipeline",
            }));
            setLoadingResources((prev) => ({ ...prev, [id]: false }));
          }
        }
      }
    }
  };

  const dropdownItems = [
    Object.values(PIPELINEQueryTypes).map((pipeline) => {
      return (
        <DropdownItem
          key={pipeline[0]}
          description={pipeline[1]}
          component="button"
          onClick={() => updateDropdownValue(pipeline[0])}
        >
          {pipeline[0]}
        </DropdownItem>
      );
    }),
  ];

  const onFocus = () => {
    const element = document.getElementById("toggle-basic");
    element?.focus();
  };

  const onSelect = () => {
    setIsDropdownOpen(false);
    onFocus();
  };

  const handlePipelineSearch = (search: string) => {
    handleFilterChange(search, dropdownValue);
  };

  const updateDropdownValue = (type: string) => {
    setDropdownValue(type);
    handlePipelineSearch("");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Dropdown
            onSelect={onSelect}
            toggle={(toggleRef) => {
              return (
                <MenuToggle ref={toggleRef} onClick={onToggle}>
                  {dropdownValue}
                </MenuToggle>
              );
            }}
            isOpen={isDropdownOpen}
          >
            <DropdownList>{dropdownItems}</DropdownList>
          </Dropdown>
          <TextInput
            value={pageState.search}
            type="text"
            placeholder={dropdownValue}
            customIcon={<SearchIcon />}
            aria-label="search"
            onChange={(_event, value: string) => {
              handlePipelineSearch(value);
            }}
          />
        </div>
        <Pagination
          itemCount={data?.totalCount ? data.totalCount : 0}
          perPage={pageState.perPage}
          page={pageState.page}
          onSetPage={handlePageSet}
          onPerPageSelect={handlePerPageSet}
        />
      </div>

      {isError && (
        <Alert type="error" description={<span>{error.message}</span>} />
      )}

      {isLoading ? (
        <SpinContainer title="Fetching the Pipelines" />
      ) : data?.registeredPipelines && data.registeredPipelines.length > 0 ? (
        <Collapse
          style={{ marginTop: "1em" }}
          onChange={handleChange}
          items={data.registeredPipelines.map((pipeline) => {
            const { name, id, description } = pipeline.data;
            return {
              key: id,
              label: (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span>{name}</span>
                    <span
                      style={{
                        fontSize: "0.9rem",
                        color: isDarkTheme ? "#B8BBBE" : "#4F5255",
                      }}
                    >
                      {description}
                    </span>
                  </div>
                </div>
              ),
              children: (
                <div>
                  {resourceError?.[id] ? (
                    <Alert type="error" description={resourceError[id]} />
                  ) : loadingResources?.[id] ? (
                    <SpinContainer title="Fetching the resources for this pipeline" />
                  ) : (
                    <PipelinesComponent pipeline={pipeline} />
                  )}
                </div>
              ),
            };
          })}
        />
      ) : (
        <EmptyStateComponent title="No Pipelines were found registered to this ChRIS instance" />
      )}
    </div>
  );
};

export default PipelinesCopy;
