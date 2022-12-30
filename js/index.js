//admin
document.querySelector('.partylist-logo-container').addEventListener('click',()=>{
    let psw = 'AMACCNAGACOVIDPARTYLIST2022';
    let pass = prompt('Please Password');
    if(pass === psw){
        let al = confirm('Access Granted');
        if(al){
        document.querySelector('.partylist-logo-container').setAttribute('href','AdminSide/adminIndex.html');
        }
    }else{
        alert('Access Denied');
    }
});

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
        let day = date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();
        // hours = hours ? hours : 12; // the hour '0' should be '12'
        // minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm + ' ' + month+'/'+day+'/'+year;
        return strTime;
    }
    let time=formatAMPM(new Date);


    //push data to database
    comments.push({
        comment:userComments,
        nickname:usernickName,
        time:time,
        ip:localStorage.getItem('userIp')
    });
    
};
    //save user IP to database
    let tf;
    let saved = localStorage.getItem('tf');
    if( saved!=null){
        tf = saved;
    }else{
        tf = true;
    }
        //check ip if still in database
        let userIP = firebase.database().ref('/UserIP/');
        userIP.on("value",(IP)=>{
            let arr=['192.168.1.1'];
            IP.forEach(ips=>{
                let ipData = ips.val();
                arr.push(ipData.IP);

            });
            setTimeout(()=>{
                console.log(arr);
                for(let i = 0;i<arr.length;i++){
                if(arr[i]===localStorage.getItem('userIp')){
                    console.log('true');
                    tf = false;
                    localStorage.setItem('tf',tf);
                }else{
                    console.log('false');
                    tf = true;
                    localStorage.setItem('tf',tf);
                }
                console.log(localStorage.getItem('userIp'));
                }
            },1000);
        });
    if(tf === true || tf ==='true'){
        let userIP = firebase.database().ref('/UserIP/');
        userIP.push({
            IP:localStorage.getItem('userIp')
        });
        tf = false;
        localStorage.setItem('tf',tf);
    }else{
        console.log('l');
    }


    //generate API
        $.getJSON("https://api.ipify.org?format=json", genIP=(data)=> {
        // Setting text of element P with id gfg
        let ip = data.ip;
        const saveIP=()=>{
            localStorage.setItem('userIp',ip);
        };
        saveIP();
        });

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
                const commentBoxContainer = document.createElement('div');
                commentBoxContainer.setAttribute('id','commentBoxContainer');
                commentBoxContainer.classList.add('commentBoxContainer');
                commentBoxContainer.style = `display:flex; flex-direction:column;align-items: center;justify-content: center; height:auto;transform: rotate(${rotdeg}); position: absolute; top:${positionT}; left:${positionL}; max-width: 15rem; `;
                
                
                // reportBtn
                const reportBtn = document.createElement('button');
                reportBtn.style = 'font-size:10px;cursor:pointer;position:absolute; background-color:transparent;border:none; color:red; right:10px; top:10px;';
                reportBtn.innerHTML = 'report';
                reportBtn.setAttribute('id',datas.ip);
                reportBtn.setAttribute('value', datas.comment);
                reportBtn.addEventListener('click',(e)=>{
                    let ip = e.target.id;
                    let reportedMessage = e.target.value;
                    localStorage.setItem('ReportedMessage',reportedMessage);
                    localStorage.setItem('ReportedIp',ip);
                    let reportForm = document.getElementById('reportformcontainer');
                    reportForm.style = 'transform:scale(1); z-index:4;';
                });


                //comment
                const commentBox = document.createElement('div');
                commentBox.classList.add('comment-box');
                commentBox.setAttribute('class','commentBox');
                commentBox.setAttribute('value',`${element.key}`);
                commentBox.style = `position:relative;cursor:pointer;max-width: 15rem;  overflow-wrap: break-word; background-color:${backgroundColor[randomColorPicker]}; padding:40px 20px; box-shadow:-2px 2px 2px 2px rgba(0, 0, 0, 0.5);`;
                //unhide post
                commentBoxContainer.addEventListener('click',(e)=>{
                    commentBoxContainer.style = `z-index:2; display:flex; flex-direction:column;align-items: center; justify-content: center;transition:all .8s; position: absolute; max-width: 15rem; top:${positionT}; left:${positionL};`;
                    commentBox.style = `overflow-wrap: break-word;max-width: 15rem; background-color:${backgroundColor[randomColorPicker]};z-index:2;cursor:pointer;  padding:40px 20px; box-shadow:-2px 2px 2px 2px rgba(0, 0, 0, 0.5);`;
                    // document.getElementById('replyContainer').style = 'z-index:2; cursor:pointer;max-width: 15rem;  overflow-wrap: break-word; padding:20px; box-shadow:-2px 2px 2px 2px rgba(0, 0, 0, 0.5);';
                    
                });
                commentBoxContainer.addEventListener('mouseleave',(e)=>{
                    commentBoxContainer.style = `display:flex; flex-direction:column;align-items: center; justify-content: center;max-width: 15rem; top:${positionT}; left:${positionL}; position: absolute;transform:rotate(${rotdeg}); z-index:0;transition:all .8s;`;
                    commentBox.style = `cursor:pointer;  max-width: 15rem;  overflow-wrap: break-word; background-color:${backgroundColor[randomColorPicker]};  padding:40px 20px; box-shadow:-2px 2px 2px 2px rgba(0, 0, 0, 0.5);`;
                });
                
                const iconDev = document.createElement('div');
                const icon = document.createElement('img');
                icon.setAttribute('src','img/amapin.png');
                icon.style = 'width: 35px;';
                iconDev.appendChild(icon);
                iconDev.style = `position:absolute; top:-15px;left:45%;`;
                
                const comment = document.createElement('p');
                comment.innerHTML = '\"' + datas.comment + '\"';
                comment.classList.add('comment');
                comment.setAttribute('id',datas.id);
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
                

                let key = element.key;
                const replyBtn = document.createElement('button');
                replyBtn.innerText = 'reply';
                replyBtn.style = 'margin-left:20px;font-size:10px; margin-top:20px; border:none;background-color:transparent; cursor:pointer;';
                replyBtn.setAttribute('id',key);
                replyBtn.classList.add('replyBtn');
                
                //reply btn
                replyBtn.addEventListener('click',(e)=>{
                    const replyContainer = document.querySelector('.replyformcontainer');
                    let id = e.target.id;
                    window.location.reload(true);
                    let dc = true;
                        sessionStorage.setItem('id',id);
                        sessionStorage.setItem('dc',dc);
                        openReply();
                });
                const openReply=()=>{
                    let dc = sessionStorage.getItem('dc');
                    if(dc === true || dc === 'true'){
                        const replyContainer = document.querySelector('.replyformcontainer');
                        replyContainer.style = 'z-index:5; transform:scale(1);';
                    }else{
                        const replyContainer = document.querySelector('.replyformcontainer');
                        replyContainer.style = 'z-index:0; transform:scale(0);';
                    }
                };
                openReply();

                

                //appends to DOM
                commentContainer.appendChild(commentBoxContainer);
                // commentContainer.appendChild(commentBox);
                commentBoxContainer.appendChild(commentBox);
                commentBox.appendChild(reportBtn);
                commentBox.appendChild(iconDev);
                commentBox.appendChild(comment);
                commentBox.appendChild(author);
                commentBox.appendChild(secContainer);
                secContainer.appendChild(time);
                secContainer.appendChild(replyBtn);   
                

                //retreive data in DB and append to DOM 
                let replys = firebase.database().ref('/Freedom Wall/' + key +'/reply/');
                replys.on("value",(copy)=>{
                    copy.forEach(e=>{
                        //random color
                        let gencol = ['lightcoral','lightblue','lightpink','lightskyblue','lightseagreen','lightsalmon','lightgreen','rgb(36, 214, 214)'];
                        let gencolpick = Math.floor(Math.random()*gencol.length);


                        let replyDatas = e.val();

                        const connector = document.createElement('div');
                        connector.style = 'width:1px; height:15px; position:relative; border:1px dashed white;';
                        connector.classList.add('connector');
                        connector.setAttribute('id','connector');
                        
                        const reportBtn = document.createElement('button');
                        reportBtn.style = 'font-size:10px;position:absolute; background-color:transparent;border:none; color:red; right:10px;top:10px; opacity:0.8; cursor:pointer;';
                        reportBtn.innerHTML = 'report';
                        reportBtn.setAttribute('id',replyDatas.ip);
                        reportBtn.setAttribute('value', replyDatas.replyText);
                        reportBtn.addEventListener('click',(e)=>{
                            let ip = e.target.id;
                            let reportedMessage = e.target.value;

                            localStorage.setItem('ReportedMessage',reportedMessage);
                            localStorage.setItem('ReportedIp',ip);
                            let reportForm = document.getElementById('reportformcontainer');
                            reportForm.style = 'transform:scale(1); z-index:4;';
                        });

                        const replyContainer = document.createElement('div');
                        replyContainer.style = `position:relative;cursor:pointer;max-width: 15rem;  overflow-wrap: break-word; background-color:${gencol[gencolpick]}; padding:40px 20px; box-shadow:-2px 2px 2px 2px rgba(0, 0, 0, 0.5);`;
                        replyContainer.setAttribute('id','replyContainer');
                        const replyText = document.createElement('p');
                        replyText.innerHTML = replyDatas.replyText;
                        const replyNickName = document.createElement('p');
                        replyNickName.innerHTML ="-"+ replyDatas.author;
                        const time = document.createElement('p');
                        time.innerHTML = replyDatas.time;
                        time.style =  'font-size:10px; margin-top:20px;';
                        commentBoxContainer.appendChild(connector);
                        commentBoxContainer.appendChild(replyContainer);
                        replyContainer.appendChild(reportBtn);
                        replyContainer.appendChild(replyText);
                        replyContainer.appendChild(replyNickName);
                        replyContainer.appendChild(time);

                    });
                });
    });
}); 

};
main();
                
                const reply=()=>{ 
                    //get Id from storage
                    let id = sessionStorage.getItem('id');
                    //reference your database
                    let replys = firebase.database().ref('/Freedom Wall/' + id +'/reply/');

                    let replyText = document.getElementById('replyText');
                    let replynickname = document.getElementById('replynickname');

                        //reply form
                        document.getElementById('replyForm').addEventListener('submit',(e)=>{
                            e.preventDefault();
                            let replyTextValue = replyText.value;
                            let replynicknameValue = replynickname.value;
                            
                            //check the value
                            if(replyTextValue.length > 0 && replynicknameValue.length > 0){
                                pushReply(replyTextValue,replynicknameValue);
                                let dc = false;
                                sessionStorage.setItem('dc',dc);
                                window.location.reload(true);
                            }else{
                                alert('Please complete the details');
                                let dc = true;
                                sessionStorage.setItem('dc',dc);

                            }
                            
                        });

                        const pushReply=(replyTextValue,replynicknameValue)=>{
                               //date picker
                            function formatAMPM(date) {
                                var hours = date.getHours();
                                var minutes = date.getMinutes();
                                var ampm = hours >= 12 ? 'pm' : 'am';
                                hours = hours % 12;
                                hours = hours ? hours : 12; // the hour '0' should be '12'
                                minutes = minutes < 10 ? '0'+minutes : minutes;
                                let day = date.getDate();
                                let month = date.getMonth()+1;
                                let year = date.getFullYear();
                                // hours = hours ? hours : 12; // the hour '0' should be '12'
                                // minutes = minutes < 10 ? '0'+minutes : minutes;
                                var strTime = hours + ':' + minutes + ' ' + ampm + ' ' + month+'/'+day+'/'+year;
                                return strTime;
                            }
                            let time=formatAMPM(new Date);
                            replys.push({
                    
                                replyText:replyTextValue,
                                author:replynicknameValue,
                                time:time,
                                ip:localStorage.getItem('userIp')
                            });
                        };

            };
            reply();
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
        form.style = 'z-index:4; transform: scale(1);';
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
//clode reply form
let exitReply = document.getElementById('replyExit').addEventListener('click',()=>{
    const replyContainer = document.querySelector('.replyformcontainer');
    replyContainer.style = 'z-index:0; transform:scale(0);';
    let dc = false;
    sessionStorage.setItem('dc',dc);
});


