const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector("#msg");
const select=document.querySelector("select");
select.style.maxHeight=`${window.innerHeight}px`;

 for(let select of dropdowns){
    for( let currCode in countryList){
     let newOption=document.createElement("option");
     newOption.innerText=currCode;
     newOption.value=currCode;
     if(select.name==="from" && currCode==="USD"){
        newOption.selected="selected";
     }else if(select.name==="to" && currCode==="INR"){
        newOption.selected="selected";

     }
     select.append(newOption);

    }
  select.addEventListener("change", (evt)=>{
   updateFlag(evt.target);
  });
 }
const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;


    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
   updateExchangeRate();
});
const updateExchangeRate= async()=>{
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value="1";
       
    }

    const fromCurrency = fromCurr.value.toLowerCase();
    const toCurrency = toCurr.value.toLowerCase();
    const URL = `${BASE_URL}/${fromCurrency}.json`;
  
   let response=await fetch(URL);
   let data= await response.json();
  let rate=data[fromCurrency][toCurrency];
  console.log(`conversion rate:${rate}`);
msg.innerText=`${amtVal} ${fromCurr.value}= ${(amtVal*rate).toFixed(2)} ${toCurr.value}`

}
window.addEventListener("load",()=>{
    updateExchangeRate();
})