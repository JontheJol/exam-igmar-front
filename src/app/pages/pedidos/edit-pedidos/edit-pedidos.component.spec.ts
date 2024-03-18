import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPedidosComponent } from './edit-pedidos.component';

describe('EditPedidosComponent', () => {
  let component: EditPedidosComponent;
  let fixture: ComponentFixture<EditPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPedidosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
