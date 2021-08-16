import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInsertComponent } from './register-insert.component';

describe('RegisterInsertComponent', () => {
  let component: RegisterInsertComponent;
  let fixture: ComponentFixture<RegisterInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterInsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
