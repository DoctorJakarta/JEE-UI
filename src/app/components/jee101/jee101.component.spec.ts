import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Jee101Component } from './jee101.component';

describe('Jee101Component', () => {
  let component: Jee101Component;
  let fixture: ComponentFixture<Jee101Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Jee101Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Jee101Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
