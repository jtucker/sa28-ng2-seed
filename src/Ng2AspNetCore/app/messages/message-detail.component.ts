import { Component, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { MessageService } from './message.service';
import { Message } from './message.model';

@Component({
    selector: 'message-detail',
    template: `
        <strong>Subject:</strong> {{ msg?.subject }}  <br/>
        <strong>Message:</strong> {{ msg?.body }} <br/>
        <strong>Create Date:</strong> {{ msg?.createDate | date: 'MM/dd/yyyy' }} <br/>
        <br />
    `
})
export class MessageDetailComponent implements OnInit {
    msg: Message;
    constructor(private service: MessageService, private params: RouteParams) { }

    ngOnInit() {
        let id = this.params.get('id');
        this.service.getMessageById(+id).subscribe(resp => this.msg = resp);
    }
}