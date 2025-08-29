

let currentQuestion = 0;
let score = 0;

function checkQuizAnswer(button, isCorrect) {
  const feedback = document.getElementById("quiz-feedback");
  const questions = document.querySelectorAll(".quiz-question");

  if (isCorrect) {
    feedback.style.color = "green";
    feedback.textContent = "✅ ¡Correcto!";
    score++;
  } else {
    feedback.style.color = "red";
    feedback.textContent = "❌ Incorrecto.";
  }

  document.getElementById("quiz-score").textContent = "Puntaje: " + score;

  // Desactivar botones de la pregunta actual
  const buttons = questions[currentQuestion].querySelectorAll("button");
  buttons.forEach(btn => btn.disabled = true);

  // Pasar a la siguiente pregunta después de 1 segundo
  setTimeout(() => {
    feedback.textContent = "";
    questions[currentQuestion].style.display = "none";
    currentQuestion++;

    if (currentQuestion < questions.length) {
      questions[currentQuestion].style.display = "block";
    } else {
      // Mostrar puntaje final
      document.getElementById("quiz-container").innerHTML =
        `<h3>¡Quiz terminado!</h3>
         <p>Tu puntaje final es: <b>${score} / ${questions.length}</b></p>`;
    }
  }, 1000);
} 

function runCode() {
  const code = document.getElementById("code-editor").value;
  const n1 = Number(document.getElementById("num1").value);
  const n2 = Number(document.getElementById("num2").value);
  const iframe = document.getElementById("output-frame");
  const doc = iframe.contentDocument || iframe.contentWindow.document;

  const hasReturn = /return\s+/.test(code); // Verificar si hay "return"

  doc.open();
  doc.write(`
    <html>
      <body>
        <script>
          try {
            ${code}
            if (typeof suma === 'function') {
              if (${hasReturn}) {
                const resultado = suma(${n1}, ${n2});
                document.body.innerHTML = "suma(${n1}, ${n2}) = " + resultado;
              } else {
                document.body.innerHTML = "❌ La función no lista esta para devolver el resultado.";
              }
            } else {
              document.body.innerHTML = '❌ Define la función suma primero';
            }
          } catch(e) {
            document.body.innerHTML = '❌ Error: ' + e.message;
          }
        <\/script>
      </body>
    </html>
  `);
  doc.close();
}
