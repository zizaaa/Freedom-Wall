document.querySelector('.notes').addEventListener('click',()=>{
  document.getElementById('notes').style='transform:scale(1);z-index:2;';
  document.querySelector('.notes').style='text-decoration:underline;';
  document.getElementById('report').style='transform:scale(0);z-index:0;';
  document.querySelector('.report').style='text-decoration:none;';
  document.getElementById('warning').style='transform:scale(0);z-index:0;';
  document.querySelector('.warning').style='text-decoration:none;';
  document.getElementById('banned').style='transform:scale(0);z-index:0;';
document.querySelector('.banned').style='text-decoration:none;';
document.getElementById('ip').style='transform:scale(0);z-index:0;';
document.querySelector('.ip').style='text-decoration:none;';
});
document.querySelector('.report').addEventListener('click',()=>{
  document.getElementById('notes').style='transform:scale(0);z-index:0;';
  document.querySelector('.notes').style='text-decoration:none;';
  document.querySelector('.report').style='text-decoration:underline;';
  document.getElementById('report').style='transform:scale(1);z-index:2;';
  document.getElementById('warning').style='transform:scale(0);z-index:0;';
document.querySelector('.warning').style='text-decoration:none;';
document.getElementById('banned').style='transform:scale(0);z-index:0;';
document.querySelector('.banned').style='text-decoration:none;';
document.getElementById('ip').style='transform:scale(0);z-index:0;';
document.querySelector('.ip').style='text-decoration:none;';
});
document.querySelector('.warning').addEventListener('click',()=>{
document.getElementById('warning').style='transform:scale(1);z-index:2;';
document.querySelector('.warning').style='text-decoration:underline;';
document.getElementById('notes').style='transform:scale(0);z-index:0;';
document.querySelector('.notes').style='text-decoration:none;';
document.getElementById('report').style='transform:scale(0);z-index:0;';
document.querySelector('.report').style='text-decoration:none;';
document.getElementById('banned').style='transform:scale(0);z-index:0;';
document.querySelector('.banned').style='text-decoration:none;';
document.getElementById('ip').style='transform:scale(0);z-index:0;';
document.querySelector('.ip').style='text-decoration:none;';
});
document.querySelector('.banned').addEventListener('click',()=>{
  document.getElementById('banned').style='transform:scale(1);z-index:2;';
  document.querySelector('.banned').style='text-decoration:underline;';
  document.getElementById('notes').style='transform:scale(0);z-index:0;';
document.querySelector('.notes').style='text-decoration:none;';
document.getElementById('report').style='transform:scale(0);z-index:0;';
document.querySelector('.report').style='text-decoration:none;';
document.getElementById('warning').style='transform:scale(0);z-index:0;';
document.querySelector('.warning').style='text-decoration:none;';
document.getElementById('ip').style='transform:scale(0);z-index:0;';
document.querySelector('.ip').style='text-decoration:none;';
});
document.querySelector('.ip').addEventListener('click',()=>{
  document.getElementById('ip').style='transform:scale(1);z-index:2;';
  document.querySelector('.ip').style='text-decoration:underline;';
  document.getElementById('banned').style='transform:scale(0);z-index:0;';
  document.querySelector('.banned').style='text-decoration:none;';
  document.getElementById('notes').style='transform:scale(0);z-index:0;';
document.querySelector('.notes').style='text-decoration:none;';
document.getElementById('report').style='transform:scale(0);z-index:0;';
document.querySelector('.report').style='text-decoration:none;';
document.getElementById('warning').style='transform:scale(0);z-index:0;';
document.querySelector('.warning').style='text-decoration:none;';
});


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
let notes = firebase.database().ref('/Freedom Wall/');

