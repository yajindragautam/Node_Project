const http = require("http");
const https = require("https");
const url = require("url");

const server = https.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write("<h1>Hello Yajindra</h1>");
  response.end();
});

const port = 8000;
server.listen(port, () => {
  console.log("Server is running at port 8000");
});
