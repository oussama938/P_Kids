function askForMicrophoneAuthorization() {
    return new Promise((resolve, reject) => {
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            
            // Ask for microphone authorization directly
            recognition.start();
            
            // Resolve with recognition result
            recognition.onstart = () => {
                recognition.stop();
                localStorage.setItem('isMicrophoneAuthorized', 'true');
                resolve();
            };
        } else {
            reject("Speech recognition not supported");
        }
    });
}
// script.js

function listenForSpeech(listenTime) {
    return new Promise((resolve, reject) => {
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  
        recognition.interimResults = true;
        recognition.lang = 'fr-FR';
  
        recognition.start();
  
        setTimeout(() => {
          recognition.stop();
        }, listenTime);
  
        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
          resolve(transcript);
        };
  
        recognition.onend = () => {
          reject("No speech recognized");
        };
  
        recognition.onerror = (event) => {
          if (event.error === 'aborted') {
            reject("Speech recognition aborted");
          } else {
            reject(`Recognition error: ${event.error}`);
          }
        };
      } else {
        reject("Speech recognition not supported");
      }
    });
  }
  