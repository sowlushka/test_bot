
import {CatInfo} from './classes/CatInfo.mjs'
const cats=[];//Массив автокатализаторных объектов

// Example POST method implementation:
let urlPrice="https://infobootkatalizatory.vipserv.org/poznaj_cene/index.php";

//Исхдный запрос сайта
const queryString="po=lp&id=617&authenticationwwwId=&tryb=2&tc_css=false&tc_js=false&tc_dane=top20&tc_wyszukiwarka=true&checkSrc=katPage&sessid=&visitorId=";


let priceButton=document.getElementById("price_button");
let getAllButton=document.getElementById("getAll_button");


priceButton.onclick=(e)=>{
  let catIdInput=document.getElementById("cat_id");
  getData(catIdInput.value);
}

getAllButton.onclick=e=>{
  console.clear();
  collectCatalysts().then(()=>{
    let list=document.getElementById('list');
          let node=`<div>Начинаем сортировку.</div>
                    <div>Имеется ${cats.length} объектов
                    <br><br>`;
          list.insertAdjacentHTML('beforeend',node);
    let catsSorted=[];
    for(let i=0;i<cats.length-1;++i){
      let minId=cats[i].id;
      let minIndex=i;
      for(let j=i+1;j<cats.length;++j){
        if(minId>cats[j].id){
          minIndex=j;
          minId=cats[j].id;
        }
      }
      catsSorted.push(cats[minIndex]);
      if(minIndex<cats.length-1){
        cats[minIndex]=cats.pop();
      }
    }
    //console.log(cats);
    console.log(catsSorted);
  });
  
  

  
}


function getData(id){
  fetch(urlPrice,{
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

async function getCatSerials(str){
//На входе функции поисковая строка
  fetch('https://infobootkatalizatory.vipserv.org/search/search',{
    method: "POST",
    headers: {
      // значение этого заголовка обычно ставится автоматически,
      // в зависимости от тела запроса
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "accept": "*/*"
    },
    body: "szukaj="+encodeURIComponent(str)+"&template=mobile&brand=all",
    // или URL с текущего источника
    referer: "https://infobootkatalizatory.vipserv.org/",
    referrerPolicy: "origin-when-cross-origin",
    mode: "cors",
    cache: "no-cache",
    redirect: "follow"
  })
      .then(response=>
          response.text())
      .then((text)=>{
          
          //Парсим информацию о катализаторах
          let catArr=text.split("cm_katalizator_itm");
          for(let i=1;i<catArr.length;++i){
          //Собираем информацию о катализаторах
            let id=catArr[i].match(/(?<=pokaz_cene_mobile\()\d+/)?.[0];
            if(!id)continue;
            let serial=catArr[i].match(/(?<=cm_kat_link[^>]*>)(.*?)(?=<\/a>)/)[0].replaceAll("<b>","").replaceAll("</b>","");
            let brand=catArr[i].split("</tr>")[0].split("<td")[2].match(/(?<=>).*?(?=<)/)[0];
            let url=catArr[i].match(/(?<=cm_kat_link.*?href=").*?(?=")/)[0];
            let img=catArr[i].match(/href=".*?\.jpe?g/)
            if (img)img=img[0].replace('href="',"").replace("width300","width1600");
            const metalls={};
            metalls.pt=catArr[i].match(/(?<=Zawiera metale.+?)PT/)?true:false;
            metalls.pd=catArr[i].match(/(?<=Zawiera metale.+?)PD/)?true:false;
            metalls.rh=catArr[i].match(/(?<=Zawiera metale.+?)RH/)?true:false;
            let newCat=new CatInfo(Number(id),brand,serial,url,img,undefined,undefined,metalls,undefined);
            if (cats.every(cat=>cat.id!=newCat.id)){
              cats.push(newCat);
            }
          }
          let list=document.getElementById('list');
          let node=`<div>Выполнен fetch ${str}</div>
                    <div>Получено ${cats.length} объектов
                    <br><br>`;
          list.insertAdjacentHTML('beforeend',node);

      });
}

async function collectCatalysts(){
  for(let i="0".codePointAt(0);i<="1".codePointAt(0);++i){
    for(let j="0".charCodeAt(0);j<="1".codePointAt(0);++j){
      await getCatSerials(String.fromCharCode(i)+String.fromCharCode(j));
    }
  }
}