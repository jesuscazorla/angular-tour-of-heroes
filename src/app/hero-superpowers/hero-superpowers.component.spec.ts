import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSuperpowersComponent } from './hero-superpowers.component';

describe('HeroSuperpowersComponent', () => {
  let component: HeroSuperpowersComponent;
  let fixture: ComponentFixture<HeroSuperpowersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroSuperpowersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroSuperpowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
