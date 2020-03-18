import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GriditemsComponent } from './griditems.component';

describe('GriditemsComponent', () => {
  let component: GriditemsComponent;
  let fixture: ComponentFixture<GriditemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GriditemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GriditemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
