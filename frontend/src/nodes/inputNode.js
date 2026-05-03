

import { useState } from "react";
import BaseNode from "./BaseNode";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace("customInput-", "input_"));
  const [inputType, setInputType] = useState(data?.inputType || "Text");

  return (
    <BaseNode id={id} title="Input" outputs={["value"]}
    tooltip="Takes the input">
      <label>
        Name:
        <input value={currName} onChange={(e) => setCurrName(e.target.value)} />
      </label>
      <label>
        Type:
        <select value={inputType} onChange={(e) => setInputType(e.target.value)}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};
