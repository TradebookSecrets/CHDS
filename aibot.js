// === AI Bot Simple Reply System ===
const chatBoxAI = document.getElementById("chatBox");
const userMessageInputAI = document.getElementById("userMessage");
const sendMessageBtnAI = document.getElementById("sendMessage");

if (chatBoxAI && userMessageInputAI && sendMessageBtnAI) {
  sendMessageBtnAI.addEventListener("click", sendAIMessage);
  userMessageInputAI.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendAIMessage();
  });

  function sendAIMessage() {
    const msg = userMessageInputAI.value.trim();
    if (!msg) return;

    addMessage("user", "🙋 " + msg);
    userMessageInputAI.value = "";

    // Simple keyword-based AI logic
    let reply = "🤖 Sorry, I don’t understand yet.";
    if (msg.toLowerCase().includes("hello")) {
      reply = "🤖 Hello! How can I help you today?";
    } else if (msg.toLowerCase().includes("help")) {
      reply = "🤖 I can assist with automation, service requests, and auto-replies.";
    } else if (msg.toLowerCase().includes("bye")) {
      reply = "🤖 Goodbye! Talk to you soon.";
    }

    setTimeout(() => addMessage("bot", reply), 400);
  }

  function addMessage(sender, text) {
    const msgElem = document.createElement("div");
    msgElem.classList.add("message", sender);
    msgElem.innerHTML = text;
    chatBoxAI.appendChild(msgElem);
    chatBoxAI.scrollTop = chatBoxAI.scrollHeight;
  }
}
