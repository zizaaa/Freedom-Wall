const addBtn = document.getElementById('addBtn');

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

let bool;
const stlData = JSON.parse(localStorage.getItem('bool'));
if(stlData!=null){
    bool=stlData;
}else{
   bool = true;
}
    document.getElementById('comments').addEventListener('submit',(e)=>{
        e.preventDefault();
        let userComments = comment.value;
        let usernickName = nickName.value;
        //check nickname
        if(usernickName.length > 0 && userComments.length > 0){
            saveComments(userComments,usernickName);
            comment.value='';
            nickName.value='';
            const form = document.getElementById('comments');
            form.style = 'z-index:0; transform: scale(0);';
            bool=false;
            stl();
            window.location.reload(true);
        }else{
            const form = document.getElementById('comments');
            form.style = 'z-index:2; transform: scale(1);';
        }
    });
const stl=()=>{
    JSON.stringify(localStorage.setItem('bool',bool));
};

// stl();
const saveComments = (userComments,usernickName)=>{
    comments.push({
        comment:userComments,
        nickname:usernickName  
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
            let positionTop = Math.floor(Math.random()*1000);
            let positionLeft = Math.floor(Math.random()*85);
            let positionT = positionTop + 'px';
            let positionL = positionLeft + '%';
            //color picker
            let backgroundColor = ['lightcoral','lightblue','lightpink','lightskyblue','lightseagreen'];
            let randomColorPicker = Math.floor(Math.random()*backgroundColor.length);
            let pinColor = ['darkblue','darkgreen','darkred','yellow','black'];
            let randompinColorPicker = Math.floor(Math.random()*pinColor.length);

            const commentBox = document.createElement('div');
            commentBox.classList.add('comment-box');
            commentBox.setAttribute('class','commentBox');
            commentBox.style = `cursor:pointer; position: absolute; max-width: 15rem; top:${positionT}; left:${positionL};  overflow-wrap: break-word; background-color:${backgroundColor[randomColorPicker]}; padding:20px; margin:20px; box-shadow:1px 1px 2px 2px rgba(0, 0, 0, 0.1);`;
            
            const icon = document.createElement('p');
            icon.innerHTML = '<i class="fa-solid fa-map-pin"></i>';
            icon.style = `position:absolute; top:-9px;left:50%; color:${pinColor[randompinColorPicker]};`;
            
            const comment = document.createElement('p');
            comment.innerHTML = '\"' + datas.comment + '\"';
            comment.classList.add('comment');
            comment.setAttribute('id','comment');
            comment.setAttribute('value',`${datas.comment}`);
            
            const author = document.createElement('p');
            author.innerText = '-'+datas.nickname;

            commentContainer.appendChild(commentBox);
            commentBox.appendChild(icon);
            commentBox.appendChild(comment);
            commentBox.appendChild(author);
        
    });
    
}); 


//coutdown
const timer=()=>{
    if(localStorage.getItem("count_timer")){
        var count_timer = localStorage.getItem("count_timer");
    } else {
        var count_timer = 60*0.3+2;
    }
    var seconds = parseInt(count_timer%60);
    function countDownTimer(){
        document.getElementById("countdown").innerHTML = seconds;
        if(count_timer <= 0){
            bool=true;
            stl();
            // localStorage.clear("count_timer");
            count_timer=60*0.3+2;
            localStorage.setItem("count_timer",count_timer);
            window.location.reload(true);
        } else {
            count_timer = count_timer -1 ;
            seconds = parseInt(count_timer%60);
            localStorage.setItem("count_timer",count_timer);
            setTimeout(countDownTimer,1000);
        }
    }
    setTimeout(countDownTimer,1000);
   

};

//open the form

if(bool === true || bool === 'true'){
    addBtn.addEventListener('click',()=>{
        const form = document.getElementById('comments');
        form.style = 'z-index:2; transform: scale(1);';
    });
}else if(bool === false||bool==='false'){
    const form = document.getElementById('comments');
    form.style = 'z-index:0; transform: scale(0);';
    document.getElementById('addBtn').disabled=true;
    timer();
}





//close form
let exit = document.getElementById('exit').addEventListener('click',()=>{
    const form = document.getElementById('comments');
    form.style = 'z-index:0; transform: scale(0);';
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