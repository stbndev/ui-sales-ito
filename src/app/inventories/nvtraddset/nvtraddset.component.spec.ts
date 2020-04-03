import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NvtraddsetComponent } from './nvtraddset.component';

describe('NvtraddsetComponent', () => {
  let component: NvtraddsetComponent;
  let fixture: ComponentFixture<NvtraddsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NvtraddsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NvtraddsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
