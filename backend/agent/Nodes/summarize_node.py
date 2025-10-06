import json 
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from typing import Dict ,List
from dotenv import load_dotenv
from agent.News_State import NewsState
import os 
from pydantic import BaseModel, Field
from langchain_core.output_parsers import PydanticOutputParser
load_dotenv()

class ArticleSummary(BaseModel):
    title: str = Field(description="The title of the news article.")
    url: str = Field(description="The URL of the original article.")
    bias_score: int = Field(description="Bias score from 1 (unbiased) to 5 (highly biased).")
    bias_reasoning: str = Field(description="A concise explanation for the score, referencing specific examples.")

class NewsSummary(BaseModel):
    overall_summary: str = Field(description="A comprehensive and detailed summary of all sources, aiming for at least 20 sentences.")
    articles: List[ArticleSummary] = Field(description="A list of summaries for each article.")

if 'GOOGLE_API_KEY' not in os.environ:
    print("Warning: GOOGLE_API_KEY not set. Please set the environment variable.")

def summarize_news(state: NewsState):
    llm = ChatGoogleGenerativeAI(model = "gemini-2.0-flash" , temperature = 0.5)
    parser = PydanticOutputParser(pydantic_object=NewsSummary)

    prompt_template_string = """
        ### ROLE ###
        You are KHABRI (a Hindi word for an informant or news source), an expert AI news agent dedicated to providing factual, unbiased, and transparent news analysis.

        ### INPUT ###
        You will be given a list of news articles, each containing a title, body, and URL.

        Articles:
        {articles}

        ### CORE TASKS ###
        1.  **Synthesize & Summarize:** Create a single, concise, and neutral `overall_summary` that synthesizes the key verified facts from ALL provided articles.
        2.  **Analyze Individual Articles:** For EACH article, perform a bias analysis. Assign a `bias_score` from 1 (unbiased) to 5 (highly biased) and provide a concise `bias_reasoning`.
        3.  **Format Output:** Return your complete response strictly in the specified JSON format.

        ### GUIDELINES FOR UNBIASED REPORTING ###
        You must strictly adhere to the following principles during your analysis and summarization:

        **Content & Framing:**
        - **No Omission of Facts:** Actively include crucial facts and context from all sources, especially those that might contradict or challenge a primary narrative.
        - **Represent Weight of Evidence:** Avoid false balance. If there is a strong expert consensus on a topic, state it clearly. Do not give unsupported views equal validity.
        - **Neutral Framing:** Present information without any narrative spin. Your goal is to inform, not persuade.

        **Language & Tone:**
        - **Use Neutral Language:** Avoid loaded, sensational, or emotionally charged words. Use precise, objective terminology.
        - **Separate Fact from Opinion:** Clearly attribute all opinions and analyses to the person or group who expressed them.
        - **Employ Respectful Labels:** Use neutral, people-first language unless directly quoting a source.

        **Sourcing & Attribution:**
        - **Verify All Claims:** Distinguish between established facts and unsubstantiated claims.
        - **Prioritize Named Sources:** Give precedence to information from named, verifiable sources. Note when a source is anonymous.
        - **Acknowledge Potential Bias:** When summarizing studies or reports, mention any known conflicts of interest or funding sources that could influence the outcome.

        ### OUTPUT FORMAT ###
        Your response MUST strictly adhere to the following JSON schema. Do not include any text or explanations outside of the JSON structure.

        {format_instructions}

        """

    prompt = ChatPromptTemplate.from_template(prompt_template_string)
    prompt = prompt.partial(format_instructions=parser.get_format_instructions())
    

    results = state.get("results")
    if not results:
        print("No results to summarize, skipping.")
        return {**state, "summaries": {"overall_summary": "No articles found to summarize.", "articles": []}}

    articles_text = "\n\n".join(
        [f"Title: {a['title']}\nURL: {a['url']}\nBody: {a['body']}" for a in results]
    )

    chain = prompt | llm | parser

    summary_dict = {
        "overall_summary": "An unexpected error occurred before summarization.",
        "articles": []
    }

    try:
        summary_data = chain.invoke({"articles": articles_text})
        summary_dict = summary_data.model_dump()
    except Exception as e:
        
        print(f"Error parsing JSON from model: {e}")
        summary_data = {
            "overall_summary": "Could not generate a summary due to an error.", 
            "articles": []
        }

    print(f"DEBUG: Type of summary being returned is: {type(summary_dict)}")
    return {**state, "summaries": summary_dict}
