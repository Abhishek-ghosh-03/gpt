const API_key = '' //use own api key for accessing openai ai bot!
const submitButton = document.querySelector('#submit');
const outputElement = document.querySelector('#output');
const inputelement = document.querySelector('input');
const historyelement = document.querySelector('.history');
const button = document.querySelector('button');

function changeInput(value) {
    const inputelement = document.querySelector('input');
    inputelement.value = value;
}

async function getmessage() {
    const userMessage = inputelement.value.trim();

    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_key}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}],
            max_tokens: 100
        })
    };

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
        console.log(data);
        outputElement.textContent = data.choices[0].message.content;
        if (data.choices[0].message.content && userMessage) {
            const pElement = document.createElement('p');
            pElement.textContent = userMessage;
            pElement.addEventListener('click', () => changeInput(userMessage));
            historyelement.append(pElement);
        }
    } catch (error) {
        console.log(error);
    }
}


submitButton.addEventListener('click', getmessage);

function clearinput() {
    inputelement.value = '';
}

button.addEventListener('click', clearinput);
