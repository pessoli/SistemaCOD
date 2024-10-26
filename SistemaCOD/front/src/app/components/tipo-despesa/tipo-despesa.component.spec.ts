import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDespesaComponent } from './tipo-despesa.component';

describe('TipoDespesaComponent', () => {
  let component: TipoDespesaComponent;
  let fixture: ComponentFixture<TipoDespesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoDespesaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoDespesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
