document.addEventListener("DOMContentLoaded", function () {
  const projects = document.querySelectorAll(".project-wrapper");

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Added delay per item 
        setTimeout(() => {
          entry.target.classList.add("show");
        }, index * 200); // 200ms delay /project
        observer.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.15 });

  projects.forEach(project => observer.observe(project));
});
