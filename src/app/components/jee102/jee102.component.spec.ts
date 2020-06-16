import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Jee102Component } from './jee102.component';

describe('Jee102Component', () => {
  let component: Jee102Component;
  let fixture: ComponentFixture<Jee102Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Jee102Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Jee102Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
