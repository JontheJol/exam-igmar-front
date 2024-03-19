import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarritoComponent } from './add-carrito.component';

describe('AddCarritoComponent', () => {
  let component: AddCarritoComponent;
  let fixture: ComponentFixture<AddCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCarritoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
