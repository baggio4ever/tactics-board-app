import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoccerFieldComponent } from './soccer-field.component';

describe('SoccerFieldComponent', () => {
  let component: SoccerFieldComponent;
  let fixture: ComponentFixture<SoccerFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoccerFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoccerFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
