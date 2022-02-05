import '@fortawesome/fontawesome-free/css/all.css'; // needs additional webpack config!

import { DialogService } from 'primeng/dynamicdialog';
import { ExibicaoDataComponent } from 'src/app/feature/exibicao-data/page/exibicao-data.component';
import { HorarioDTO } from 'src/app/model/horario.dto';
import {
  AfterViewInit,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/angular';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { DateClickArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { HorarioService } from './service/horario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DialogService],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('calendario', { static: true }) calendario: FullCalendarComponent;

  horarios: Array<HorarioDTO> = new Array();

  eventos: Array<EventInput> = new Array();

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
    height: '80vh',
    themeSystem: 'bootstrap',
    dateClick: this.eventoClick.bind(this),
    plugins: [bootstrapPlugin, timeGridPlugin],
  };

  constructor(
    private dialogService: DialogService,
    private horarioService: HorarioService
  ) {}

  ngOnInit(): void {
    this.adquirirHorarios();
  }

  ngAfterViewInit(): void {}

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

  eventoClick(selectInfo: DateClickArg) {
    const dataSelecionada = new Date(selectInfo.date);

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

    this.dialogService
      .open(ExibicaoDataComponent, {
        header: tituloModal,
        height: '600px',
        width: '700px',
        data: { horarios, dataSelecionada },
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
  }

  anterior() {
    this.calendario.getApi().prev();
  }

  hoje() {
    this.calendario.getApi().today();
  }
}
