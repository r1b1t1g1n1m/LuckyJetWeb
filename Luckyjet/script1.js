let lastBettingTime = 0; // Добавляем переменную для отслеживания последнего времени "betting"

function getRan(min, max) {
    return Math.random() * (max - min) + min;
}

async function checkSignal() {
    let randomNumber1 = getRan(1.1, 1.3).toFixed(2);
    const url = 'https://lucky-jet-history.gamedev-atech.cc/public/history/api/history/replay';
    const response = await fetch(url);
    const data = await response.json();
    const state = data.state;
    const coefficientsDiv = document.getElementById('coefficients');
    const cupImg = document.getElementById('cup');
    const supImg = document.getElementById('sup');
    const oblokoImg = document.getElementById('ob1');
    const obloko2Img = document.getElementById('ob2');
    const loadImg = document.getElementById('ld');

    let responseText = document.getElementById('responseText');
    let responseText2 = document.getElementById('responseText2');

    if (state === "betting" && Date.now() - lastBettingTime > 5000) {
        let resultText = `${randomNumber1}x`;
        responseText2.textContent = "";
        document.getElementById("responseText").textContent = resultText;
        localStorage.setItem('resultText', resultText);
        responseText.className = 'text betting';
        const bar = document.querySelector('.bar');
        bar.style.animation = 'loading 5s linear';
        const container = document.createElement('div');

        container.style.textAlign = 'center';

        const img = document.createElement('img');
        img.src = './images/loads.svg';
        img.style.maxWidth = '85px';
        img.style.maxHeight = '85px';
        container.appendChild(img);

        const text = document.createElement('div');
        text.innerText = 'ОЖИДАНИЕ\nСЛЕДУЮЩЕГО РАУНДА';
        text.id = 'waitingText';
        container.appendChild(text);
        
        coefficientsDiv.innerHTML = ''; 
        coefficientsDiv.appendChild(container); 

        coefficientsDiv.classList.remove('kif');
        coefficientsDiv.classList.add('smallt');
        if (cupImg) {
            cupImg.style.display = 'none';
        }
        if (supImg) {
            supImg.style.display = 'none';
        }
        if (oblokoImg) {
            oblokoImg.style.display = 'none';
        }
        if (obloko2Img) {
            obloko2Img.style.display = 'none';
        }
        if (loadImg) {
            loadImg.style.display = 'block';
        }
        lastBettingTime = Date.now();
    } else if (state === "ending") {
        responseText.textContent = "Waiting..";
        responseText.className = 'text fly';
        responseText2.textContent = "УЛЕТЕЛ";
        responseText2.className = 'text2 fly2';
        if (loadImg) {
            loadImg.style.display = 'none';
        }
    } else if (state === "flying") {
        responseText2.textContent = "";
        if (cupImg) {
            cupImg.style.display = 'block';
        }
        if (supImg) {
            supImg.style.display = 'block';
        }
        if (oblokoImg) {
            oblokoImg.style.display = 'block';
        }
        if (obloko2Img) {
            obloko2Img.style.display = 'block';
        }
        if (loadImg) {
            loadImg.style.display = 'none';
        }
    }   
}

function fetchDataAndUpdate() {
    fetch('https://lucky-jet-history.gamedev-atech.cc/public/history/api/history/replay')
        .then(response => response.json())
        .then(data => {
            const kef = parseFloat(data.current_coefficients);
            updateCoefficients(kef);
        })
        .catch(error => console.error('Error fetching data:', error));
}




function updateCoefficients(coefficients) {

    const coefficientsDiv = document.getElementById('coefficients');
    

    if (coefficients !== 1) {
        coefficientsDiv.innerText = `x${coefficients}`; 
        coefficientsDiv.classList.remove('smallt');
        coefficientsDiv.classList.add('kif');
        
        
        
    } 
}


fetchDataAndUpdate();
setInterval(fetchDataAndUpdate, 100);
let intervalId = setInterval(checkSignal, 100);
checkSignal(); 
