import BaseNode from "./BaseNode";

export const RandomNumberNode = ({ id }) => {
  return (
    <BaseNode id={id} title="Random Number Node" outputs={["num"]}
    tooltip="Generate the random number">
      <button onClick={() => alert(Math.floor(Math.random() * 100))}>
        Generate
      </button>
    </BaseNode>
  );
};
