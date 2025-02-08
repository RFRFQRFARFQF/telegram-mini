// Функция для загрузки TON Connect SDK
async function loadTonConnect() {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/@tonconnect/sdk@latest";
        script.onload = () => {
            console.log("✅ TON Connect SDK загружен!");
            resolve();
        };
        script.onerror = () => {
            console.error("❌ Ошибка загрузки TON Connect SDK!");
            reject();
        };
        document.head.appendChild(script);
    });
}
