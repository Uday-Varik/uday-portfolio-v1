import http from 'node:http';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promises as fs } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const defaultFile = 'index.html';

const mimeTypes = new Map([
  ['.html', 'text/html; charset=UTF-8'],
  ['.js', 'application/javascript; charset=UTF-8'],
  ['.css', 'text/css; charset=UTF-8'],
  ['.json', 'application/json; charset=UTF-8'],
  ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.gif', 'image/gif'],
  ['.ico', 'image/x-icon']
]);

function getContentType(pathname) {
  const index = pathname.lastIndexOf('.');
  if (index === -1) {
    return 'application/octet-stream';
  }

  const extension = pathname.slice(index);
  return mimeTypes.get(extension) ?? 'application/octet-stream';
}

async function readFileSafe(filePath) {
  try {
    const data = await fs.readFile(filePath);
    return { data };
  } catch (error) {
    return { error };
  }
}

function createServer() {
  const port = Number(process.env.PORT ?? 3000);

  return http.createServer(async (req, res) => {
    const requestUrl = new URL(req.url, `http://${req.headers.host}`);
    let pathname = decodeURIComponent(requestUrl.pathname);

    if (pathname.endsWith('/')) {
      pathname = pathname.concat(defaultFile);
    }

    const filePath = resolve(rootDir, `.${pathname}`);

    if (!filePath.startsWith(rootDir)) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('Access denied');
      return;
    }

    const { data, error } = await readFileSafe(filePath);

    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end('Not found');
        return;
      }

      res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('Internal server error');
      return;
    }

    res.writeHead(200, { 'Content-Type': getContentType(filePath) });
    res.end(data);
  }).listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`✅ Dev server running at http://localhost:${port}/app/index.html`);
  });
}

if (import.meta.main) {
  createServer();
}

export { createServer };
