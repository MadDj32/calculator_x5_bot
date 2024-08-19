let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#FF8256";

document.addEventListener('DOMContentLoaded', function() {
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
    calculateNewButton.addEventListener('click', calculateNewPremium);
});

function calculateNewPremium() {
    const positions = parseFloat(document.getElementById('positions').value);
    const defectRate = parseFloat(document.getElementById('defect-rate').value);
    const speed = parseFloat(document.getElementById('speed').value);
    const replacements = parseFloat(document.getElementById('replacements').value);

    // Определение второго значения для P2
    let p2SecondValue = defectRate === 1.1 ? 3 : 2;

    // Расчет премии
    let premium = positions * defectRate * p2SecondValue * speed * replacements;

    // Округление до двух знаков после запятой
    premium = Math.round(premium * 100) / 100;

    document.getElementById('new-result').textContent = `ПРЕМИЯ: ${premium.toFixed(2)}`;

    // Отправка данных в Telegram
    tg.sendData(JSON.stringify({
        action: 'calculate_new_premium',
        result: premium
    }));
}

Telegram.WebApp.onEvent("mainButtonClicked", function(){
    tg.sendData("Кнопка была нажата");
});