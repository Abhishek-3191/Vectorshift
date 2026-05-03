import { useState, useRef, useCallback, useMemo } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { MathNode } from './nodes/MathNode';
import { DateNode } from './nodes/DateNode';
import { UpperCaseNode } from './nodes/UpperCaseNode';
import { RandomNumberNode } from './nodes/RandomNumberNode';
import { APIRequestNode } from './nodes/APIRequestNode';

import DeletableEdge from "./nodes/DeleteableEdge";

import './index.css';
import { checkIfDag, getCycleEdges } from "./utils/dagCheck";
import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  math: MathNode,
  date: DateNode,
  upper: UpperCaseNode,
  random: RandomNumberNode,
  api: APIRequestNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore(selector, shallow);

  // ✅ DAG check
  const isDag = useMemo(() => checkIfDag(nodes, edges), [nodes, edges]);

  // ✅ Detect cycle edges
  const cycleEdgeIds = useMemo(() => {
    return getCycleEdges(nodes, edges);
  }, [nodes, edges]);

  // ✅ Style edges dynamically
  const styledEdges = useMemo(() => {
    return edges.map((edge) => {
      const isCycle = cycleEdgeIds.has(edge.id);

      return {
        ...edge,
        style: {
          stroke: isCycle ? "#ef4444":"#3df14c",
          strokeWidth: isCycle ? 3 : 2,
          filter: isCycle ? "drop-shadow(0px 0px 6px #ef4444)" : "none",
        },
        animated: isCycle,
      };
    });
  }, [edges, cycleEdgeIds]);

  const getInitNodeData = (nodeID, type) => ({
    id: nodeID,
    nodeType: type
  });

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!reactFlowInstance) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const raw = event.dataTransfer.getData('application/reactflow');
      if (!raw) return;

      const { nodeType: type } = JSON.parse(raw);
      if (!type) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const nodeID = getNodeID(type);

      addNode({
        id: nodeID,
        type,
        position,
        data: getInitNodeData(nodeID, type),
      });
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} className="pipeline-container">

      {/* Empty State */}
      {nodes.length === 0 && (
        <div className="empty-state">
          Drag nodes here to build your pipeline ⚡
        </div>
      )}

      {/* DAG Status */}
      <div className={`dag-status ${isDag ? "dag-valid" : "dag-invalid"}`}>
        {nodes.length === 0
          ? "Add Nodes"
          : isDag
          ? "✅ DAG Valid"
          : "❌ Cycle Detected"}
      </div>

      {/* DAG Hint */}
      {!isDag && (
        <div className="dag-hint">
          <b>Hint:</b> DAG has no cycles. Remove circular connections.
        </div>
      )}

      <ReactFlow
        nodes={nodes}
        edges={styledEdges}   // ✅ FIXED (only once)
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={(instance) => {
          setReactFlowInstance(instance);
          window.reactFlowInstance = instance;
        }}
        onEdgesDelete={(edgesToRemove) => {
          edgesToRemove.forEach((edge) =>
            useStore.getState().removeEdge(edge.id)
          );
        }}
        nodeTypes={nodeTypes}
        edgeTypes={{ deletable: DeletableEdge }}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        fitView
      >
        <Background color="#0f56b4" gap={gridSize} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
