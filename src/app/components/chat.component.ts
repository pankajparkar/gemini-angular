import { NgClass } from '@angular/common';
import { Component, input, model, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { Message } from '../models';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';

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
  ],
  template: `
    <ul class="chat-list">
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

    <div>
      <mat-form-field>
        <mat-label>Type your message...</mat-label>
        <textarea matInput [(ngModel)]="text" placeholder="Type your message..."></textarea>
      </mat-form-field>
    </div>

    <button mat-button (click)="enter()">
      Enter
    </button>
  `,
  styles: `
    .chat-list {
      list-style: none;
      padding: 0;
      margin: 0;
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

  enter() {
    this.send.emit(this.text());
    this.text.set('');
  }
}
