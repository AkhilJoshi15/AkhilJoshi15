document.getElementById("year").textContent = new Date().getFullYear();

const themeColor = document.querySelector('meta[name="theme-color"]');
const themeButtons = document.querySelectorAll("[data-theme-choice]");

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem("theme", theme); } catch {}
  themeColor.setAttribute("content", theme === "dark" ? "#0c111b" : "#f4f5f7");

  themeButtons.forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.themeChoice === theme));
  });
}

themeButtons.forEach(button => {
  button.addEventListener("click", () => setTheme(button.dataset.themeChoice));
});

setTheme(document.documentElement.dataset.theme || "light");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -28px 0px" });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

} else {
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
}
