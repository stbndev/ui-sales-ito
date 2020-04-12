import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NvtrsentriesComponent } from './nvtrsentries.component';

describe('NvtrsentriesComponent', () => {
  let component: NvtrsentriesComponent;
  let fixture: ComponentFixture<NvtrsentriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NvtrsentriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NvtrsentriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
