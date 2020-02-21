import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TmpsaveorderComponent } from './tmpsaveorder.component';

describe('TmpsaveorderComponent', () => {
  let component: TmpsaveorderComponent;
  let fixture: ComponentFixture<TmpsaveorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmpsaveorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmpsaveorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
