// ========== LOGIN ==========
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      if (username) {
        localStorage.setItem("visionUsername", username);
        window.location.href = "home.html";
      } else {
        alert("Please enter your name.");
      }
    });
  }

  // ========== DISPLAY USERNAME ON HOME ==========
  const welcome = document.getElementById("welcomeMessage");
  if (welcome) {
    const user = localStorage.getItem("visionUsername") || "Guest";
    welcome.textContent = `Welcome, ${user}!`;
  }

  // ========== TIMER SETUP ==========
  updateTimerDisplay();
  setupProgressTracker(); // only runs if on progress page
});

let timerInterval;
let totalTime = 180; // 3 minutes
let currentTime = totalTime;

function updateTimerDisplay() {
  const timeDisplay = document.getElementById("time");
  if (!timeDisplay) return;

  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
  if (timerInterval) return;

  timerInterval = setInterval(() => {
    if (currentTime > 0) {
      currentTime--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  pauseTimer();
  currentTime = totalTime;
  updateTimerDisplay();
}

// ========== PROGRESS TRACKER ==========
function setupProgressTracker() {
  const grid = document.getElementById("progressGrid");
  if (!grid) return;

  const totalDays = 30;
  const progressKey = "visionProgress";
  const saved = JSON.parse(localStorage.getItem(progressKey)) || [];

  for (let i = 1; i <= totalDays; i++) {
    const day = document.createElement("div");
    day.className = "day";
    day.textContent = i;
    if (saved.includes(i)) {
      day.classList.add("completed");
    }

    day.addEventListener("click", () => {
      day.classList.toggle("completed");
      const completedDays = Array.from(document.querySelectorAll(".day.completed"))
        .map(el => parseInt(el.textContent));
      localStorage.setItem(progressKey, JSON.stringify(completedDays));
    });

    grid.appendChild(day);
  }
}
