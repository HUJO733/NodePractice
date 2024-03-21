// 동적 응답 : 사용자의 응답에 따라 페이지가 표시하는 컨텐츠가 달라짐

const http = require("http");
const url = require("url");

http
  .createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    res.statusCode = 200;
    res.setHeader("content-Type", "text/html; charset=utf-8");

    if (path === "/user") {
      user(req, res);
    } else if (path === "/feed") {
      feed(req, res);
    } else {
      notFound(req, res);
    }
  })
  .listen("3000", () => console.log("라우터를 만들어"));

const user = (req, res) => {
  const userInfo = url.parse(req.url, true).query; // 쿼리스트링 데이터를 userInfo 변수에 할당
  res.end(`[user] name : ${userInfo.name}, age : ${userInfo.age}`);
};

const feed = (req, res) => {
  res.end(`<ul>
    <li>picture1</li>
    <li>picture2</li>
    <li>picture3</li>
    </ul>`);
};

const notFound = (req, res) => {
  res.statusCode = 404;
  res.end("404 page not found");
};
