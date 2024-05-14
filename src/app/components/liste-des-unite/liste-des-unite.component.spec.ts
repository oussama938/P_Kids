import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDesUniteComponent } from './liste-des-unite.component';

describe('ListeDesUniteComponent', () => {
  let component: ListeDesUniteComponent;
  let fixture: ComponentFixture<ListeDesUniteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeDesUniteComponent]
    });
    fixture = TestBed.createComponent(ListeDesUniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
