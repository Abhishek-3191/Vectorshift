import BaseNode from "./BaseNode";

export const UpperCaseNode = ({ id }) => {
  return (
    <BaseNode id={id} title="UpperCase Node" inputs={["text"]} outputs={["upper"]}
    tooltip="Converts text to UPPERCASE"
>
      <p>Converts text to UPPERCASE</p>
    </BaseNode>
  );
};
