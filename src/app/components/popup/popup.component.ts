import { Component, Input, OnInit } from '@angular/core';
import { VoiceService } from 'src/app/services/voice.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  @Input() data?: boolean;
  showSuccess: boolean = false;
  showFail: boolean = false;
  showPopup: boolean = false;

  constructor(private voiceService: VoiceService) { }

 ngOnInit() {
  this.showPopup = true
  this.showSuccess = true
}

  

  playSuccessSound() {
    // Your logic for correct spelling
    this.voiceService.playSuccessSound();
    this.showPopup = true;
    this.showSuccess = true;
    setTimeout(() => {
      this.showSuccess = false;
      this.showPopup = false;
    }, 2000);
  }

  playErrorSound() {
    // Your logic for incorrect spelling
    this.voiceService.playErrorSound();
    this.showPopup = true;
    this.showFail = true;
    setTimeout(() => {
      this.showFail = false;
      this.showPopup = false;
    }, 2000);
  }

  hundleData(){
    if (this.data === true) {
      this.playSuccessSound();
    } else {
      this.playErrorSound();
    }
  }
}
