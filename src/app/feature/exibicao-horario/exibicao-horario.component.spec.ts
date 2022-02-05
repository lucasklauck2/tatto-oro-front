import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibicaoHorarioComponent } from './exibicao-horario.component';

describe('ExibicaoHorarioComponent', () => {
  let component: ExibicaoHorarioComponent;
  let fixture: ComponentFixture<ExibicaoHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExibicaoHorarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibicaoHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
