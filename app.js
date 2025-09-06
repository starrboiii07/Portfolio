// Initialize EmailJS
(function() {
  emailjs.init("RiZcAsUCwbIUA5a-7"); // Replace with your actual EmailJS Public Key
})();

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm("service_90nvtdm", "template_fa2b3d5", this)
      .then(() => {
        alert("Message sent successfully! 🚀");
        form.reset(); // Clear form after sending
      })
      .catch(err => {
        alert("Error: " + JSON.stringify(err));
      });
  });
});
