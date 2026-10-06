const osszesKepSzama = 155; 
const imageGrid = document.querySelector('.image-grid');
imageGrid.innerHTML = '';

// Lightbox elemek kijelölése
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let aktualisIndex = 1; // Eltároljuk, hogy hányadik képen vagyunk

// Ciklussal legeneráljuk a képeket
for (let i = 1; i <= osszesKepSzama; i++) {
    const kepUrl = `../kepek/eskuvoi (${i}).jpg`; 

    const kepElem = document.createElement('div');
    kepElem.className = 'image-item';
    kepElem.innerHTML = `
        <img src="${kepUrl}" alt="Esküvői fotó ${i}" loading="lazy">
    `;

    // Kattintás a kisképre
    const imgElement = kepElem.querySelector('img');
    imgElement.addEventListener('click', () => {
        kepMegnyitasa(i);
    });

    imageGrid.appendChild(kepElem);
}

// Kép megnyitása index alapján
function kepMegnyitasa(index) {
    aktualisIndex = index;
    lightboxImg.src = `../kepek/eskuvoi (${aktualisIndex}).jpg`;
    lightbox.classList.add('active');
}

// Következő kép funkció (körbejár: ha az utolsónál vagyunk, az elsőre ugrik)
function kovetkezoKep() {
    aktualisIndex = (aktualisIndex % osszesKepSzama) + 1;
    lightboxImg.src = `../kepek/eskuvoi (${aktualisIndex}).jpg`;
}

// Előző kép funkció
function elozoKep() {
    aktualisIndex = aktualisIndex === 1 ? osszesKepSzama : aktualisIndex - 1;
    lightboxImg.src = `../kepek/eskuvoi (${aktualisIndex}).jpg`;
}

// Nyilakra kattintás események
nextBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Megakadályozza a lightbox bezárását
    kovetkezoKep();
});

prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    elozoKep();
});

// Bezárás gomb
closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

// Bezárás ha a háttérre kattint
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});

// Billentyűzet kezelése (ESC = bezárás, Bal/Jobb nyíl = léptetés)
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
        lightbox.classList.remove('active');
    } else if (e.key === 'ArrowRight') {
        kovetkezoKep();
    } else if (e.key === 'ArrowLeft') {
        elozoKep();
    }
});

let feltoltottFajlokSzama = 0;
let toastTimeout;

// Segédfüggvény a lebegő üzenet megjelenítéséhez
function showToast(uzenet) {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;

    toast.textContent = uzenet;
    toast.classList.add('show');

    // Ha egymás után többször futna le, töröljük az előző időzítőt
    clearTimeout(toastTimeout);

    // 10 másodperc (10000 ms) múlva eltüntetjük az üzenetet
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 10000);
}

const myWidget = cloudinary.createUploadWidget({
    cloudName: 'qjpbmone', 
    uploadPreset: 'Wedding',
    sources: ['local', 'camera'],
    multiple: true,
    maxFiles: 20,
    clientAllowedFormats: ['image', 'video']
}, (error, result) => { 
    if (error) {
        console.error('Hiba történt a feltöltés során:', error);
        return;
    }

    if (result && result.event === "success") { 
        feltoltottFajlokSzama++;
    }

    if (result && result.event === "close") {
        if (feltoltottFajlokSzama > 0) {
            // alert helyett az új lebegő üzenetet hívjuk meg
            showToast(`Köszönjük! 🤍`);
            feltoltottFajlokSzama = 0;
        }
    }
});

document.getElementById("upload_widget").addEventListener("click", function(){
    myWidget.open();
}, false);