notes.on("value",(adminNotes)=>{
  document.querySelector('.note-container').innerHTML = '';
    adminNotes.forEach(el => {
        let comments = el.val();
        const container = document.createElement('div');
        container.style = 'background-color:#ecf0f3;box-shadow:1px 1px 3px 1px rgba(0,0,0,0.2); width:1050px; padding:20px; display:flex;flex-direction:row; margin-bottom:20px;';
        
        const commentContainer = document.createElement('div');
        commentContainer.style = 'max-width:15rem;min-width:15rem; margin-right:10px;';
        const commentTitle = document.createElement('p');
        commentTitle.innerHTML = 'Notes';
        commentTitle.style='margin-bottom:10px;';
        const commentText = document.createElement('p');
        commentText.innerHTML = comments.comment;
        
        const nicknameContainer = document.createElement('div');
        nicknameContainer.style = 'max-width:15rem; min-width:15rem;';
        const nicknameTitle = document.createElement('p');
        nicknameTitle.innerHTML = 'Nickname';
        nicknameTitle.style='margin-bottom:10px;';
        const nicknameText = document.createElement('p');
        nicknameText.innerHTML = comments.nickname;
        
        const ipContainer = document.createElement('div');
        ipContainer.style = 'max-width:15rem; min-width:15rem;';
        const ipTitle = document.createElement('p');
        ipTitle.innerHTML = 'IP Address';
        ipTitle.style='margin-bottom:10px;';
        const ipText = document.createElement('p');
        ipText.innerHTML = comments.ip;

        const dateContainer = document.createElement('div');
        dateContainer.style = 'max-width:15rem; min-width:15rem;';
        const dateTitle = document.createElement('p');
        dateTitle.innerHTML = 'Date';
        dateTitle.style='margin-bottom:10px;';
        const dateText = document.createElement('p');
        dateText.innerHTML = comments.time;

        //btncontainer
        const btnContainer = document.createElement('div');
        const delBtn = document.createElement('button');
        delBtn.setAttribute('id',el.key);
        delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        delBtn.style = 'margin-right:20px;box-shadow:2px 2px 2px 1px rgba(0,0,0,0.2);cursor:pointer;border:none;border-radius:5px;padding:10px ;background-color:red; color:white; font-weight:bold;';
        delBtn.addEventListener('click',(e)=>{
          let key = delBtn.id;

          let prompt = confirm("Are you sure to delete this note?");
          if(prompt){
            let notes = firebase.database().ref(`/Freedom Wall/${key}`);
            notes.remove();
          }
        });

        document.querySelector('.note-container').appendChild(container);
        container.appendChild(commentContainer);
        commentContainer.appendChild(commentTitle);
        commentContainer.appendChild(commentText);

        container.appendChild(nicknameContainer);
        nicknameContainer.appendChild(nicknameTitle);
        nicknameContainer.appendChild(nicknameText);

        container.appendChild(ipContainer);
        ipContainer.appendChild(ipTitle);
        ipContainer.appendChild(ipText);

        container.appendChild(dateContainer);
        dateContainer.appendChild(dateTitle);
        dateContainer.appendChild(dateText);

        container.appendChild(btnContainer);
        btnContainer.appendChild(delBtn);


    });
});

//report
let report = firebase.database().ref('/Reported Notes/');

