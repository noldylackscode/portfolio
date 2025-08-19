document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("scrollTopBtn");

  function toggleScrollBtn() {
    if (window.scrollY > 500) {
      btn.style.display = "flex";
    } else {
      btn.style.display = "none";
    }
  }

  window.addEventListener("scroll", toggleScrollBtn);

  toggleScrollBtn();

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

