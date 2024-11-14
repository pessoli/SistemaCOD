import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DicaFinanceiraComponent } from './dica-financeira.component';

describe('DicaFinanceiraComponent', () => {
  let component: DicaFinanceiraComponent;
  let fixture: ComponentFixture<DicaFinanceiraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DicaFinanceiraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DicaFinanceiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
