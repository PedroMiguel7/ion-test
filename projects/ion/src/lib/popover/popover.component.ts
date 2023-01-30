import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { IconType } from '../icon/icon.component';
import { SafeAny } from '../utils/safe-any';
import { IonButtonProps } from '../button/button.component';

export type PopoverArrow =
  | 'arrow-1'
  | 'arrow-2'
  | 'arrow-3'
  | 'arrow-4'
  | 'arrow-5'
  | 'arrow-6'
  | 'arrow-7'
  | 'arrow-8'
  | 'arrow-9'
  | 'arrow-10';

export interface PopoverProps {
  ionPopoverTitle: string;
  ionPopoverBody: SafeAny;
  actions?: IonButtonProps[];
  icon?: IconType;
  iconClose?: IconType;
  arrowPosition?: PopoverArrow;
}

@Component({
  selector: 'ion-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent {
  @Input() ionPopoverTitle: string;
  @Input() ionPopoverBody: SafeAny;
  @Input() actions?: IonButtonProps[];

  @Input() icon?: IconType = '';
  @Input() iconClose?: IconType = '';
  @Input() arrowPosition?: PopoverArrow = 'arrow-2';

  readonly ionOnClose = new Subject<void>();
  readonly ionOnFirstAction = new Subject<void>();
  readonly ionOnSecondAction = new Subject<void>();

  close(): void {
    this.ionOnClose.next();
  }

  firstAction(): void {
    this.ionOnFirstAction.next();
  }

  secondAction(): void {
    this.ionOnSecondAction.next();
  }
}
