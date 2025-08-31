// === LOADING SCREEN HANDLER WITH AI VOICE + FALLBACK ===
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const mainContent = document.getElementById("main-content");
  const loadingText = document.querySelector(".loading-text");

  // Random AI startup phrases
  const phrases = [
    "Welcome to CHDS Ai Automation. Initializing systems, please wait.",
    "System reboot complete. Engaging neural protocols.",
    "Cosmic engines online. Preparing automation interface.",
    "Greetings, traveler. Your galaxy automation is now active.",
    "Boot sequence engaged. Black hole stabilizing core.",
    "Synchronization complete. You are now connected to the network."
  ];
  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

  // Try voice, else fallback to typing
  if ("speechSynthesis" in window && "SpeechSynthesisUtterance" in window) {
    const utterance = new SpeechSynthesisUtterance(randomPhrase);
    utterance.rate = 0.9;
    utterance.pitch = 1.2;
    utterance.volume = 2;
    speechSynthesis.speak(utterance);
    loadingText.textContent = randomPhrase;
  } else {
    console.warn("Speech synthesis not supported → typing fallback.");
    loadingText.textContent = "";
    let i = 0;
    const typing = setInterval(() => {
      loadingText.textContent += randomPhrase[i];
      i++;
      if (i >= randomPhrase.length) clearInterval(typing);
    }, 50);
  }

  // Fade out after 2.5s
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

// === Automation Form Simulation ===
document.getElementById("autoPostForm")?.addEventListener("submit", function(e) {
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

// === Auto Reply System ===
let autoReplies = {};

document.getElementById("autoReplyForm")?.addEventListener("submit", function(e) {
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

document.getElementById("sendMessage")?.addEventListener("click", function() {
  const userMessage = document.getElementById("userMessage").value;
  const chatBox = document.getElementById("chatBox");

  if (!userMessage) return;

  // Show user message
  chatBox.innerHTML += `<div class="message user">${userMessage}</div>`;

  // Check auto reply
  let reply = "🤖 I don’t understand yet...";
  for (let trigger in autoReplies) {
    if (userMessage.toLowerCase().includes(trigger)) {
      reply = "🤖 " + autoReplies[trigger];
      break;
    }
  }

  // Show bot reply
  setTimeout(() => {
    chatBox.innerHTML += `<div class="message bot">${reply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 500);

  document.getElementById("userMessage").value = "";
});

// Initialize EmailJS
(function() {
  emailjs.init("1mIRw2ItouJA6eEN3");
})();

document.getElementById("requestForm").addEventListener("submit", function(event) {
    event.preventDefault();

  let chatBox = document.getElementById("chatBox");
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let message = document.getElementById("message").value; 

  // Show user message as a chat bubble
  chatBox.innerHTML += `<div class="message user">📤 ${message}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;

  emailjs.sendForm("service_yoa6yjz", "template_bj8slhv", this)
    .then(function() {
      chatBox.innerHTML += `<div class="message bot">✅ Thanks ${name}! Your request has been sent successfully.</div>`;
      document.getElementById("status").innerHTML = "";
      document.getElementById("status").className = "success";
    }, function(error) {
      chatBox.innerHTML += `<div class="message bot">❌ Sorry ${name}, your request could not be sent. Try again later.</div>`;
      document.getElementById("status").innerHTML = "";
      document.getElementById("status").className = "error";
      console.error("EmailJS Error:", error);
    });

  // Reset form
  this.reset();
});

// === Recovery & Deletion Request Form ===
const requestForm = document.getElementById("requestForm");

if (requestForm) {
  requestForm.addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.sendForm("service_yoa6yjz", "template_bj8slhv", this)
      .then(() => {
        alert("✅ Request sent successfully! We’ll get back to you soon.");
        requestForm.reset();
      })
      .catch((error) => {
        alert("⚠️ Failed to send. Please try again.");
        console.error("EmailJS Error:", error);
      });
  });
}
