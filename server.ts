import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

async function startServer() {
  const app = express();

  // Disable server signature header
  app.disable('x-powered-by');

  // Strict HTTP security headers (iframe-compatible for preview environments)
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=(), payment=(), usb=()'
    );
    res.setHeader('X-DNS-Prefetch-Control', 'off');
    res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');

    const cspDirectives = [
      "default-src 'self'",
      isProduction
        ? "script-src 'self' 'unsafe-inline'"
        : "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob:",
      "connect-src 'self' ws: wss:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://wa.me",
    ];
    res.setHeader('Content-Security-Policy', cspDirectives.join('; '));

    if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    }

    next();
  });

  // Block encoded/raw path traversal attempts, dotfiles, and internal config files
  app.use((req, res, next) => {
    let decodedPath: string;
    try {
      decodedPath = decodeURIComponent(req.path || '');
    } catch {
      res.status(400).type('text/plain').send('Requisição inválida.');
      return;
    }

    const normalizedPath = path.posix.normalize(decodedPath.replace(/\\/g, '/'));

    if (
      decodedPath.includes('..') ||
      normalizedPath.includes('..') ||
      decodedPath.includes('\0') ||
      /(^|\/)\.(env|git|aistudio|DS_Store)/i.test(normalizedPath) ||
      /^\/(package\.json|package-lock\.json|bun\.lock|tsconfig\.json|vite\.config\.ts|server\.ts|metadata\.json)$/i.test(
        normalizedPath
      ) ||
      (isProduction && /^\/(src|node_modules)(\/|$)/i.test(normalizedPath))
    ) {
      res.status(403).type('text/plain').send('Acesso não permitido.');
      return;
    }
    next();
  });

  // Lightweight health endpoint (exposes no internal details or secrets)
  app.get('/api/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  // Reject unknown API routes cleanly
  app.all('/api/*', (_req, res) => {
    res.status(404).json({ error: 'Endpoint não encontrado.' });
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    const publicAssetsDir = path.resolve(__dirname, 'public', 'assets');

    // Serve static files without directory indexing and denying dotfiles
    app.use(
      express.static(distDir, {
        dotfiles: 'deny',
        index: false,
        maxAge: '7d',
        etag: true,
      })
    );

    if (fs.existsSync(publicAssetsDir)) {
      app.use(
        '/assets',
        express.static(publicAssetsDir, {
          dotfiles: 'deny',
          index: false,
          maxAge: '7d',
        })
      );
    }

    app.get('*', (req, res, next) => {
      if (req.method !== 'GET') {
        next();
        return;
      }
      const indexFile = path.join(distDir, 'index.html');
      if (!fs.existsSync(indexFile)) {
        res.status(500).type('text/plain').send('Aplicação não compilada.');
        return;
      }
      res.sendFile(indexFile);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Lavanderia Santa Maria server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
