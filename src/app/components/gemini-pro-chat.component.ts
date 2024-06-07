import { NgClass, NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { environment } from 'src/environments/environment';
import { ChatComponent } from './chat.component';
import { Message } from '../models';

const messages = [
  { content: 'Hi there!', isUser: true, },
  { content: 'Great to meet you. What would you like to know?!', isUser: false, },
];

const genAI = new GoogleGenerativeAI(environment.API_KEY);
const generationConfig = {
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ],
  maxOutputTokens: 100,
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
    ChatComponent,
  ],
  template: `
    <h2>Chat</h2>
    <ga-chat
      [messages]="messages()"
      (send)="enter($event)"
    >
    </ga-chat>
  `,
  styles: `
    
  `
})
export class GeminiProChatComponent {
  messages = signal<Message[]>(messages);

  enter(text: string) {
    this.sendMessage(text);
    this.testGeminiProChat(text);
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
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    console.log(response.candidates?.[0].content.parts[0].text);
    console.log(response.text());
    this.testGeminiProChat(response.text());
    this.sendMessage(response.text(), false);
  }
}
