// === LOADING SCREEN HANDLER ===
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const mainContent = document.getElementById("main-content");
  const loadingText = document.querySelector(".loading-text");

  if (!loadingScreen || !loadingText) return;

  const phrases = [
    "Welcome to CHDS Ai Automation. Initializing systems, please wait.",
    "System reboot complete. Engaging neural protocols.",
    "Cosmic engines online. Preparing automation interface.",
    "Greetings. Your galaxy automation is now active.",
    "Boot sequence engaged. Stabilizing core.",
    "Synchronization complete. You are now connected."
  ];
  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(randomPhrase);
    utterance.rate = 0.9;
    utterance.pitch = 1.2;
    speechSynthesis.speak(utterance);
    loadingText.textContent = randomPhrase;
  } else {
    let i = 0;
    loadingText.textContent = "";
    const typing = setInterval(() => {
      loadingText.textContent += randomPhrase[i];
      i++;
      if (i >= randomPhrase.length) clearInterval(typing);
    }, 50);
  }

  setTimeout(() => {
    loadingScreen.style.transition = "opacity 0.8s ease";
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      loadingScreen.style.display = "none";
      if (mainContent) mainContent.style.display = "block";
    }, 800);
  }, 2000);
});

// === Mobile Menu Toggle ===
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });
}

// === INIT EMAILJS (once only) ===
(function() {
  if (window.emailjs) {
    emailjs.init("1mIRw2ItouJA6eEN3");
  }
})();
