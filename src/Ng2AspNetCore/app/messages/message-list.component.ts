import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { Message } from './message.model';
import { MessageService } from './message.service';

@Component({
    selector: `message-list`,    
    templateUrl: './app/messages/message-list.component.html',
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class MessageListComponent implements OnInit {
    
    messages: Array<Message>;
    constructor(private service: MessageService) { }

    ngOnInit() {
        this.service.getMessages().subscribe(results => this.messages = results);
    }
}