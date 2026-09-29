// !!! ITT ÁLLÍTSD BE AZ ESKÜVŐ DÁTUMÁT !!!
const weddingDate = new Date("2026-08-29T16:00:00").getTime();

// Megnézzük, hogy az angol vagy a magyar oldalon vagyunk-e
const isEnglish = document.documentElement.lang === "en";

const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Időegységek kiszámítása
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Megjelenítés a HTML-ben
    document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;

    // Ha lejárt az idő
    if (distance < 0) {
        clearInterval(timer);
        
        if (isEnglish) {
            document.querySelector(".container").innerHTML = `
                <h1>Today is the Big Day! 🤍</h1>
                <p class="subtitle">Thank you for celebrating with us!</p>
            `;
        } else {
            document.querySelector(".container").innerHTML = `
                <h1>Ma van a Nagy Nap! 🤍</h1>
                <p class="subtitle">Köszönjük, hogy velünk ünnepeltek!</p>
            `;
        }
    }
}, 1000);