// store.js

import { create } from "zustand";
import toast from "react-hot-toast";
import { checkIfDag } from "./utils/dagCheck";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    // nodeTypes: { },
    addNodeType: (type, component) => {
    set({
      nodeTypes: { ...get().nodeTypes, [type]: component }
    });
  },
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
  
onConnect: (connection) => {
  const currentEdges = get().edges;

  const newEdge = {
    ...connection,
    animated: true,
    type: "deletable",
    markerEnd: {
      type: MarkerType.Arrow,
      height: "20px",
      width: "20px",
    },
  };

  const updatedEdges = addEdge(newEdge, currentEdges);

  // ✅ Always allow connection
  set({ edges: updatedEdges });

  // ⚠️ Show warning if cycle
  const nodes = get().nodes;
  const isDag = checkIfDag(nodes, updatedEdges);

  if (!isDag) {
    toast.error("⚠️ Warning: This creates a cycle!");
  }
},


    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
  
          return node;
        }),
      });
    },
    removeNode: (nodeId) => {
    set({
    nodes: get().nodes.filter((node) => node.id !== nodeId),
    edges: get().edges.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId
    ),
  });
  },
  removeEdge: (edgeId) => {
  set({
    edges: get().edges.filter((e) => e.id !== edgeId),
  });
},
  }));
