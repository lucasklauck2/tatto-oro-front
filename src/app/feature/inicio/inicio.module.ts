import { CalendarModule } from 'primeng/calendar';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { GalleriaModule } from 'primeng/galleria';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';
import { ExibicaoDataModule } from 'src/app/feature/exibicao-data/exibicao-data.module';
import { InicioPageComponent } from 'src/app/feature/inicio/page/inicio-page.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AlteracaoSenhaComponent } from './components/alteracao-senha/alteracao-senha.component';
import { InicioRoutingModule } from './inicio-routing.module';

@NgModule({
  declarations: [InicioPageComponent, AlteracaoSenhaComponent],
  imports: [
    InicioRoutingModule,
    CommonModule,
    FullCalendarModule,
    CalendarModule,
    DynamicDialogModule,
    GalleriaModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    ColorPickerModule,
    HttpClientModule,
    InputMaskModule,
    PasswordModule,
  ],
})
export class InicioModule {}
