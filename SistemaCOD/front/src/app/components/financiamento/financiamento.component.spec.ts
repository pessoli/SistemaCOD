import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanciamentoComponent } from './financiamento.component';

describe('FinanciamentoComponent', () => {
  let component: FinanciamentoComponent;
  let fixture: ComponentFixture<FinanciamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanciamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanciamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
