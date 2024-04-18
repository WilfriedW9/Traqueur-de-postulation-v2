// Récupération élémenents DOM
const board = document.querySelector(".board");
const formToggleBtn = document.querySelector("#toggleForm");
const candidatureCount = document.querySelector("#candidatureCount");
const form = document.querySelector("form");

// Model candidature
class Candidature {
  constructor(
    nomEntreprise,
    stack,
    website,
    date_postulation,
    poste,
    interet,
    posteDesc,
    reponse,
    candidatureID
  ) {
    this.nomEntreprise = nomEntreprise;
    this.date_postulation = date_postulation;
    this.reponse = false;
    this.interet = interet;
    this.poste = poste;
    this.posteDesc = posteDesc;
    this.stack = stack;
    this.website = website;
  }
}


const database = [];

database.forEach((candidature) => {
  ajouterCandidature()
})

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const formValues = [];
  for (const [key, value] of formData) {
    formValues.push(value);
  }
  const candidature = new Candidature(...formValues);
  database.push(candidature);
  console.log(database);
  ajouterCandidature() 
  
});


formToggleBtn.addEventListener("click", (e) => {
  form.classList.toggle("hidden");
  form.classList.toggle("visible");
  form.classList.contains("hidden")
    ? (formToggleBtn.innerText = "+")
    : (formToggleBtn.innerText = "-");
});

function ajouterCandidature() {
  candidatureCount.innerText = database.length
  const derniereCandidature = database[database.length-1]
  const newElement = document.createElement("div");
  const deleteBtn = document.createElement("button")
  deleteBtn.className = "deleteCandidature"
  deleteBtn.innerText = "X"
  newElement.className = "row"
  newElement.insertAdjacentHTML("beforeend", `
  <div>${derniereCandidature.nomEntreprise}</div>
  <div>${derniereCandidature.stack}</div>
  <div>${derniereCandidature.website}</div>
  <div>${derniereCandidature.date_postulation.split("").slice(0, 10).join("")}</div>
  <div>${derniereCandidature.poste}</div>
  <div>${derniereCandidature.interet}</div>
  <div>${derniereCandidature.posteDesc}</div>

  `)
  newElement.appendChild(deleteBtn)
  board.appendChild(newElement)
  form.reset();
}


// TODO: Mettre en place la suppression spécifique des candidatures par ID
board.addEventListener("click", (e)=> {
  if(e.target.className === "deleteCandidature"){
    database.pop()
    e.target.parentElement.remove()
    console.log(database)
    candidatureCount.innerText = database.length
  }
})

const URL_CANDIDATURES = "http://localhost:5001/candidatures"

fetch(URL_CANDIDATURES)
  .then(response => response.json())
  .then((data) => {
    
    data.forEach((entry) => {
      database.push(entry)
      ajouterCandidature()
    })
  })

