import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonTableComponent } from './table.component';
import { IonCheckboxModule } from '../checkbox/checkbox.module';
import { IonTagModule } from '../tag/tag.module';
import { IonButtonModule } from '../button/button.module';
import { IonIconModule } from '../icon/icon.module';
import { IonPaginationModule } from '../pagination/pagination.module';
import { IonPopConfirmModule } from '../popconfirm/popconfirm.module';
import { IonTooltipModule } from '../tooltip/tooltip.module';
import { IonSpinnerModule } from '../spinner/spinner.module';
import { IonLinkModule } from './../link/link.module';

@NgModule({
  declarations: [IonTableComponent],
  imports: [
    CommonModule,
    IonCheckboxModule,
    IonTagModule,
    IonButtonModule,
    IonIconModule,
    IonPaginationModule,
    IonPopConfirmModule,
    IonTooltipModule,
    IonSpinnerModule,
    IonLinkModule,
  ],
  exports: [IonTableComponent],
})
export class IonTableModule {}
