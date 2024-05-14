import { Injectable } from '@angular/core';
import { Exercise2 } from '../models/exercice2';

@Injectable({
  providedIn: 'root'
})
export class Exercise2Service {
  public exercise2: Exercise2;

  constructor() {
    this.exercise2 = new Exercise2();
  }

  // Method to add letters to the left array
  addLeftLetter(letter: string): void {
    this.exercise2.leftLetters.push(letter);
  }

  // Method to add letters to the right array
  addRightLetter(letter: string): void {
    this.exercise2.rightLetters.push(letter);
  }

  // Method to add a pair of linked letters
  addLinkedPair(leftLetter: string, rightLetter: string): void {
    this.exercise2.addLinkedPair(leftLetter, rightLetter);
  }

  // Method to get all linked pairs
  getLinkedPairs(): LinkedPair() {
    return this.exercise2.linkedPairs;
  }

  x :string;
}
