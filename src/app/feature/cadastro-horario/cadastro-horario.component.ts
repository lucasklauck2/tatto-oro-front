import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HorarioDTO } from 'src/app/model/horario.dto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HorarioService } from './../../service/horario.service';

@Component({
  selector: 'app-cadastro-horario',
  templateUrl: './cadastro-horario.component.html',
  styleUrls: ['./cadastro-horario.component.scss'],
})
export class CadastroHorarioComponent implements OnInit {
  form: FormGroup;
  fb = new FormBuilder();

  salvando = false;
  editando = false;

  horarioDTO: HorarioDTO;

  dataNovoHorario: Date;

  constructor(
    private horarioService: HorarioService,
    private config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.dataNovoHorario = new Date(this.config.data.diaHorario);
    this.editando = this.config.data.editando;
    this.horarioDTO = this.config.data.horario;

    if (this.editando) {
      this.form = this.fb.group({
        id: this.fb.control(this.horarioDTO.id),
        nomeCliente: this.fb.control(
          this.horarioDTO.nomeCliente,
          Validators.required
        ),
        horarioInicio: this.fb.control(
          new Date(this.horarioDTO.horarioInicio),
          Validators.required
        ),
        horarioTermino: this.fb.control(
          !!this.horarioDTO.horarioTermino
            ? new Date(this.horarioDTO.horarioTermino)
            : null
        ),
        local: this.fb.control(this.horarioDTO.local, Validators.required),
        numeroTelefone: this.fb.control(this.horarioDTO.numeroTelefone),
        observacoes: this.fb.control(this.horarioDTO.observacoes),
        imagens: this.fb.control(null),
        codigoCor: this.fb.control(
          this.horarioDTO.codigoCor,
          Validators.required
        ),
      });

      return;
    }

    this.form = this.fb.group({
      nomeCliente: this.fb.control('', Validators.required),
      horarioInicio: this.fb.control(null, Validators.required),
      horarioTermino: this.fb.control(null),
      local: this.fb.control('', Validators.required),
      numeroTelefone: this.fb.control(''),
      observacoes: this.fb.control(''),
      imagens: this.fb.control(null),
      codigoCor: this.fb.control('#ff6347', Validators.required),
    });
  }

  salvarHorario() {
    this.salvando = true;

    const horario = this.form.value;

    const horarioInicioAjustado = this.ajustarHorario(
      new Date(horario.horarioInicio),
      this.dataNovoHorario
    );

    const horarioTerminoAjustado = horario.horarioTermino
      ? this.anularDataZerada(
          this.ajustarHorario(
            new Date(horario.horarioTermino),
            this.dataNovoHorario
          )
        )
      : null;

    const horarioDTO = new HorarioDTO(
      horario.id,
      horario.nomeCliente,
      horarioInicioAjustado,
      horarioTerminoAjustado,
      horario.observacoes,
      horario.numeroTelefone,
      horario.local,
      horario.codigoCor
    );

    this.horarioService.salvar(horarioDTO).subscribe();

    this.ref.close();
  }

  ajustarHorario(horarioUm: Date, horarioDois: Date) {
    horarioUm.setDate(horarioDois.getDate());
    horarioUm.setMonth(horarioDois.getMonth());
    horarioUm.setFullYear(horarioDois.getFullYear());

    return horarioUm;
  }

  anularDataZerada(data: Date): any {
    if (!data.getHours() && !data.getMinutes() && !data.getSeconds()) {
      return null;
    }

    return data;
  }
}
