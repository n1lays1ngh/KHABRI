from langgraph.graph import StateGraph, END
from langchain_google_genai import ChatGoogleGenerativeAI
from .Nodes.search_node import search_news
from .Nodes.summarize_node import summarize_news
from .Nodes.output_node import format_output
from agent.News_State import NewsState


def build_khabri_graph():
    graph = StateGraph(NewsState)

    
    graph.add_node("search", search_news)
    graph.add_node("summarize", summarize_news)
    graph.add_node("output", format_output)

    graph.set_entry_point("search")
    graph.add_edge("search", "summarize")
    graph.add_edge("summarize", "output")
    graph.add_edge("output", END)

    return graph
