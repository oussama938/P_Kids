import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data-service.service';
import { ScriptLoaderService } from 'src/app/services/script-loader.service';
import { SpellingService } from 'src/app/services/spelling.service';
import { TextToSpeechSynthService } from 'src/app/services/text-to-speech-synth.service';
import { VoiceService } from 'src/app/services/voice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-syllabes',
  templateUrl: './syllabes.component.html',
  styleUrls: ['./syllabes.component.css']
})
export class SyllabesComponent {
  prmJson=0
  syllabesUnite:any;
  idPageUnit = 0;
  wordGroups: string[][] = [];
  spells:any[]=[]

  constructor(private route:ActivatedRoute,
              private dataService:DataService,private stt:TextToSpeechSynthService,private voiceService:VoiceService,
              private spl:SpellingService,private scriptLoader:ScriptLoaderService
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
        this.syllabesUnite=this.dataService.getUnitById(prm['id']).syllabes
        this.idPageUnit = prm['id']
        console.log(this.syllabesUnite)
        this.prmJson=parseInt(prm['id'])
        console.log('syllUnite'+this.prmJson+'.json');
        
        this.spl.loadData('syllUnite'+this.prmJson+'.json').subscribe(
          (data)=>{
            for(let i=0;i<data.length;i++){
              this.spells.push(data[i].variations)
            }          
          }
        )
        console.log(this.spells);

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

  listenForSpeech( i :number ,j:number) {
    let index=0
    console.log(i+'|'+j);

    index=(i)*6+ j;

    console.log(index);
    
    //calcuer index


    
    (window as any).listenForSpeech(2000) // Listen for 5 seconds
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
