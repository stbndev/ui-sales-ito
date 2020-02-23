import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NvtrsrkgGridComponent } from './nvtrsrkg-grid.component';

describe('NvtrsrkgGridComponent', () => {
  let component: NvtrsrkgGridComponent;
  let fixture: ComponentFixture<NvtrsrkgGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NvtrsrkgGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NvtrsrkgGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
