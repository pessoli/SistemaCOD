import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancaComponent } from './financa.component';

describe('FinancaComponent', () => {
  let component: FinancaComponent;
  let fixture: ComponentFixture<FinancaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
