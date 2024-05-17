import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XXXXComponent } from './xxxx.component';

describe('XXXXComponent', () => {
  let component: XXXXComponent;
  let fixture: ComponentFixture<XXXXComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [XXXXComponent]
    });
    fixture = TestBed.createComponent(XXXXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
