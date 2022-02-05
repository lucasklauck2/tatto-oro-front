import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { ExibicaoHorarioComponent } from 'src/app/feature/exibicao-horario/exibicao-horario.component';
import { HorarioDTO } from 'src/app/model/horario.dto';
import { Component, OnInit } from '@angular/core';
import { CadastroHorarioComponent } from './../../cadastro-horario/cadastro-horario.component';

@Component({
  selector: 'app-exibicao-data',
  templateUrl: './exibicao-data.component.html',
  styleUrls: ['./exibicao-data.component.scss'],
})
export class ExibicaoDataComponent implements OnInit {
  constructor(
    private dialogService: DialogService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {}

  listaHorarioDTO = new Array();

  dataSelecionada: Date;

  ngOnInit(): void {
    this.listaHorarioDTO = this.config.data.horarios;
    this.dataSelecionada = this.config.data.dataSelecionada;
  }

  adicionarHorario() {
    this.dialogService
      .open(CadastroHorarioComponent, {
        header: 'Cadastro de horários',
        width: '90vw',
        height: '90vh',
        data: {
          diaHorario: this.dataSelecionada,
          editando: false,
        },
      })
      .onClose.subscribe(() => this.ref.close());
  }

  onClickItem(horarioDTO: HorarioDTO) {
    this.dialogService
      .open(ExibicaoHorarioComponent, {
        header: 'Detalhes',
        height: '500px',
        width: '400px',
        data: horarioDTO,
      })
      .onClose.subscribe(() => this.ref.close());
  }
}
