from typing import TypedDict, List, Dict, Any,Optional

class NewsState(TypedDict,total = False):
    query: str
    results:List[Dict[str, Any]]
    summaries: Optional[Dict[str, Any]]
    final_output: Optional[Dict[str, Any]]
    