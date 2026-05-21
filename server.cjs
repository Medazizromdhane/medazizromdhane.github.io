const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json; charset=utf-8"
};

http
  .createServer((request, response) => {
    const url = new URL(request.url, `http://localhost:${port}`);
    const cleanPath = decodeURIComponent(url.pathname).replace(/^\/+/, "");
    const target = path.join(root, cleanPath || "index.html");
    if (!target.startsWith(root)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }
    const file = fs.existsSync(target) && fs.statSync(target).isFile() ? target : path.join(root, "index.html");
    response.writeHead(200, {
      "content-type": types[path.extname(file)] || "application/octet-stream",
      "cache-control": "no-store"
    });
    fs.createReadStream(file).pipe(response);
  })
  .listen(port, () => {
    console.log(`Chess8an running at http://localhost:${port}`);
  });
