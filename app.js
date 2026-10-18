const form = document.querySelector("#settings-form");
const statusMessage = document.querySelector("#save-status");
const storageKey = "form-field-settings";
const themeInputs = document.querySelectorAll('input[name="theme"]');

function applyTheme(theme) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.body.dataset.theme = theme === "system" ? (prefersDark ? "dark" : "light") : theme;
}

function readSavedSettings() {
  const storedSettings = localStorage.getItem(storageKey);
  if (!storedSettings) return;

  const settings = JSON.parse(storedSettings);
  if (typeof settings.name === "string") {
    form.elements.namedItem("name").value = settings.name;
  }
  if (typeof settings.email === "string") {
    form.elements.namedItem("email").value = settings.email;
  }
  if (["light", "dark", "system"].includes(settings.theme)) {
    form.querySelector(`input[name="theme"][value="${settings.theme}"]`).checked = true;
  }
  if (typeof settings.notifications === "boolean") {
    form.elements.namedItem("notifications").checked = settings.notifications;
  }
}

try {
  readSavedSettings();
  applyTheme(form.querySelector('input[name="theme"]:checked').value);
} catch (error) {
  statusMessage.textContent = "Saved preferences could not be loaded.";
  statusMessage.classList.add("error");
  console.error("Could not load saved settings.", error);
}

themeInputs.forEach((input) => {
  input.addEventListener("change", () => applyTheme(input.value));
});

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
  const selectedTheme = form.querySelector('input[name="theme"]:checked').value;
  if (selectedTheme === "system") applyTheme(selectedTheme);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  statusMessage.classList.remove("error");
  const formData = new FormData(form);
  const settings = {
    name: formData.get("name"),
    email: formData.get("email"),
    theme: formData.get("theme"),
    notifications: formData.get("notifications") === "on",
  };

  try {
    localStorage.setItem(storageKey, JSON.stringify(settings));
    statusMessage.textContent = "Your preferences are saved on this device.";
  } catch (error) {
    statusMessage.textContent = "We couldn't save your preferences. Please try again.";
    statusMessage.classList.add("error");
    console.error("Could not save settings.", error);
  }
});
