import { ButtonModule } from 'primeng/button';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DividerModule } from 'primeng/divider';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ExibicaoDataComponent } from 'src/app/feature/exibicao-data/page/exibicao-data.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridItemComponent } from './page/components/grid-item/grid-item.component';

@NgModule({
  declarations: [ExibicaoDataComponent, GridItemComponent],
  imports: [
    CommonModule,
    DynamicDialogModule,
    BrowserAnimationsModule,
    ButtonModule,
    ColorPickerModule,
    ReactiveFormsModule,
    FormsModule,
    DividerModule,
  ],
})
export class ExibicaoDataModule {}
