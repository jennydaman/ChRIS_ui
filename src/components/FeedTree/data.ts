import {
  PipelinePipingDefaultParameterList,
  PluginInstance,
  PluginParameter,
  PluginPiping,
} from "@fnndsc/chrisapi";
import { fetchResource } from "../../api/common";
import { TSID } from "./ParentComponent";

export interface Datum {
  id?: number;
  name?: string;
  parentId?: number;
  item?: PluginInstance;
  children: Datum[];
}

export interface Point {
  x: number;
  y: number;
}

export default interface TreeNodeDatum extends Datum {
  children: TreeNodeDatum[];
  __rd3t: {
    id: string;
    depth: number;
    collapsed: boolean;
  };
}

export interface Separation {
  siblings: number;
  nonSiblings: number;
}

export interface OwnProps {
  tsIds?: TSID;
  data: TreeNodeDatum[];
  onNodeClick: (node: any) => void;
  onNodeClickTs: (node: PluginInstance) => void;
  translate?: Point;
  scaleExtent: {
    min: number;
    max: number;
  };
  zoom: number;
  nodeSize: {
    x: number;
    y: number;
  };
  separation: Separation;
  orientation: "horizontal" | "vertical";
  changeOrientation: (orientation: string) => void;
}

export const getFeedTree = (items: PluginInstance[]) => {
  const tree = [];
  const mappedArr: {
    [key: string]: TreeNodeDatum;
  } = {};

  for (const item of items) {
    const id = item.data.id;

    mappedArr[id] = {
      id: id,
      name: item.data.title || item.data.plugin_name,
      parentId: item.data.previous_id,
      item: item,
      children: [],
      __rd3t: {
        id: "",
        depth: 0,
        collapsed: false,
      },
    };
  }

  for (const id in mappedArr) {
    const mappedElem = mappedArr[id];
    if (mappedElem.parentId) {
      const parentId = mappedElem.parentId;
      if (parentId && mappedArr[parentId] && mappedArr[parentId].children)
        mappedArr[parentId].children.push(mappedElem);
    } else {
      tree.push(mappedElem);
    }
  }

  return tree;
};

export const getTsNodes = async (items: PluginInstance[]) => {
  const parentIds: {
    [key: string]: number[];
  } = {};
  const params = {
    limit: 20,
    offset: 0,
  };
  for (let i = 0; i < items.length; i++) {
    const instance = items[i];
    if (instance.data.plugin_type === "ts") {
      const fn = instance.getParameters;
      const boundFn = fn.bind(instance);
      const { resource: parameters } = await fetchResource<PluginParameter>(
        params,
        boundFn,
      );
      const filteredParameters = parameters.filter(
        (param) => param.data.param_name === "plugininstances",
      );
      if (filteredParameters[0]) {
        parentIds[instance.data.id] = filteredParameters[0].data.value
          .split(",")
          .map(Number);
      }
    }
  }
  return parentIds;
};

export const getTsNodesWithPipings = async (
  items: PluginPiping[],
  pluginParameters?: PipelinePipingDefaultParameterList,
) => {
  const parentIds: {
    [key: string]: number[];
  } = {};

  for (let i = 0; i < items.length; i++) {
    const instance = items[i];

    if (instance.data.plugin_name === "pl-topologicalcopy") {
      //@ts-ignore
      pluginParameters.data
        .filter((param: any) => {
          return param.plugin_piping_id === instance.data.id;
        })
        .forEach((param: any) => {
          if (param.param_name === "plugininstances") {
            parentIds[param.plugin_piping_id] = param.value
              .split(",")
              .map(Number);
          }
        });
    }
  }
  return parentIds;
};
export function treeAlgorithm(
  event: any,
  selectedD3Node: any,
  instances: any[],
  onNodeClick: (item: PluginInstance) => void,
) {
  if (event.keyCode === 40) {
    //Down

    const children = selectedD3Node.children;
    const length = children.length;

    if (length === 1) {
      onNodeClick(children[0]);
    }
    if (length > 1) {
      const newLength = Math.floor(length / 2);
      onNodeClick(children[newLength - 1]);
    }
  }

  if (event.keyCode === 38) {
    //Up
    const parentId = selectedD3Node.parentId;
    const findItem = instances.find(
      (instance) => instance.data.id === parentId,
    );

    if (findItem) {
      onNodeClick(findItem.data);
    }
  }

  if (event.keyCode === 37) {
    // Left

    const children = selectedD3Node.children;
    const length = children.length;

    if (length === 0) {
      const findItem = instances.find(
        (instance) => instance.data.id === selectedD3Node.parentId,
      );
      if (findItem) {
        const children = findItem.children;
        const findIndex = children.findIndex(
          (child: any) => child.data.id === selectedD3Node.id,
        );

        if (findIndex) {
          const nodeItem = children[findIndex - 1];
          if (nodeItem) onNodeClick(nodeItem.data);
        }
      }
    }
    if (length > 0) {
      const nodeItem = children[0];
      onNodeClick(nodeItem);
    }
  }

  if (event.keyCode === 39) {
    //right

    const children = selectedD3Node.children;
    const length = children.length;

    if (length > 0) {
      const nodeItem = children[length - 1];
      onNodeClick(nodeItem);
    }

    if (length === 0) {
      const findItem = instances.find(
        (instance) => instance.data.id === selectedD3Node.parentId,
      );
      if (findItem) {
        const children = findItem.children;
        const findIndex = children.findIndex(
          (child: any) => child.data.id === selectedD3Node.id,
        );

        if (findIndex !== -1) {
          const nodeItem = children[findIndex + 1];
          if (nodeItem) onNodeClick(nodeItem.data);
        }
      }
    }
  }
}
