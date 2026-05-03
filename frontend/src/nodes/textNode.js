//textNode.js
import { useState, useMemo } from "react";
import '../index.css';
import BaseNode from "./BaseNode";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");

  // Extract unique variables from {{variable}} syntax
  const variables = useMemo(() => {
    const matches = currText.match(/\{\{\s*(\w+)\s*\}\}/g) || [];
    return [...new Set(matches.map((m) => m.replace(/\{\{\s*|\s*\}\}/g, "")))];
  }, [currText]);

  return (
    <BaseNode id={id} title="Text" inputs={variables} outputs={["output"]}
    tooltip="Supports variables using {{input}} syntax"
    >
      <textarea
        value={currText}
        onChange={(e) => setCurrText(e.target.value)}
        className="text-node-textarea"
        ref={(el) => {
          if (el) el.style.height = "auto";
          if (el) el.style.height = el.scrollHeight + "px";
        }}
        
      />
    </BaseNode>
  );
};


