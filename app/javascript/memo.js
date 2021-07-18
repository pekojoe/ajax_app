function post (){
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const form = document.getElementById("form");
    const formData = new FormData(form); //FormDataオブジェクトを使って、フォームの値を取得
    const XHR = new XMLHttpRequest(); //非同期通信を行うためにXMLHttpRequestオブジェクトを生成
    XHR.open("POST", "/posts", true); //リクエストの内容をopen()メソッドで指定
    XHR.responseType = "json"; //サーバーからのレスポンスの形式をJSONに指定
    XHR.send(formData); //フォームに入力された内容をsend()メソッドでサーバー側に送信
  });
};

window.addEventListener('load', post);