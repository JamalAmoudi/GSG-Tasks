import http from "http";
import EventEmitter from "events";

const myEmitter = new EventEmitter();

myEmitter.on("requestReceived", (method, url) => {
  console.log(`Event: Request received → ${method} ${url}`);
});

const server = http.createServer((req, res) => {
  myEmitter.emit("requestReceived", req.method, req.url);
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Hello! Your request was logged via EventEmitter.",
      })
    );
  } else if (req.method === "GET" && req.url === "/about") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "This is the about route." }));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Route not found." }));
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
