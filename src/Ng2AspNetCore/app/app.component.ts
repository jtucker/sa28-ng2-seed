import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, RouteConfig, Router } from '@angular/router-deprecated';

import {MessageDetailComponent, MessageListComponent, MessageService } from './messages';

@Component({
    selector: 'my-app',
    directives: [MessageListComponent, ROUTER_DIRECTIVES],
    template: `
        <h1>SA28 Angular 2 App!</h1>
        <router-outlet></router-outlet>
    `
})
@RouteConfig([
    { path: '/', component: MessageListComponent, name: 'Home', useAsDefault: true },
    { path: '/message/:id', component: MessageDetailComponent, name: 'Detail' }
])
export class AppComponent {

    constructor(private router: Router) {
        
    }
}