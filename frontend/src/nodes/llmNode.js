//llmNode.js

import BaseNode from "./BaseNode";

export const LLMNode = ({ id }) => {
  return (
    <BaseNode id={id} title="LLM" inputs={["system", "prompt"]} outputs={["response"]}
    tooltip="Use LLM model">
      <p>This is an LLM Node</p>
    </BaseNode>
  );
};
