import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Message } from './message.model'; 

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/operator/filter';

@Injectable()
export class MessageService 
{
    constructor(private http:Http) { }

    getMessages() : Observable<Array<Message>> {

        return this.http.get('messages.json')
                 .map(resp => resp.json())
                 .catch((error: any) => {
                     let message = error || 'Server through an error!'
                     return Observable.throw(message);
                 });

    }

    getMessageById(id: number): Observable<Message> {
        return this.http.get('messages.json')
                .map(resp => resp.json())
                .filter((item: Message) => item.id === id);
    }
}