report.on("value",(adminReport)=>{
  document.querySelector('.report-container').innerHTML = '';
  adminReport.forEach(reportEl =>{
          let reportDatas = reportEl.val();

          const container = document.createElement('div');
          container.setAttribute('id',reportDatas.ReportedIp);
          container.style = 'box-shadow:1px 1px 3px 1px rgba(0,0,0,0.2);background-color:#ecf0f3; width:1100px; padding:20px; display:flex;flex-direction:row; margin-bottom:20px;';
          
          const commentContainer = document.createElement('div');
          commentContainer.style = 'max-width:15rem; min-width:15rem; margin-right:20px;';
          const commentTitle = document.createElement('p');
          commentTitle.innerHTML = 'Reported Message';
          commentTitle.style='margin-bottom:10px;';
          const commentText = document.createElement('p');
          commentText.innerHTML = reportDatas.ReportedMessage;
          
          const nicknameContainer = document.createElement('div');
          nicknameContainer.style = 'max-width:15rem; min-width:15rem;';
          const nicknameTitle = document.createElement('p');
          nicknameTitle.innerHTML = 'Reported IP';
          nicknameTitle.style='margin-bottom:10px;';
          const nicknameText = document.createElement('p');
          nicknameText.innerHTML = reportDatas.ReportedIp;
          
          const ipContainer = document.createElement('div');
          ipContainer.style = 'max-width:15rem; min-width:15rem;';
          const ipTitle = document.createElement('p');
          ipTitle.innerHTML = 'Reason';
          ipTitle.style='margin-bottom:10px;';
          const ipText = document.createElement('p');
          ipText.innerHTML = reportDatas.Reason;
  
          const dateContainer = document.createElement('div');
          dateContainer.style = 'max-width:15rem; min-width:15rem;';
          const dateTitle = document.createElement('p');
          dateTitle.innerHTML = 'User IP';
          dateTitle.style='margin-bottom:10px;';
          const dateText = document.createElement('p');
          dateText.innerHTML = reportDatas.UserIp;

          const btnContainer = document.createElement('div');
          //title
          const btnTitle = document.createElement('p');
          btnTitle.innerHTML = 'Action';
          btnTitle.style='margin-bottom:10px';
          btnContainer.appendChild(btnTitle);
          
          //warning button
          const warningBtn = document.createElement('button');
          warningBtn.innerHTML = 'Warning';
          warningBtn.style = 'box-shadow:2px 2px 2px 1px rgba(0,0,0,0.2);cursor:pointer;border:none;border-radius:5px;padding:5px 0;margin-bottom:10px;width:5rem;background-color:red; color:white; font-weight:bold;';
          warningBtn.setAttribute('id',reportDatas.Reason);
          warningBtn.setAttribute('value',reportEl.key);
          btnContainer.appendChild(warningBtn);
          warningBtn.addEventListener('click',(e)=>{
            //delete
            let key = warningBtn.value;
          
            //push to warning
            let warning = firebase.database().ref('/Warning IP/');
            let warn = firebase.database().ref('/Warn IP/');
            let reason = warningBtn.id;
            let warningIp = e.target.parentElement.parentElement.id;
            let prompt = confirm('Are you sure to send a Warning message to this IP Address?');
            
            if(prompt){

              //push
              warning.push({
                Ip:warningIp,
                Reason:reason
              });
              warn.push({
                Ip:warningIp
              });
              //delete
              let report = firebase.database().ref(`/Reported Notes/${key}`);
              report.remove();
              // window.location.reload(true);
            }
          });


          //ban button
          const banBtn = document.createElement('button');
          banBtn.innerHTML = 'Ban';
          banBtn.style = 'box-shadow:2px 2px 2px 1px rgba(0,0,0,0.2);cursor:pointer;border:none;border-radius:5px;padding:5px 0;width:5rem;background-color:darkred; color:white; font-weight:bold;';
          banBtn.setAttribute('value',reportEl.key);
          btnContainer.appendChild(banBtn);
          banBtn.addEventListener('click',(e)=>{
            let key = banBtn.value;
            console.log('ban');
            let ban = firebase.database().ref('/Banned IP/');
            let banIp = e.target.parentElement.parentElement.id;

            let prompt = confirm('Are you sure to ban this IP Address?');
                if(prompt){
                  ban.push({
                    IPAddress:banIp
                  });
      
                  let report = firebase.database().ref(`/Reported Notes/${key}`);
                  report.remove();
                  // window.location.reload(true);
                }
          });
  
          document.querySelector('.report-container').appendChild(container);
          container.appendChild(commentContainer);
          commentContainer.appendChild(commentTitle);
          commentContainer.appendChild(commentText);
  
          container.appendChild(nicknameContainer);
          nicknameContainer.appendChild(nicknameTitle);
          nicknameContainer.appendChild(nicknameText);
  
          container.appendChild(ipContainer);
          ipContainer.appendChild(ipTitle);
          ipContainer.appendChild(ipText);
  
          container.appendChild(dateContainer);
          dateContainer.appendChild(dateTitle);
          dateContainer.appendChild(dateText);

          container.appendChild(btnContainer);
  });
});

//warning
let warn = firebase.database().ref('/Warning IP/');

