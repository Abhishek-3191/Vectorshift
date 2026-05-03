import BaseNode from "./BaseNode";
import '../index.css';
export const CustomNode = (props) => {
  return (
    <BaseNode {...props} title="Custom Node" color="#4cafef"
    tooltip="This is the custom node">
      <div>
        <p className="custom-node-text">This is a custom node 🚀</p>
      </div>
    </BaseNode>
  );
};
