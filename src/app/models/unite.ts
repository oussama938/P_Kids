export class Unite {
  id: number;
  words: string[];
  syllabes: string[];

  constructor(id: number, words: string[], syllabes: string[]) {
    this.id = id;
    this.words = words;
    this.syllabes = syllabes;
  }
}
