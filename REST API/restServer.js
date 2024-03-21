const http = require("http"); // http 모듈을 가져옵니다
const fs = require("fs").promises; // fs 모듈 파일시스템 모듈

// 데이터 저장용 객체
// [], {} 차이점 ==> [] 데이터 자체만 들가고 {} 데이터에 대한 key값이 포함된다.
const users = {};

http.createServer(async (req, res) => {
  try {
    if (req.method === "GET") {
      //GET 요청처리
      if (req.url === "/") {
        const data = await fs.readFile("./restFront.html");
        res.writeHead(200, { "Content-Type": "text/html; charset = utf-8" });
        return res.end(data);
      } else if (req.url === "/about") {
        const data = await fs.readFile("./about.html");
        res.writeHead(200, { "Content-Type": "text/html; charset = utf-8" });
        return res.end(data);
      } else if (req.url === "/users") {
        res.writeHead(200, {
          "Content-Type": "application/json; charset = utf-8",
        });
        // 사용자 데이터를 json 형태로 응답해야한다는 명령어이다
        return res.end(JSON.stringify(users));
      } else {
        try {
          // 기타 경로요청에 대한 처리
          const data = await fs.readFile(`.${req.url}`);
          return res.end(data);
        } catch (err) {
          res.writeHead(404); // 위의 조건에 해당하지 않으면 404 Not Found 응답
          return res.end("NOT FOUND");
        }
      }
    } else if (req.method === "POST") {
      if (req.url === "/user") {
        let body = "";
        req.on("data", (data) => {
          body += data;
        });
        // 요청의 body데이터를 모두 받은 후 아래를 실행
        return req.on("end", () => {
          console.log("post 본문(body):", body);
          // 받은 데이터는 json형식이므로 json형식의 데이터를 파싱(해석) 사용자 이름을 추출함
          const { name } = JSON.parse(body);
          const id = Date.now();
          users[id] = name;
          res.writeHead(201, { "Content-Type": "text/plain; charset = utf-8" });
          res.end("ok");
        });
      }
    } else if (req.method === "PUT") {
      if (req.url.startsWith("/user/")) {
        const key = req.url.split("/")[2]; // 경로에서 사용자 키 추출
        let body = "";
        req.on("data", (data) => {
          body += data;
        });
        return req.on("end", () => {
          console.log("put 본문:", body);
          users[key] = JSON.parse(body).name;
          res.writeHead(200, { "Content-Type": "text/plain; charset = utf-8" });
          return res.end("ok");
        });
      }
    } 
    else if (req.method === "DELETE") {
        if (req.url.startsWith("/user/")) {
            const key = req.url.split("/")[2];
            delete users[key];
            res.writeHead(200, { "Content-Type": "text/plain; charset = utf-8" });
            return res.end("ok");
        }
    }
    res.writeHead(404); // 위의 조건에 해당하지 않으면 404 Not Found 응답
    return res.end("NOT FOUND");
  } catch (err) {
    console.error(err);
    res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8' });
        res.end(err.message);
  }
})
.listen(8082, () => {
    console.log('8082번 포트에서 서버 대기중 ^^')
});
