import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-aside-left',
  templateUrl: './aside-left.component.html',
  styleUrls: ['./aside-left.component.scss']
})

export class AsideLeftComponent implements OnChanges {



  ngOnChanges(changes: SimpleChanges): void {

    if (changes['boardData'] && changes['boardData'].currentValue) {

    }

  }

}
