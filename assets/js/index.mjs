// Example POST method implementation:
let url="https://yandex.ru";//"https://katalizatoroff.ru/wp-admin/admin-ajax.php";

fetch(url,{
  method: "GET", // POST, PUT, DELETE, etc.
  headers: {
    // значение этого заголовка обычно ставится автоматически,
    // в зависимости от тела запроса
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined, // string, FormData, Blob, BufferSource или URLSearchParams
  referrer: "",
  // или URL с текущего источника
  referrerPolicy: "origin-when-cross-origin",
  mode: "cors",
  credentials: "include", // omit, include
  cache: "no-cache",
  redirect: "follow", 
  integrity: "", // контрольная сумма, например "sha256-abcdef1234567890"
  keepalive: false, // true
  window: window // null
})
    .then(response=>
        response.text())
    .then((text)=>
        console.log(text));
  
    /*
  postData("https://katalizatoroff.ru/wp-admin/admin-ajax.php?action=get_projects&paged=10", { "action": "get_projects", "paged": "10"}).then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
  });*/

  //https://katalizatoroff.ru/catalog/#