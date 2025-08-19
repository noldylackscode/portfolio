const toggleBtn = document.querySelector(".theme-toggle");
const body = document.body;

// Check saved theme on load
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  toggleBtn.textContent = "☀️ Light Mode";
}

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const isDark = body.classList.contains("dark-mode");

  // Update button text
  toggleBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";

  // Save preference
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
