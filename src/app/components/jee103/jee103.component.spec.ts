import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Jee103Component } from './jee103.component';

describe('Jee103Component', () => {
  let component: Jee103Component;
  let fixture: ComponentFixture<Jee103Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Jee103Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Jee103Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
