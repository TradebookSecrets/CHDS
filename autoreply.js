// === Auto-Reply Tool ===
const autoReplyForm = document.getElementById("autoReplyForm");
const replyResult = document.getElementById("replyResult");
const chatBox = document.getElementById("chatBox");
const userMessageInput = document.getElementById("userMessage");
const sendMessageBtn = document.getElementById("sendMessage");

let autoReplies = {};

if (autoReplyForm) {
  autoReplyForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const trigger = document.getElementById("triggerText").value.toLowerCase();
    const reply = document.getElementById("replyText").value;

    if (trigger && reply) {
      autoReplies[trigger] = reply;
      replyResult.innerHTML = `<p>✅ Reply saved: "${trigger}" → "${reply}"</p>`;
    } else {
      replyResult.innerHTML = `<p>⚠️ Please fill in both fields.</p>`;
    }
  });
}

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

    let reply = "🤖 I don’t understand yet...";
    for (let trigger in autoReplies) {
      if (msg.toLowerCase().includes(trigger)) {
        reply = "🤖 " + autoReplies[trigger];
        break;
      }
    }

    addMessage("bot", reply);
  }

  function addMessage(sender, text) {
    const msgElem = document.createElement("div");
    msgElem.classList.add("message", sender);
    msgElem.innerHTML = text;
    chatBox.appendChild(msgElem);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}
