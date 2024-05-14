import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotsComponent } from './mots.component';

describe('MotsComponent', () => {
  let component: MotsComponent;
  let fixture: ComponentFixture<MotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MotsComponent]
    });
    fixture = TestBed.createComponent(MotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
