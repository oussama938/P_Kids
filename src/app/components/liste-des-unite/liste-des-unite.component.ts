import { Component, OnInit } from '@angular/core';
import { Unite } from 'src/app/models/unite';
import { DataService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-liste-des-unite',
  templateUrl: './liste-des-unite.component.html',
  styleUrls: ['./liste-des-unite.component.css']
})
export class ListeDesUniteComponent implements OnInit{
  public unites: Unite[] = [];
  activeUnit: number = 0;
  showUnite: boolean = false;
  constructor(private dataservice:DataService) { }
  ngOnInit(): void {
    this.unites = this.dataservice.unites;
  }

  // Method to handle when a unit button is clicked
  toggleUnite(): void {
    
    this.showUnite = true;

    
  }
  

}
