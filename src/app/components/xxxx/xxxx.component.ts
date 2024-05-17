import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { DataService } from 'src/app/services/data-service.service';
import { ScriptLoaderService } from 'src/app/services/script-loader.service';
import { SpellingService } from 'src/app/services/spelling.service';
import Swal from 'sweetalert2';

type Spell = {
  original: string;
  variations: string[];
}

const spells: Spell[] = [
  {
    original: "spell1a",
    variations: ["variant1a", "variant1b"]
  },
  {
    original: "spell1b",
    variations: ["variant1c"]
  }
];


@Component({
  selector: 'app-xxxx',
  templateUrl: './xxxx.component.html',
  styleUrls: ['./xxxx.component.css']
})
export class XXXXComponent implements OnInit{

  transcriptedWord=''
  displayedWordIndex=0;
  displayingTableIndex=0


  displayingTable?:Spell[]
  displayingWord=''
  

  WordsUnit1:Spell[]= [
  ]
  SyllUnit1:Spell[]= [
  ]
  WordsUnit2:Spell[]= [
  ]

  SyllUnit2:Spell[]= [
  ]
  WordsEx3:Spell[]= [
]
  ex3: string[] =['a', 'ma', 'am', 'al', 'mi', 'li', 'mu', 'imi', 'lom', 'lal', 'lil', 'lim', 'mil', 'lam', 'amo', 'tu', 'ili', 'ima', 'lima', 'alal', 'mami', 'mimi', 'ali', 'la', 'mo', 'il', 'ami', 'mal', 'amal', 'ala']

  lastClickedIndex: number = -1;

  onItemClick(index: number): void {
    this.lastClickedIndex = index;
    if(this.lastClickedIndex==0){
      this.displayingTable=this.WordsUnit1
    }
    else if(this.lastClickedIndex==1){
      this.displayingTable=this.SyllUnit1
    }
    else if(this.lastClickedIndex==2){
      this.displayingTable=this.WordsUnit2
    }
    else if(this.lastClickedIndex==3){
      this.displayingTable=this.SyllUnit2
    }
    else if(this.lastClickedIndex==4){
      this.displayingTable=this.WordsEx3
    }
    this.displayedWordIndex=0
    console.log(this.displayingTable);
    
    this.ngOnInit()    

  }

  getFilename(){
    if(this.lastClickedIndex==0){
      return 'motsUnite1'
    }
    else if(this.lastClickedIndex==1){
      return 'syllUnite1'
    }
    else if(this.lastClickedIndex==2){
      return 'motsUnite2'
    }
    else if(this.lastClickedIndex==3){
      return 'syllUnite2'
    }
    else {
      return 'ex3'
    }
  }

  passer(){
    this.displayedWordIndex++
    if(this.displayingTable){
      if(this.displayedWordIndex==this.displayingTable?.length  ){
        this.spl.saveDataToFile(this.displayingTable,this.getFilename())
        console.log(this.getFilename());
        
        this.displayedWordIndex=0;
        this.lastClickedIndex++;
        if(this.lastClickedIndex==4){
            this.lastClickedIndex=0
        }
        this.onItemClick(this.lastClickedIndex)
      }
      this.displayingWord=this.displayingTable[this.displayedWordIndex].original
    }
    console.log(this.displayingTable); 
  }


  add(){
    if(this.transcriptedWord!==''){
      if(this.displayingTable){
        this.displayingTable[this.displayedWordIndex].variations.push(this.transcriptedWord)
      }
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }


 
  

  ngOnInit(): void {
    if(this.displayingTable){
      this.displayingWord=this.displayingTable[this.displayedWordIndex].original
    }
    


    // this.spl.loadData('motsUnite1.json').subscribe(
    //   (data)=>{
    //     // console.log(data);

    //     // this.spl.jsonData=this.W

    //     console.log(data);
    //   }
    // )

    
  }

  constructor(public spl:SpellingService,private dataService:DataService,private scriptLoader:ScriptLoaderService){
    this.dataService.unites[0].words.forEach(
      (el)=>{
        const spl={
          original:el,
          variations:[]
        }
        this.WordsUnit1.push(spl)
      }
    )
    this.dataService.unites[1].words.forEach(
      (el)=>{
        const spl={
          original:el,
          variations:[]
        }
        this.WordsUnit2.push(spl)
      }
    )
    this.dataService.unites[0].syllabes.forEach(
      (el)=>{
        const spl={
          original:el,
          variations:[]
        }
        this.SyllUnit1.push(spl)
      }
    )
    this.dataService.unites[1].syllabes.forEach(
      (el)=>{
        const spl={
          original:el,
          variations:[]
        }
        this.SyllUnit2.push(spl)
      }
    )

    this.ex3.forEach((el)=>{
      let spell={
        original:el,
        variations:[]
      }
      this.WordsEx3.push(spell)
    })

    this.scriptLoader.loadScript('../assets/script/script.js').then(() => {
      // Script has loaded, you can use functions defined in script.js here
      this.askForAuthorization();
    }).catch((error) => {
      // Handle error if script fails to load
      console.error('Script loading failed:', error);
    });
  }

  listenForSpeech(  ) {
    (window as any).listenForSpeech(3000) // Listen for 5 seconds
      .then((transcript: any) => {
        setTimeout(()=>{

        },2500)
        console.log("Recognized speech:", transcript)
        this.transcriptedWord = transcript
        // console.log(this.transcriptWord);
      })
      .catch((error: any) => {

      });
  }

  askForAuthorization() {
    // Call the function from the loaded script to ask for microphone authorization
    (window as any).askForMicrophoneAuthorization()
      .then(() => console.log("Microphone authorized"))
      .catch((error: any) => console.error("Error asking for authorization:", error));
  }


}
