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
       const heading = createElemWithText("h3", comment.name)
       const body = createElemWithText("p", comment.body)
       const poster = createElemWithText("p",  `From: ${comment.email}`);
       article.appendChild(heading);
       article.appendChild(body);
       article.appendChild(poster);
       dFrag.appendChild(article);
    })
    return dFrag;
 };

 const populateSelectMenu = users => {
    if (!users) return undefined;
    const selectMenu = document.getElementById("selectMenu");
    options = createSelectOptions(users);
    options.forEach(option => {
        selectMenu.appendChild(option);
    })
    return selectMenu;
 }

 const getUsers = async () => {
    const url = "https://jsonplaceholder.typicode.com/users/"
    try{
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }   
        const users = await response.json();
        return users;
    } catch(err) {
        console.error(err.message);
    }
 }

 const getUserPosts = async (userId) => {
    if (!userId) return undefined;
    const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }   
        const posts = await response.json();
        return posts;
    } catch(err) {
        console.error(err.message);
    }
 }

 const getUser = async userId => {
    if (!userId) return undefined;
    const url = `https://jsonplaceholder.typicode.com/users?id=${userId}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }   
        const user = await response.json();
        return user[0];
    } catch(err) {
        console.error(err.message);
    }
 }

 const getPostComments = async (postId) => {
    if (!postId) return undefined;
    const url = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }   
        const comments = await response.json();
        return comments;
    } catch(err) {
        console.error(err.message);
    }
 }

 const displayComments = async postId => {
    if (!postId) return undefined;
    const section = document.createElement("section");
    section.dataset.postId = postId;
    section.classList.add("comments");
    section.classList.add("hide");
    const comments = await getPostComments(postId);
    const dFrag = createComments(comments);
    section.appendChild(dFrag);
    return section;
 }

 const createPosts = async postsData =>{
    if (!postsData) return undefined;
    const dFrag = document.createDocumentFragment();
    for (let postKey in postsData){
        let post = postsData[postKey];
        const article = document.createElement("article");
        
        const h2 = createElemWithText("h2", post.title);
        const bodyPara = createElemWithText("p", post.body);
        const idPara = createElemWithText("p", `Post ID: ${post.id}`);
        const  author = await getUser(post.userId);
        const authorPara = createElemWithText("p", `Author: ${author.name} with ${author.company.name}`);
        const catchPhrase = createElemWithText("p", author.company.catchPhrase);
        const button = createElemWithText("button", "Show Comments");
        button.dataset.postId = post.id;
        const section = await displayComments(post.id);
        
        article.appendChild(h2);
        article.appendChild(bodyPara);
        article.appendChild(idPara);
        article.appendChild(authorPara);
        article.appendChild(catchPhrase);
        article.appendChild(button);
        article.appendChild(section);
        
        dFrag.appendChild(article);
        
       
        
    }
    return dFrag;    
 }

 
 const displayPosts = async postsData =>{
    const main = document.getElementsByTagName("main")[0];
    if (!postsData){
        para = createElemWithText("p", "Select an Employee to display their posts.");
        para.classList.add("default-text");
        return para;
    } else {
        const posts = await createPosts(postsData);
        main.appendChild(posts);
        return posts;
    }    
 }
    

 const toggleComments = (event, postId) => {
    if (!event || !postId) return undefined;
    event.target.listener = true;
    const section = toggleCommentSection(postId);
    const button = toggleCommentButton(postId);
    return [section, button];
 }

 const refreshPosts =  async (posts) => {
    if (!posts) return undefined;
    const main = document.getElementsByTagName("main")[0];
    const deafButtons = removeButtonListeners();
    const emptyMain = deleteChildElements(main);
    const dFrag = await displayPosts(posts);
    const listeningButtons = addButtonListeners();
    return [deafButtons, emptyMain, dFrag, listeningButtons];
 }

 const selectMenuChangeEventHandler = async (event) => {
    if (!event) return undefined;
    const selectMenu = document.getElementById("selectMenu");
    selectMenu.disabled = true;
    console.log(event);
    const userId = event?.target?.value || 1;
    
    const posts = await getUserPosts(userId);
    const refreshArrayPosts = await refreshPosts(posts);
    selectMenu.disabled = false;
    const arr = [userId, posts, refreshArrayPosts];
    return arr;
 }


 
const initPage = async ()=> {
    const users = await getUsers();
    const select = populateSelectMenu(users);
    return [users,select];
}
    


const initApp = async () => {
    initPage();
    const selectMenu = document.getElementById("selectMenu");
    selectMenu.addEventListener("change", selectMenuChangeEventHandler);
};


document.addEventListener("DOMContentLoaded", initApp);
