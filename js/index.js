//GET request
// const req = new XMLHttpRequest();

// req.open('GET','https://reqres.in/api/users');

// req.addEventListener('load', ()=>{
//     if(req.status === 200 && req.readyState === 4){
//         const res = JSON.parse(req.responseText);
//         console.log(res.data[0].id);
//     }else{
//         throw new Error('Bad Request');
              //or
            // console.error('Bad Request');
//     }

    
// });

// req.send();

/* =========================== */
//POST req

// const newUser = {
//     name:'Batman',
//     sidekick:'Robin'
// };

// const req = new XMLHttpRequest();
// req.open('POST','https://reqres.in/api/users');
// req.setRequestHeader('Content-Type','application/json');

// req.addEventListener('load', ()=>{
//     if(req.status === 201 && req.readyState === 4){
//         const res = JSON.parse(req.responseText);
//         console.log(res);
//     }else{
//         // throw new Error('Bad Request');
//         //       or
//             console.error('Bad Request');
//     }
// });
// req.send(JSON.stringify(newUser));

/* ========================== */

// PUT Request
// const newUser = {
//     name:'Batman',
//     sidekick:'Robin'
// };

// const req = new XMLHttpRequest();
// req.open('PUT','https://reqres.in/api/users/2');
// req.setRequestHeader('Content-Type','application/json');

// req.addEventListener('load', ()=>{
//     if(req.status === 200 && req.readyState === 4){
//         const res = JSON.parse(req.responseText);
//         console.log(res);
//     }else{
//         // throw new Error('Bad Request');
//         //       or
//             console.error('Bad Request');
//     }
// });
// req.send(JSON.stringify(newUser));

//DELETE Request

// const req = new XMLHttpRequest();

// req.open('DELETE','https://reqres.in/api/users/2');
// req.addEventListener('load', ()=>{
//     if(req.status === 204 && req.readyState === 4){
//         console.log('Request Successful');
//     }else{
//         // throw new Error('Bad Request');
//         //       or
//             console.error('Bad Request');
//     }
// });
// req.send();

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
let comments = firebase.database().ref('Freedom Wall');

document.getElementById('comments').addEventListener('submit',e=>{
    e.preventDefault();

    let user = document.getElementById('user').value;
    let pass = document.getElementById('password').value;
    console.log(user,pass);

    saveComments(user,pass);
});

const saveComments = (user,pass)=>{
    comments.push({
        user:user,
        pass:pass
    });
};


//retrieve datas
const retrieve =()=>{
    comments.on("value",(data)=>{
        data.forEach(element => {
            console.log(element.user);
        });
    });
};
retrieve();
