
// Mobile navigation toggle
document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector("nav ul");
  const toggle = document.createElement("div");
  toggle.classList.add("nav-toggle");
  toggle.innerHTML = "☰";
  toggle.style.cursor = "pointer";
  toggle.style.fontSize = "3rem";
  toggle.style.display = "none";
  toggle.style.userSelect = "none";

  nav.parentNode.insertBefore(toggle, nav);

  toggle.addEventListener("click", () => {
    nav.classList.toggle("show-nav");
  });

  const style = document.createElement("style");
  style.innerHTML = `
    @media screen and (max-width: 754px) {
      .nav-toggle {
        display: block;
      }

      nav ul {
        display: none;
        flex-direction: column;
        background: white;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        z-index: 1000;
      }

      nav ul.show-nav {
        display: flex;
      }

      nav ul li {
        padding: 1rem 2rem;
        text-align: center;
        border-bottom: 1px solid #ddd;
      }
    }
  `;
  document.head.appendChild(style);
});
