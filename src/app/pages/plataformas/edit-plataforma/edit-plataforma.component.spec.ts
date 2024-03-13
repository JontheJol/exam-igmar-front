import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlataformaComponent } from './edit-plataforma.component';

describe('EditPlataformaComponent', () => {
  let component: EditPlataformaComponent;
  let fixture: ComponentFixture<EditPlataformaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPlataformaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPlataformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
