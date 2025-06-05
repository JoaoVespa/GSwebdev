//menu hamburguer dispositivo movel
const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

toggle.addEventListener('click', () => {
  menu.classList.toggle('show');
});

//formulario
document.getElementById('cliente-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const idade = parseInt(document.getElementById('idade').value);
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem');

  if (!nome || !idade || !email) {
    mensagem.textContent = 'Preencha todos os campos.';
    mensagem.style.color = 'red';
    return;
  }

  if (idade <= 0 || isNaN(idade)) {
    mensagem.textContent = 'Idade deve ser maior que zero.';
    mensagem.style.color = 'red';
    return;
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailValido) {
    mensagem.textContent = 'Email inválido.';
    mensagem.style.color = 'red';
    return;
  }

  mensagem.textContent = 'Formulário enviado com sucesso!';
  mensagem.style.color = 'green';
});





