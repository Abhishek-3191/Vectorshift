// submit.js
import { useStore } from "./store";
import toast from "react-hot-toast";
import './index.css';
export const SubmitButton = () => {
  const { nodes, edges } = useStore();

const handleSubmit = async () => {
  try {
    const res = await fetch("http://127.0.0.1:8000/pipelines/parse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nodes, edges }),
    });

    const data = await res.json();
     if (!data.is_dag) {
  toast.error(
    `❌ Invalid Pipeline\nNodes: ${data.num_nodes}\nEdges: ${data.num_edges}\nDAG:❌ No (cycle detected)`
  );
} else {
  toast.success(
    `✅ Valid Pipeline\nNodes: ${data.num_nodes}\nEdges: ${data.num_edges}\n DAG:✅ Yes`
  );
}

  } catch (err) {
    toast.error("Error connecting to backend");
    console.error(err);
  }
};
return (
    <div className="submit-container">
  <button className="submit-button" onClick={handleSubmit}>Analyse Pipeline</button>
    </div>

  );
};
