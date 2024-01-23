const audioElement = document.getElementById('quote-audio');

function getRandomQuote() {
    fetch('https://api.quotable.io/quotes/random?tags=inspirational')
        .then(response => response.json())
        .then(data => {
            const quote = Array.isArray(data) ? data[0] : data;
            document.getElementById('quote').textContent = `"${quote.content}"`;
            document.getElementById('author').textContent = `- ${quote.author}`;

            
            textToSpeech(quote.content);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('An error occurred while fetching the quote.');
        });
}

function textToSpeech(text) {
    if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance();
        speech.text = text;
        const voices = window.speechSynthesis.getVoices();
        speech.voice = voices[0];
        speech.rate = 1;
        window.speechSynthesis.speak(speech);
    }
}

function toggleMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
}

getRandomQuote();
