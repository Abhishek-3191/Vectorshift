// src/nodes/BaseNode.js
import React from "react";
import { Handle, Position } from "reactflow";
import { useStore } from "../store";
import "../index.css";

export default function BaseNode({
  id,
  title,
  inputs = [],
  outputs = [],
  children,
  tooltip = "" ,
}) {
  const removeNode = useStore((s) => s.removeNode);

  return (
    <div className="node-wrapper">
      {tooltip && <div className="node-tooltip">{tooltip}</div>}
    <div
      className="base-node"
    >
      {/* Tooltip */}
      {/* Node Header */}
      <div
        className="node-header"
      >
        {title}

        {/* ❌ Remove Button */}
        <button
  className="node-delete-btn"
  onClick={() => removeNode(id)}
>
          ×
        </button>
      </div>

      {/* Inputs (left handles) */}
      {inputs.map((inp, i) => (
        <Handle
          key={i}
          type="target"
          position={Position.Left}
          id={`${id}-in-${inp}`}
          style={{ top: `${50 + i * 25}px`, background:" #2563eb"}}
        />
      ))}

      {/* Children (custom form fields / content) */}
      <div
        className="node-body"
  
      >
        {children}
      </div>

      {/* Outputs (right handles) */}
      {outputs.map((out, i) => (
        <Handle
          key={i}
          type="source"
          position={Position.Right}
          id={`${id}-out-${out}`}
          style={{ top: `${50 + i * 25}px`, background: "#16a34a" }}
        />
      ))}
    </div>
    </div>
  );
}
