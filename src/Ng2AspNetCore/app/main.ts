/// <reference path="../typings/index.d.ts" />

import { enableProdMode } from '@angular/core';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { HTTP_PROVIDERS } from '@angular/http';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';

import { environment } from './config/environment';

if(environment.production) 
{
    enableProdMode();
}

bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS]);