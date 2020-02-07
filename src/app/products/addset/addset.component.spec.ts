import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsetComponent } from './addset.component';

describe('AddsetComponent', () => {
  let component: AddsetComponent;
  let fixture: ComponentFixture<AddsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
