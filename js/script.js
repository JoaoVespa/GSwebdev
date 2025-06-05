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

//quiz
document.getElementById('quiz-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const respostasCorretas = {
    q1: 'b',
    q2: 'c',
    q3: 'b',
    q4: 'b',
    q5: 'b',
    q6: 'b',
    q7: 'b',
    q8: 'c',
    q9: 'b',
    q10: 'b'
  };

  let pontuacao = 0;

  for (let key in respostasCorretas) {
    const respostaUsuario = document.querySelector(`input[name="${key}"]:checked`);
    if (respostaUsuario && respostaUsuario.value === respostasCorretas[key]) {
      pontuacao++;
    }
  }

  const resultado = document.getElementById('quiz-result');
  resultado.textContent = `Você acertou ${pontuacao} de 10 perguntas.`;

  if (pontuacao < 6) {
    resultado.style.color = 'red';
  } else {
    resultado.style.color = 'green';
  }
});



