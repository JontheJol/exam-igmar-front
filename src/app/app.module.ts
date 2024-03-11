import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; 
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AppComponent,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [] 
})
export class AppModule {
  constructor(private router: Router){}
}


