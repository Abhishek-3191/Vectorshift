// ✅ 1. Existing function (DO NOT REMOVE)
export function checkIfDag(nodes, edges) {
  const graph = {};

  for (const edge of edges) {
    const src = edge.source;
    const tgt = edge.target;
    if (!graph[src]) graph[src] = [];
    graph[src].push(tgt);
  }

  const visited = new Set();
  const stack = new Set();

  function dfs(node) {
    if (stack.has(node)) return false;
    if (visited.has(node)) return true;

    visited.add(node);
    stack.add(node);

    for (const nei of graph[node] || []) {
      if (!dfs(nei)) return false;
    }

    stack.delete(node);
    return true;
  }

  for (const n of nodes.map((n) => n.id)) {
    if (!visited.has(n)) {
      if (!dfs(n)) return false;
    }
  }

  return true;
}

//////////////////////////////////////////////////////////////

// ✅ 2. NEW function → find cycle edges
export function getCycleEdges(nodes, edges) {
  const graph = {};
  const edgeMap = {};

  // Build graph + edge map
  edges.forEach((edge) => {
    if (!graph[edge.source]) graph[edge.source] = [];
    graph[edge.source].push(edge.target);

    edgeMap[`${edge.source}-${edge.target}`] = edge.id;
  });

  const visited = new Set();
  const stack = new Set();
  const cycleEdges = new Set();

  function dfs(node, path = []) {
    if (stack.has(node)) {
      // 🔴 cycle found → mark edges
      for (let i = 0; i < path.length - 1; i++) {
        const key = `${path[i]}-${path[i + 1]}`;
        if (edgeMap[key]) {
          cycleEdges.add(edgeMap[key]);
        }
      }
      return true;
    }

    if (visited.has(node)) return false;

    visited.add(node);
    stack.add(node);

    for (const nei of graph[node] || []) {
      if (dfs(nei, [...path, node, nei])) {
        return true;
      }
    }

    stack.delete(node);
    return false;
  }

  for (const n of nodes.map((n) => n.id)) {
    if (!visited.has(n)) {
      if (dfs(n)) break;
    }
  }

  return cycleEdges; // Set of edge IDs
}
