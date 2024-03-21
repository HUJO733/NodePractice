// http 객체 생성 require 함수는 모듈을 읽어오는 함수
// http 모듈을 불러와서 http 변수에 저장
const http = require("http");
let count = 0;

// createServer는 서버인스턴스를 만드는 함수
// 인수로 콜백 함수를 받는데 이 콜백 함수는 요청(req)과 응답(res) 객체를 인수로 받음
const server = http.createServer((req, res) => {
  log(count); // count 1증가 (요청에 대한 로그를 간단히 남김)
  res.statusCode = 200; // 상태 코드를 의미 200은 정상 작동을 의미함

  // 요청, 응답에 대한 부가 정보. 컨텐츠 타입을 언급하고
  // 뒤에 컨텐츠의 종류 기록. "text/plain"는 텍스트를 평문으로 해석하겠다는 의미
  // "text/html" 이라면 텍스트를 html문서로 해석하겠다는 의미
  res.setHeader("Content-Type", "text/plain");
  res.write("hello\n"); // 응답으로 hello\n을 보여줌
  setTimeout(() => {
    res.end("Node.js"); // 2초 후에 Node.js 출력
  }, 2000);
});

function log(count) {
  console.log((count += 1));
}

// 8000번 포트를 사용하여 서버 실행. 서버 실행되면 "hello Node.js" 메세지 출력
server.listen(8000, () => console.log("hello Node.js"));
