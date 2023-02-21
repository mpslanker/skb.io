# ${HOME}/code/my_api/main.py

from fastapi import FastAPI
from mangum import Mangum

# Instantiate a FastAPI object
app = FastAPI()

@app.get("/")
async def root(name: str="World"):
    return {"greeting": f"Hello, {name}!"}

handler = Mangum(app)