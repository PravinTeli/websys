export function attachFormValidation() {
  // ...your validation logic for the contact form
}
export function attachPostFormValidation()
 {
  const form = document.getElementById('createPostForm');
  const titleInput = document.getElementById('title');
  const bodyInput = document.getElementById('body');
  const messageBox = document.getElementById('post-message');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors(form);

    let valid = true;

    if (titleInput.value.trim().length < 5) {
      showError(titleInput, "Title must be at least 5 characters.");
      valid = false;
    }

    if (bodyInput.value.trim().length < 20) {
      showError(bodyInput, "Body must be at least 20 characters.");
      valid = false;
    }

    if (!valid) return;

    // Simulated submission
    messageBox.textContent = "Submitting post...";
    messageBox.style.color = "var(--accent-gold)";
    
    setTimeout(() => {
      // Redirect with query parameter
      window.location.href = "index.html?submitted=true";
    }, 1500);
  });
}
