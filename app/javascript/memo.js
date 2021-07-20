const buildHTML = (XHR) => {
  const item = XHR.response.post; //レスポンスの中から投稿されたメモの情報を抽出し、変数itemに格納
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;  //item内に格納されたメモの情報を元にして、ブラウザに描画するためのHTMLを生成し、変数htmlに格納
  return html;
};


function post (){
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const form = document.getElementById("form");
    const formData = new FormData(form); //FormDataオブジェクトを使って、フォームの値を取得し、Ajaxで送信できる形へと整形
    const XHR = new XMLHttpRequest(); //非同期通信を行うためにXMLHttpRequestオブジェクトを生成
    XHR.open("POST", "/posts", true); //リクエストの内容をopen()メソッドで指定
    XHR.responseType = "json"; //サーバーからのレスポンスの形式をJSONに指定
    XHR.send(formData); //フォームに入力された内容をsend()メソッドでサーバー側に送信
    XHR.onload = () => {  //onloadプロパティで、リクエストの送信に成功したときに行う処理を定義
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const list = document.getElementById("list"); //新しいメモを挿入するための要素を取得して、変数listに格納
      const formText = document.getElementById("content");
      list.insertAdjacentHTML("afterend", buildHTML(XHR)); //変数listに格納された要素の直後に生成したHTMLを挿入
      formText.value = "";
    };
  });
};

window.addEventListener('load', post);