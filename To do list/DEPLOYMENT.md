# Deployment Notes

Backend (Render/Railway):
- Ensure `MONGO_URI` and `JWT_SECRET` are set in environment variables.
- Set `CLIENT_URL` to your frontend URL.
- Start command: `npm start` or `npm run dev` for nodemon (dev only)

Frontend (Vercel/Netlify):
- Set `VITE_API_URL` env var to your backend URL.
- Build command: `npm run build`.
- Publish `dist` (Vite) folder.

CORS:
- Server allows origin from `CLIENT_URL` and sends cookies when `withCredentials: true` is used from client.

Security notes:
- In production use HTTPS and `secure: true` for cookies.
- Prefer storing JWT in HTTP-only cookies rather than localStorage for XSS protection.
