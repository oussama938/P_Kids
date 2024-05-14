import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { BienvenueComponent } from './components/bienvenue/bienvenue.component';
import { PageUExComponent } from './components/page-uex/page-uex.component';
import { UniteComponent } from './components/unite/unite.component';
import { ListeDesUniteComponent } from './components/liste-des-unite/liste-des-unite.component';
import { ExercicesComponent } from './components/exercices/exercices.component';
import { Exercice1Component } from './components/exercices/exercice1/exercice1.component';
import { Exercice2Component } from './components/exercices/exercice2/exercice2.component';
import { Exercice3Component } from './components/exercices/exercice3/exercice3.component';
import { MotsComponent } from './components/unite/mots/mots.component';
import { SyllabesComponent } from './components/unite/syllabes/syllabes.component';
import { AurevoirComponent } from './components/aurevoir/aurevoir.component';

const routes: Routes = [
  {path:'acceuil', component: AcceuilComponent },
  {path:'bienvenue',component:BienvenueComponent},
  {path:'uex',component:PageUExComponent},
  {path:'listedesunite',component:ListeDesUniteComponent},
  {path:'unite/:id',component:UniteComponent},
  {path:'mots/:id',component:MotsComponent},
  {path:'syllabes/:id',component:SyllabesComponent},
  {path:'exercices',component:ExercicesComponent},
  {path:'exercice1',component:Exercice1Component},
  {path:'exercice2',component:Exercice2Component},
  {path:'exercice3',component:Exercice3Component},
  {path:'by',component:AurevoirComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
   
 }
