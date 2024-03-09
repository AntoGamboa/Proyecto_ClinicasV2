var nav = document.querySelector(".menunav");
var menunav = document.querySelector(".barranav img");

menunav.addEventListener("click", function () {
  if (nav.classList.contains("activo")) {
    nav.classList.remove("activo");
  } else {
    nav.classList.add("activo");
  }
});