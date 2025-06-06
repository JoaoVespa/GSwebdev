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

// ===== MUDAR DE TEMA =====
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

// ===== FORMULÁRIO E QUIZ  =====
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

// Formulário de Cliente Melhorado
document.addEventListener("DOMContentLoaded", () => {
  const clienteForm = document.getElementById("cliente-form")
  const nomeInput = document.getElementById("nome")
  const idadeInput = document.getElementById("idade")
  const emailInput = document.getElementById("email")
  const telefoneInput = document.getElementById("telefone")
  const submitButton = document.getElementById("submit-button")
  const mensagem = document.getElementById("mensagem")

  // Função para validar email
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  // Função para validar nome
  function isValidName(name) {
    return name.trim().length >= 2 && /^[a-zA-ZÀ-ÿ\s]+$/.test(name.trim())
  }

  // Função para validar idade
  function isValidAge(age) {
    const ageNum = Number.parseInt(age)
    return !isNaN(ageNum) && ageNum >= 1 && ageNum <= 120
  }

  // Função para formatar telefone
  function formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, "")
    if (cleaned.length <= 2) {
      return `(${cleaned}`
    } else if (cleaned.length <= 7) {
      return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2)}`
    } else {
      return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 7)}-${cleaned.substring(7, 11)}`
    }
  }

  // Função para verificar se o formulário é válido
  function checkFormValidity() {
    const nomeValue = nomeInput.value.trim()
    const idadeValue = idadeInput.value.trim()
    const emailValue = emailInput.value.trim()

    const isNomeValid = nomeValue !== "" && isValidName(nomeValue)
    const isIdadeValid = idadeValue !== "" && isValidAge(idadeValue)
    const isEmailValid = emailValue !== "" && isValidEmail(emailValue)

    // Atualiza classes de validação para o nome
    const nomeGroup = document.getElementById("nome-group")
    if (nomeValue !== "") {
      if (isNomeValid) {
        nomeGroup.classList.remove("error")
        nomeGroup.classList.add("success")
      } else {
        nomeGroup.classList.add("error")
        nomeGroup.classList.remove("success")
      }
    } else {
      nomeGroup.classList.remove("error", "success")
    }

    // Atualiza classes de validação para a idade
    const idadeGroup = document.getElementById("idade-group")
    if (idadeValue !== "") {
      if (isIdadeValid) {
        idadeGroup.classList.remove("error")
        idadeGroup.classList.add("success")
      } else {
        idadeGroup.classList.add("error")
        idadeGroup.classList.remove("success")
      }
    } else {
      idadeGroup.classList.remove("error", "success")
    }

    // Atualiza classes de validação para o email
    const emailGroup = document.getElementById("email-group")
    if (emailValue !== "") {
      if (isEmailValid) {
        emailGroup.classList.remove("error")
        emailGroup.classList.add("success")
      } else {
        emailGroup.classList.add("error")
        emailGroup.classList.remove("success")
      }
    } else {
      emailGroup.classList.remove("error", "success")
    }

    // Habilita ou desabilita o botão de envio
    const allFieldsValid = isNomeValid && isIdadeValid && isEmailValid
    submitButton.disabled = !allFieldsValid

    // Atualiza a aparência do botão
    if (allFieldsValid) {
      submitButton.style.opacity = "1"
      submitButton.style.cursor = "pointer"
    } else {
      submitButton.style.opacity = "0.6"
      submitButton.style.cursor = "not-allowed"
    }
  }

  // Adiciona eventos de input para validação em tempo real
  nomeInput.addEventListener("input", checkFormValidity)
  idadeInput.addEventListener("input", checkFormValidity)
  emailInput.addEventListener("input", checkFormValidity)

  // Formata o telefone enquanto digita
  telefoneInput.addEventListener("input", function () {
    const cursorPosition = this.selectionStart
    const oldLength = this.value.length
    this.value = formatPhone(this.value)
    const newLength = this.value.length
    const cursorAdjustment = newLength - oldLength
    this.setSelectionRange(cursorPosition + cursorAdjustment, cursorPosition + cursorAdjustment)
  })

  // Manipula o envio do formulário
  clienteForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Verifica novamente se o formulário é válido
    const nomeValue = nomeInput.value.trim()
    const idadeValue = idadeInput.value.trim()
    const emailValue = emailInput.value.trim()

    if (!isValidName(nomeValue)) {
      mensagem.textContent = "Por favor, digite um nome válido."
      mensagem.className = "form-message error"
      return
    }

    if (!isValidAge(idadeValue)) {
      mensagem.textContent = "Por favor, digite uma idade válida (1-120)."
      mensagem.className = "form-message error"
      return
    }

    if (!isValidEmail(emailValue)) {
      mensagem.textContent = "Por favor, digite um email válido."
      mensagem.className = "form-message error"
      return
    }

    // Desabilita o botão durante o envio
    submitButton.disabled = true
    submitButton.innerHTML =
      '<span class="button-text"><span>Enviando...</span><span class="button-icon">⏳</span></span>'

    // Simula um envio de formulário
    setTimeout(() => {
      mensagem.textContent = "Formulário enviado com sucesso! Entraremos em contato em breve."
      mensagem.className = "form-message success"

      // Reseta o formulário
      clienteForm.reset()
      document.querySelectorAll(".input-group").forEach((group) => {
        group.classList.remove("success", "error")
      })

      // Restaura o botão
      submitButton.innerHTML = '<span class="button-text"><span>Enviar</span><span class="button-icon">→</span></span>'
      checkFormValidity()

      // Rola para mostrar a mensagem
      mensagem.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 1500)
  })

  // Inicializa a validação
  checkFormValidity()
})

