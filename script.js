document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Form validation
    const form = document.querySelector("form");
    form.addEventListener("submit", function(e) {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const age = document.getElementById("age").value;

        if (name === "" || email === "" || password.length < 6 || age < 18) {
            e.preventDefault();
            alert("Please fill out all fields correctly.");
        }
    });

    // Theme switcher
    const toggleThemeBtn = document.createElement("button");
    toggleThemeBtn.innerText = "Toggle Theme";
    toggleThemeBtn.style.position = "fixed";
    toggleThemeBtn.style.bottom = "20px";
    toggleThemeBtn.style.right = "20px";
    toggleThemeBtn.style.padding = "10px";
    toggleThemeBtn.style.background = "#4a90e2";
    toggleThemeBtn.style.color = "white";
    toggleThemeBtn.style.border = "none";
    toggleThemeBtn.style.borderRadius = "5px";
    toggleThemeBtn.style.cursor = "pointer";

    document.body.appendChild(toggleThemeBtn);

    toggleThemeBtn.addEventListener("click", function() {
        document.body.classList.toggle("dark-theme");
    });

    // Ensure input text and placeholders contrast properly in dark mode
    const style = document.createElement("style");
    style.innerHTML = `
        .dark-theme input::placeholder {
            color: #ccc;
        }
    `;
    document.head.appendChild(style);
});
