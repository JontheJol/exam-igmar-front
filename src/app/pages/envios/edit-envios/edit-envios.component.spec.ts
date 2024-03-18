import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEnviosComponent } from './edit-envios.component';

describe('EditEnviosComponent', () => {
  let component: EditEnviosComponent;
  let fixture: ComponentFixture<EditEnviosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEnviosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditEnviosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