// Quiz melhorado com progresso e feedback visual
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
  const totalPerguntas = Object.keys(respostasCorretas).length

  for (const key in respostasCorretas) {
    const respostaUsuario = document.querySelector(`input[name="${key}"]:checked`)
    if (respostaUsuario && respostaUsuario.value === respostasCorretas[key]) {
      pontuacao++
    }
  }

  const porcentagem = Math.round((pontuacao / totalPerguntas) * 100)
  const resultado = document.getElementById("quiz-result")

  let classe, icone, titulo, mensagem, dicas

  if (pontuacao >= 9) {
    classe = "excellent"
    icone = "🏆"
    titulo = "Excelente!"
    mensagem = "Você está muito bem preparado para situações de enchente. Parabéns pelo conhecimento!"
    dicas = [
      "Continue se mantendo informado sobre prevenção",
      "Compartilhe seu conhecimento com familiares",
      "Mantenha sempre um kit de emergência atualizado",
    ]
  } else if (pontuacao >= 7) {
    classe = "good"
    icone = "👍"
    titulo = "Muito Bom!"
    mensagem = "Você tem um bom conhecimento sobre enchentes, mas ainda pode aprender mais."
    dicas = [
      "Revise os pontos que errou",
      "Pratique o plano de evacuação com sua família",
      "Mantenha-se atualizado sobre alertas meteorológicos",
    ]
  } else if (pontuacao >= 5) {
    classe = "needs-improvement"
    icone = "⚠️"
    titulo = "Precisa Melhorar"
    mensagem = "Você tem conhecimento básico, mas é importante estudar mais sobre prevenção de enchentes."
    dicas = [
      "Leia mais sobre preparação para emergências",
      "Converse com a Defesa Civil da sua cidade",
      "Participe de treinamentos de segurança",
    ]
  } else {
    classe = "poor"
    icone = "🚨"
    titulo = "Atenção Necessária"
    mensagem = "É muito importante que você se informe melhor sobre prevenção de enchentes para sua segurança."
    dicas = [
      "Procure informações na Defesa Civil",
      "Faça um curso de primeiros socorros",
      "Prepare um plano de emergência familiar",
    ]
  }

  resultado.innerHTML = `
    <span class="quiz-result-icon">${icone}</span>
    <div class="quiz-result-score">Você acertou ${pontuacao} de ${totalPerguntas} perguntas (${porcentagem}%)</div>
    <div class="quiz-result-message">${titulo} ${mensagem}</div>
    <div class="quiz-tips">
      <h4>💡 Dicas para você:</h4>
      <ul>
        ${dicas.map((dica) => `<li>${dica}</li>`).join("")}
      </ul>
    </div>
  `

  resultado.className = `quiz-result ${classe} show`

  // Rola suavemente para o resultado
  resultado.scrollIntoView({ behavior: "smooth", block: "center" })
})

// Atualiza a barra de progresso conforme o usuário responde
document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.getElementById("quiz-progress-bar")
  const totalPerguntas = 10

  function updateProgress() {
    let perguntasRespondidas = 0

    for (let i = 1; i <= totalPerguntas; i++) {
      const pergunta = document.querySelector(`input[name="q${i}"]:checked`)
      if (pergunta) {
        perguntasRespondidas++
      }
    }

    const progresso = (perguntasRespondidas / totalPerguntas) * 100
    progressBar.style.width = `${progresso}%`
  }

  // Adiciona listeners para todas as opções do quiz
  document.querySelectorAll('input[type="radio"]').forEach((input) => {
    input.addEventListener("change", updateProgress)
  })
})
