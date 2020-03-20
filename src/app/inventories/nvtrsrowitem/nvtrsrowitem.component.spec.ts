import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NvtrsrowitemComponent } from './nvtrsrowitem.component';

describe('NvtrsrowitemComponent', () => {
  let component: NvtrsrowitemComponent;
  let fixture: ComponentFixture<NvtrsrowitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NvtrsrowitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NvtrsrowitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
