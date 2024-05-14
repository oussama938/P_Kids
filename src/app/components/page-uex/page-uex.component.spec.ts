import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUExComponent } from './page-uex.component';

describe('PageUExComponent', () => {
  let component: PageUExComponent;
  let fixture: ComponentFixture<PageUExComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageUExComponent]
    });
    fixture = TestBed.createComponent(PageUExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
