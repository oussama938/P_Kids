export class Exercise2 {
    leftLetters: string[]; // Array to hold letters on the left
    rightLetters: string[]; // Array to hold letters on the right
    linkedPairs: LinkedPair[]; // Array to hold linked pairs
  
    constructor() {
      this.leftLetters = [];
      this.rightLetters = [];
      this.linkedPairs = [];
    }
  
    // Method to add a pair of linked letters
    addLinkedPair(leftLetter: string, rightLetter: string): void {
      this.linkedPairs.push({ left: leftLetter, right: rightLetter });
    }
  }
  
  interface LinkedPair {
    left: string;
    right: string;
  }
  