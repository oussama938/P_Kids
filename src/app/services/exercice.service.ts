import { Injectable } from '@angular/core';
import { Exercise1 } from '../models/exercice1';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  public exercise: Exercise1;

  constructor() {
    this.exercise = new Exercise1();
  }

  // Method to add a word to the exercise
  addWord(word: string): void {
    this.exercise.addWord(word);
  }

  // Method to initialize the table with empty cells
  initializeTable(rows: number, columns: number): void {
    this.exercise.initializeTable(rows, columns);
  }

  // Method to set a word at a specific row and column in the table
  setWord(row: number, column: number, word: string): void {
    this.exercise.setWord(row, column, word);
  }

  // Method to get the word at a specific row and column in the table
  getWord(row: number, column: number): string {
    return this.exercise.getWord(row, column);
  }
}
