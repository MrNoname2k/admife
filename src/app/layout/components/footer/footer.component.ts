import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  DoCheck,
  ViewChild,
  AfterViewInit,
  ElementRef,
  Renderer2,
  AfterViewChecked
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { clone, isEqual, map } from 'lodash';
import { Utils } from 'src/app/common/utils/utils';
import { Message, MessageAllView, MessageResponse } from 'src/app/core/models/message';
import { SendDataService } from 'src/app/core/service/data/send-data.service';
import { WebsocketService } from 'src/app/core/service/socket/websocket.service';
import {
  HomePageResponse,
  Post,
  Relationship,
  User,
} from 'src/app/pages/models/home-response';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnChanges, AfterViewChecked {
  @Input() homeDataResponse!: HomePageResponse;

  @ViewChild('appScrollBottom') public scrollBottom!: ElementRef;

  public isShowChat = false;
  public isShowSearchFriend = false;
  public listRelationships: Relationship[] = [];
  public friends: User[] = [];
  public avatars!: Post[];
  public banners!: Post[];
  public messagesViewAll!: MessageAllView;
  public loggedInUserId: string = '';
  public newMessage!: MessageResponse;
  public utils = Utils;
  public chatUserId: string = '';
  public messageContent!: string | null;


  public constructor(
    private socketService: WebsocketService,
    private route: ActivatedRoute,
    private dataService: SendDataService,
    private el: ElementRef
  ) {
  }


  public ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['homeDataResponse'] &&
      changes['homeDataResponse'].currentValue
    ) {
      this.homeDataResponse = clone(changes?.['homeDataResponse'].currentValue);

      if (this.homeDataResponse.relationshipEntities) {
        this.listRelationships = this.homeDataResponse.relationshipEntities;
        const listFriend = this.listRelationships.map((relationship) => {
          if (
            this.checkRelationship(
              relationship.idUserOne,
              this.homeDataResponse.userEntity
            )
          ) {
            return relationship.idUserTow;
          } else if (
            this.checkRelationship(
              relationship.idUserTow,
              this.homeDataResponse.userEntity
            )
          ) {
            return relationship.idUserOne;
          }
          return null;
        });

        this.friends = listFriend as User[];

      }
    }
  }

  public ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      if (params['userId']) {
        this.loggedInUserId = params['userId'] as string;
      }
    });

    this.dataService.data$.subscribe((data) => {
      if (data) {
        const time = new Date();
        const dateString = time.toISOString();
        this.newMessage = {
          content: data.content,
          createDate: dateString,
          delFlg: data.delFlg,
          id: data.id,
          fromUserId: data.userFrom.id,
          status: data.status,
          updateDate: data.updateDate,
        };

        this.messagesViewAll?.messages.push(this.newMessage);
      }
    });
  }

  public ngAfterViewChecked(): void {
    this.scrollToBottom();
  }



  public checkRelationship(user1?: User, user2?: User): boolean {
    if (user1?.id === user2?.id) {
      return true;
    }
    return false;
  }

  public slideConfig = {
    slidesToShow: 10,
    slidesToScroll: 1,
    dots: false,
  };

  public send() {
    if (this.messageContent) {
      let message: Message = {
        fromUserId: this.loggedInUserId,
        toUserId: this.chatUserId,
        content: this.messageContent
      }

      this.socketService.sendNewMessageUsingWebSocket(
        message,
        this.chatUserId
      );

      this.messageContent = null;
    }
  }

  public showChart(user: User) {
    this.isShowChat = true;
    if (user.id) {
      this.chatUserId = user.id;
      this.socketService.getAllSendMessages(user.id).subscribe((res) => {
        if (res.meta.code === '200') {
          if (res.data) {
            this.messagesViewAll = res.data;
          }
        }
      });
    }
  }

  public scrollToBottom() {
    const scrollHeight: number = this.scrollBottom.nativeElement.scrollHeight;
    const element = this.scrollBottom.nativeElement as HTMLElement;

    element.scrollTop = scrollHeight;
  }
}
