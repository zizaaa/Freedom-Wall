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
let nickName = document.getElementById('nickname');

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
let comments = firebase.database().ref('/Freedom Wall/');

    document.getElementById('comments').addEventListener('submit',(e)=>{
        e.preventDefault();
        let userComments = comment.value;
        let usernickName = nickName.value;
        //check nickname
        if(usernickName==''){
            usernickName='Unknown';
        }
        saveComments(userComments,usernickName);
        comment.value='';
        nickName.value='';
        const form = document.getElementById('comments');
        form.style = 'z-index:0; transform: scale(0);';
    });



const saveComments = (userComments,usernickName)=>{
    comments.push({
        comment:userComments,
        nickname:usernickName
        // personalId:personalID
    });
};


//retrieve datas from database
//append to DOM
    comments.on("value",(snapchat)=>{
        const commentContainer = document.getElementById('commentsContainer');
        commentContainer.innerHTML='';
        snapchat.forEach(element => {
            let datas = element.val();
            //position setter
            let positionTop = Math.floor(Math.random()*100);
            let positionLeft = Math.floor(Math.random()*100);
            let degreePosition = Math.floor(Math.random()*360);
            let positionT = positionTop + '%';
            let positionL = positionLeft + '%';
            let deg = degreePosition + 'deg';
            //color picker
            let backgroundColor = ['lightcoral','lightblue','lightpink','lightskyblue','lightseagreen'];
            let randomColorPicker = Math.floor(Math.random()*backgroundColor.length);

            const commentBox = document.createElement('div');
            commentBox.classList.add('comment-box');
            const icon = document.createElement('p');
            icon.innerHTML = '<i class="fa-solid fa-map-pin"></i>';
            icon.style = 'position:absolute; top:-9px;left:0; color:darkblue;';
            const comment = document.createElement('p');
            comment.innerHTML = '\"' + datas.comment + '\"';
            comment.classList.add('comment');
            comment.setAttribute('value',`${comment}`);
            commentBox.style = `position: absolute; max-width: 10rem; top:${positionT}; left:${positionL}; transform:rotate(${deg}); overflow-wrap: break-word; background-color:${backgroundColor[randomColorPicker]}; padding:20px; margin:20px; box-shadow:2px 2px 2px 2px rgba(0, 0, 0, 0.1);`;
            const author = document.createElement('p');
            author.innerText = '-'+datas.nickname;

            commentContainer.appendChild(commentBox);
            commentBox.appendChild(icon);
            commentBox.appendChild(comment);
            commentBox.appendChild(author);
         
            console.log(datas);

        });
        

    });
    
// set nickname
// let nickName;

// //recover nickname from local storage
// const savedNickName =localStorage.getItem('nickName');
// nickName=savedNickName;

// if (nickName === null) {
//     document.getElementById('nick-name').style = 'z-index:2; transform: scale(1);';
// } else {
//     document.getElementById('nick-name').style = 'z-index:0; transform: scale(0);';
// }

// //save nickname to firebase
// //reference your database
// let nickNames = firebase.database().ref('/Freedom Wall/' + 'nicknames');

// const nickname = document.getElementById('nickName');
// document.getElementById('nick-name').addEventListener('submit',(e)=>{
//     e.preventDefault();
//     const nickNameValue = nickname.value;
    
//     nickName=nickNameValue;
//     saveNickName();
//     nickNames.push({
//         Nickname:nickName,
//         // personalId:personalID
//     });

//     //generate personal ID
//     // personalID = Math.random();
// });



//save nickname to local storage
// const saveNickName =()=>{
//   localStorage.setItem('nickName',nickName);
// };

// console.log(nickName);
// console.log(personalID);