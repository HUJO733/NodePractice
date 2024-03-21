// getUser라는 함수를 정의해서 함수 내의 내용을 try 구문으로 
// 내가 필요한 내용을 시도해 봅니다.
//

async function getUser() {
  try {
    //사용자 정보를 서버에서 가져옵니다.
    const res = await axios.get("/users");
    //서버응답에서 사용자 데이터를 추출합니다
    const users = res.data; 
    //화면에서 사용자 리스트를 표시할 요소를 찾습니다
    const list = document.getElementById("list");
    //리스트를 초기화 합니다.
    list.innerHTML = "";

    // 각 사용자에 대해 반복적으로 화면에 표시하고 이벤트를 연결합니다.
    Object.keys(users).map(function (key) {
      // 사용자 정보를 표시할 태그 요소 생성
      const userDiv = document.createElement("div");
      const span = document.createElement("span");
      span.textContent = users[key]; // span에 사용자 이름 설정

      // 수정버튼 관련 코드
      const edit = document.createElement("button");
      edit.textContent = "수정"; //버튼에 대한 텍스트 설정
      edit.addEventListener("click", async () => {
        const name = prompt("바꿀 이름을 입력하세요");
        if (!name) {
          return alert("이름을 반드시 입력해야 합니다");
        }
        try {
          //서버로 수정된 이름을 전송하여 사용자 정보를 업데이트 합니다.
          await axios.put("/user/" + key, { name });
          // 정보 수정 후 사용자 정보를 다시 가져옵니다.
          getUser();
        } catch (err) {
          console.error(err);
        }
      });
      // 삭제버튼을 생성합니다.
      const remove = document.createElement("button");
      remove.textContent = "삭제";
      remove.addEventListener("click", async () => {
        try {
          await axios.delete("/user/" + key);
          getUser();
        } catch (err) {
          console.error(err);
        }
      });
      // 생성한 요소들을 사용자 리스트에 추가하기
      userDiv.appendChild(span);
      userDiv.appendChild(edit);
      userDiv.appendChild(remove);
      list.appendChild(userDiv);
      //서버에서 받은 사용자 데이터를 콘솔에 출력합니다.
      console.log(res.data);
    });
  } catch (err) {
    console.error(err);
  }
}

window.onload = getUser;

document.getElementById('form').addEventListener('submit', async (e) =>{
    e.preventDefault();
    // 폼에서 입력한 사용자 이름을 가져와서 name이란 변수에 저장
    const name = e.target.username.value;
    if (!name) {
        return alert('이름을 입력하세요!~')
    }
    try{
        // 서버로 사용자 정보를 전송합니다.
        await axios.post('/user', {name});
        getUser();
    }
    catch (err) {
        console.error(err);
    }
    // 입력필드를 초기화 합니다
    e.target.username.value = '';
});