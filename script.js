"use strict";

let balance = document.querySelector(".balance");

let state = "waiting" // cooking, ready

function cookCoffee(price, name, elem) {
  if (state != "waiting") {
    return;
  }
  
  console.log(elem);
  let buttonCup = elem.querySelector("img");
  let cupSrc = buttonCup.src;
  if (balance.value >= price) {
     balance.value -= price;
     balance.style.backgroundColor = ""; // Вернуть белый фон
     changeDisplayText("Ваш " + name + " готовится");
     cup.changeCupImage(cupSrc);
     state = "cooking";
     startCooking (0);
     
  } else {
       changeDisplayText("Недостаточно средств");
       balance.style.backgroundColor = "rgb(255, 50, 50)";
  }
}
  
   function startCooking() {
     if (state != "cooking") {
       return;
     }
   cup.showCup();
   changeProgress(100, 5);
   setTimeout(function () {
     state = "ready";
     changeDisplayText("Ваш кофе готов!");
     cup.toggleActive()
     cup.elem.onclick = function() {
       takeCoffee();
     }
   },5000);
 }
 
  function takeCoffee() {
    if (state != "ready") {
      return;
    }
    state = "waiting";
   changeProgress(0);
   cup.hideCup();
   changeDisplayText("Выберите кофе!");
   cup.toggleActive();
 }


 // Планирование
/* let timeout = setTimeout(function( )
{ change displayText);
}

*/