//reference your database
let report = firebase.database().ref('/Reported Notes/');

//report form
let reportText = document.getElementById('reportText');
document.getElementById('reportForm').addEventListener('submit',(e)=>{
    e.preventDefault();

    let reportTextValue = reportText.value;
    if(reportTextValue.length > 0){
        pushReportedNotes(reportTextValue);
        window.location.reload(true);
    }else{
        let reportForm = document.getElementById('reportformcontainer');
        reportForm.style = 'transform:scale(1); z-index:4;';
    }
});
//push reported Ip
const pushReportedNotes=(reportTextValue)=>{
         //date picker
        function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        let day = date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();
        // hours = hours ? hours : 12; // the hour '0' should be '12'
        // minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm + ' ' + month+'/'+day+'/'+year;
        return strTime;
    }
    let time=formatAMPM(new Date);
    report.push({
        Reason:reportTextValue,
        ReportedIp:localStorage.getItem('ReportedIp'),
        UserIp:localStorage.getItem('userIp'),
        ReportedMessage:localStorage.getItem('ReportedMessage'),
        Time:time

    });
};

//close reportform
let exitReport = document.getElementById('reportExit').addEventListener('click',()=>{
    let reportForm = document.getElementById('reportformcontainer');
    reportForm.style = 'transform:scale(0); z-index:0;';
});


//announcement
const announce=()=>{
    alert('No announcement yet');
};