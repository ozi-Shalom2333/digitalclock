const clock = document.getElementById("clock");
const date = document.getElementById("date");
const themeToggle = document.getElementById("theme-toggle");

// Update the clock every second
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format

    const formattedTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)} ${ampm}`;
    const formattedDate = now.toDateString();

    clock.textContent = formattedTime;
    date.textContent = formattedDate;

    // Optional: Add a slight animation effect
    clock.classList.add("updated");
    setTimeout(() => clock.classList.remove("updated"), 100);

    // Play ticking sound 
    const tickSound = document.getElementById("tick-sound");
    if (tickSound) {
        tickSound.play().catch(error => console.log("Audio playback failed:", error));
    }
}

function pad(n) {
    return n.toString().padStart(2, '0');
}

// Toggle theme
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Save preference to localStorage
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

// Load saved theme preference
window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
    updateClock();
    setInterval(updateClock, 1000);
});