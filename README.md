# FoodFusion Express

FoodFusion is a full-stack food ordering storefront. The React frontend loads
its customer menu from the FastAPI backend at `http://localhost:8000/catalog/menu`.

## Run locally

Open two terminals:

```powershell
cd "online-food-backend"
py -3 -m pip install -r requirement.txt
py -3 -m uvicorn main:app --reload
```

```powershell
cd "online-food-frontend"
npm install
npm run dev
```

The backend uses a local SQLite database (`foodfusion.db`) by default. Copy
`online-food-backend/.env.example` to `.env` to configure PostgreSQL or a
production secret. Set `VITE_API_URL` in the frontend environment if the API
is hosted somewhere other than `http://localhost:8000`.
