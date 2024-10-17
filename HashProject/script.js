document.querySelector("nav").addEventListener("click", (event) => {
  if (event.target.nodeName != "I") return;
  let data;
  switch (event.target.getAttributeNode("item-id").value) {
    case "home":
      data = { title: "HOME", color: "red", itemId: "home" };
      update(data);
      history.pushState(data, "home", "home");
      break;
    case "likes":
      data = { title: "LIKES", color: "blue", itemId: "likes" };
      update(data);
      history.pushState(data, "likes", "likes");
      break;

    case "profile":
      data = { title: "PROFILE", color: "yellow", itemId: "profile" };
      update(data);
      history.pushState(data, "profile", "profile");
      break;
    case "search":
      data = { title: "SEARCH", color: "green", itemId: "search" };
      update(data);
      history.pushState(data, "search", "search");
      break;
  }
});

window.addEventListener("popstate",e=>{
    if(history.state){
        update(history.state);
    }
})

function update(data){
    document.querySelector("h1").innerText=data.title;
    document.querySelector("main").style.backgroundColor=data.color;
    document.querySelectorAll("i").forEach(element=>{
        if(element.getAttributeNode("item-id").value===data.itemId){
            element.style.color ="black";
        }
        else{
        element.style.color ="#666";
        }
    })
}
