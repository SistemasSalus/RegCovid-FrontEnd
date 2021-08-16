import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreciosCrudComponent } from './precios-crud.component';

describe('PreciosCrudComponent', () => {
  let component: PreciosCrudComponent;
  let fixture: ComponentFixture<PreciosCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreciosCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreciosCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
