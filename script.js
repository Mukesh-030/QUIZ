// Hardcoded login credentials
const validUsername = "MARVEL";
const validPassword = "ram123456";

const loginButton = document.getElementById("loginButton");
const loginContainer = document.getElementById("login");
const quizContainer = document.getElementById("quiz");
const loginFeedback = document.getElementById("login-feedback");
const togglePassword = document.getElementById("togglePassword");

// Login functionality
loginButton.addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === validUsername && password === validPassword) {
        // Hide login and show quiz
        loginContainer.style.display = "none";
        quizContainer.style.display = "block";
    } else {
        // Display error message
        loginFeedback.innerText = "Incorrect username or password";
    }
});

// Toggle password visibility when pressing the eye icon
togglePassword.addEventListener("mousedown", () => {
    const passwordField = document.getElementById("password");
    passwordField.type = "text";
});

togglePassword.addEventListener("mouseup", () => {
    const passwordField = document.getElementById("password");
    passwordField.type = "password";
});

// Quiz Code
const quizData = [
  {
    question: "Which language runs in a web browser?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },
  {
    question: "What does CSS stand for?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Cascading Simple Sheets",
    d: "Cars SUVs Sailboats",
    correct: "b",
  },
  {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Hypertext Markdown Language",
    c: "Hyperloop Machine Language",
    d: "Helicopters Terminals Motorboats Lamborghinis",
    correct: "a",
  },
  {
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b",
  },
  {
    question: "To generate a random secure Universally unique ID which method should I use?",
    a: "uuid.uuid4()",
    b: "uuid.uuid1()",
    c: "uuid.uuid3()",
    d: "random.uuid()",
    correct: "d",
  },
];

const quiz = document.getElementById("quiz");
const answerElements = document.querySelectorAll(".answer");
const questionElement = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitButton = document.getElementById("submit");
const feedbackElement = document.getElementById("feedback");

let currentQuiz = 0;
let score = 0;

const deselectAnswers = () => {
  answerElements.forEach((answer) => (answer.checked = false));
};

const getSelected = () => {
  let answer;
  answerElements.forEach((answerElement) => {
    if (answerElement.checked) answer = answerElement.id;
  });
  return answer;
};

const loadQuiz = () => {
  deselectAnswers();
  const currentQuizData = quizData[currentQuiz];
  questionElement.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
  feedbackElement.innerText = ''; // Clear feedback for the next question
};

loadQuiz();

submitButton.addEventListener("click", () => {
  const answer = getSelected();
  if (answer) {
    const correctAnswer = quizData[currentQuiz].correct;
    if (answer === correctAnswer) {
      score++;
      feedbackElement.innerText = "Correct!";
      feedbackElement.style.color = "green";
    } else {
      feedbackElement.innerText = `Wrong! The correct answer was "${quizData[currentQuiz][correctAnswer]}".`;
      feedbackElement.style.color = "red";
    }

    currentQuiz++;
    
    if (currentQuiz < quizData.length) {
      setTimeout(loadQuiz, 2000); // Wait 2 seconds before loading the next question
    } else {
      setTimeout(() => {
        quiz.innerHTML = `
          <h2>You answered ${score}/${quizData.length} questions correctly</h2>
          <h2>You SCORED ${score * 20}/100</h2>
          <button onclick="history.go(0)">Play Again</button>
        `;
      }, 2000); // Show the final result after 2 seconds
    }
  }
});
