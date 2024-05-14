export class Exercise1 {
    words: string[]; // Array to hold words for the exercise
    table: string[][]; // 2D array representing the table
  
    constructor() {
      this.words = [];
      this.table = [];
    }
  
    // Method to add a word to the exercise
    addWord(word: string): void {
      this.words.push(word);
    }
  
    // Method to initialize the table with empty cells
    initializeTable(rows: number, columns: number): void {
      this.table = new Array(rows).fill(null).map(() => new Array(columns).fill(''));
    }
  
    // Method to set a word at a specific row and column in the table
    setWord(row: number, column: number, word: string): void {
      if (this.table[row] && this.table[row][column] !== undefined) {
        this.table[row][column] = word;
      }
    }
  
    // Method to get the word at a specific row and column in the table
    getWord(row: number, column: number): string {
      if (this.table[row] && this.table[row][column] !== undefined) {
        return this.table[row][column];
      }
      return '';
    }
  }
  