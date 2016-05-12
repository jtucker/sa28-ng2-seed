import { Component } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Message } from './message.model';
@Component({
    selector: `message-list`,
    templateUrl: `./app/messages/message-list.component.html`,
    directives: [CORE_DIRECTIVES]
})
export class MessageListComponent {

    messages: Array<Message> = [
        new Message("Subject 1", "Message Body 1", new Date("07/04/2016")),
        new Message("Subject 2", "Message Body 2", new Date("05/23/2016")),
        new Message("Subject 3", "Message Body 3", new Date("09/03/2016"))
    ]

    constructor() { }

}