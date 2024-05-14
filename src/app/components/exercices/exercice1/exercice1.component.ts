import { Component, ElementRef, ViewChild } from '@angular/core';
import { ExerciseService } from 'src/app/services/exercice.service';
import { TextToSpeechSynthService } from 'src/app/services/text-to-speech-synth.service';
import { VoiceService } from 'src/app/services/voice.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-exercice1',
  templateUrl: './exercice1.component.html',
  styleUrls: ['./exercice1.component.css']
})
export class Exercice1Component {
  public tableWords: string[];
  exerciseservice: ExerciseService;
  ex1 = ['garçon', 'maman', 'chanter','tante', 'content', 'oncle','une', 'tu', 'papie','une','jolie','colorier'];
  spells=[]
  public response: Map<string, Array<string>> = new Map<string, Array<string>>([
    ['i-cell', ['papie' , 'jolie' , 'colorier']],
    ['u-cell', ['une' , 'tu']],
    ['on-cell', ['garçon' , 'content','oncle']],
    ['an-cell', ['tante' , 'chanter','maman']]
  ]);
  consigne = 'Je classifie les mots dans le tableau'
  public result:boolean=false
  @ViewChild('iCell') iCell!: ElementRef;
  @ViewChild('uCell') uCell!: ElementRef;
  @ViewChild('onCell') onCell!: ElementRef;
  @ViewChild('anCell') anCell!: ElementRef;

  constructor(exerciseservice: ExerciseService , private stt :TextToSpeechSynthService ,private voiceService:VoiceService) {
    this.exerciseservice = exerciseservice;
    this.tableWords = this.ex1 || [];
    this.resetTable();
    console.log(this.response);
  }

  

  dragStart(event: DragEvent) {
    event.dataTransfer?.setData("text/plain", (event.target as HTMLElement).textContent || '');
  }

  drop(event: DragEvent, targetId: string) {
    event.preventDefault();
    const droppedWord = event.dataTransfer?.getData("text/plain");
    if (droppedWord) {
      // Get the target cell using its ID
      const targetCell = document.getElementById(targetId);
      if (targetCell && targetCell.textContent !== null) {
        console.log(event)
        
          // If empty, append the new cell directly
          const newCell = document.createElement('div');
          newCell.textContent = droppedWord;
          // Set draggable to false to prevent dragging after placement
          targetCell.appendChild(newCell);
        
        // Remove the dropped word from the list (optional)
       this.tableWords = this.tableWords.filter(word => word !== droppedWord);
      }
    }
   
  }
 
  


resetTable() {
  this.tableWords = [...this.ex1];
  this.clearTable();
}

clearTable() {
  // Clear the content of all cells with class "droppable"
  const cells = document.querySelectorAll('.droppable');
  cells.forEach(cell => {
    cell.innerHTML = '';
  });
}
  
  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  preventDrag(event: MouseEvent) {
    event.preventDefault();
  }

  playSpeech(word: string){
    this.stt.speak(word)
  }

  validateResponse() {
    const iCellTdElement: HTMLElement = this.iCell.nativeElement;
    const uCellTdElement: HTMLElement = this.uCell.nativeElement;
    const onCellTdElement: HTMLElement = this.onCell.nativeElement;
    const anCellTdElement: HTMLElement = this.anCell.nativeElement;

    const iDivElements: NodeListOf<HTMLDivElement> = iCellTdElement.querySelectorAll('div');
    const uDivElements: NodeListOf<HTMLDivElement> = uCellTdElement.querySelectorAll('div');
    const onDivElements: NodeListOf<HTMLDivElement> = onCellTdElement.querySelectorAll('div');
    const anDivElements: NodeListOf<HTMLDivElement> = anCellTdElement.querySelectorAll('div');



    let icolumn:Array<string> = [];
    for(let i =0 ; i<iDivElements.length ; i++){
      icolumn[i] =iDivElements[i].innerText
    }
    let ucolumn:Array<string> = [];
    for(let i =0 ; i<uDivElements.length ; i++){
      ucolumn[i] =uDivElements[i].innerText
    }
    let oncolumn:Array<string> = [];
    for(let i =0 ; i<onDivElements.length ; i++){
      oncolumn[i] =onDivElements[i].innerText
    }
    let ancolumn:Array<string> = [];
    for(let i =0 ; i<anDivElements.length ; i++){
      ancolumn[i] =anDivElements[i].innerText
    }


    if (this.response) {
      const iResponse = this.response.get('i-cell');
      const uResponse = this.response.get('u-cell');
      const onResponse = this.response.get('on-cell');
      const anResponse = this.response.get('an-cell');

      if (iResponse !== undefined &&anResponse !== undefined && onResponse !== undefined&&uResponse !== undefined) {
        const sortedIColumn = icolumn.slice().sort();
        const sortedIResponse = iResponse.slice().sort();

        const sortedOnColumn = oncolumn.slice().sort();
        const sortedOnResponse = onResponse.slice().sort();

        const sortedUColumn = ucolumn.slice().sort();
        const sortedUResponse = uResponse.slice().sort();

        const sortedAnColumn = ancolumn.slice().sort();
        const sortedAnResponse = anResponse.slice().sort();
  
        if(this.arraysAreEqual(sortedIColumn, sortedIResponse) && this.arraysAreEqual(sortedOnColumn, sortedOnResponse) && 
        this.arraysAreEqual(sortedUColumn, sortedUResponse) &&this.arraysAreEqual(sortedAnColumn, sortedAnResponse) ){
          console.log("L exercice est correcte");
          Swal.fire({
            title: "Bon Travail !",
            text: "T'as reussi à faire l'exercice !",
            icon: "success",
            confirmButtonText:'Quitter'
          });

          this.voiceService.Aplaud()
          this.resetTable()
          
        }
        else{
          Swal.fire({
            title: "T'as perdu !",
            icon: "error",
            confirmButtonText: "Refaire l'exercice !",
          }).then((result) => {
            if (result.isConfirmed) {
              this.resetTable()
            }
          });
          
        }
   
      } else {
        console.log("column error !");
        
      }
      
    }


    console.log(icolumn);
    
    
  }
  
  getExpectedWords(targetId: string): string[] {
    switch (targetId) {
      case 'i-cell':
        return ['papie', 'jolie', 'colorier'];
      case 'u-cell':
        return ['une', 'tu'];
      case 'on-cell':
        return ['garçon', 'content', 'oncle', 'mamon'];
      case 'an-cell':
        return ['tante', 'chanter'];
      default:
        return [];
    }
  }
  
  arraysAreEqual(arr1: string[], arr2: string[]): boolean {
    // Check if both arrays have the same length
    if (arr1.length !== arr2.length) {
      return false;
    }
    
    // Sort both arrays
    arr1.sort();
    arr2.sort();
    
    // Check if all elements are equal
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    
    return true;
  }

  onClickBird(){
    this.stt.speak(this.consigne);
  }
  
}