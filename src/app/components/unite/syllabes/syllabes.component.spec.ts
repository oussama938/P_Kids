import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyllabesComponent } from './syllabes.component';

describe('SyllabesComponent', () => {
  let component: SyllabesComponent;
  let fixture: ComponentFixture<SyllabesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SyllabesComponent]
    });
    fixture = TestBed.createComponent(SyllabesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
