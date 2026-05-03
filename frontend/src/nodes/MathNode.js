import BaseNode from "./BaseNode";

export const MathNode = ({ id }) => {
  return (
    <BaseNode 
    id={id} 
    title="Math Node" 
    inputs={["a", "b"]} 
    outputs={["sum"]}
    tooltip="Adds two numbers (a + b)">
      <p>Adds two numbers</p>
    </BaseNode>
  );
};
