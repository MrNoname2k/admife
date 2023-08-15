import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { clone } from 'lodash';
import { Utils } from 'src/app/common/utils/utils';
import { Notification } from 'src/app/pages/models/home-response';

@Component({
  selector: 'app-popup-menu-item',
  templateUrl: './popup-menu-item.component.html',
  styleUrls: ['./popup-menu-item.component.scss']
})
export class PopupMenuItemComponent implements OnChanges{
  @Input() public notification!: Notification;

  public utils = Utils;


  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['notification'] && changes['notification'].currentValue) {
      this.notification = clone(changes?.['notification'].currentValue);
    }
  }
}
