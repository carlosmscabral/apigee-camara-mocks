const transferForm = document.getElementById("transferForm");
const messageDiv = document.getElementById("message");
const amountInput = document.getElementById("amount");
const transferSubmitButton = document.querySelector("#transferForm button[type='submit']");

const textForm = document.getElementById("textForm");
const textFormMessageDiv = document.getElementById("textFormMessage");

if (transferForm) {
    transferForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        messageDiv.textContent = ""; // Clear any previous messages
        messageDiv.className = "mt-3"; // Reset classes, but keep margin

        // Basic input validation
        if (!amountInput.value || isNaN(amountInput.value)) {
            messageDiv.textContent = "Please enter a valid amount.";
            messageDiv.className += " error"; // Add 'error' class
            return;
        }

        // Disable the submit button and show a loading indicator
        transferSubmitButton.disabled = true;
        transferSubmitButton.textContent = "Transferring...";

        const formData = new FormData(transferForm);
        try {
            const response = await fetch("/transfer", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            messageDiv.textContent = result.message;
            messageDiv.className += ` ${result.status}`; // Add status class

            if (result.status === "success") {
                setTimeout(() => {
                    location.reload(); // Reload the page
                }, 2000);
            }
        } catch (error) {
            messageDiv.textContent = "An error occurred.";
            messageDiv.className += " error"; // Add 'error' class
        } finally {
            // Re-enable the button and reset text
            transferSubmitButton.disabled = false;
            transferSubmitButton.textContent = "Transfer";
        }
    });
}

if (textForm) {
    textForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        textFormMessageDiv.textContent = ""; // Clear any previous messages
        textFormMessageDiv.className = "mt-3"; // Reset classes, but keep margin

        const formData = new FormData(textForm);
        try {
            const response = await fetch("/submit-text", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            textFormMessageDiv.textContent = result.message;
            textFormMessageDiv.className += ` ${result.status}`; // Add status class
        } catch (error) {
            textFormMessageDiv.textContent = "An error occurred.";
            textFormMessageDiv.className += " error"; // Add 'error' class
        }
    });
}