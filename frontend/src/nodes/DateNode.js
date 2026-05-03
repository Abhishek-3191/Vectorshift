import BaseNode from "./BaseNode";

export const DateNode = ({ id }) => {
  return (
    <BaseNode id={id} title="Date Node" outputs={["date"]}
    tooltip="Generate the date">
      <p>{new Date().toLocaleDateString()}</p>
    </BaseNode>
  );
};
