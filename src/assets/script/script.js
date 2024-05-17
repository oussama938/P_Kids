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

      let finalTranscript = '';
      let isRecognizing = true;

      recognition.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        console.log('Interim:', interimTranscript); // Log interim results if needed
      };

      recognition.onend = () => {
        if (isRecognizing) {
          isRecognizing = false;
          resolve(finalTranscript);
        }
      };

      recognition.onerror = (event) => {
        isRecognizing = false;
        if (event.error === 'aborted') {
          reject("Speech recognition aborted");
        } else {
          reject(`Recognition error: ${event.error}`);
        }
      };

      recognition.start();

      setTimeout(() => {
        recognition.stop();
      }, listenTime);
    } else {
      reject("Speech recognition not supported");
    }
  });
}

