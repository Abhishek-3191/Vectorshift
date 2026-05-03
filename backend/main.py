from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow React frontend (localhost:3000) to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tum chaaho to sirf ["http://localhost:3000"] bhi likh sakte ho
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Ping": "Pong"}

@app.post("/pipelines/parse")
async def parse_pipeline(request: Request):
    data = await request.json()
    nodes = data.get("nodes", [])
    edges = data.get("edges", [])

    num_nodes = len(nodes)
    num_edges = len(edges)

    is_dag = check_if_dag(nodes, edges)

    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag}

def check_if_dag(nodes, edges):
    graph = {}
    for edge in edges:
        src = edge.get("source")
        tgt = edge.get("target")
        graph.setdefault(src, []).append(tgt)

    visited = set()
    rec_stack = set()

    def dfs(node):
        if node in rec_stack:
            return False
        if node in visited:
            return True
        visited.add(node)
        rec_stack.add(node)
        for neighbor in graph.get(node, []):
            if not dfs(neighbor):
                return False
        rec_stack.remove(node)
        return True

    for n in [node["id"] for node in nodes]:
        if n not in visited:
            if not dfs(n):
                return False
    return True
