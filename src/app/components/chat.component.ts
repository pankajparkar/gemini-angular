import { NgClass } from '@angular/common';
import { Component, ElementRef, effect, input, model, output, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { Message } from '../models';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'ga-chat',
  standalone: true,
  imports: [
    MatFormField,
    NgClass,
    MatLabel,
    FormsModule,
    MatButton,
    MatInput,
    MatIcon,
    MatIconButton,
  ],
  template: `
    <ul class="chat-list" #chatList>
      @for (message of messages(); track $index) {
        <li
          [ngClass]="{
            'left-message': !message.isUser,
            'right-message': message.isUser,
          }">
          {{ message.content }}
        </li>
      }
    </ul>

    <div class="send-btn-wrapper">
      <mat-form-field appearance="outline">
        <mat-label>Type your message...</mat-label>
        <textarea matInput [(ngModel)]="text" placeholder="Type your message..."></textarea>
      </mat-form-field>
      <button mat-icon-button (click)="enter()">
        <mat-icon>send</mat-icon>
      </button>
    </div>
  `,
  styles: `
    .send-btn-wrapper {
      bottom: 0;
      display: flex;
      flex-flow: row noWrap;
      padding: 12px;
      position: fixed;
      width: 100%;
      background: white;

      .mat-mdc-form-field {
        display: flex;
        width: 96%;
      }
    }

    .chat-list {
      top: 0;
      bottom: 124px;
      margin: 0;
      list-style: none;
      padding: 12px;
      position: relative;
      height: calc(100% - 200px);
      overflow-y: scroll;
    }

    .left-message,
    .right-message {
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 5px;
      max-width: 70%;
    }

    .left-message {
      background-color: #eee;
      text-align: left;
    }

    .right-message {
      background-color: #ddd;
      text-align: right;
    }
  `
})
export class ChatComponent {
  messages = input<Message[]>([]);
  send = output<string>();
  text = model('');
  chatListEl = viewChild<ElementRef>('chatList');

  constructor() {
    effect(() => {
      if (this.messages().length) {
        const element = this.chatListEl()?.nativeElement;
        element.scroll({
          top: element.scrollHeight,
          behavior: 'smooth',
        });
      }
    });
  }

  enter() {
    this.send.emit(this.text());
    this.text.set('');
  }
}
