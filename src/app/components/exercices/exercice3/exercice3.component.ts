
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ScriptLoaderService } from 'src/app/services/script-loader.service';
import { SpellingService } from 'src/app/services/spelling.service';
import { TextToSpeechSynthService } from 'src/app/services/text-to-speech-synth.service';
import { VoiceService } from 'src/app/services/voice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exercice3',
  templateUrl: './exercice3.component.html',
  styleUrls: ['./exercice3.component.css']
})
export class Exercice3Component {
  progress: number = 0;
  progressWidth?: number;
  timerValue: string = '--:--';
  timer: number = 90;
  interval: any;
  listSyllabes: any =['a', 'ma', 'am', 'al', 'mi', 'li', 'mu', 'imi', 'lom', 'lal', 'lil', 'lim', 'mil', 'lam', 'amo', 'tu', 'ili', 'ima', 'lima', 'alal', 'mami', 'mimi', 'ali', 'la', 'mo', 'il', 'ami', 'mal', 'amal', 'ala']
  // spellSyllabes=[['à' ,'Ah.','ah' ],['ma'],['am','Âme ?'],['al','All.','Al.','hal'],['mis','mais','mi'],['lis','lit','les'],['me','mais','menu','Menu'],['imi','emy','Imi.','et mais'],["l'homme","l'Homme","L'homme"],['L"al','la','lol'],['l"aile','l"ail','l"ile'],['Lim','L"aime.','l"hymne','lim'],['mais','1000','1000.'],["l'âme","L'âme ?"],["Hameau.","Hameaux","hameau"],["Tu."],["ily","il lit"],["il m'a","climat","emma"],["lima"],["alan","halal"],["Mommy.","Mamie.","mamie"],["mimi"],["ali"],["la","là"],["mot"],["il"],["ami","amis"],["mâle","mal"],["à mal","amal"],["À la.","à la"]]
  spellSyllabes:any[]=[]
  syllabesGroups: string[][] = [];
  buttonValue:string = "Commencer"
  score : number = 0;
  currentWordIndex: number = -1;
  correctWord: string = this.listSyllabes[this.currentWordIndex];
  evaluationInterval: number = 0;
  idPageUnit = 0;
  isButtonDisabled: boolean = false; 
  transcriptWord=''
  consigne = 'Je lis et je gagne des étoiles'

  constructor(private voiceService : VoiceService,
              private scriptLoader:ScriptLoaderService,
              private stt :TextToSpeechSynthService ,
              private router:Router,
              private spl:SpellingService
  ) {
    this.scriptLoader.loadScript('../assets/script/script.js').then(() => {
      // Script has loaded, you can use functions defined in script.js here
      this.askForAuthorization();
      this.spl.loadData('ex3.json').subscribe(
        (data)=>{
          for(let i=0;i<data.length;i++){
            this.spellSyllabes.push(data[i].variations)
          }
          console.log(this.spellSyllabes);
          
        }
      )


    }).catch((error) => {
      // Handle error if script fails to load
      console.error('Script loading failed:', error);
    });
   }

  ngOnInit(): void {
    console.log(this.spellSyllabes.length);
    
    this.splitSyllabes();
    console.log(this.currentWordIndex);
  }



  splitSyllabes() {
    for (let i = 0; i < this.listSyllabes.length; i += 5) {
      this.syllabesGroups.push(this.listSyllabes.slice(i, i + 5));
    }
  }

  reloadPage(): void {
    const currentUrl = this.router.url;
    clearInterval(this.interval)
    this.router.navigateByUrl('/acceuil', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl);
    });
  }



  startTimer() {
    this.isButtonDisabled=true
      this.interval = setInterval(() => {
        this.updateTimer();
      }, 1000); 
  }

  updateTimer() {
    if(this.currentWordIndex==-1){
      this.currentWordIndex=0
    }

  this.timer--;
  this.evaluationInterval++; 
  
  
  if (this.evaluationInterval === 1) {
    this.listenForSpeech1();
  }
  

  if (this.evaluationInterval === 3) {
    console.log(this.spellSyllabes[this.currentWordIndex]);
    
    let testAnswer=false;
    for(let spell of this.spellSyllabes[this.currentWordIndex]){
      if(spell==this.transcriptWord){
        testAnswer = true
        break
      }
      console.log(spell);
    }
    console.log(testAnswer);
    


    if(testAnswer){
      this.score++
      this.playSuccessSound()
    }else{
      this.playErrorSound()
    }
    
    this.evaluationInterval = 0;
    this.currentWordIndex++; // Reset the evaluation interval
    this.correctWord=this.listSyllabes[this.currentWordIndex]

  }
    
    if (this.timer <= 0) {
      clearInterval(this.interval);
      console.log("Time's up!");
      console.log(this.interval);
      
    }
    

    
    this.timerValue = this.formatTime(this.timer);
    if (this.timerValue === '00:00') {
      console.log("end")
      this.isButtonDisabled=false
      if(this.score<10){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "T'as pas gagné des étoiles :( !",
          confirmButtonText:'OKAY !',
          allowOutsideClick: false
  
      }).then((result)=>{
        if(result.isConfirmed){
          this.reloadPage();
        }
      });
      }else if(this.score<=10){
        this.swalWithImage(1)
      }
      else if(this.score<=20){
        this.swalWithImage(2)
      }else{
        this.swalWithImage(3)
      }

    }
    
  }
  

  showSuccessPopup() {
    // Implement logic to show success popup
    console.log('Success!');
  }
  
  highlightSyllable(index: number): boolean {
    return index === this.currentWordIndex;
  }
  
  generateBoolean(){
    return Math.random()>0.5?true:false
  }
  

  showFailurePopup() {
    // Implement logic to show failure popup
    console.log('Failure!');
  }

  // detectSonFor3Secands(){}

  swalWithImage(stars:number){
    Swal.fire({
      title: "Bien!",
      text: "T'as gagné des étoiles.",
      imageUrl: "../../../../assets/Stars/"+stars+'png',
      imageWidth: 400,
      imageHeight: 200,
      confirmButtonText:'OKAY !',
      allowOutsideClick: false
    }).then(
      (result)=>{
        if(result.isConfirmed){
          this.reloadPage();
        }
      }
    );
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds.toString();
    return formattedMinutes + ':' + formattedSeconds;
  }

  playSuccessSound() {
    this.voiceService.playSuccessSound();
  }

  playErrorSound() {
    this.voiceService.playErrorSound();
  }  

  listenForSpeech1(  ) {
    (window as any).listenForSpeech(1500) // Listen for 5 seconds
      .then((transcript: any) => {
        setTimeout(()=>{

        },1000)
        console.log("Recognized speech:", transcript)
        this.transcriptWord = transcript
        // console.log(this.transcriptWord);
      })
      .catch((error: any) => {

      });
  }

  // listenForSpeech1(  ) {
  //   (window as any).listenForSpeech(2000) // Listen for 5 seconds
  //     .then((transcript: any) => {
  //       console.log('('+transcript+')')
  //       // console.log(this.transcriptWord);
  //     })
  //     .catch((error: any) => {

  //     });
  // }

  askForAuthorization() {
    // Call the function from the loaded script to ask for microphone authorization
    (window as any).askForMicrophoneAuthorization()
      .then(() => console.log("Microphone authorized"))
      .catch((error: any) => console.error("Error asking for authorization:", error));
  }
  onClickBird(){
    this.stt.speak(this.consigne);
  }
}
