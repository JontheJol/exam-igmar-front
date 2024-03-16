import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEnviosComponent } from './add-envios.component';

describe('AddEnviosComponent', () => {
  let component: AddEnviosComponent;
  let fixture: ComponentFixture<AddEnviosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEnviosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEnviosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
