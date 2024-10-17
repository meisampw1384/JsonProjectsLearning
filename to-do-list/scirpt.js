let list = document.querySelector("#to-do-list");
let addInput = document.querySelector("#input-text");
let searchInput = document.querySelector("#search-form input");
let addBtn = document.querySelector("#add-button");

list.addEventListener("click", (event) => {
  if (event.target.nodeName === "BUTTON" && event.target.className === "bin") {
    event.target.parentNode.remove();
    if (list.children.length == 0) {
      let listEmptyMsg = document.createElement("div");
      listEmptyMsg.style.textAlign = "center";
      listEmptyMsg.style.color = "#333";
      listEmptyMsg.innerText = "your list is empty";
      listEmptyMsg.id = "emptyMsg";
      list.appendChild(listEmptyMsg);
    }
  }
});

addBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (!addInput.value) {
    return;
  }
  if (document.querySelector("#emptyMsg")) {
    document.querySelector("#emptyMsg").remove();
  }
  let newItem = document.createElement("li");
  newItem.className = "to-do-item";
  newItem.innerHTML = `<span class="title-item">${addInput.value}</span> <button class="bin">delete</button>`;
  list.appendChild(newItem);
  addInput.value = "";
});

searchInput.addEventListener("input", (event) => {
  Array.from(list.children).forEach((element) => {
    if (document.querySelector("#emptyMsg")) {
      return;
    }
    if (
      element
        .querySelector(".title-item")
        .innerText.toLowerCase()
        .includes(event.target.value.toLowerCase())
    ) {
        element.style.display = "flex";
    } else {
        element.style.display = "none";
    }
  });
});
