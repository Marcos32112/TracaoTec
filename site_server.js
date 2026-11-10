const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let f = path.join(process.cwd(), req.url === '/' ? 'index.html' : '.' + req.url);
  fs.stat(f, (err, stat) => {
    if (err || !stat.isFile()) { res.writeHead(404); return res.end('Not found'); }
    fs.createReadStream(f).pipe(res);
  });
});

server.listen(8080, () => console.log('running at http://127.0.0.1:8080'));