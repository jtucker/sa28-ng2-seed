import { Component } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { Message } from './message.model';
@Component({
    selector: `message-list`,    
    templateUrl: `./app/messages/message-list.component.html`,
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class MessageListComponent {

    messages: Array<Message> = [
        new Message(1, "Subject 1", "Message Body 1", new Date("07/04/2016")),
        new Message(2, "Subject 2", "Message Body 2", new Date("05/23/2016")),
        new Message(3, "Subject 3", "Message Body 3", new Date("09/03/2016"))
    ]

    constructor() { }

}