warn.on("value",(warnAd)=>{
  document.querySelector('.warning-container').innerHTML = '';
  warnAd.forEach(warnData=>{
    let warnDatas = warnData.val();
    const container = document.createElement('div');
          container.style = 'box-shadow:1px 1px 3px 1px rgba(0,0,0,0.2);background-color:#ecf0f3;padding:20px; display:flex;flex-direction:row; margin-bottom:20px;';
          container.setAttribute('id',warnDatas.Ip);

          const ipContainer = document.createElement('div');
          ipContainer.style = 'max-width:15rem; min-width:15rem; margin-right:20px;';
          const ipTitle = document.createElement('p');
          ipTitle.innerHTML = 'IP Address';
          ipTitle.style='margin-bottom:10px;';
          const warnIP = document.createElement('p');
          warnIP.innerHTML = warnDatas.Ip;
          
          const reasonContainer = document.createElement('div');
          reasonContainer.style = 'max-width:15rem; min-width:15rem;';
          const reasonTitle = document.createElement('p');
          reasonTitle.innerHTML = 'Reason';
          reasonTitle.style='margin-bottom:10px;';
          const warnReason = document.createElement('p');
          warnReason.innerHTML = warnDatas.Reason;

          //btncontainer
          const btnContainer = document.createElement('div');
          //title
          const btnTitle = document.createElement('p');
          btnTitle.innerHTML = 'Action';
          btnTitle.style='margin-bottom:10px';
                    
          //warning button
          const forgiveBtn = document.createElement('button');
          forgiveBtn.innerHTML = 'Forgive';
          forgiveBtn.style = 'margin-right:20px;box-shadow:2px 2px 2px 1px rgba(0,0,0,0.2);cursor:pointer;border:none;border-radius:5px;padding:5px 0;margin-bottom:10px;width:5rem;background-color:green; color:white; font-weight:bold;';
          forgiveBtn.setAttribute('value',warnData.key);
          
          forgiveBtn.addEventListener('click',(e)=>{
            let key = forgiveBtn.value;
            let warning = firebase.database().ref(`/Warning IP/${key}`);
            
            let prompt = confirm('Are you sure to forgive this IP Address?');
            if(prompt){
              warning.remove();
              // window.location.reload(true);
            }
          });

          const banBtn = document.createElement('button');
          banBtn.innerHTML = 'Ban';
          banBtn.style = 'box-shadow:2px 2px 2px 1px rgba(0,0,0,0.2);cursor:pointer;border:none;border-radius:5px;padding:5px 0;margin-bottom:10px;width:5rem;background-color:red; color:white; font-weight:bold;';
          banBtn.addEventListener('click',(e)=>{
            let ban = firebase.database().ref('/Banned IP/');
            let banIp = e.target.parentElement.parentElement.id;
            let key = warnData.key;
            
            let prompt = confirm('Are you sure to ban this IP Address?');

            if(prompt){
              ban.push({
                IPAddress:banIp
              });
              
              let warning = firebase.database().ref(`/Warning IP/${key}`);
              warning.remove();
              // window.location.reload(true);
            }
          });
          document.querySelector('.warning-container').appendChild(container);
          container.appendChild(ipContainer);
          ipContainer.appendChild(ipTitle);
          ipContainer.appendChild(warnIP);
          container.appendChild(reasonContainer);
          reasonContainer.appendChild(reasonTitle);
          reasonContainer.appendChild(warnReason);
          container.appendChild(btnContainer);
          btnContainer.appendChild(btnTitle);
          btnContainer.appendChild(forgiveBtn);
          btnContainer.appendChild(banBtn);
  });
});

//ban
let ban = firebase.database().ref('/Banned IP/');

