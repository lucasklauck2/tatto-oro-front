import { DialogService } from 'primeng/dynamicdialog';
import { ExibicaoHorarioComponent } from 'src/app/feature/exibicao-horario/exibicao-horario.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HorarioDTO } from './../../../../../model/horario.dto';

@Component({
  selector: 'grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.scss'],
})
export class GridItemComponent implements OnInit {
  @Input() horarioDTO: HorarioDTO;

  @Output() readonly eventoClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  get nomeCliente() {
    return this.horarioDTO.nomeCliente;
  }

  get horario() {
    const dataInicio = new Date(this.horarioDTO.horarioInicio);
    const dataTermino = !!this.horarioDTO.horarioTermino
      ? new Date(this.horarioDTO.horarioTermino)
      : null;

    if (!!dataTermino) {
      return (
        dataInicio.getHours() +
        ':' +
        this.ajustarCasasHorario(dataInicio.getMinutes()) +
        ' - ' +
        dataTermino.getHours() +
        ':' +
        this.ajustarCasasHorario(dataTermino.getMinutes())
      );
    }

    return (
      dataInicio.getHours() +
      ':' +
      this.ajustarCasasHorario(dataInicio.getMinutes())
    );
  }

  get cidade() {
    return this.horarioDTO.local;
  }

  onClickHorario() {
    this.eventoClick.emit();
  }

  private ajustarCasasHorario(horario: number) {
    if (horario < 10) {
      return '0' + horario.toString();
    }

    return horario.toString();
  }
}
