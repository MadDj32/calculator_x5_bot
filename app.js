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
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.style.opacity = 0;
            });
            
            button.classList.add('active');
            const activeTab = document.getElementById(`${tabName}-premium`);
            activeTab.classList.add('active');
            setTimeout(() => {
                activeTab.style.opacity = 1;
            }, 100);
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
        const positions = parseFloat(document.getElementById('positions').value) || 0;
        const defectRate = parseFloat(document.getElementById('defect-rate').value) || 0;
        const speed = parseFloat(document.getElementById('speed').value) || 0;
        const replacements = parseFloat(document.getElementById('replacements').value) || 0;

        let p2Multiplier = defectRate === 1.1 ? 3 : 2;

        let premium = positions * defectRate * p2Multiplier * speed * replacements;
        premium = Math.round(premium * 1000) / 1000; // Округление до 3 знаков после запятой

        let premiumWithTax = premium * 0.87;
        premiumWithTax = Math.round(premiumWithTax * 1000) / 1000; // Округление до 3 знаков после запятой

        let coefficient = 1 * defectRate * p2Multiplier * speed * replacements;
        coefficient = Math.round(coefficient * 1000) / 1000; // Округление до 3 знаков после запятой

        document.getElementById('new-result').innerHTML = `
            <div style="margin-left: 7px;">ПРЕМИЯ: ${premium.toFixed(3)} (БЕЗ)</div>
            <div style="margin-left: 7px;">ПРЕМИЯ: ${premiumWithTax.toFixed(3)} (С УЧЕТОМ 13%)</div>
            <div style="margin-left: 7px;">КОЭФФИЦИЕНТ: ${coefficient.toFixed(3)}</div>
        `;

        tg.sendData(JSON.stringify({
            action: 'calculate_new_premium',
            result: premium
        }));
    }

    function calculateOldMotivation() {
        const orders = parseFloat(document.getElementById('orders').value) || 0;
        const shifts = parseFloat(document.getElementById('shifts').value) || 0;
        const collectedPositions = parseFloat(document.getElementById('collected-positions').value) || 0;
        const speedCoefficient = parseFloat(document.getElementById('speed-coefficient').value) || 0;
        const correctionCoefficient = parseFloat(document.getElementById('correction-coefficient').value) || 0;

        let k1 = 1.8;
        if (orders / shifts >= 30 && orders / shifts <= 50) {
            k1 = 2.3;
        } else if (orders / shifts > 50 && orders / shifts <= 69.9) {
            k1 = 2.5;
        } else if (orders / shifts > 70) {
            k1 = 3;
        }

        let coefficient = k1 * speedCoefficient * correctionCoefficient;
        coefficient = Math.round(coefficient * 1000) / 1000; // Округление до 3 знаков после запятой

        let premium = coefficient * collectedPositions;
        premium = Math.round(premium * 1000) / 1000; // Округление до 3 знаков после запятой

        let premiumWithTax = premium * 0.87;
        premiumWithTax = Math.round(premiumWithTax * 1000) / 1000; // Округление до 3 знаков после запятой

        document.getElementById('old-result').innerHTML = `
            <div style="margin-left: 7px;">ПРЕМИЯ: ${premium.toFixed(3)} (БЕЗ)</div>
            <div style="margin-left: 7px;">ПРЕМИЯ: ${premiumWithTax.toFixed(3)} (С УЧЕТОМ 13%)</div>
            <div style="margin-left: 7px;">КОЭФФИЦИЕНТ: ${coefficient.toFixed(3)}</div>
        `;
    }

    Telegram.WebApp.onEvent("mainButtonClicked", function(){
        tg.sendData("Кнопка была нажата");
    });
});
