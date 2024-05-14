import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data-service.service';
import { Unite } from '../../models/unite';
import { SttService } from 'src/app/services/stt.service';
import { TextToSpeechSynthService } from 'src/app/services/text-to-speech-synth.service';

@Component({
  selector: 'app-unite',
  templateUrl: './unite.component.html',
  styleUrls: ['./unite.component.css']
})
export class UniteComponent implements OnInit {
  wordGroups: string[][] = [];
  showMots: boolean = false;
  showSyllabes: boolean = false;
  words: string[] = [];
  syllabes: string[] = [];
  id: number = 0;

  constructor(private route: ActivatedRoute,
     private unitService: DataService,
     private stt:TextToSpeechSynthService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      // Utilisez l'ID comme vous le souhaitez
      console.log(this.unitService.getUnitById(this.id))
    });
  }

  toggleUnite(id: number): void {
    // Set the unit ID
    this.id = id;
    // Toggle mots or syllabes based on the unit ID
    if (id === 1) {
      // console.log(this.id)
      this.toggleMots();
    } else if (id === 2) {
      this.toggleSyllabes();
    }
  }

  toggleMots(): void {
    this.showMots = !this.showMots;
    this.showSyllabes = false; // Hide syllabes if mots are shown
    if (this.showMots) {
      // Retrieve mots data from the service

      console.log(this.id)
      let unit= this.unitService.getUnitById(this.id);
      if (unit) {
        this.words = unit.words; // Assign words data to the array
        console.log(unit); // Check if mots data is correctly assigned
      } else {
        console.error(`Unit with ID ${this.id} not found.`);
      }
    }
  }

  toggleSyllabes(): void {
    this.wordGroups=[]
    this.showSyllabes = !this.showSyllabes;
    this.showMots = false; // Hide mots if syllabes are shown
    if (this.showSyllabes) {
      // Retrieve syllabes data from the service
      const unit: Unite | undefined = this.unitService.getUnitById(this.id);

      console.log(unit)
      if (unit) {
        this.syllabes = unit.syllabes; // Assign syllabes data to the array
        console.log(this.syllabes); // Check if syllabes data is correctly assigned
      } else {
        console.error(`Unit with ID ${this.id} not found.`);
      }
    }

    console.log(this.syllabes)
    const words=this.syllabes
    // const words = ["Apple", "Banana", "Orange", "Grapes", "Pineapple", "Watermelon", "Mango", "Peach"];

    // Group words into arrays of 6 words each
    let tempGroup: string[] = [];
    for (let i = 0; i < words.length; i++) {
      tempGroup.push(words[i]);
      if ((i + 1) % 6 === 0 || i === words.length - 1) {
        this.wordGroups.push(tempGroup);
        tempGroup = [];
      }
    }
  }

  Speak(word:string){
    this.stt.speak(word)

  }

  }
  


