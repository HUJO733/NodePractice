const http = require("http");
const url = require("url");

http
  .createServer((req, res) => {
    //url 모듈을 사용하여 요청으로 받은 url의 pathname을 얻어냄
    // pathname이란 localhost:3000/user 일 경우
    // /user가 pathname이 됨
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    // /user로 요청이 온 경우
    if (path === "/user") {
      res.end("[user] name : andy, age : 30");
    } else if (path === "/feed") {
      res.end(`<ul>
    <li>picture1</li>
    <li>picture2</li>
    <li>picture3</li>
    </ul>`);
    } else {
      res.statusCode = 404;
      res.end("404 page not found");
    }
  })
  .listen("3000", () => console.log("라우터를 만들어 봅시다"));
