/* One controller for the React home and the static pages. Runs before paint. */
(() => {
  const key = "kroma-theme-v1";
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const valid = value => value === "light" || value === "dark";
  let preference = null;
  try { preference = localStorage.getItem(key); } catch { /* Storage may be blocked. */ }
  if (!valid(preference)) preference = null;

  function apply() {
    const theme = preference || (media.matches ? "dark" : "light");
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === "light" ? "#f8fafc" : "#08090d";
  }
  apply();
  media.addEventListener("change", apply);
  window.addEventListener("storage", event => {
    if (event.key !== key && event.key !== null) return;
    preference = valid(event.newValue) ? event.newValue : null;
    apply();
  });
  document.addEventListener("click", event => {
    if (!event.target.closest("[data-theme-toggle]")) return;
    preference = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    try { localStorage.setItem(key, preference); } catch { /* Keep this visit's choice. */ }
    apply();
  });
})();
