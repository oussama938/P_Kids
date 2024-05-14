import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechSynthService {
  specchSynt:SpeechSynthesis

  constructor() { 
    this.specchSynt=window.speechSynthesis
  }

  speak(word:string): void {
    const utterance = new SpeechSynthesisUtterance(word);
    console.log(utterance.volume);
    
    this.specchSynt.speak(utterance);
  }
}
