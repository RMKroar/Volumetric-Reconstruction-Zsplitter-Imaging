import json
import numpy as np
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow Next.js to access FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/deconv-result")
def deconv_result():
    EV_load = np.load('data/EV.npy')
    EV_load = EV_load - np.min(EV_load)
    result = EV_load / np.max(EV_load)

    return {"result": json.dumps(result.tolist())}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)