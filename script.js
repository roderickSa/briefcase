function scrollToElement(elementSelector, instance = 0) {
  const elements = document.querySelectorAll(elementSelector);

  if (elements.length > instance) {
    elements[instance].scrollIntoView({ behavior: "smooth" });
  }
}

const projects = document.getElementById("projects");
const contact = document.getElementById("contact");
const buttonElements = document.getElementsByClassName("btn");

projects.addEventListener("click", () => {
  scrollToElement(".header");
});

contact.addEventListener("click", () => {
  scrollToElement(".column");
});

for (let buttonElement of buttonElements) {
  buttonElement.addEventListener("click", (event) => {
    const links_element =
      event.target.parentElement.getElementsByClassName("link-to-project");
    if (links_element.length > 0) {
      links_element[0].click();
    }
  });
}
