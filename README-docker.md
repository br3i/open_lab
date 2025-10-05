Docker setup for OpenLab

This repository contains a backend (Node/Express) and a frontend (Angular). The following files were added to dockerize the project:

- `backend/Dockerfile` - builds a production Node image for the backend and runs app.js.
- `backend/.dockerignore` - ignores local files when building the backend image.
- `frontend/Dockerfile` - multi-stage build: build with Node and serve with Nginx.
- `frontend/.dockerignore` - ignores local files when building the frontend image.
- `frontend/nginx.conf` - nginx config to serve the SPA and proxy API calls to the backend.
- `docker-compose.yml` - composes frontend and backend for local development.

How to run

From repository root:

Open a PowerShell and run:

docker-compose up --build

To stop:

docker-compose down

Endpoints

- Frontend: http://localhost:4200
- Backend: http://localhost:3002

Notes:
- The backend reads DB configuration from `backend/.env`. Do not commit secrets to source control.
- If you already have services on ports 8080 or 3000, change the host port mappings in `docker-compose.yml`.