let cup = {
  elem:document.querySelector(".cup"),
  
  changeCupImage(src) { // this
    let cupImage = cup.elem.querySelector(".cup img");
    cupImage.src = src; 
 },
 
   showCup() {
    cup.elem.style.display = "block";
    cup.elem.style.transition = "opacity 5s";
    setTimeout(function() {
     cup.elem.style.opacity = "1";
   }, 10);
 },
 
 hideCup() {
   cup.elem.style.display = "none";
   cup.elem.style.opacity = "0";
 },
 
 toggleActive() {
   cup.elem.classList.toggle("pointer")
 }
};



 
 

 function changeBox(src) {
   let cup = document.querySelector(".cup.img");
   cupImage.src = src;
   changeCupImage('img/10rub.png')
 }
 
  function changeProgress(percent, sec = 1) {
    let progress = document.querySelector(".progress-bar");
    progress.style.width = percent + "%";
    progress.style.transition = `width ${sec}s`;
 }
 
 
 function changeDisplayText(text) {
   let displayText = document.querySelector(".display-text");
   if (text.lendth > 25) {
   
   displayText.innerHTML = text.slice(0, 25) + "...";
   
 }  else {
     displayText.innerHTML = text;
   }
 }
 
 
 
 // Drag'n'Drop
 
 let bills = document.querySelectorAll(".money img");
 
 for (let bill of bills) {
   bill.onmousedown = dragMoney;
 } 
 
 function dragMoney(event) { //Все слушатели события возвращают в функцию первым параметром
   console.log(event); // Получаем объект события
   console.log([event.clientX, event.clientY]); // Получаем координаты мыши
   console.log( this.getBoundingClientRect() ); // Получаем координаты элемента
   event.preventDefault() // Остановить стандартное событие
   let bill = this;
   let billCoords = bill.getBoundingClientRect();
   let billWidth = billCoords.width;
   let billHeight = billCoords.height;
   bill.style.position = "absolute";
   bill.style.transform = "rotate(90deg)";
   bill.style.top = event.clientY - billHeight/2 + "px";
   bill.style.left = event.clientX - billWidth/2 + "px";
   
   window.onmousemove = function(event) {
   /*     let billCoords = bill.getBoundingClientRect();
        let billWidth = billCoords.width;
        let billHeight = billCoords.height; */
        bill.style.top = event.clientY - billHeight/2 + "px";
        bill.style.left = event.clientX - billWidth/2 + "px";
   }
   
   bill.onmouseup = function() {
     if ( inAtm(bill) ) {
       let cost = +bill.getAttribute("cost"); // Получаем собственный атрибут cost
        balance.value = +balance.value + cost; // Прибавляем к балансу
       eatBill(bill); // Удаляем купюру
     } else {
     bill.style.transform = "rotate(0deg)";
     }
   } 
}
 
 function eatBill() {
   let cashCatcher = document.querySelector(".cash-catcher");
   cashCatcher.append(bill)
   bill.style.position = "";
   bill.style.transition = "transform 3s";
   bill.style.transform = "translateY(50%) rotate(90deg)";
   setTimeout(function() {
     bill.style.transform = "translateY(-200%) rotate(90deg)";
   }, 10);
   
 }
 
 function inAtm(bill) {
   
   let atm = document.querySelector(".atm img");
   
   let atmCoords = atm.getBoundingClientRect();
   let atmWidth = atmCoords.width;
   let atmHeight = atmCoords.height;
   
   let billCoords = bill.getBoundingClientRect();
   let billHeight = billCoords.height;
   let billWidth = billCoords.width;
   
   let atmLeftX = atmCoords.x;
   let atmTopY = atmCoords.y;
   let atmRightX = atmLeftX + atmWidth;
   let atmBottomY = atmTopY + atmHeight/3;
   
   let billLeftX = billCoords.x;
   let billRightX = billCoords.x + billCoords.width;
   let billY = billCoords.y;
   
   console.log([atmLeftX, atmTopY, atmRightX, atmBottomY]);
   console.log([billCoords.x, billCoords.y]);
   
   if (billLeftX > atmLeftX
      && billRightX < atmRightX
      && billY > atmTopY
      && billY < atmBottomY
    ) {
     return true
   } else {
     return false
   }
} 
 
 
 // Получение сдачи
 
 let changeBtn = document.querySelector(".change-btn");
 changeBtn.onclick = function() {
   takeChange();
 };
 
 function takeChange() {
   if (balance.value >= 10) {
     balance.value -= 10;
     creatCoin("10");
     setTimeout(function() {
       takeChange();
     }, 300); // Рекурсивная функция - функция, вызывающая саму себя
   } else if(balance.value >= 5) {
     balance.value -= 5;
     creatCoin("5");
     setTimeout(function() {
       takeChange();
     }, 300);
   } else if(balance.value >= 2) {
     balance.value -= 2;
     creatCoin("2");
     setTimeout(function() {
       takeChange();
     }, 300);
   } else if(balance.value >= 1) {
     balance.value -= 1;
     creatCoin("1");
     setTimeout(function() {
       takeChange();
     }, 300);
   }
   
 }
 
 
 
 
 
 
 
 
 
 
 
 function creatCoin(nominal) { // "1", "2", "5", "10"
   
   let imageSrc = "";
   switch (nominal) {
     case "1":
       imageSrc = "img/1rub.png";
       break;
     case "2":
       imageSrc = "img/2rub.png";
       break;
     case "5":
       imageSrc = "img/5rub.png";
       break;
     case "10":
       imageSrc = "img/10rub.png";
       break;
   }
   
   let changeBox = document.querySelector(".change-box")
   let changeBoxCoords = changeBox.getBoundingClientRect();
   let changeBoxWidth = changeBoxCoords.width; 
   let changeBoxHeight = changeBoxCoords.height;
   console.log([changeBoxWidth, changeBoxHeight]);
   // changeBox.innerHTML += `<img src="${imageSrc}" style="width: 50px">`
   
   let coin = document.createElement("img");
   coin.src = imageSrc;
   coin.style.cursor = "pointer";
   coin.style.userSelect = "none";
   coin.style.width = "30px";
   coin.style.position = "absolute";
   coin.style.opacity = 0;
   coin.style.transform = "translateY (-75%)"
   coin.style.transition = "opacity .5s, transform .5s"
   coin.style.top = getRandomInt(0, changeBoxHeight - 33) + "px";
   coin.style.left = getRandomInt(0, changeBoxWidth - 33) + "px";
   
   setTimeout (function() {
     coin.style.opacity = 1;
     coin.style.transform = "translateY(0%)";
   }, 10);
   
   changeBox.append(coin);
   coin.onclick = function() {
     coin.remove();
   };
   
   let coinDropSound = new Audio("Sound/coinDrop.mp3"); // Создаем объект Audio
   coinDropSound.play(); // Проигрывание Audio
   coinDropSound.volume = 0.05;
   // coinDropSound.pause(); // Приостановить проигрывание
   // coinDropSound.currentTime = 0 // Перемотать в начало
   
   
   //node.append(...nodes or strings) – добавляет узлы или строки в конец node,
   //node.prepend(...nodes or strings) – вставляет узлы или строки в начало node,
   //node.before(...nodes or strings) –- вставляет узлы или строки до node,
   //node.after(...nodes or strings) –- вставляет узлы или строки после node,
   //node.replaceWith(...nodes or strings) –- заменяет node заданными узлами или строками.
   
 }
 
 function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 