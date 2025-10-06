from fastapi import FastAPI, Query
from agent.Agent_Graph import build_khabri_graph
from fastapi.middleware.cors import CORSMiddleware
from agent.News_State import NewsState
app = FastAPI()
from dotenv import load_dotenv
load_dotenv()


origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
def health_check():
    return {"Server Running good":"Chill bro"}

graph = build_khabri_graph().compile()
@app.get("/news")
def fetch_news(topic:str = Query(...)):
    state:NewsState = {"query": topic}
    result = graph.invoke(state)
    return result["final_output"]

