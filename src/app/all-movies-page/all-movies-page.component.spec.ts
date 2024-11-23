import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMoviesPageComponent } from './all-movies-page.component';

describe('AllMoviesPageComponent', () => {
  let component: AllMoviesPageComponent;
  let fixture: ComponentFixture<AllMoviesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllMoviesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllMoviesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
