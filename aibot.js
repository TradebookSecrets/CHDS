// === AI Bot Chat ===
const botChatBox = document.getElementById("chatBox");
const botInput = document.getElementById("userMessage");
const botSendBtn = document.getElementById("sendMessage");

if (botChatBox && botInput && botSendBtn) {
  const responses = {
    "hello": "👋 Hi there! How can I help you today?",
    "who are you": "🤖 I’m CHDS AI Bot, created to assist with automation and recovery services.",
    "help": "⚡ You can ask me about recovery, deletion, or general questions. If I don’t know, I’ll search Google for you!"
  };

  botSendBtn.addEventListener("click", handleMessage);
  botInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleMessage();
  });

  function handleMessage() {
    const userText = botInput.value.trim();
    if (!userText) return;
    addMessage("user", "🙋 " + userText);
    botInput.value = "";

    const lowerText = userText.toLowerCase();
    if (responses[lowerText]) {
      setTimeout(() => addMessage("bot", responses[lowerText]), 500);
    } else {
      fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(userText)}&format=json`)
        .then(res => res.json())
        .then(data => {
          if (data.AbstractText) {
            addMessage("bot", `🔎 ${data.AbstractText}`);
          } else {
            const googleLink = `https://www.google.com/search?q=${encodeURIComponent(userText)}`;
            addMessage("bot", `🤔 I’m not sure, but here’s a Google search: <a href="${googleLink}" target="_blank">Search Results</a>`);
          }
        })
        .catch(() => {
          addMessage("bot", "⚠️ Sorry, I couldn’t reach search services.");
        });
    }
  }

  function addMessage(sender, text) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.innerHTML = text;
    botChatBox.appendChild(msg);
    botChatBox.scrollTop = botChatBox.scrollHeight;
  }
}
