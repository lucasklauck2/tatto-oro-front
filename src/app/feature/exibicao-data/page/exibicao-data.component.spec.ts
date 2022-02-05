import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibicaoDataComponent } from './exibicao-data.component';

describe('ExibicaoDataComponent', () => {
  let component: ExibicaoDataComponent;
  let fixture: ComponentFixture<ExibicaoDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExibicaoDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibicaoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
