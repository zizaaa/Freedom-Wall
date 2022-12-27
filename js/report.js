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
let reports = firebase.database().ref('Report Message');


const username = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');

document.getElementById('reportform').addEventListener('submit',(e)=>{
    let nameValue = username.value;
    let emailValue = email.value;
    let messageValue = message.value;

    e.preventDefault();
    push(nameValue,emailValue,messageValue);
    document.getElementById('textcontainer').style='transform:scale(1);';
});

const push=(nameValue,emailValue,messageValue)=>{
    reports.push({
        name: nameValue,
        email: emailValue,
        message:messageValue
    });
};
