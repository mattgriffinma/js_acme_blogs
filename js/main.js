const selectMenu = document.getElementById("selectMenu");

const createElemWithText = (elType = "p", textContent = "", className) => {
    const newEl = document.createElement(elType);
    const newContent = document.createTextNode(textContent);
    newEl.appendChild(newContent);
    if (className) {
        newEl.classList.add(className);
    }
    return newEl;
};

const createSelectOptions = (users) => {
    if (!users) return undefined;
    let arr = [];
    users.forEach(user => {
        newOption = document.createElement("option");
        newOption.setAttribute("id", user.id.toString());
        newOption.setAttribute("value", user.id.toString());
        newOption.textContent = user.name;
        arr.push(newOption);
    });
    return arr;
};

const toggleCommentSection = (postId) => {
    if (!postId) return undefined;
    const sections = Array.from(document.getElementsByTagName("section"))
    const section = sections.find(el => el.dataset.postId == postId);
    if (section === undefined) return null; 
    section.classList.toggle("hide");
    return section;
};

const toggleCommentButton = (postId) => {
    if (!postId) return undefined;
    const buttons = Array.from(document.getElementsByTagName("button"))
    const button = buttons.find(el => el.dataset.postId == postId);
    if (!button) return null;
    button.textContent = button.textContent === "Show Comments" ? "Hide Comments" : "Show Comments";
    return button;
};

const deleteChildElements = (parentElement) => {
    if (!(parentElement instanceof HTMLElement)) return undefined;
    while (parentElement.children.length > 0){
        const child = parentElement.lastElementChild;
        parentElement.removeChild(child);
    }
    return parentElement;
};

const addButtonListeners = () =>{
    const main = document.querySelector("main");
    const buttons = main.querySelectorAll("button");
    if (buttons.length > 0){
        buttons.forEach(button => {
            if(button.dataset.postId){
                button.addEventListener("click", (e)=>{
                    toggleComments(e, button.dataset.postId);
                })
            }
        });
    }return buttons;
};

const removeButtonListeners= () => {
    const main = document.querySelector("main");
    const buttons = main.querySelectorAll("button");
    if (buttons.length > 0){
        buttons.forEach(button => {
            if(button.dataset.postId){
                button.removeEventListener("click", (e)=>{
                    toggleComments(e, button.dataset.postId);
                })
            }
        });
    }return buttons;
}

const createComments = (comments) =>{
    if (!comments) return undefined;
    const dFrag = document.createDocumentFragment();
    comments.forEach(comment=>{
       const article = document.createElement("article");
       const heading = document.createElement("h3");
       heading.textContent = comment.name;
       const commentBody = document.createElement("p");
       commentBody.textContent = comment.body;
       const poster = document.createElement("p");
       poster.textContent = `From: ${comment.email}`;
       article.appendChild(heading);
       article.appendChild(commentBody);
       article.appendChild(poster);
       dFrag.appendChild(article);
    })
    return dFrag;
 }