import BaseNode from "./BaseNode";

export const APIRequestNode = ({ id }) => {
  return (
    <BaseNode id={id} title="API Request Node" inputs={["url"]} outputs={["response"]}
    tooltip="Fetch data from an API URL">
      <input type="text" placeholder="Enter API URL" />
    </BaseNode>
  );
};
