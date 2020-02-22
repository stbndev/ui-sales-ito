import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NvtrsitemComponent } from './nvtrsitem.component';

describe('NvtrsitemComponent', () => {
  let component: NvtrsitemComponent;
  let fixture: ComponentFixture<NvtrsitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NvtrsitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NvtrsitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
