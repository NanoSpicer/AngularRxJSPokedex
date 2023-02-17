import { HttpClient } from '@angular/common/http';
import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { ApiConfig } from './api-config';

export const API_CONFIG_INJECTION_TOKEN = new InjectionToken('API_CONFIGURATION')

@NgModule({
  declarations: [
    AppComponent,
      PokemonListComponent,
      PokemonDetailsComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    { provide: API_CONFIG_INJECTION_TOKEN, useValue: ApiConfig  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
