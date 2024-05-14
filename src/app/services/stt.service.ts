import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SttService {

  // private recognition: any;

  // constructor() {
  //   this.recognition = new SpeechRecognition();
  //   // Configure recognition properties
  //   this.recognition.continuous = true;
  //   this.recognition.lang = 'en-US';
  // }

  // onResult(callback: (result: string) => void): void {
  //   this.recognition.onresult = (event: SpeechRecognitionEvent) => {
  //     const transcript = event.results[event.results.length - 1][0].transcript;
  //     callback(transcript);
  //   };
  // }

  // onError(callback: (error: string) => void): void {
  //   this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
  //     callback(event.error);
  //   };
  // }

  // startListening(): void {
  //   this.recognition.start();
  // }

  // stopListening(): void {
  //   this.recognition.stop();
  // }
}
