// Example POST method implementation:
let url="https://infobootkatalizatory.vipserv.org/poznaj_cene/index.php";

const queryString="po=lp&id=617&authenticationwwwId=&tryb=2&tc_css=false&tc_js=false&tc_dane=top20&tc_wyszukiwarka=true&checkSrc=katPage&sessid=&visitorId=";


let priceButton=document.getElementById("price_button");


priceButton.onclick=(e)=>{
  let catIdInput=document.getElementById("cat_id");
  getData(catIdInput.value);
}


function getData(id){
  fetch(url,{
    method: "POST",
    headers: {
      // значение этого заголовка обычно ставится автоматически,
      // в зависимости от тела запроса
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "accept": "application/json, text/javascript, */*; q=0.01"
    },
    body: "po=lp&id="+id+"&tryb=3&tc_dane=top1000&checkSrc=katPage&",
    // или URL с текущего источника
    referer: "https://infobootkatalizatory.vipserv.org/",
    referrerPolicy: "origin-when-cross-origin",
    mode: "cors",
    cache: "no-cache",
    redirect: "follow"
  })
      .then(response=>
          response.json())
      .then((json)=>{
          let list=document.getElementById('list');
          list.innerHTML=JSON.stringify(json);
      });

}

