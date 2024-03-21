// async, await를 적용한 영화 ranking 예제

const axios = require("axios");

async function getTop20Movies() {
    const url = "https://raw.githubusercontent.com/wapj/musthavenodejs/main/movieinfo.json";
    try {
        // 네트워크에서 데이터를 받아오므로 await로 기다림
        const result = await axios.get(url);
        const { data } = result; // 결과값에는 data 프로퍼티가 있음

        if (!data.articleList || data.articleList.size == 0) {
            throw new Error("데이터 없음");
        }
        const movieInfos = data.articleList.map((article, idx) => { // 영화 리스트 데이터 제목과 순위로 분리
            return { title: article.title, rank: idx + 1 };
        });
        for (let movieInfo of movieInfos) {
          // 받은 영화 리스트 정보 출력
          console.log(`[${movieInfo.rank}등] ${movieInfo.title}`);
        }
    } catch (err) {
        console.log("<<에러 발생>>");
        throw new Error(err);       
    }
}

getTop20Movies();