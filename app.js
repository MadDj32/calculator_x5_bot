let tg = window.Telegram.WebApp;

   tg.expand();

   tg.MainButton.textColor = "#FFFFFF";
   tg.MainButton.color = "#2cab37";

   let mainButton = document.getElementById("mainButton");

   mainButton.addEventListener("click", function(){
       if (tg.MainButton.isVisible) {
           tg.MainButton.hide();
       } else {
           tg.MainButton.setText("Спасибо за нажатие!");
           tg.MainButton.show();
       }
   });

   Telegram.WebApp.onEvent("mainButtonClicked", function(){
       tg.sendData("Кнопка была нажата");
   });