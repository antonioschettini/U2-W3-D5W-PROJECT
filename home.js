const footerYear = function () {
  const span = document.getElementById("year");
  span.innerText = new Date().getFullYear();
};
footerYear();
