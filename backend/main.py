
from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import assistant


import google.generativeai
# import routes
from routes import upload, chat, product
from routes.product_search import router as product_router
from fastapi import FastAPI
from routes.product_search import router as product_router
from routes import recommendation
app = FastAPI()
app.include_router(recommendation.router, prefix="/api")
app.include_router(product_router)
app.include_router(product_router)
from fastapi import FastAPI
from routes import assistant
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(assistant.router)
# ✅ CREATE APP FIRST
app = FastAPI()
app.include_router(assistant.router)
# ✅ CORS (needed for frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ INCLUDE ROUTES
app.include_router(upload.router)
app.include_router(chat.router)
app.include_router(product.router)

# optional test route
@app.get("/")
def home():
    return {"message": "Backend running 🚀"}