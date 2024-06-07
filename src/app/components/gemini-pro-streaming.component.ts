import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { environment } from 'src/environments/environment';

// Gemini Client
const genAI = new GoogleGenerativeAI(environment.API_KEY);
const generationConfig = {
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ],
  temperature: 0.9,
  top_p: 1,
  top_k: 32,
  maxOutputTokens: 100,
};

const model = genAI.getGenerativeModel({
  model: 'gemini-pro',
  ...generationConfig,
});

@Component({
  selector: 'ga-gemini-pro-streaming',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatInput,
    FormsModule,
  ],
  template: `
    <mat-form-field>
      <mat-label>Enter your email</mat-label>
      <input matInput
        placeholder="pat@example.com"
        required>
    </mat-form-field>

    <button mat-button (click)="process()">
      Process
    </button>
  `,
  styles: ``
})
export class GeminiProStreamingComponent {

  process() {
    this.testGeminiProStreaming();
  }

  async testGeminiProStreaming() {
    const prompt = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: 'Generate a poem.',
            },
          ],
        },
      ],
    };
    const streamingResp = await model.generateContentStream(prompt);
    for await (const item of streamingResp.stream) {
      console.log('stream chunk: ' + item.text());
    }
    console.log('aggregated response: ' + (await streamingResp.response).text());
  }

}
