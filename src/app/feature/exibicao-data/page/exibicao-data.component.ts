import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { ExibicaoHorarioComponent } from 'src/app/feature/exibicao-horario/exibicao-horario.component';
import { DataInfoDTO } from 'src/app/model/data-info.dto';
import { HorarioDTO } from 'src/app/model/horario.dto';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataInfoHelper } from './../../../helper/data-info.helper';
import { DataInfoService } from './../../../service/data-info.service';
import { CadastroHorarioComponent } from './../../cadastro-horario/cadastro-horario.component';

@Component({
  selector: 'app-exibicao-data',
  templateUrl: './exibicao-data.component.html',
  styleUrls: ['./exibicao-data.component.scss'],
})
export class ExibicaoDataComponent implements OnInit, OnDestroy {
  constructor(
    private dialogService: DialogService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private dataInfoService: DataInfoService
  ) {}

  listaHorarioDTO = new Array();

  dataSelecionada: Date;

  dataInfo: DataInfoDTO;

  codigoCor: string;

  corAlterada = false;

  ngOnInit(): void {
    this.listaHorarioDTO = this.config.data.horarios;
    this.dataSelecionada = this.config.data.dataSelecionada;
    this.dataInfo = this.config.data.dataInfo;

    if (!!this.dataInfo) {
      this.codigoCor = this.dataInfo.codigoCor;
    } else {
      this.codigoCor = '#FFFFFF';
    }
  }

  ngOnDestroy(): void {
    if (this.corAlterada) {
      this.dataInfo = !!this.dataInfo
        ? this.atualizarDataInfo()
        : this.criarDataInfo();

      DataInfoHelper.emitirDataInfoAlterado(this.dataInfo);

      this.dataInfoService.salvarDataInfo(this.dataInfo).subscribe();
    }
  }

  criarDataInfo() {
    return new DataInfoDTO(this.dataSelecionada, this.codigoCor);
  }

  atualizarDataInfo() {
    this.dataInfo.codigoCor = this.codigoCor;

    return this.dataInfo;
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

  registrarAlteracaoCor() {
    this.corAlterada = true;
  }
}
