import { Injectable } from '@angular/core';
import { Unite } from '../models/unite'; // Assuming your Unite model is in a file named unite.ts

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public unites: Unite[] = [
    new Unite(
      1,
      [
        'fier', 'arbre', 'jardin', 'Lina', 'elyssa', 'papa', 'maman', 'lapin', 'la lune', 'la table', 'le', 'elle', 'lit', 'merci', 'l oncle Emile', 'un joli oiseau', 'Amira', 'mamie', 'Mourad', 'ma mère', 'Amine mon frère', 'ma soeur', 'tonton', 'il', 'papi','fleur','soleil','chaise','chat','étoile'
      ],
      [
        'a', 'ma', 'am', 'al', 'mi', 'li', 'mil', 'imi', 'lam', 'lal', 'lil', 'lim', 'mil', 'lam', 'am', 'imi', 'ili', 'ima', 'lima', 'alal', 'mami', 'mimi', 'ali', 'la', 'ma', 'il', 'ami', 'mal', 'amal', 'ala', 'alia', 'lilia', 'lamia', 'malia','mala','lami'
      ]
    ),
    new Unite(
      2,
      [
        'nombreuses classes', 'vaste cour', 'je rigole', 'moto', 'colle', 'stylo', 'mon école', 'date', 'domino', 'midi', 'mur', 'une jupe', 'un bureau', 'un bus', 'mon', 'son', 'crayon', 'je rigole','cour', 'ruz', 'drapeau', 'trousse', 'un garçon', 'une fille', 'lola', 'dodo', 'radis', 'la salle de classe', 'la salle d informatique', 'la bibliothèque de l école', 'la salle de sport', 'le terrain de sport', 'Le drapeau flotte','la contine', 'le préau', 'Mon coin lecture',
      ],
      [
        'du', 'do', 'ud', 'od', 'or', 'ro', 'dod', 'dud', 'rod', 'dor', 'dur', 'rud', 'odu', 'ora', 'udo', 'uro', 'morad', 'odir', 'dru', 'drol', 'rido', 'radu', 'dodu', 'rirora', 'dudu', 'odriri', 'rima', 'lira', 'dur', 'amira', 'malo','liliam','amila','miala','alima','lamiil'
      ]
    ),
  ];

  public exercice1=[['garçon', 'mamon', 'chanter','tante', 'content', 'onele','une', 'tu', 'papi','une','jolie','colorier'],['i','u','on','an']]

  constructor() {
  }

  getUnitById(id: number): Unite {
    return this.unites[id-1]
  } 
}