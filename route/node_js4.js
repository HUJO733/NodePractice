const http = require("http");
const url = require("url");

http
  .createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    // == res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    if (path in urlMap) {
      urlMap[path](req, res);
    } else {
      notFound(req, res);
    }
  })
  .listen("3000", () => console.log("라우터를 만들어"));

const user = (req, res) => {
  res.end(`[user] name : andy, age : 30`);
};

const user1 = (req, res) => {
  res.end(`[user] name : 이이, age : 21`);
};

const user2 = (req, res) => {
  res.end(`[user] name : 아아, age : 28`);
};

const user3 = (req, res) => {
  res.end(`[user] name : bob, age : 31`);
};

const user4 = (req, res) => {
  res.end(`[user] name : sam, age : 25`);
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

const urlMap = {
  // urlMap은 모든 함수들이 사전에 정의되어야하기 때문에 가장 밑에 있어야함
  "/": (req, res) => res.end("home"),
  "/user": user,
  "/user1": user1,
  "/user2": user2,
  "/user3": user3,
  "/user4": user4,
  "/feed": feed,
};
