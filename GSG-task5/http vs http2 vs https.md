-- HTTP VS. HTTP/2 VS. HTTP

- What is the purpose of each module?

  1- HTTP for building basic web servers , Enables creating HTTP servers and making HTTP requests.

  2- HTTPS just like http but it adds TLS/SSL encryption by secures the connection between a visitor's browser and the web server, ensuring data is encrypted and protected from intermediary actions.

  3- HTTP/2 allows for multiplexing (requesting multiple files at the same time). This significantly improves both site performance and server efficiency.

- Key technical differences between HTTP/1.1 and HTTP/2 ?

  The key technical differences between HTTP/1.1 and HTTP/2 primarily revolve around performance, efficiency, and how data is transmitted.

- When to use each module in a real-world application ?

  we can use http when we creat a basic REST api while https for more public API with data .
  but http/2 for APIs that dealing with files (server push) and stream reuse .
