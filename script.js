// === LOADING SCREEN HANDLER WITH AI VOICE + FALLBACK ===
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const mainContent = document.getElementById("main-content");
  const loadingText = document.querySelector(".loading-text");

  if (!loadingScreen || !mainContent || !loadingText) return;

  const phrases = [
    "Welcome to CHDS Ai Automation. Initializing systems, please wait.",
    "System reboot complete. Engaging neural protocols.",
    "Cosmic engines online. Preparing automation interface.",
    "Greetings, traveler. Your galaxy automation is now active.",
    "Boot sequence engaged. Black hole stabilizing core.",
    "Synchronization complete. You are now connected to the network."
  ];
  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

  if ("speechSynthesis" in window && "SpeechSynthesisUtterance" in window) {
    const utterance = new SpeechSynthesisUtterance(randomPhrase);
    utterance.rate = 0.9;
    utterance.pitch = 1.2;
    utterance.volume = 1; // fixed range
    speechSynthesis.speak(utterance);
    loadingText.textContent = randomPhrase;
  } else {
    loadingText.textContent = "";
    let i = 0;
    const typing = setInterval(() => {
      if (i < randomPhrase.length) {
        loadingText.textContent += randomPhrase[i];
        i++;
      } else {
        clearInterval(typing);
      }
    }, 50);
  }

  setTimeout(() => {
    loadingScreen.style.transition = "opacity 0.8s ease";
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      loadingScreen.style.display = "none";
      mainContent.style.display = "block";
    }, 800);
  }, 2000);
});

// === Mobile Menu Toggle ===
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {
  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });
}

// === Automation Form Simulation ===
const autoPostForm = document.getElementById("autoPostForm");
if (autoPostForm) {
  autoPostForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const postText = document.getElementById("postText").value;
    const scheduleTime = document.getElementById("scheduleTime").value;
    const result = document.getElementById("postResult");

    if (postText && scheduleTime) {
      result.textContent = `✅ Post scheduled: "${postText}" at ${scheduleTime}`;
    } else {
      result.textContent = "⚠️ Please fill in all fields.";
    }
  });
}

// === Auto Reply System ===
let autoReplies = {};
const autoReplyForm = document.getElementById("autoReplyForm");
if (autoReplyForm) {
  autoReplyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const trigger = document.getElementById("triggerText").value.toLowerCase();
    const reply = document.getElementById("replyText").value;
    const result = document.getElementById("replyResult");

    if (trigger && reply) {
      autoReplies[trigger] = reply;
      result.textContent = `✅ Auto-reply set: "${trigger}" → "${reply}"`;
    } else {
      result.textContent = "⚠️ Please enter trigger and reply.";
    }
  });
}

const sendMessageBtn = document.getElementById("sendMessage");
if (sendMessageBtn) {
  sendMessageBtn.addEventListener("click", () => {
    const userMessageInput = document.getElementById("userMessage");
    const chatBox = document.getElementById("chatBox");
    if (!userMessageInput || !chatBox) return;

    const userMessage = userMessageInput.value;
    if (!userMessage) return;

    chatBox.innerHTML += `<div class="message user">${userMessage}</div>`;

    let reply = "🤖 I don’t understand yet...";
    for (let trigger in autoReplies) {
      if (userMessage.toLowerCase().includes(trigger)) {
        reply = "🤖 " + autoReplies[trigger];
        break;
      }
    }

    setTimeout(() => {
      chatBox.innerHTML += `<div class="message bot">${reply}</div>`;
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);

    userMessageInput.value = "";
  });
}

// === EmailJS Initialization ===
if (typeof emailjs !== "undefined") {
  emailjs.init("1mIRw2ItouJA6eEN3");
}

const requestForm = document.getElementById("requestForm");
if (requestForm) {
  requestForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const chatBox = document.getElementById("chatBox");
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    if (chatBox) {
      chatBox.innerHTML += `<div class="message user">📤 ${message}</div>`;
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    emailjs.sendForm("service_yoa6yjz", "template_bj8slhv", requestForm)
      .then(() => {
        if (chatBox) chatBox.innerHTML += `<div class="message bot">✅ Thanks ${name}! Your request has been sent successfully.</div>`;
        requestForm.reset();
      })
      .catch((error) => {
        if (chatBox) chatBox.innerHTML += `<div class="message bot">❌ Sorry ${name}, your request could not be sent. Try again later.</div>`;
        console.error("EmailJS Error:", error);
      });
  });
}
