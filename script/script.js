let reCaptchaCorrect = false;

window.addEventListener('load', () => {
    const firebaseConfig = {
        apiKey: "AIzaSyDJVVjVxtakGpRMbXNeZ5i0xRohkF9FYIU",
        authDomain: "multiple-projects-9f123.firebaseapp.com",
        databaseURL: "https://multiple-projects-9f123.firebaseio.com",
        projectId: "multiple-projects-9f123",
        storageBucket: "multiple-projects-9f123.appspot.com",
        messagingSenderId: "91371687144",
        appId: "1:91371687144:web:a5ccaaa4de4a7dfaf5cd5d"
    };

    firebase.initializeApp(firebaseConfig);
    const appName = 'special-moment-counter';

    const counter = document.getElementById('counter');
    const increment  = document.getElementById('increment');
    const decrement  = document.getElementById('decrement');

    firebase.database().ref(`${appName}/counter`).on('value', snapshot => {
        if (snapshot.val() !== null) {
            let maxValue = snapshot.val();
            let additionSum = 1;

            console.log(maxValue);            
            
            let interval = setInterval(() => {
                if (parseInt(counter.textContent) + parseInt(additionSum) <= maxValue) {
                    if (parseInt(counter.textContent) > maxValue - 75) {
                        additionSum = 1;
                    } else {
                        additionSum += 0.1;
                    }

                    counter.textContent = parseInt(counter.textContent) + parseInt(additionSum);
                } else {
                    if (parseInt(counter.textContent) + 50 > maxValue) {
                        additionSum = 1;
                    } else {
                        additionSum += 0.1;
                    }

                    counter.textContent = parseInt(counter.textContent) - parseInt(additionSum);
                }

                console.log(parseInt(counter.textContent))
                if (maxValue === parseInt(counter.textContent)) clearInterval(interval);
            }, 1);
        }
    });

    increment.addEventListener('click', () => {
        if (reCaptchaCorrect) {
            firebase.database().ref(`${appName}/counter`).once('value').then(snapshot => {
                console.log(snapshot.val());
                
                if (snapshot.val() !== null) {
                    firebase.database().ref(`${appName}`).set({
                        counter: snapshot.val() + 1
                    }).then(() => {
                        grecaptcha.reset();
                        reCaptchaCorrect = false;
                    });
                }
            });
        }
    });

    decrement.addEventListener('click', () => {
        if (reCaptchaCorrect) {
            firebase.database().ref(`${appName}/counter`).once('value').then(snapshot => {
                console.log(snapshot.val());

                if (snapshot.val() !== null) {
                    firebase.database().ref(`${appName}`).set({
                        counter: snapshot.val() - 1
                    }).then(() => {
                        grecaptcha.reset();
                        reCaptchaCorrect = false;
                    });
                }
            });
        }
    });
});

function recaptchaCompleted() {
    reCaptchaCorrect = true;
}