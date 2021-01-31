import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpService } from './core/services/http.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { URLConstant } from './core/services/URLconstant';
import { AuthGuardService } from './core/services/auth-guard.service';
import { InterceptorService } from './core/services/interceptor.service';
import { MaterialModule } from './material/material.module';
import { MessageComponent } from './shared/component/message/message.component';
import { NgbAccordion, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './core/component/nav-bar/nav-bar.component';

@NgModule({
  declarations: [AppComponent,MessageComponent,NavBarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    NgbModule,
  ],
  providers: [HttpService, URLConstant, AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
