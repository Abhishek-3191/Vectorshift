// toolbar.js

import { DraggableNode } from "./draggableNode";
import * as htmlToImage from "html-to-image";
import './index.css';
import download from "downloadjs";
import toast from "react-hot-toast";


export const PipelineToolbar = () => {


  // Save pipeline
  const handleSave = () => {
    const state = JSON.stringify(window.reactFlowInstance.toObject());
    localStorage.setItem("pipeline", state);
    toast.success("Pipeline saved!");
  };

  // Load pipeline
  const handleLoad = () => {
    const saved = localStorage.getItem("pipeline");
    if (saved) {
      const flow = JSON.parse(saved);
      window.reactFlowInstance.setNodes(flow.nodes || []);
      window.reactFlowInstance.setEdges(flow.edges || []);
     toast.success("Pipeline loaded!");
    } else {
      toast.error("No pipeline saved yet.");
    }
  };

  // Export pipeline as image
  const handleExport = () => {
    const element = document.querySelector(".react-flow__viewport");
    if (element) {
      htmlToImage.toPng(element).then((dataUrl) => {
        download(dataUrl, "pipeline.png");
      });
    }
  };
  

  return (
    <div className="toolbar-container">
  {/* Top actions */}
  <div className="toolbar-actions">
    <button className="toolbar-btn" onClick={handleSave}>💾 Save</button>
    <button className="toolbar-btn" onClick={handleLoad}>📂 Load</button>
    <button className="toolbar-btn" onClick={handleExport}>🖼 Export</button>
  </div>

  {/* Node palette */}
  <div className="node-palette">
    <DraggableNode type="customInput" label="Input" />
    <DraggableNode type="llm" label="LLM" />
    <DraggableNode type="customOutput" label="Output" />
    <DraggableNode type="text" label="Text" />
    <DraggableNode type="math" label="Math" />
    <DraggableNode type="date" label="Date" />
    <DraggableNode type="upper" label="UpperCase" />
    <DraggableNode type="random" label="Random" />
    <DraggableNode type="api" label="API" />
  </div>
</div>

  );
};
