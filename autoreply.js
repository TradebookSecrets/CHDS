// === Auto-Reply Tool ===
const autoReplyForm = document.getElementById("autoReplyForm");
const replyResult = document.getElementById("replyResult");

if (autoReplyForm) {
  autoReplyForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const trigger = document.getElementById("triggerText").value;
    const reply = document.getElementById("replyText").value;

    if (trigger && reply) {
      replyResult.innerHTML = `<p>✅ Reply saved: When user says "${trigger}", reply with "${reply}".</p>`;
    } else {
      replyResult.innerHTML = `<p>⚠️ Please fill in both fields.</p>`;
    }
  });
}

// === Chat Simulator ===
const chatBox = document.getElementById("chatBox");
const userMessageInput = document.getElementById("userMessage");
const sendMessageBtn = document.getElementById("sendMessage");

if (chatBox && userMessageInput && sendMessageBtn) {
  sendMessageBtn.addEventListener("click", sendMessage);
  userMessageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  function sendMessage() {
    const msg = userMessageInput.value.trim();
    if (!msg) return;

    addMessage("user", "🙋 " + msg);
    userMessageInput.value = "";

    // Example: reply instantly
    addMessage("bot", "🤖 Auto-reply: " + msg);
  }

  function addMessage(sender, text) {
    const msgElem = document.createElement("div");
    msgElem.classList.add("message", sender);
    msgElem.innerHTML = text;
    chatBox.appendChild(msgElem);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}
