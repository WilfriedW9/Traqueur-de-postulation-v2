document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:4006/getAll")
    .then((response) => response.json())
    .then((data) => console.log(data));
  loadHTMLTable([]);
});

function loadHTMLTable(data) {
  if (data.length === 0) {
    console.log("No data is available");
  }
}
