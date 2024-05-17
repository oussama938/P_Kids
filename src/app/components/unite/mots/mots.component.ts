import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Unite } from 'src/app/models/unite';
import { DataService } from 'src/app/services/data-service.service';
import { ScriptLoaderService } from 'src/app/services/script-loader.service';
import { SpellingService } from 'src/app/services/spelling.service';
import { TextToSpeechSynthService } from 'src/app/services/text-to-speech-synth.service';
import { VoiceService } from 'src/app/services/voice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mots',
  templateUrl: './mots.component.html',
  styleUrls: ['./mots.component.css']
})
export class MotsComponent implements OnInit{

  // spells:any[]=[['fier'], ['arbre'], ['jardin'], ['lina','lena','Lina'], ['et les','elyssa','et les'], ['papa'], ['maman'], ['lapin'], ['la lune'], ['la table','la'], ['le'], ['elle','elles'], ['lit','les','lis'], ['Merci.','merci'], ["l'oncle émile","l'oncle"], ['oiseau'], ['Amira','Amira.'], ['mamie','Mamie','Mamie.'], ['mourad','Mourad'], ['mère'], ['amine mon frère','amine'], ['masseur','ma soeur'], ['tonton'], ['il'], ['papy','papi'], ['fleur'], ['soleil','Soleil.'], ['Chaise.','chaise'], ['chat'], ['étoile','Étoile.']]
  spells:any[]=[]
  motsUnite:any;
  displayedMots : any;
  Paginator : any
  id = 0;
  idPageUnit = 0;
  showPopup: boolean = false;
  popupData?: boolean;
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
  @ViewChild('audioPlayerFail') audioPlayerFail!: ElementRef<HTMLAudioElement>;
  showSuccess: boolean = false;
  showFail: boolean = false;
  constructor(private route:ActivatedRoute,
              private dataService:DataService,private stt:TextToSpeechSynthService,
              private voiceService : VoiceService,
              private scriptLoader:ScriptLoaderService,private spl:SpellingService
  ){
        this.scriptLoader.loadScript('../assets/script/script.js').then(() => {
      // Script has loaded, you can use functions defined in script.js here
      this.askForAuthorization();
      
      
    }).catch((error) => {
      // Handle error if script fails to load
      console.error('Script loading failed:', error);
    });

  }
  ngOnInit(): void {
    
    this.route.params.subscribe(
      (prm)=>{
        this.motsUnite=this.dataService.getUnitById(prm['id']).words
        this.Paginator = this.chunkArray(this.motsUnite , 6)
        this.displayedMots = this.chunkArray(this.motsUnite , 6)[0]
        console.log("displayed mot",this.displayedMots);

        this.idPageUnit = prm['id']

        console.log('motsUnite'+this.idPageUnit+'.json');
        
        this.spl.loadData('motsUnite'+this.idPageUnit+'.json').subscribe(
          (data)=>{
            for(let i=0;i<data.length;i++){
              this.spells.push(data[i].variations)
            }          
          }
        )
        console.log(this.spells)
        
      }
    )
    
    
  }

  speak(word:string){
    this.stt.speak(word)
  }

  chunkArray(array: any[], chunkSize: number): any[][] {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }


  changeElements(id:number){
    this.displayedMots = this.chunkArray(this.motsUnite , 6)[id]
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

  listenForSpeech( index :number ) {
    console.log(index);
    
    (window as any).listenForSpeech(2500) // Listen for 5 seconds
      .then((transcript: any) => {
        console.log("Recognized speech:", transcript)

        let answer=false;

        for(let el of this.spells[index]){
          console.log(el);
          
          if(el===transcript){
            answer=true
          }
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
