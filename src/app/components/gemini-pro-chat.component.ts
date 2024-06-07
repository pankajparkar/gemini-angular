import { NgClass, NgFor } from '@angular/common';
import { Component, model, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { environment } from 'src/environments/environment';

interface Message {
  content: string;
  isUser: boolean; // Flag to identify user or received message
}

const messages = [
  { content: 'Hi there!', isUser: false, },
  { content: 'Great to meet you. What would you like to know?!', isUser: false, },
];

@Component({
  selector: 'ga-gemini-pro-chat',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatInput,
    MatError,
    FormsModule,
    NgFor,
    NgClass,
  ],
  template: `
    <h2>Chat</h2>
    <ul class="chat-list">
      @for (message of messages(); track $index) {
        <li [ngClass]="{'left-message': !message.isUser, 'right-message': message.isUser}">
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
    @if (!text) {
      <mat-error>{{errorMessage}}</mat-error>
    }

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
export class GeminiProChatComponent {
  text = model('');
  messages = signal<Message[]>(messages);

  errorMessage = 'Field is mandatory';

  enter() {
    this.sendMessage(this.text().trim() ?? '');
    this.testGeminiProChat(this.text());
    this.text.set('');
  }

  private sendMessage(text: string, isUser: boolean = true) {
    if (!text) {
      return;
    }
    this.messages.set([
      ...this.messages(),
      { content: text, isUser, }
    ]);
  }

  private async testGeminiProChat(prompt: string) {
    // Gemini Client
    const genAI = new GoogleGenerativeAI(environment.API_KEY);
    const generationConfig = {
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
      ],
      //maxOutputTokens: 100,
    };
    const model = genAI.getGenerativeModel({
      model: 'gemini-pro',
      ...generationConfig,
    });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Hi there!" }],
        },
        {
          role: "model",
          parts: [{ text: "Great to meet you. What would you like to know?" }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 100,
      },
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    console.log(response.candidates?.[0].content.parts[0].text);
    console.log(response.text());
    this.testGeminiProChat(response.text());
    this.sendMessage(response.text(), false);
  }
}
