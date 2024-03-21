// axios 라이브러리 사용하여 프라미스 API 활용

const axios = require("axios");
const url = "https://raw.githubusercontent.com/wapj/musthavenodejs/main/movieinfo.json";

axios
  .get(url)
  .then((result) => { // get요청 후 정상 작동 시 결과값 처리
    if (result.status != 200) {
      throw new Error("요청 실패"); // 상태가 200(정상)이 아니면 에러 출력
    }
    if (result.data) {
      return result.data; // result.data가 있으면 결과 반환
    }
    throw new Error("데이터 없음");
  })
  .then((data) => {
    if (!data.articleList || data.articleList.size == 0) {
      throw new Error("데이터 없음");
    }
    return data.articleList;
  })
  .then((articles) => {
    return articles.map((article, idx) => { // 영화 리스트 데이터 제목과 순위로 분리
      return { title: article.title, rank: idx + 1 };
    });
  })
  .then((results) => {
    for (let movieInfo of results) { // 받은 영화 리스트 정보 출력
      console.log(`[${movieInfo.rank}등] ${movieInfo.title}`);
    }
  })
  .catch((err) => {
    console.log("<<에러 발생>>");
    console.error(err);
  });
