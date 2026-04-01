document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.querySelector(".close");
  const leftArrow = document.querySelector(".arrow.left");
  const rightArrow = document.querySelector(".arrow.right");

  // --- Group images PER PROJECT (first 4 only) ---
  const projectWrappers = document.querySelectorAll(".project-wrapper");
  const groups = Array.from(projectWrappers).map(wrapper =>
    Array.from(wrapper.querySelectorAll(".img-wrapper")).slice(0, 4) // limit to 4 per project
  );

  // Active group state (the project you're viewing) + index inside that group
  let activeGroup = [];
  let groupIndex = 0;

  // Ensure modal hidden on load
  modal.style.display = "none";
  modalImg.style.display = "none";

  // Open Modal for specific project group + image index
  function openModal(groupId, indexInGroup) {
    activeGroup = groups[groupId];                // set active project images (4 max)
    groupIndex = indexInGroup;                    // set position inside that project
    if (!activeGroup || activeGroup.length === 0) return;

    const img = activeGroup[groupIndex].querySelector("img");
    if (!img) return;

    modalImg.src = img.src;
    modalImg.style.display = "block";
    modal.style.display = (window.innerWidth <= 768) ? "flex" : "block";
    closeBtn.style.display = "flex"; 
    clos.style.display = (window.innerWidth <= 768) ? "flex" : "block";
    updateArrows();
  }

  function closeModal() {
    modal.style.display = "none";
    modalImg.style.display = "none";
  }

  function nextImage() {
    if (groupIndex < activeGroup.length - 1) {
      groupIndex++;
      modalImg.src = activeGroup[groupIndex].querySelector("img").src;
      updateArrows();
    }
  }

  function prevImage() {
    if (groupIndex > 0) {
      groupIndex--;
      modalImg.src = activeGroup[groupIndex].querySelector("img").src;
      updateArrows();
    }
  }

  function updateArrows() {
    // Disable left on first (0), disable right on last (3 or length-1)
    leftArrow.style.visibility  = (groupIndex === 0) ? "hidden" : "visible";
    rightArrow.style.visibility = (groupIndex === activeGroup.length - 1) ? "hidden" : "visible";
  }

  // Bind click listeners to EVERY project's first 4 images
  groups.forEach((wrappersInGroup, groupId) => {
    wrappersInGroup.forEach((wrapper, indexInGroup) => {
      wrapper.addEventListener("click", () => openModal(groupId, indexInGroup));
    });
  });

  // Controls
  closeBtn.addEventListener("click", closeModal);
  rightArrow.addEventListener("click", nextImage);
  leftArrow.addEventListener("click", prevImage);

  // Keyboard navigation (only when modal is open)
  document.addEventListener("keydown", (e) => {
    if (modal.style.display !== "none") {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft")  prevImage();
      if (e.key === "Escape")     closeModal();
    }
  });

  // Swipe (mobile)
  let startX = 0;
  modal.addEventListener("touchstart", (e) => {
    if (!e.touches || e.touches.length === 0) return;
    startX = e.touches[0].clientX;
  });

  modal.addEventListener("touchend", (e) => {
    if (!e.changedTouches || e.changedTouches.length === 0) return;
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;
    if (diffX > 50)  nextImage(); // swipe left
    if (diffX < -50) prevImage(); // swipe right
  });
});
