// ===== MENU HAMBÚRGUER MELHORADO =====
const menuToggle = document.getElementById("menu-toggle")
const menu = document.getElementById("menu")
const menuOverlay = document.getElementById("menu-overlay")
const navLinks = document.querySelectorAll(".menu a")
const body = document.body

// Estado do menu
let isMenuOpen = false

// Toggle do menu
function toggleMenu() {
  isMenuOpen = !isMenuOpen

  if (isMenuOpen) {
    openMenu()
  } else {
    closeMenu()
  }
}

// Abrir menu
function openMenu() {
  menu.classList.add("show")
  menuOverlay.classList.add("show")
  menuToggle.classList.add("active")
  menuToggle.setAttribute("aria-expanded", "true")
  menuToggle.setAttribute("aria-label", "Fechar menu")
  body.style.overflow = "hidden" // Previne scroll do body

  // Foco no primeiro link do menu
  setTimeout(() => {
    navLinks[0]?.focus()
  }, 300)
}

// Fechar menu
function closeMenu() {
  menu.classList.remove("show")
  menuOverlay.classList.remove("show")
  menuToggle.classList.remove("active")
  menuToggle.setAttribute("aria-expanded", "false")
  menuToggle.setAttribute("aria-label", "Abrir menu")
  body.style.overflow = ""
  isMenuOpen = false
}

// Event listeners
menuToggle.addEventListener("click", toggleMenu)
menuOverlay.addEventListener("click", closeMenu)

// Fechar menu ao clicar em um link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu()
    // Smooth scroll para a seção
    const targetId = link.getAttribute("href")
    if (targetId.startsWith("#")) {
      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }, 300)
      }
    }
  })
})

// Fechar menu com ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isMenuOpen) {
    closeMenu()
    menuToggle.focus()
  }
})

// Navegação por teclado no menu
menu.addEventListener("keydown", (e) => {
  if (!isMenuOpen) return

  const focusableElements = menu.querySelectorAll("a")
  const currentIndex = Array.from(focusableElements).indexOf(document.activeElement)

  switch (e.key) {
    case "ArrowDown":
      e.preventDefault()
      const nextIndex = (currentIndex + 1) % focusableElements.length
      focusableElements[nextIndex].focus()
      break
    case "ArrowUp":
      e.preventDefault()
      const prevIndex = currentIndex === 0 ? focusableElements.length - 1 : currentIndex - 1
      focusableElements[prevIndex].focus()
      break
    case "Home":
      e.preventDefault()
      focusableElements[0].focus()
      break
    case "End":
      e.preventDefault()
      focusableElements[focusableElements.length - 1].focus()
      break
  }
})

// ===== SCROLL PROGRESS BAR =====
const scrollProgress = document.getElementById("scroll-progress")
const header = document.querySelector(".header")

function updateScrollProgress() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
  const scrollPercent = (scrollTop / scrollHeight) * 100

  scrollProgress.style.transform = `scaleX(${scrollPercent / 100})`

  // Adicionar classe scrolled no header
  if (scrollTop > 50) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
}

window.addEventListener("scroll", updateScrollProgress)

// ===== NAVEGAÇÃO ATIVA =====
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]")
  const navLinksDesktop = document.querySelectorAll(".nav-link")
  const navLinksMobile = document.querySelectorAll(".menu a")

  let currentSection = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.offsetHeight

    if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id")
    }
  })

  // Atualizar links desktop
  navLinksDesktop.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active")
    }
  })

  // Atualizar links mobile
  navLinksMobile.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active")
    }
  })
}

window.addEventListener("scroll", updateActiveNavLink)

// ===== REDIMENSIONAMENTO DA JANELA =====
function handleResize() {
  if (window.innerWidth > 768 && isMenuOpen) {
    closeMenu()
  }
}

window.addEventListener("resize", handleResize)

// ===== THEME SWITCHER (código existente mantido) =====
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
  document.documentElement.removeAttribute("data-theme")

  if (theme !== "light") {
    document.documentElement.setAttribute("data-theme", theme)
  }

  themeIcon.textContent = themes[theme].icon

  themeOptions.forEach((option) => {
    option.classList.remove("active")
    if (option.dataset.theme === theme) {
      option.classList.add("active")
    }
  })

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

// Detectar preferência do sistema
function detectSystemTheme() {
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark"
  }
  return "light"
}

if (!localStorage.getItem("hidrosafe-theme")) {
  const systemTheme = detectSystemTheme()
  currentTheme = systemTheme
  applyTheme(currentTheme)
}

// ===== FORMULÁRIO E QUIZ (código existente mantido) =====
document.getElementById("cliente-form").addEventListener("submit", (e) => {
  e.preventDefault()

  const nome = document.getElementById("nome").value.trim()
  const idade = Number.parseInt(document.getElementById("idade").value)
  const email = document.getElementById("email").value.trim()
  const mensagem = document.getElementById("mensagem")

  if (!nome || !idade || !email) {
    mensagem.textContent = "Preencha todos os campos."
    mensagem.style.color = "red"
    return
  }

  if (idade <= 0 || isNaN(idade)) {
    mensagem.textContent = "Idade deve ser maior que zero."
    mensagem.style.color = "red"
    return
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!emailValido) {
    mensagem.textContent = "Email inválido."
    mensagem.style.color = "red"
    return
  }

  mensagem.textContent = "Formulário enviado com sucesso!"
  mensagem.style.color = "green"
})

document.getElementById("quiz-form").addEventListener("submit", (e) => {
  e.preventDefault()

  const respostasCorretas = {
    q1: "b",
    q2: "c",
    q3: "b",
    q4: "b",
    q5: "b",
    q6: "b",
    q7: "b",
    q8: "c",
    q9: "b",
    q10: "b",
  }

  let pontuacao = 0

  for (const key in respostasCorretas) {
    const respostaUsuario = document.querySelector(`input[name="${key}"]:checked`)
    if (respostaUsuario && respostaUsuario.value === respostasCorretas[key]) {
      pontuacao++
    }
  }

  const resultado = document.getElementById("quiz-result")
  resultado.textContent = `Você acertou ${pontuacao} de 10 perguntas.`

  if (pontuacao < 6) {
    resultado.style.color = "red"
  } else {
    resultado.style.color = "green"
  }
})
