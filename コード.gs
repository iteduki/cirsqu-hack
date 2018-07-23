function login() {
  var url = "https://www.c-sqr.net/loginform.php";
  
  var payload = {
    "c_action" : "login",
    "pass" : "",
    "account" : "", 　　// サースクアカウント
    "password" : "",　　// サースクパスワード
    "AUTO_LOGIN_FLAG" : 1
  };
  
  // POSTオプション
  var options = {
    "method" : "POST",
    "payload" : payload,
    "followRedirects" : false
  };
  
  // レスポンスヘッダーからcookieを取得
  var response = UrlFetchApp.fetch(url, options).getAllHeaders()["Set-Cookie"];
  
  var cookies = [];
  for(var i = 0; i < response.length; i++){
    cookies.push(response[i].split(";")[0]);
  }
  
  // ログインで認証されたcookieはヘッダーで使用
  var headers = { Cookie: cookies.join(";")};
  options = {
    method : "get",
    headers : headers,
    followRedirects: true, //リダイレクトあり
  };
  
  var topUrl = "https://www.c-sqr.net/";
  response = UrlFetchApp.fetch(topUrl, options);
  var content = response.getContentText("UTF-8");
  
  return content;
  
}
