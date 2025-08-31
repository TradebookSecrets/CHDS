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
