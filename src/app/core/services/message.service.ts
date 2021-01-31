import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Message } from '../models/Message.modal';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageSubject = new Subject<Message>();
    id: any;
  

    showMessage(response:any){
        if(response.success){
            this.showSuccess(response.message);
        }
        else{
        }
    }

    showSuccess(message: string, configData: any=true) {
       
        this.messageSubject.next({ text: message, class: 'success' });
        if(configData){
            this.removeMessge();
        }    }

    showError(message: string, configData: any = true) {
        this.messageSubject.next({ text: message, class: 'danger' });
        if(configData){
            this.removeMessge();
        }
    }

    clearMessage() {
        clearInterval(this.id);
        this.messageSubject.next({ text: '', class: '' });
    }

    getMessage(): Observable<any> {
        return this.messageSubject.asObservable();
    }

    removeMessge() {
        
        clearInterval(this.id);
        this.id = setTimeout(() => {
            this.clearMessage();
        }, 4000);
    }
  }