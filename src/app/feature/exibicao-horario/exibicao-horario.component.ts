import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Component, OnInit } from '@angular/core';
import { HorarioDTO } from './../../model/horario.dto';
import { HorarioService } from './../../service/horario.service';
import { CadastroHorarioComponent } from './../cadastro-horario/cadastro-horario.component';

@Component({
  selector: 'app-exibicao-horario',
  templateUrl: './exibicao-horario.component.html',
  styleUrls: ['./exibicao-horario.component.scss'],
})
export class ExibicaoHorarioComponent implements OnInit {
  horarioDTO: HorarioDTO;

  // images: any = [
  //   {
  //     previewImageSrc:
  //       'https://image.freepik.com/vetores-gratis/rato-fofo-segurando-ak-47-com-chamas-atras_276405-84.jpg',
  //     thumbnailImageSrc:
  //       'https://image.freepik.com/vetores-gratis/rato-fofo-segurando-ak-47-com-chamas-atras_276405-84.jpg',
  //     alt: 'Tatuagem urso com uma Ak-47',
  //     title: 'Tatto do Lucas',
  //   },
  //   {
  //     previewImageSrc:
  //       'https://thumbs.dreamstime.com/z/urso-do-russo-com-kalashnikov-82712487.jpg',
  //     thumbnailImageSrc:
  //       'https://thumbs.dreamstime.com/z/urso-do-russo-com-kalashnikov-82712487.jpg',
  //     alt: 'Tatuagem urso com uma Ak-47',
  //     title: 'Tatto do Lucas',
  //   },
  // ];

  displayCustom: boolean;

  activeIndex: number = 0;

  constructor(
    private config: DynamicDialogConfig,
    private dialogService: DialogService,
    private ref: DynamicDialogRef,
    private horarioService: HorarioService
  ) {
    this.horarioDTO = this.config.data;
  }

  ngOnInit(): void {}

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
  }

  editarHorario() {
    this.dialogService
      .open(CadastroHorarioComponent, {
        header: 'Cadastro de horários',
        width: '90vw',
        height: '90vh',
        data: {
          diaHorario: this.horarioDTO.horarioInicio,
          horario: this.horarioDTO,
          editando: true,
        },
      })
      .onClose.subscribe(() => this.ref.close());
  }

  deletarHorario() {
    this.horarioService
      .deletar(this.horarioDTO)
      .subscribe(() => this.ref.close());
  }
}
