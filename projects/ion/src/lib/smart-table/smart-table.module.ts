import { IonLinkModule } from './../link/link.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonSmartTableComponent } from './smart-table.component';
import { IonCheckboxModule } from '../checkbox/checkbox.module';
import { IonTagModule } from '../tag/tag.module';
import { IonPopConfirmModule } from '../popconfirm/popconfirm.module';
import { IonButtonModule } from '../button/button.module';
import { IonIconModule } from '../icon/icon.module';
import { IonPaginationModule } from '../pagination/pagination.module';
import { PipesModule } from '../utils/pipes/pipes.module';
import { IonTooltipModule } from '../tooltip/tooltip.module';
import { IonSpinnerModule } from '../spinner/spinner.module';

@NgModule({
  declarations: [IonSmartTableComponent],
  imports: [
    CommonModule,
    IonCheckboxModule,
    IonTagModule,
    IonPopConfirmModule,
    IonButtonModule,
    IonIconModule,
    IonPaginationModule,
    PipesModule,
    IonTooltipModule,
    IonSpinnerModule,
    IonLinkModule,
  ],
  exports: [IonSmartTableComponent],
})
export class IonSmartTableModule {}
