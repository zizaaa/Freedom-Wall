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
            const form = document.getElementById('formContainer');
            form.style = 'z-index:4; transform: scale(1);';
        }
        
    });

//save to local storage
const stl=()=>{
    JSON.stringify(localStorage.setItem('bool',bool));
};

const saveComments = (userComments,usernickName)=>{
    //date picker
    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
        let time=formatAMPM(new Date);
    //push data to database
    comments.push({
        comment:userComments,
        nickname:usernickName,
        time:time
    });
};

//limit the post
comments.on("value",(element)=>{
    let c=0;
    let limit = 100;
    let data = element.val();
    for(let i in data){
        c++;
    }
    document.getElementById('numberofComments').innerHTML = limit-c;
          if(c > 100){
            document.getElementById('addBtn').disabled=true;
            document.getElementById("countdown").innerHTML = 'Limit exceeded. Please wait...';

        }else{
            document.getElementById('addBtn').disabled=false;
            document.getElementById("countdown").innerHTML = '';
        }
});

//retrieve datas from database
//append to DOM
const main=()=>{
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
            let backgroundColor = ['lightcoral','lightblue','lightpink','lightskyblue','lightseagreen','lightsalmon','lightgreen','rgb(36, 214, 214)'];
            let randomColorPicker = Math.floor(Math.random()*backgroundColor.length);
            //degree picker
            let deg=[];
            let positiveDeg = Math.floor(Math.random()*30);
            deg.push(positiveDeg);
            let negativeDeg = Math.floor(Math.random()*-30);
            deg.push(negativeDeg);
            let picker = Math.floor(Math.random()*deg.length);
            let rotdeg = deg[picker]+'deg';
            deg=[];

            //container
            // const commentBoxContainer = document.createElement('div');
            // commentBoxContainer.setAttribute('id','commentBoxContainer');
            // commentBoxContainer.classList.add('commentBoxContainer');
            // commentBoxContainer.style = `height:auto;transform: rotate(${rotdeg}); position: absolute; top:${positionT}; left:${positionL}; max-width: 15rem; `;
            //comment
            const commentBox = document.createElement('div');
            commentBox.classList.add('comment-box');
            commentBox.setAttribute('class','commentBox');
            commentBox.setAttribute('value',`${element.key}`);
            commentBox.style = `transform: rotate(${rotdeg}); position: absolute; top:${positionT}; left:${positionL};cursor:pointer;max-width: 15rem;  overflow-wrap: break-word; background-color:${backgroundColor[randomColorPicker]}; padding:20px; box-shadow:-2px 2px 2px 2px rgba(0, 0, 0, 0.5);`;
            //unhide post
            commentBox.addEventListener('click',(e)=>{
                commentBox.style = `transition:all .8s;z-index:2;cursor:pointer; position: absolute; max-width: 15rem; top:${positionT}; left:${positionL};  overflow-wrap: break-word; background-color:${backgroundColor[randomColorPicker]}; padding:20px; box-shadow:-2px 2px 2px 2px rgba(0, 0, 0, 0.5);`;
            });
            commentBox.addEventListener('mouseleave',(e)=>{
                commentBox.style = `transition:all .8s; z-index:0;transform:rotate(${rotdeg});cursor:pointer; position: absolute; max-width: 15rem; top:${positionT}; left:${positionL};  overflow-wrap: break-word; background-color:${backgroundColor[randomColorPicker]}; padding:20px; box-shadow:-2px 2px 2px 2px rgba(0, 0, 0, 0.5);`;
            });
            
            const iconDev = document.createElement('div');
            const icon = document.createElement('img');
            icon.setAttribute('src','img/pin.png');
            icon.style = 'width: 35px;';
            iconDev.appendChild(icon);
            iconDev.style = `position:absolute; top:-15px;left:45%;`;
            
            const comment = document.createElement('p');
            comment.innerHTML = '\"' + datas.comment + '\"';
            comment.classList.add('comment');
            comment.setAttribute('id','comment');
            comment.setAttribute('value',`${datas.comment}`);
            
            const author = document.createElement('p');
            author.innerText = '-'+datas.nickname;
            author.style = 'margin-top:5px;';

            const secContainer = document.createElement('div');
            secContainer.style = 'display:flex; justify-content:space-between; align-items:center;';
            secContainer.classList.add('secContainer');
            secContainer.setAttribute('id','secContainer');

            const time = document.createElement('p');
            time.innerHTML = datas.time;
            time.style =  'font-size:10px; margin-top:20px;';

            const replyBtn = document.createElement('button');
            replyBtn.innerText = 'reply';
            replyBtn.style = 'font-size:10px; margin-top:20px; border:none;background-color:transparent; cursor:pointer;';
            // replyBtn.setAttribute('onclick','reply()');
            replyBtn.addEventListener('click',(e)=>{
                alert('Please wait for the next update. Thankyou\n\n-Dev');
                // let reply = document.createElement('div');
                // reply.style = 'background-color:green; position:absolute; bottom: -150px;left: 5px; right:5px;overflow-wrap: break-word; min-height:10rem; padding:20px;';
                // let replyText = document.createElement('p');
                // replyText.innerText = 'Hello this is reply';
                // let replyAuthor = document.createElement('p');
                // replyAuthor.innerText = '-ziza';
                // reply.appendChild(replyText);
                // reply.appendChild(replyAuthor);
                // commentBox.appendChild(reply);
                // console.log('reply');
                // -NKCrTzTzJgsg_gUTKAT
                //reference your database
                // let replys = firebase.database().ref('/Freedom Wall/'+'NKCrTzTzJgsg_gUTKAT');
                // replys.push({
                //     reply:'hello'
                // });
            });
            
            // commentContainer.appendChild(commentBoxContainer);
            commentContainer.appendChild(commentBox);
            // commentBoxContainer.appendChild(commentBox);
            commentBox.appendChild(iconDev);
            commentBox.appendChild(comment);
            commentBox.appendChild(author);
            commentBox.appendChild(secContainer);
            secContainer.appendChild(time);
            secContainer.appendChild(replyBtn);
    });

}); 
};
main();

// const reply=()=>{
    
//     let commentBox = document.querySelector('.commentBox');
//     console.log(commentBox);
// };
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
        const form = document.getElementById('formContainer');
        // form.style = 'z-index:4; transform: scale(1);';
        form.style = 'z-index:0; transform: scale(0);';
        alert('Our website is under maintenance. Please comeback later.\n\n-Dev');
    });
}else if(bool === false||bool==='false'){
    const form = document.getElementById('formContainer');
    form.style = 'z-index:0; transform: scale(0);';
    document.getElementById('addBtn').disabled=true;
    timer();
}

//close form
let exit = document.getElementById('exit').addEventListener('click',()=>{
    const form = document.getElementById('formContainer');
    form.style = 'z-index:0; transform: scale(0);';
});
