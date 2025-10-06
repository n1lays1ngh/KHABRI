from langchain_community.utilities.tavily_search import TavilySearchAPIWrapper
import os 
from dotenv import load_dotenv
load_dotenv()
from pydantic import SecretStr

def search_news(state):
    query = state.get("query")
    if not query:
        return {"results": []}
    search_query = f"Recent News on {query}"
    tavily_api_key_str = os.getenv("TAVILY_API_KEY")
    assert tavily_api_key_str is not None, "TAVILY_API_KEY environment variable not set! Please check your .env file."
    search = TavilySearchAPIWrapper(tavily_api_key=SecretStr(tavily_api_key_str))  

    try:
        results = search.results(
            query=search_query, 
            max_results=5, 
            search_depth="advanced",
            # include_domains=[
            #     "thehindu.com",
            #     "indianexpress.com",
            #     "ndtv.com",
            #     "scroll.in",
            #     "thewire.in",
            #     "bbc.com",
            #     "nytimes.com",
            #     "reuters.com",
            #     "theguardian.com",
            #     "aljazeera.com",
            #     "apnews.com"
            # ],
            exclude_domains=[
            "facebook.com",
            "twitter.com",
            "x.com",
            "instagram.com",
            "reddit.com",
            "linkedin.com",
            "pinterest.com",
            "quora.com",
            "tumblr.com",
            "youtube.com",
            "tiktok.com",
            "vimeo.com",
            "medium.com",
            "blogspot.com",
            "wordpress.com",
            "wikipedia.org",
            "fandom.com",
            "wikia.com",
            "amazon.com"
        ]
    )
    except Exception as e:
        print(f"Error during Tavily search: {e}")
        return {"results": []}

    extracted_results = []
    for item in results:
        extracted_results.append({
            "title": item.get("title", "No Title"),
            "body": item.get("content", "No Content"),
            "url": item.get("url", "#")
        })

    return {**state, "results": extracted_results}





            

            

            

            
            
