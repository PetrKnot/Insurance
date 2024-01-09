// Globální selektory
const jmenoInput = document.querySelector(".jmenoInput");
const prijmeniInput = document.querySelector(".prijmeniInput");
const vekInput = document.querySelector(".vekInput");
const telefonInput = document.querySelector(".telefonInput");
const emailInput = document.querySelector(".e-mailInput");
const povolaniInput = document.querySelector(".povolaniInput");
const odeslatTlacitko = document.querySelector(".odeslat-tlacitko");
const showRegistrationButton = document.getElementById("show-registration");
const registrationSection = document.getElementById("registration-section");
const evidenceSection = document.querySelector(".evidence-section");
const showEvidence = document.querySelector("#show-evidence");
const showInfoButton = document.getElementById("show-info");

const evidenceContainer = document.getElementById("evidence-container");
const infoSection = document.getElementById("info-section"); // Přidali jsme novou sekci pro informace

const kontaktSection = document.querySelector("#kontakt-section");
const showKontakt = document.querySelector("#show-kontact");

let existujiZaznamy = false;
const zaznamy = [];

// Převedení pole zaznamy na JSON řetězec
const ulozenaZaznamyJSON = localStorage.getItem("zaznamy");

if (ulozenaZaznamyJSON) {
  const ulozenaZaznamy = JSON.parse(ulozenaZaznamyJSON);
  zaznamy.push(...ulozenaZaznamy); // Přidejte načtené záznamy do pole zaznamy
  existujiZaznamy = true; // Nastavte existujiZaznamy na true
  zobrazZaznamy(); // Zobrazte načtené záznamy
} else {
  console.log("Nejsou uloženy žádné záznamy v localStorage.");
}

function zobrazZaznamy() {
  evidenceSection.innerHTML = ""; // Vyprázdnění evidence

  zaznamy.forEach((zaznam, index) => {
    const recordDiv = document.createElement("div");
    recordDiv.classList.add("record");

    const jmenoElement = document.createElement("h4");
    jmenoElement.textContent = "Jméno a příjmení";

    const jmenoPElement = document.createElement("p");
    jmenoPElement.textContent = `${zaznam.jmeno} ${zaznam.prijmeni}`;

    const vekElement = document.createElement("h4");
    vekElement.textContent = "Věk";

    const vekPElement = document.createElement("p");
    vekPElement.textContent = zaznam.vek;

    const telefonElement = document.createElement("h4");
    telefonElement.textContent = "Telefon";

    const telefonPElement = document.createElement("p");
    telefonPElement.textContent = zaznam.telefon;

    const emailElement = document.createElement("h4");
    emailElement.textContent = "E-mail";

    const emailPElement = document.createElement("p");
    emailPElement.textContent = zaznam.email;

    const povolaniElement = document.createElement("h4");
    povolaniElement.textContent = "Povolání";

    const povolaniPElement = document.createElement("p");
    povolaniPElement.textContent = zaznam.povolani;

    const smazatButton = document.createElement("button");
    smazatButton.textContent = "Smazat";
    smazatButton.addEventListener("click", () => {
      // Funkce pro smazání záznamu
      smazatZaznam(index);
    });

    recordDiv.appendChild(jmenoElement);
    recordDiv.appendChild(jmenoPElement);
    recordDiv.appendChild(vekElement);
    recordDiv.appendChild(vekPElement);
    recordDiv.appendChild(telefonElement);
    recordDiv.appendChild(telefonPElement);
    recordDiv.appendChild(emailElement);
    recordDiv.appendChild(emailPElement);
    recordDiv.appendChild(povolaniElement);
    recordDiv.appendChild(povolaniPElement);
    recordDiv.appendChild(smazatButton); // Přidat tlačítko pro smazání do záznamu

    evidenceSection.appendChild(recordDiv);
  });
}

function smazatZaznam(index) {
  zaznamy.splice(index, 1); // Odstranit záznam z pole zaznamy
  zobrazZaznamy(); // Aktualizovat zobrazení evidence

  // Aktualizovat localStorage po smazání
  const zaznamyJSON = JSON.stringify(zaznamy);
  localStorage.setItem("zaznamy", zaznamyJSON);
}

odeslatTlacitko.addEventListener("click", function (e) {
  e.preventDefault();

  const jmeno = jmenoInput.value;
  const prijmeni = prijmeniInput.value;
  const vek = vekInput.value;
  const telefon = telefonInput.value;
  const email = emailInput.value;
  const povolani = povolaniInput.value;

  if (
    jmeno === "" ||
    prijmeni === "" ||
    vek === "" ||
    telefon === "" ||
    email === "" ||
    povolani === ""
  ) {
    alert("Prosím, vyplňte všechny pole.");
    return;
  }

  if (isNaN(vek) || isNaN(telefon)) {
    alert("Věk a telefon musí obsahovat pouze čísla.");
    return;
  }

  const novyZaznam = {
    jmeno: jmeno,
    prijmeni: prijmeni,
    vek: vek,
    telefon: telefon,
    email: email,
    povolani: povolani,
  };

  zaznamy.push(novyZaznam);

  jmenoInput.value = "";
  prijmeniInput.value = "";
  vekInput.value = "";
  telefonInput.value = "";
  emailInput.value = "";
  povolaniInput.value = "";

  evidenceSection.style.display = "none";

  zobrazZaznamy(); // Zobrazte nové záznamy

  // Nastavte proměnnou existujiZaznamy na true
  existujiZaznamy = true;

  // Převedení pole zaznamy na JSON řetězec
  const zaznamyJSON = JSON.stringify(zaznamy);

  // Uložení JSON do localStorage
  localStorage.setItem("zaznamy", zaznamyJSON);
});

// Přidání posluchače na kliknutí na tlačítko "Registrace"
showRegistrationButton.addEventListener("click", function (e) {
  e.preventDefault(); // Zabraňte výchozímu chování odkazu

  // Změňte styl sekce "Registrace" na "block" (zobrazení)
  registrationSection.style.display = "block";
});

showRegistrationButton.addEventListener("click", () => {
  registrationSection.style.display = "block";
  evidenceSection.style.display = "none";
  infoSection.style.display = "none";
  kontaktSection.style.display = "none";
});

showEvidence.addEventListener("click", () => {
  if (existujiZaznamy) {
    registrationSection.style.display = "none";
    evidenceSection.style.display = "block";
    infoSection.style.display = "none";
    kontaktSection.style.display = "none";
  } else {
    alert("Nejsou žádné záznamy k zobrazení.");
  }
});

showInfoButton.addEventListener("click", () => {
  evidenceSection.style.display = "none";
  registrationSection.style.display = "none";
  infoSection.style.display = "block";
  kontaktSection.style.display = "none";
});

// Přidání posluchače na kliknutí na odkaz "Kontakt"
showKontakt.addEventListener("click", () => {
  evidenceSection.style.display = "none";
  registrationSection.style.display = "none";
  infoSection.style.display = "none";
  kontaktSection.style.display = "block";
});
