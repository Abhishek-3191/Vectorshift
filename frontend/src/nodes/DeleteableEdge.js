import { BaseEdge, getBezierPath } from "reactflow";
import { useStore } from "../store";
import { useState } from "react";
import '../index.css';

export default function DeletableEdge({ id, sourceX, sourceY, targetX, targetY, style }) {
  const [hovered, setHovered] = useState(false);
  const removeEdge = useStore((s) => s.removeEdge);

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <g
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <BaseEdge id={id} path={edgePath} style={style} />

      {hovered && (
        <foreignObject
          width={20}
          height={20}
          x={labelX - 10}
          y={labelY - 10}
          requiredExtensions="http://www.w3.org/1999/xhtml"
        >
          <div
             className="edge-delete-btn"
            onClick={() => removeEdge(id)}
          >
            ×
          </div>
        </foreignObject>
      )}
    </g>
  );
}
