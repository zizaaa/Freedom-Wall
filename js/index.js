const addBtn = document.getElementById('addBtn');

//open the form
addBtn.addEventListener('click',()=>{
    const form = document.getElementById('comments');
    form.style = 'z-index:2; transform: scale(1);';
});
//close form
let exit = document.getElementById('exit').addEventListener('click',()=>{
    const form = document.getElementById('comments');
    form.style = 'z-index:0; transform: scale(0);';
});


let comment = document.getElementById('comment');

const firebaseConfig = {
    apiKey: "AIzaSyC5d8piNDK-4gY9udFFsQYKSr9XQtmnWr4",
    authDomain: "freedom-wall-c8db6.firebaseapp.com",
    databaseURL: "https://freedom-wall-c8db6-default-rtdb.firebaseio.com",
    projectId: "freedom-wall-c8db6",
    storageBucket: "freedom-wall-c8db6.appspot.com",
    messagingSenderId: "599351448161",
    appId: "1:599351448161:web:00093ab2805013dbc05020"
  };

//initialize firebase
  firebase.initializeApp(firebaseConfig);


//reference your database
let comments = firebase.database().ref('/Freedom Wall/' + 'Comments');

document.getElementById('comments').addEventListener('submit',(e)=>{
    e.preventDefault();
    let userComments = comment.value;
    console.log(userComments);
    saveComments(userComments);
    comment.value='';
    const form = document.getElementById('comments');
    form.style = 'z-index:0; transform: scale(0);';
});

const saveComments = (userComments)=>{
    comments.push({
        comment:userComments,
    });
};


//retrieve datas from database
//append to DOM
    comments.on("value",(snapchat)=>{
        snapchat.forEach(element => {
            let datas = element.val();
            console.log(datas);
            
            //position setter
            let positionTop = Math.floor(Math.random()*100);
            let positionLeft = Math.floor(Math.random()*100);
            let degreePosition = Math.floor(Math.random()*360);
            let positionT = positionTop + '%';
            let positionL = positionLeft + '%';
            let deg = degreePosition + 'deg';
            console.log(positionTop,positionLeft);

            const commentContainer = document.getElementById('commentsContainer');
            const commentBox = document.createElement('div');
            commentBox.classList.add('comment-box');
            const comment = document.createElement('p');
            comment.innerHTML = '\"' + datas.comment + '\"';
            comment.classList.add('comment');
            comment.setAttribute('value',`${comment}`);
            comment.style = `position: absolute; max-width: 10rem; top:${positionT}; left:${positionL}; transform:rotate(${deg}); overflow-wrap: break-word;`;
            const author = document.createElement('p');
            author.innerText = datas.nicknames;

            commentContainer.appendChild(commentBox);
            commentBox.appendChild(comment);
        });
    });


// set nickname
let nickName;

//recover nickname from local storage
const savedNickName = localStorage.getItem('nickName');
nickName=savedNickName;

if (nickName === null) {
    document.getElementById('nick-name').style = 'z-index:2; transform: scale(1);';
} else {
    document.getElementById('nick-name').style = 'z-index:0; transform: scale(0);';
}

const nickname = document.getElementById('nickName');
document.getElementById('nick-name').addEventListener('submit',(e)=>{
    const nickNameValue = nickname.value;
    
    nickName=nickNameValue;
    saveNickName();
});

//save nickname to local storage
const saveNickName =()=>{
    localStorage.setItem('nickName',nickName);
};

console.log(nickName );

//save nickname to firebase
//reference your database
let nickNames = firebase.database().ref('/Freedom Wall/' + 'nicknames').set({nickname:nickName});