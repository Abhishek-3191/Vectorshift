# VectorShift Frontend Assessment
## 🎥 Demo
https://www.loom.com/share/4ea0e75643534c7c84b30c52839721ca

## 🚀 Overview
This project is a pipeline builder UI where users can:
- Drag and drop nodes
- Connect nodes to form pipelines
- Detect cycles (DAG validation)
- Submit pipeline to backend for validation

---

## 🧩 Features

### Frontend
- React Flow based pipeline builder
- Multiple node types (Input, LLM, Text, Math, API, etc.)
- Live DAG validation
- Cycle detection with red edge highlighting
- Node tooltips and delete functionality
- Toast notifications for results

### Backend
- FastAPI server
- Endpoint: `/pipelines/parse`
- Returns:
  - Number of nodes
  - Number of edges
  - Whether graph is DAG

---

## ⚙️ Setup Instructions

### 1. Clone repo
```bash
git clone https://github.com/Abhishek-3191/Vectorshift.git
cd vectorshift
```

---

### 2. Run Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs at:
```
http://127.0.0.1:8000
```

---

### 3. Run Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs at:
```
http://localhost:3000
```

---

## 🔁 How It Works

1. Create nodes and connect them
2. Live validation shows if DAG is valid
3. Click **Analyse Pipeline**
4. Backend validates again
5. Toast displays:
   - Nodes count
   - Edges count
   - DAG status

---

## 🧠 Design Decisions

- Frontend validation for instant feedback (UX)
- Backend validation as source of truth (data integrity)
- Separation of concerns using utils (DAG logic)
- Reusable node components

---



