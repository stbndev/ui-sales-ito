import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryShrinkageComponent } from './inventory-shrinkage.component';

describe('InventoryShrinkageComponent', () => {
  let component: InventoryShrinkageComponent;
  let fixture: ComponentFixture<InventoryShrinkageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryShrinkageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryShrinkageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
