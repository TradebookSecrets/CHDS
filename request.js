// === Recovery & Deletion Request Form ===
const requestForm = document.getElementById("requestForm");
const statusBox = document.getElementById("status");

if (requestForm) {
  requestForm.addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.sendForm("service_yoa6yjz", "template_bj8slhv", this)
      .then(() => {
        statusBox.innerHTML = "<p style='color:lime;'>✅ Request sent successfully! We will contact you soon.</p>";
        requestForm.reset();
      })
      .catch((error) => {
        statusBox.innerHTML = "<p style='color:red;'>❌ Failed to send. Please try again.</p>";
        console.error("EmailJS Error:", error);
      });
  });
}
