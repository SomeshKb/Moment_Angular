import { AfterContentInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { LoaderService } from './core/services/loader.service';
import { MessageService } from './core/services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterContentInit {
  title = 'Moment';
  userLoggedIn = false;
  showLoader = false;
  message;
  toggleNav = false;
  constructor(private authService: AuthService, private messageService: MessageService, private loader: LoaderService, private cdref: ChangeDetectorRef) {
    this.authService.userLogged.subscribe((res) => {
      this.userLoggedIn = res;
    });

    this.messageService.getMessage().subscribe(message => {
      this.message = message;
    });

  }
  ngAfterContentInit(): void {
    this.loader.status.subscribe(res => {
      this.showLoader = res;
      this.cdref.detectChanges();
    });
  }

  toggleSidebar() {
    this.toggleNav = !this.toggleNav;
  }

  logout(){
    this.authService.logOutUser();
  }
}
