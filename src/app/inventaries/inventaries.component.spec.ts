import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventariesComponent } from './inventaries.component';

describe('InventariesComponent', () => {
  let component: InventariesComponent;
  let fixture: ComponentFixture<InventariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
