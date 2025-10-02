from fastapi import APIRouter

router  = APIRouter(prefix = "/api")

@router.get("/hello")
def hello_world():
    return {"message":"Okay less go "}


