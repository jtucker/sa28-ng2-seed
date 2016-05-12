import { Component } from '@angular/core';

import { MessageListComponent } from './messages/message-list.component';

@Component({
    selector: 'my-app',
    directives: [MessageListComponent],
    template: `
        <h1>SA28 Angular 2 App!</h1>
        <message-list></message-list>
    `
})
export class AppComponent { }