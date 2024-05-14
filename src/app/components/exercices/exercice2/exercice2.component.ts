import { Component, OnInit } from '@angular/core';
import {TextToSpeechSynthService} from "../../../services/text-to-speech-synth.service"
import { ActivatedRoute, Route } from '@angular/router';
import { DataService } from 'src/app/services/data-service.service';
import { ScriptLoaderService } from 'src/app/services/script-loader.service';
import { VoiceService } from 'src/app/services/voice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exercice2',
  templateUrl: './exercice2.component.html',
  styleUrls: ['./exercice2.component.css']
})
export class Exercice2Component implements OnInit{
  

  displayedCoupleIndex = 0;
  currentCoupleIndex = 0;
  answeredCorrectly = false;
  transcriptWord=''
  consigne = 'Je lit et je gagne des points'
  constructor(private voice:VoiceService,private stt: TextToSpeechSynthService , private route:ActivatedRoute , private dataService :DataService,private scriptLoader:ScriptLoaderService) {
    this.scriptLoader.loadScript('../assets/script/script.js').then(() => {
    console.log("Script Loaded successefully !");

    }).catch((error) => {
      // Handle error if script fails to load
      console.error('Script loading failed:', error);
    });
   }
  ngOnInit(): void{

  }



  nextCouple() {
    if(this.displayedCoupleIndex==3){
      this.displayedCoupleIndex=0
    }else{
      this.displayedCoupleIndex++
    }
  }
  onClickBird(){
    this.stt.speak(this.consigne);
  }

  ////this is where the user will spell the word , just this.answeredCorrectly value will be based on the spelling 
  onspeech( ){
    this.listenForSpeech()  
  }
  
  onButtonClicked() {
    const couple = this.couples[this.displayedCoupleIndex];
    this.stt.speak(couple[0] + couple[1]);      
  }

  listenForSpeech () {
    (window as any).listenForSpeech(3000) // Listen for 5 seconds
      .then((transcript: any) => {
        this.transcriptWord=transcript
        console.log(transcript);
        console.log(this.currentCoupleIndex);
        
        
        let answer=false;
        for(let spell of this.spells[this.displayedCoupleIndex]){
          if(spell==this.transcriptWord){
            answer=true;
          }
        }
      
        if(answer){
          this.voice.playSuccessSound()
          this.nextCouple()
          if(this.displayedCoupleIndex==0){
            Swal.fire({
              icon: "success",
              title: "T'as reussi à faire l'execice !",
              text: "Quitter ou refaire l'exercice",
            });
          }
        }
        else{
          this.voice.playErrorSound()
        }       
      })
      .catch((error: any) => {

      });
  }

  couples = [ ["ma", "lia"] , ["ma", "lin"] , ["li", "lia"] , ["ala", "la"]]
  spells=[["malia","maléa","Malia","Malia."],["malin","Malin."],["Lilia.","lilia"],["à la","ah là là"]]
  

  

  
}