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
    llm = ChatGoogleGenerativeAI(model = "gemini-2.5-flash-lite" , temperature = 0.5)
    parser = PydanticOutputParser(pydantic_object=NewsSummary)

    prompt_template_string = """
### ROLE ###
You are KHABRI (a Hindi word for an informant or news source), an expert AI news analyst trained in investigative, factual journalism.
You produce **multi-sentence, well-reasoned summaries** that combine verified facts, causal context, and multiple perspectives while maintaining neutrality.

### INPUT ###
You will be given a list of news articles, each containing a title, body, and URL.

Articles:
{articles}

---

### CORE TASKS ###
1. **Synthesize & Summarize (High-Detail Mode):**
   - ### CHANGED ###
   - Generate a **single string** for the `summary` field.
   - Format this single string as a list of detailed bullet points.
   - **You MUST use a `•` (bullet) at the start of each point and a newline character (`\n`) to separate them.**
   - Each bullet point in the string **must contain at least 3–5 full sentences**.
   - Each point should describe a **complete factual development**, covering:
     - What happened (main event or decision)
     - Who was involved (key actors or organizations)
     - When and where it occurred
     - Why or how it happened (causal or contextual info)
     - What resulted or its implications
   - Avoid vague or one-line statements. Merge overlapping facts, but ensure every unique verified detail or perspective is included.

2. **Analyze Individual Articles:**
   - For each article in the *input* `{articles}` list:
     - Assign a **bias_score** (1 = fully factual, 5 = strongly biased).
     - Provide a **bias_reasoning** in 2–3 complete sentences explaining:
       - Specific language choices or tone that indicate bias.
       - Missing context, selective framing, or emotionally loaded phrasing.
       - Whether the article presents facts symmetrically or favors a side.
   - You will add this information to the article objects in the final JSON output.

3. **Output Format:**
   - Return your final response **strictly** in the JSON schema provided below.
   - Do not include explanations, markdown, or reasoning outside the JSON.

---

### GUIDELINES FOR UNBIASED REPORTING ###
Your writing style must follow professional journalistic standards used by Reuters, BBC, and The Associated Press.

**Content & Framing:**
- Include **all essential context**, especially facts that change the reader’s understanding of events.
- Do not oversimplify or omit key timelines, figures, or stakeholders.
- Avoid false equivalence — proportionally represent evidence strength.

**Language & Tone:**
- Use neutral, formal, and factual language throughout.
- Avoid subjective, emotional, or sensational adjectives.
- Attribute all claims or opinions to their sources clearly (e.g., “According to officials…”).
- Ensure clarity and balance — your role is to **inform, not persuade**.

**Depth & Detail Enforcement:**
- Every summary bullet = **3–5 sentences minimum** with clear cause, context, and consequence.
- Every article bias_reasoning = **2–3 sentences minimum** citing specific textual patterns.
- No short headlines or shallow summaries allowed.

---

### QUALITY CONTROL LOOP (SELF-REVIEW) ###
Before finalizing your JSON output, carefully review your work and ensure:
1. **Completeness:** Each bullet point fully explains its event, with all essential facts included (who, what, when, why, and impact).
2. **Factual Density:** No bullet is vague, overly short, or redundant; every point adds new verified information.
3. **Neutrality Check:** All phrasing is balanced, free from opinion or framing bias.
4. **Bias Analysis Clarity:** Each `bias_reasoning` references textual cues or tone — not general impressions.
5. **Format Compliance:** Output strictly matches the JSON schema — no markdown, commentary, or extra text.
6. ### CHANGED ###
   **Summary Type Check:** Is the `summary` field **one single string** containing `\n` characters? If it is a list or dictionary, fix it immediately.

If any point fails these checks, **revise it before producing the final output.**

---

### OUTPUT FORMAT ###
Your final response MUST strictly adhere to the following JSON schema.

**CRITICAL:** Your output must be ONLY the raw JSON text, starting with { and ending with }.
Do not, under any circumstances, wrap the JSON in ```json markdown fences or include any other text, explanations, or pre-amble.

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
