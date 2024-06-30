import torch
import pickle

from fastapi import FastAPI, HTTPException

with open("mnist_net.pkl", "rb") as f:
    nnet = pickle.load(f)

app = FastAPI()

@app.post("/classify")
async def classify_digit(digit_array: list[int]):
    if len(digit_array) != 784:
        raise HTTPException(
            detail="Invalid shape",
            status_code=422
        )
    digit_array = torch.tensor(digit_array, dtype=torch.float32)
    out = torch.argmax(torch.softmax(nnet(digit_array), dim=0))
    return out.item()
