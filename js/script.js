// Theme Switcher
const themeToggle = document.getElementById("theme-toggle")
const themeDropdown = document.getElementById("theme-dropdown")
const themeOptions = document.querySelectorAll(".theme-option")
const themeIcon = document.querySelector(".theme-icon")

// Temas disponíveis
const themes = {
  light: { name: "Claro", icon: "☀️" },
  dark: { name: "Escuro", icon: "🌙" },
  purple: { name: "Roxo", icon: "💜" },
}

// Carregar tema salvo ou usar padrão
let currentTheme = localStorage.getItem("hidrosafe-theme") || "light"
applyTheme(currentTheme)

// Toggle dropdown
themeToggle.addEventListener("click", (e) => {
  e.stopPropagation()
  themeDropdown.classList.toggle("show")
})

// Fechar dropdown ao clicar fora
document.addEventListener("click", (e) => {
  if (!e.target.closest(".theme-switcher")) {
    themeDropdown.classList.remove("show")
  }
})

// Selecionar tema
themeOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const selectedTheme = option.dataset.theme
    if (selectedTheme !== currentTheme) {
      currentTheme = selectedTheme
      applyTheme(currentTheme)
      localStorage.setItem("hidrosafe-theme", currentTheme)
    }
    themeDropdown.classList.remove("show")
  })
})

// Aplicar tema
function applyTheme(theme) {
  // Remover tema anterior
  document.documentElement.removeAttribute("data-theme")

  // Aplicar novo tema
  if (theme !== "light") {
    document.documentElement.setAttribute("data-theme", theme)
  }

  // Atualizar ícone
  themeIcon.textContent = themes[theme].icon

  // Atualizar opções ativas
  themeOptions.forEach((option) => {
    option.classList.remove("active")
    if (option.dataset.theme === theme) {
      option.classList.add("active")
    }
  })

  // Animação suave de transição
  document.body.style.transition = "all 0.3s ease-in-out"
  setTimeout(() => {
    document.body.style.transition = ""
  }, 300)
}

// Atalho de teclado para alternar temas (Ctrl + T)
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "t") {
    e.preventDefault()
    const themeKeys = Object.keys(themes)
    const currentIndex = themeKeys.indexOf(currentTheme)
    const nextIndex = (currentIndex + 1) % themeKeys.length
    const nextTheme = themeKeys[nextIndex]

    currentTheme = nextTheme
    applyTheme(currentTheme)
    localStorage.setItem("hidrosafe-theme", currentTheme)
  }
})

// Detectar preferência do sistema (opcional)
function detectSystemTheme() {
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark"
  }
  return "light"
}

// Aplicar tema do sistema se não houver preferência salva
if (!localStorage.getItem("hidrosafe-theme")) {
  const systemTheme = detectSystemTheme()
  currentTheme = systemTheme
  applyTheme(currentTheme)
}