ban.on("value",(adminBan)=>{
  document.querySelector('.banned-container').innerHTML = '';
  adminBan.forEach(banned=>{
    let bannedData = banned.val();

    const container = document.createElement('div');
    container.style = 'justify-content:space-between;box-shadow:1px 1px 3px 1px rgba(0,0,0,0.2);background-color:#ecf0f3;padding:20px; display:flex;flex-direction:row; margin-bottom:20px;';
    
    const ipContainer = document.createElement('div');
    ipContainer.style = 'max-width:15rem; min-width:15rem; margin-right:20px;';
    const ipTitle = document.createElement('p');
    ipTitle.innerHTML = 'IP Address';
    ipTitle.style='margin-bottom:10px;';
    const bannedIP = document.createElement('p');
    bannedIP.innerHTML = bannedData.IPAddress;

     //btncontainer
     const btnContainer = document.createElement('div');

     //delete button
     const delBtn = document.createElement('button');
     delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
     delBtn.style = 'margin-right:20px;box-shadow:2px 2px 2px 1px rgba(0,0,0,0.2);cursor:pointer;border:none;border-radius:5px;padding:10px ;background-color:red; color:white; font-weight:bold;';
    delBtn.setAttribute('id',banned.key);
     delBtn.addEventListener('click',(e)=>{
        let key = delBtn.id;
        let ban = firebase.database().ref(`/Banned IP/${key}`);
        let prompt = confirm('Are you sure to delete this IP Address?');
        
        if(prompt){
          ban.remove();
          // window.location.reload(true);
        }

      });
    document.querySelector('.banned-container').appendChild(container);
    container.appendChild(ipContainer);
    ipContainer.appendChild(ipTitle);
    ipContainer.appendChild(bannedIP);
    container.appendChild(btnContainer);
    btnContainer.appendChild(delBtn);
  });
});


//ip add
let userIP = firebase.database().ref('/UserIP/');
userIP.on("value",(IP)=>{
  let arr = [];
  let warningCount=0;
  let isBanned = 'false';
  IP.forEach(dataIP=>{

      let ips = dataIP.val();
    setTimeout(()=>{
        arr.push(ips.IP);
    },1000);

    let warned = firebase.database().ref('/Warn IP/');
    warned.on("value",(warns)=>{
      warns.forEach(warning=>{
        let warningIP = warning.val();
          if(ips.IP === warningIP.Ip){
          console.log('true ' + ips.IP +' '+warningIP.Ip);
          warningCount++;
          }else{
          console.log('false');
          }
      });
    });
    
    ban.on("value",(bans)=>{
      bans.forEach(banned=>{
        let bannedData = banned.val();
        console.log(bannedData.IPAddress);
        console.log(ips.IP);
        if(bannedData.IPAddress === ips.IP){
          isBanned='true';
        }else{
          isBanned='false';
        }
      });
    });
    
  });
  setTimeout(()=>{
    // let ipAdd = firebase.database().ref('/IP Address/');
      let ipArray=[];
      for(let i=0;i<arr.length;i++){
        if(ipArray.indexOf(arr[i])== -1){
          ipArray.push(arr[i]);
          // ipAdd.push(arr[i]);
        }
      }
      ipArray.forEach(ip=>{
      const container = document.createElement('div');
      container.style = 'box-shadow:1px 1px 3px 1px rgba(0,0,0,0.2);background-color:#ecf0f3;padding:20px; display:flex;flex-direction:row; margin-bottom:20px;';

      const ipContainer = document.createElement('div');
      ipContainer.style = 'max-width:15rem; min-width:15rem;';
      const ipTitle = document.createElement('p');
      ipTitle.innerHTML = 'IP Address';
      ipTitle.style='margin-bottom:10px;';
      const ipText = document.createElement('p');
      ipText.innerHTML = ip;

      const warningContainer = document.createElement('div');
      warningContainer.style = 'max-width:15rem; min-width:15rem;';
      const warningTitle = document.createElement('p');
      warningTitle.innerHTML = 'Warning';
      warningTitle.style='margin-bottom:10px;';
      const warningText = document.createElement('p');
      warningText.innerHTML = warningCount;

      const banContainer = document.createElement('div');
      banContainer.style = 'max-width:15rem; min-width:15rem;';
      const banTitle = document.createElement('p');
      banTitle.innerHTML = 'Banned';
      banTitle.style='margin-bottom:10px;';
      const banText = document.createElement('p');
      banText.innerHTML = isBanned;

      document.querySelector('.ip-container').appendChild(container);
      container.appendChild(ipContainer);
      ipContainer.appendChild(ipTitle);
      ipContainer.appendChild(ipText);

      container.appendChild(warningContainer);
      warningContainer.appendChild(warningTitle);
      warningContainer.appendChild(warningText);

      container.appendChild(banContainer);
      banContainer.appendChild(banTitle);
      banContainer.appendChild(banText);
      });

},1000);
});


