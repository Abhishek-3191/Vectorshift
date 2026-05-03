import { useState } from "react";
import BaseNode from "./BaseNode";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace("customOutput-", "output_"));
  const [outputType, setOutputType] = useState(data?.outputType || "Text");

  return (
    <BaseNode id={id} title="Output" inputs={["value"]}
    tooltip="Generate the ouput">
      <label>
        Name:
        <input value={currName} onChange={(e) => setCurrName(e.target.value)} />
      </label>
      <label>
        Type:
        <select value={outputType} onChange={(e) => setOutputType(e.target.value)}>
          <option value="Text">Text</option>
          <option value="File">Image</option>
          <option value="Number">Number</option>
        </select>
      </label>
    </BaseNode>
  );
};
