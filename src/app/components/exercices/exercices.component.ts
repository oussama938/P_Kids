import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-exercices',
  templateUrl: './exercices.component.html',
  styleUrls: ['./exercices.component.css']
})
export class ExercicesComponent {
  selectedExercise: number = 0;
  constructor(private dataService : DataService){}
  handleClick(exerciseNumber: number) {
    this.selectedExercise = exerciseNumber; // Update selectedExercise instead of incrementing it
    console.log('Clicked on Exercise ' + exerciseNumber);
    // Add your logic here for what happens when a button is clicked
  }
}
