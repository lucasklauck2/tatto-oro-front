import { DialogService } from 'primeng/dynamicdialog';
import { ExibicaoDataComponent } from 'src/app/feature/exibicao-data/page/exibicao-data.component';
import { DataInfoHelper } from 'src/app/helper/data-info.helper';
import { DataInfoDTO } from 'src/app/model/data-info.dto';
import { HorarioDTO } from 'src/app/model/horario.dto';
import { DataInfoService } from 'src/app/service/data-info.service';
import { HorarioService } from 'src/app/service/horario.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  CalendarOptions,
  EventClickArg,
  FullCalendarComponent,
} from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/angular';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { DateClickArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { LoginService } from './../../../service/login.service';

@Component({
  selector: 'app-inicio-page',
  templateUrl: './inicio-page.component.html',
  styleUrls: ['./inicio-page.component.scss'],
  providers: [DialogService],
})
export class InicioPageComponent implements OnInit, AfterViewInit {
  @ViewChild('calendario', { static: true }) calendario: FullCalendarComponent;

  horarios = new Array<HorarioDTO>();

  eventos = new Array<EventInput>();

  listaDataInfo = new Array<DataInfoDTO>();

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: '',
      center: 'title',
      right: '',
    },
    titleFormat: { year: 'numeric', month: 'long' },
    buttonText: {
      today: 'Hoje',
    },
    initialView: 'dayGridMonth',
    initialDate: new Date(),
    locale: 'pt-BR',
    height: '75vh',
    themeSystem: 'bootstrap',
    dateClick: this.dateClick.bind(this),
    eventClick: this.eventoClick.bind(this),
    plugins: [bootstrapPlugin, timeGridPlugin],
  };

  constructor(
    private dialogService: DialogService,
    private horarioService: HorarioService,
    private dataInfoService: DataInfoService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.adquirirHorarios();

    DataInfoHelper.adquirirObservableAlteracoes().subscribe((dataInfo) => {
      this.atualizarListaDataInfo(dataInfo);

      this.atualizarExibicaoDatas();
    });

    this.dataInfoService.adquirirDatas().subscribe((listaDataInfo) => {
      listaDataInfo.forEach((data) => (data.dia = new Date(data.dia)));
      this.listaDataInfo = listaDataInfo;

      console.log(listaDataInfo);

      this.atualizarExibicaoDatas();
    });
  }

  ngAfterViewInit(): void {}

  atualizarExibicaoDatas() {
    document
      .querySelectorAll('.fc-daygrid-body table tbody tr')
      .forEach((elementoTR) => {
        elementoTR.querySelectorAll('td').forEach((elementoData) => {
          this.adicionarBackground(elementoData);
        });
      });
  }

  adicionarBackground(elementoData: HTMLTableCellElement) {
    const dataDoElemento = new Date(
      elementoData.getAttribute('data-date') + 'GMT-0400'
    );

    const dataInfoSelecionado = this.buscarDataInfoPorData(dataDoElemento);

    if (!!dataInfoSelecionado) {
      elementoData.style.backgroundColor = dataInfoSelecionado.codigoCor;
    }
  }

  buscarDataInfoPorData(data: Date): DataInfoDTO | undefined {
    return this.listaDataInfo.find(
      (dataInfo) =>
        new Date(dataInfo.dia).getDate() === data.getDate() &&
        new Date(dataInfo.dia).getMonth() === data.getMonth() &&
        new Date(dataInfo.dia).getFullYear() === data.getFullYear()
    );
  }

  atualizarListaDataInfo(dataInfo: DataInfoDTO) {
    if (!!dataInfo) {
      this.listaDataInfo = this.listaDataInfo.filter(
        (dataInfoAntigo) => dataInfoAntigo.id !== dataInfo.id
      );

      this.listaDataInfo.push(dataInfo);
    }
  }

  converterHorariosEmEventos(horarios: Array<HorarioDTO>) {
    horarios.forEach((horario) => {
      const evento: EventInput = {
        date: horario.horarioInicio,
        start: horario.horarioInicio,
        end: horario.horarioTermino,
        title: horario.nomeCliente,
        display: 'true',
        color: horario.codigoCor,
      };

      this.calendario.getApi().addEvent(evento);
    });
  }

  eventoClick(eventInfo: EventClickArg) {
    const dataSelecionada = new Date(eventInfo.event.startStr);

    this.abrirExibicaoData(dataSelecionada);
  }

  dateClick(selectInfo: DateClickArg) {
    const dataSelecionada = new Date(selectInfo.date);

    this.abrirExibicaoData(dataSelecionada);
  }

  abrirExibicaoData(dataSelecionada: Date) {
    const tituloModal = this.adquirirTituloDaModal(dataSelecionada);

    const horarios = this.horarios.filter((horario) => {
      const dataEvento = new Date(horario.horarioInicio);

      if (
        dataSelecionada.getDate() === dataEvento.getDate() &&
        dataSelecionada.getMonth() === dataEvento.getMonth() &&
        dataSelecionada.getFullYear() === dataEvento.getFullYear()
      ) {
        return true;
      }
      return false;
    });

    const dataInfo = this.buscarDataInfoPorData(dataSelecionada);

    this.dialogService
      .open(ExibicaoDataComponent, {
        header: tituloModal,
        height: '600px',
        width: '700px',
        data: { horarios, dataSelecionada, dataInfo },
      })
      .onClose.subscribe(() => {
        this.eventos = [];

        this.horarios = [];

        this.calendario.getApi().removeAllEvents();

        this.adquirirHorarios();
      });
  }

  adquirirTituloDaModal(data: Date): string {
    return (
      'Horários do dia ' +
      (data.getDate() < 10 ? '0' + data.getDate() : data.getDate()) +
      '/' +
      (data.getMonth() < 10 ? '0' + (data.getMonth() + 1) : data.getMonth()) +
      '/' +
      data.getFullYear()
    );
  }

  adquirirHorarios() {
    this.horarioService.adquirirTodos().subscribe((horarios) => {
      this.horarios = horarios;

      this.converterHorariosEmEventos(horarios);
    });
  }

  proximo() {
    this.calendario.getApi().next();

    this.atualizarExibicaoDatas();
  }

  anterior() {
    this.calendario.getApi().prev();
    this.atualizarExibicaoDatas();
  }

  hoje() {
    this.calendario.getApi().today();
    this.atualizarExibicaoDatas();
  }

  sair() {
    this.loginService.sair();
  }
}
