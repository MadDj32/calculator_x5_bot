document.addEventListener('DOMContentLoaded', function() {
    let tg = window.Telegram.WebApp;

    tg.expand();

    tg.MainButton.textColor = "#000000";
    tg.MainButton.color = "#FF8256";

    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(`${tabName}-premium`).classList.add('active');
        });
    });

    const calculateNewButton = document.getElementById('calculate-new');
    if (calculateNewButton) {
        calculateNewButton.addEventListener('click', calculateNewPremium);
    }

    const calculateOldButton = document.getElementById('calculate-old');
    if (calculateOldButton) {
        calculateOldButton.addEventListener('click', calculateOldMotivation);
    }

    function calculateNewPremium() {
        // ...
    }

    function calculateOldMotivation() {
        // ...
    }

    Telegram.WebApp.onEvent("mainButtonClicked", function(){
        tg.sendData("Кнопка была нажата");
    });
});
