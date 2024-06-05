import { Component, model, signal } from '@angular/core';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { environment } from 'src/environments/environment';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'ga-gemini-pro',
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
    {{ messages().length }}
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
export class GeminiProComponent {
  text = model('');

  errorMessage = 'Field is mandatory';
  messages = signal<string[]>([]);

  enter() {
    this.updateMessage(this.text());
    this.testGeminiPro(this.text());
  }

  updateMessage(text: string) {
    this.messages.set([
      ...this.messages(),
      text,
    ]);
  }

  async testGeminiPro(prompt: string) {
    // Gemini Client
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

    const result = await model.generateContent(prompt);
    const response = await result.response;
    console.log(response.candidates?.[0].content.parts[0].text);
    console.log(response.text());
    this.updateMessage(response.text());
  }
}
