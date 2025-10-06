def format_output(state):
    summaries = state["summaries"]

    output = {
        "topic": state["query"],
        "summary": summaries.get("overall_summary", ""),
        "articles": summaries.get("articles", [])
        
    }
    
    return {**state, "final_output": output}