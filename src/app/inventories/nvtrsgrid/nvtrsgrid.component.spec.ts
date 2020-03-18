import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NvtrsgridComponent } from './nvtrsgrid.component';

describe('NvtrsgridComponent', () => {
  let component: NvtrsgridComponent;
  let fixture: ComponentFixture<NvtrsgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NvtrsgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NvtrsgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
