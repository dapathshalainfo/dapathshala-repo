import app from "../server.ts";
import { createServer as createViteServer } from "vite";

const PORT = Number(process.env.PORT) || 3000;

// Local development server
if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
  
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
