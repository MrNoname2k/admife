import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { WebsocketService } from './core/service/socket/websocket.service';
import { SendDataService } from './core/service/data/send-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {
  constructor(
    private webSocketService: WebsocketService,
    private dataService: SendDataService
  ) {
    this.dataService.email$.subscribe((email) => {
      if (email) {
        this.webSocketService.connect(email);

      } else {
        const emailLocal = localStorage.getItem('email') as string;
        if (emailLocal) {
          this.webSocketService.connect(emailLocal);
        }
      }
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect();
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: Event) {
    this.webSocketService.disconnect();
  }
}
