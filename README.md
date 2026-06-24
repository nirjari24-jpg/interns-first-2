# ChatGroup

A real-time chat application built with Next.js (frontend) and Node.js/Express (backend), backed by MongoDB and Socket.io.

## Project Structure

```
├── backend/          # Node.js + Express + Socket.io API server (TypeScript)
├── frontend/         # Next.js frontend application
├── chatgroup/        # Next.js frontend (alternate build)
└── src/index.js      # Root entry point shim (delegates to backend/dist)
```

## Backend

The backend is a TypeScript Express application located in `backend/`. It provides:

- REST API for user registration, login, messaging, and friend requests
- Real-time messaging via Socket.io
- WebRTC call signalling relay
- MongoDB persistence via Mongoose (with in-memory fallback)

### Environment Variables

| Variable      | Description                        | Default  |
|---------------|------------------------------------|----------|
| `PORT`        | HTTP port the server listens on    | `5000`   |
| `MONGODB_URI` | MongoDB connection string          | *(Atlas fallback)* |

### Scripts

```bash
# Install dependencies and compile TypeScript
npm install && npm run build

# Start the compiled server
npm start

# Development mode (hot-reload via ts-node-dev)
cd backend && npm run dev
```

## Deployment (Railway)

The service is configured to build and start from the repository root:

- **Build command:** `npm install && npm run build`
- **Start command:** `npm start`

The build step installs dependencies inside `backend/` and compiles the TypeScript source to `backend/dist/`. The start command launches the compiled output via the root-level `src/index.js` shim.
