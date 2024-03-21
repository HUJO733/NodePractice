const express = require("express");

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.set({ "Content-Type": "text/html; charset=utf-8" });
  res.end("express~");
});

app.listen(port, () => {
  // 서버를 켜서 클라이언트 요청 기다림
  console.log(`서버를 구동하라 : use ${port}`);
});
