import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
@Input() message;

 

  constructor(private messageService: MessageService ) {
  }

  ngOnInit(): void {
  }
  clearMessage() {
      this.messageService.clearMessage();
  }
}
