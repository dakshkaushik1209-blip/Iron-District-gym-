import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-dev-middleware',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url?.startsWith('/api/trial')) {
            try {
              const { default: handler } = await import('./api/trial.js');
              let body = '';
              req.on('data', (chunk) => {
                body += chunk;
              });
              req.on('end', async () => {
                req.body = body ? JSON.parse(body) : {};
                res.status = (code) => {
                  res.statusCode = code;
                  return res;
                };
                res.json = (data) => {
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(data));
                  return res;
                };
                await handler(req, res);
              });
              return;
            } catch (err) {
              console.error('API middleware error:', err);
            }
          }
          next();
        });
      },
    },
  ],
  server: {
    port: 3000,
    open: false,
  },
})
