import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { GalleriaModule } from 'primeng/galleria';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroHorarioComponent } from './feature/cadastro-horario/cadastro-horario.component';
import { ExibicaoDataModule } from './feature/exibicao-data/exibicao-data.module';
import { ExibicaoHorarioComponent } from './feature/exibicao-horario/exibicao-horario.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin,
]);
@NgModule({
  declarations: [
    AppComponent,
    ExibicaoHorarioComponent,
    CadastroHorarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    CalendarModule,
    DynamicDialogModule,
    BrowserAnimationsModule,
    ExibicaoDataModule,
    GalleriaModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    ColorPickerModule,
    HttpClientModule,
    InputMaskModule,
    ToastModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
