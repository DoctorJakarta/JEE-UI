import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Login103Component } from './login103.component';

describe('Login103Component', () => {
  let component: Login103Component;
  let fixture: ComponentFixture<Login103Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Login103Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Login103Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
