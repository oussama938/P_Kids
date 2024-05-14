import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data-service.service';
import { TextToSpeechSynthService } from 'src/app/services/text-to-speech-synth.service';
import { VoiceService } from 'src/app/services/voice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-syllabes',
  templateUrl: './syllabes.component.html',
  styleUrls: ['./syllabes.component.css']
})
export class SyllabesComponent {
  syllabesUnite:any;
  idPageUnit = 0;
  wordGroups: string[][] = [];
  constructor(private route:ActivatedRoute,
              private dataService:DataService,private stt:TextToSpeechSynthService,private voiceService:VoiceService
  ){

  }
  ngOnInit(): void {
    this.route.params.subscribe(
      (prm)=>{
        this.syllabesUnite=this.dataService.getUnitById(prm['id']).syllabes
        this.idPageUnit = prm['id']
        console.log(this.syllabesUnite)
      }
    )

    const words=this.syllabesUnite
    // const words = ["Apple", "Banana", "Orange", "Grapes", "Pineapple", "Watermelon", "Mango", "Peach"];

    let tempGroup: string[] = [];
    for (let i = 0; i < words.length; i++) {
      tempGroup.push(words[i]);
      if ((i + 1) % 6 === 0 || i === words.length - 1) {
        this.wordGroups.push(tempGroup);
        tempGroup = [];
      }
    }

    console.log(22)
  }

  speak(word:string){
    this.stt.speak(word)
  }

  playSuccessSound() {
    // Your logic for correct spelling
    this.voiceService.playSuccessSound();
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Trés Bien !",
      showConfirmButton: false,
      timer: 1000
    });


  }

  playErrorSound() {
    // Your logic for incorrect spelling
    this.voiceService.playErrorSound();
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Oops...",
      showConfirmButton: false,
      timer: 1000
    });
  }



  askForAuthorization() {
    // Call the function from the loaded script to ask for microphone authorization
    (window as any).askForMicrophoneAuthorization()
      .then(() => console.log("Microphone authorized"))
      .catch((error: any) => console.error("Error asking for authorization:", error));
  }

  listenForSpeech( i:number,j:number ) {
    
    (window as any).listenForSpeech(3000) // Listen for 5 seconds
      .then((transcript: any) => {
        console.log("Recognized speech:", transcript)

        let answer=false;
        if(this.wordGroups[i][j] === transcript){
          answer=true
        }
        if(answer){
          this.playSuccessSound()
        }
        else{
          this.playErrorSound()
        }
        
        
      })
      .catch((error: any) => {

      });
  }

}
