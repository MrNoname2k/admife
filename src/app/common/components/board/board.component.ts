import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { clone } from 'lodash';
import { AsideBarData } from 'src/app/pages/models/home-response';
import { Utils } from '../../utils/utils';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnChanges, OnInit{

  @Input() asideData!: AsideBarData;

  public utils = Utils;
  public userId: string = '';

  public constructor(private route: ActivatedRoute) {

  }

  public ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['userId']) {
        this.userId = params['userId'] as string;
      }
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['asideData'] && changes['asideData'].currentValue) {
      this.asideData = clone(changes['asideData'].currentValue);
    }
  }

}
