import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RickAndMortyCharactersGridComponent } from './rick-and-morty-characters-grid.component';

describe('RickAndMortyCharactersGridComponent', () => {
  let component: RickAndMortyCharactersGridComponent;
  let fixture: ComponentFixture<RickAndMortyCharactersGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RickAndMortyCharactersGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RickAndMortyCharactersGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
