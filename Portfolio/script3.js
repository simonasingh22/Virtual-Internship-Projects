document.addEventListener("DOMContentLoaded", function() {
    // Example: Change the title of the "About Me" section on click
    const aboutTitle = document.querySelector("#about h2");

    aboutTitle.addEventListener("click", function() {
        aboutTitle.textContent = "All About Simona Singh";
    });
});
