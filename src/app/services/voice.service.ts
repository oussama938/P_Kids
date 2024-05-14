import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoiceService {

  constructor() { }
  playSuccessSound() {
    const audio = new Audio('../../../../assets/success.mp3');
    audio.play();
  }

  playErrorSound() {
    const audio = new Audio('../../../../assets/fail.mp3');
    audio.play();
  }

  Aplaud(){
    const audio=new Audio('../../../../assets/Bruit dapplaudissement.mp3')
    audio.play()
  }
}
