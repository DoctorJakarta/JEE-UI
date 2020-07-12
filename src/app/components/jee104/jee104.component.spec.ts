import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Jee104Component } from './jee104.component';

describe('Jee104Component', () => {
  let component: Jee104Component;
  let fixture: ComponentFixture<Jee104Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Jee104Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Jee104Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
