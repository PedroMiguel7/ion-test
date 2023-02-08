import {
  Directive,
  Input,
  HostListener,
  ComponentFactoryResolver,
  Injector,
  Inject,
  ComponentRef,
  ApplicationRef,
  Output,
  EventEmitter,
  ViewContainerRef,
  OnDestroy,
  ElementRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SafeAny } from './../utils/safe-any';
import { IonPopoverComponent } from './popover.component';
import { IonButtonProps } from '../button/button.component';
import { IconType } from '../icon/icon.component';
import { PopoverPosition } from '../core/types/popover';
import { getPositionsPopover } from './utilsPopover';

@Directive({
  selector: '[ionPopover]',
})
export class PopoverDirective implements OnDestroy {
  @Input() ionPopoverTitle = 'Tem certeza?';
  @Input() ionPopoverBody = '';
  @Input() ionPopoverActions?: IonButtonProps[] = [];
  @Input() ionPopoverIcon?: IconType = '';
  @Input() ionPopoverIconClose? = false;
  @Input() ionPopoverPosition?: PopoverPosition = PopoverPosition.DEFAULT;
  @Input() ionPopoverArrowPointAtCenter = true;
  @Output() ionOnFirstAction = new EventEmitter<void>();
  @Output() ionOnSecondAction = new EventEmitter<void>();
  @Output() ionOnClose = new EventEmitter<void>();

  private popoverComponentRef!: ComponentRef<IonPopoverComponent>;

  constructor(
    @Inject(DOCUMENT) private document: SafeAny,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private readonly viewRef: ViewContainerRef
  ) {}

  open(position: SafeAny): void {
    if (this.popoverComponentRef) {
      return;
    }
    const popover = this.componentFactoryResolver
      .resolveComponentFactory(IonPopoverComponent)
      .create(this.injector);

    this.popoverComponentRef = popover;

    this.appRef.attachView(this.popoverComponentRef.hostView);
    this.popoverComponentRef.changeDetectorRef.detectChanges();

    const popoverElement = this.popoverComponentRef.location
      .nativeElement as HTMLElement;

    this.document.body.appendChild(popoverElement);

    this.popoverComponentRef.instance.ionPopoverTitle = this.ionPopoverTitle;

    this.popoverComponentRef.instance.ionPopoverBody = this.ionPopoverBody;

    this.popoverComponentRef.instance.ionPopoverActions =
      this.ionPopoverActions;

    this.popoverComponentRef.instance.ionPopoverIcon = this.ionPopoverIcon;

    this.popoverComponentRef.instance.ionPopoverIconClose =
      this.ionPopoverIconClose;

    this.popoverComponentRef.instance.ionPopoverPosition =
      this.ionPopoverPosition;

    this.popoverComponentRef.instance.ionOnFirstAction.subscribe(() => {
      this.closePopover();
      this.ionOnFirstAction.emit();
    });

    this.popoverComponentRef.instance.ionOnSecondAction.subscribe(() => {
      this.closePopover();
      this.ionOnSecondAction.emit();
    });

    this.popoverComponentRef.instance.ionOnClose.subscribe(() => {
      this.closePopover();
      this.ionOnClose.emit();
    });

    this.setComponentPosition(position);
  }

  setComponentPosition(hostElement: SafeAny): void {
    const { left, right, top, bottom } = hostElement;
    const hostPositions = { left, right, top, bottom };
    const positions = getPositionsPopover(
      hostPositions,
      this.ionPopoverArrowPointAtCenter
    );
    this.popoverComponentRef.instance.left =
      positions[this.ionPopoverPosition].left;
    this.popoverComponentRef.instance.top =
      positions[this.ionPopoverPosition].top;
  }

  closePopover(): void {
    if (this.popoverComponentRef) {
      this.appRef.detachView(this.popoverComponentRef.hostView);
      this.popoverComponentRef.destroy();
      this.popoverComponentRef = null;
    }
  }

  elementIsEnabled(element: HTMLElement): boolean {
    return (
      !element.getAttribute('ng-reflect-disabled') ||
      (element.getAttribute('ng-reflect-disabled') &&
        element.getAttribute('ng-reflect-disabled') == 'false')
    );
  }

  @HostListener('click') onClick(): void {
    const hostElement = this.viewRef.element.nativeElement as HTMLElement;

    const position = hostElement.getBoundingClientRect();

    if (this.elementIsEnabled(hostElement)) {
      this.open({
        position,
      });
    }
  }

  destroyComponent(): void {
    if (this.popoverComponentRef) {
      this.appRef.detachView(this.popoverComponentRef.hostView);
      this.popoverComponentRef.destroy();
      this.popoverComponentRef = null;
    }
  }

  ngOnDestroy(): void {
    this.destroyComponent();
  }
}
