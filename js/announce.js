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

let announcements = firebase.database().ref('/Announcements/');

announcements.on("value",(an)=>{
    document.querySelector('.announcement-container').innerHTML = '';
    an.forEach(el => {
        let announce = el.val();
        
                //color picker
                let backgroundColor = ['lightcoral','lightblue','lightpink','lightskyblue','lightseagreen','lightsalmon','lightgreen','rgb(36, 214, 214)'];
                let randomColorPicker = Math.floor(Math.random()*backgroundColor.length);


        let container = document.createElement('div');
        container.style = `box-shadow:2px 2px 1px 1px rgba(0,0,0,0.2);background-color:${backgroundColor[randomColorPicker]};position:relative; padding:20px; overflow-wrap: break-word; max-width:20rem;display:flex; flex-direction:column; margin: 20px;`;
        
        const iconDev = document.createElement('div');
        const icon = document.createElement('img');
        icon.setAttribute('src','img/amapin.png');
        icon.style = 'width: 35px;';
        iconDev.appendChild(icon);
        iconDev.style = `position:absolute; top:-15px;left:45%;`;
        
        let message = document.createElement('p');
        message.innerHTML = announce.Announcement;

        let date = document.createElement('p');
        date.style = 'margin-top:20px; font-size:10px';
        date.innerHTML = announce.Date;


        document.querySelector('.announcement-container').appendChild(container);
        container.appendChild(iconDev);
        iconDev.appendChild(icon);
        container.appendChild(message);
        container.appendChild(date);
    });
});