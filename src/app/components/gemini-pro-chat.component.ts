import { Component, model, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { environment } from 'src/environments/environment';

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
  ],
  template: `
    <mat-form-field>
      <mat-label>Enter your email</mat-label>
      <input matInput
        placeholder="pat@example.com"
        [(ngModel)]="text"
        required>
      @if (!text) {
        <mat-error>{{errorMessage}}</mat-error>
      }
    </mat-form-field>

    <ul>
      @for (message of messages(); track $index) {
        <li>{{message}}</li>
      }
    </ul>
    <button mat-button (click)="enter()">
      Enter
    </button>
  `,
  styles: ``
})
export class GeminiProChatComponent {
  text = model('');

  errorMessage = 'Field is mandatory';
  messages = signal<string[]>([]);

  enter() {
    this.updateMessage(this.text());
    this.testGeminiProChat(this.text());
    this.text.set('');
  }

  updateMessage(text: string) {
    this.messages.set([
      ...this.messages(),
      text,
    ]);
  }

  async testGeminiProChat(prompt: string) {
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
  }
}
