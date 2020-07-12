import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Login104Component } from './login104.component';

describe('Login104Component', () => {
  let component: Login104Component;
  let fixture: ComponentFixture<Login104Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Login104Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Login104Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
