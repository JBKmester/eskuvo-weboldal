// Add meg, hány darab kép van összesen a mappában
const osszesKepSzama = 33; 

const imageGrid = document.querySelector('.image-grid');
// Kiürítjük a HTML-ben lévő placeholder dobozokat
imageGrid.innerHTML = '';

// Ciklussal legeneráljuk a HTML-t az összes képnek
for (let i = 1; i <= osszesKepSzama; i++) {
    // Feltételezzük, hogy a képek a "kepek" mappában vannak pl. foto_1.jpg néven
    const kepUrl = `../kepek/DB_jegyes (${i}).jpg`; 

    const kepElem = document.createElement('div');
    kepElem.className = 'image-item';
    kepElem.innerHTML = `
        <img src="${kepUrl}" alt="Esküvői fotó ${i}" loading="lazy">
    `;

    imageGrid.appendChild(kepElem);
}