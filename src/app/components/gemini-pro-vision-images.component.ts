import { Component, inject, model, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FileConversionService } from '../services/file-conversion.service';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'ga-gemini-pro-vision-images',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatLabel,
    MatInput,
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
export class GeminiProVisionImagesComponent {
  private fileConversionService = inject(FileConversionService);

  process() {
    this.testGeminiProVisionImages();
  }

  async testGeminiProVisionImages() {
    try {
      let imageBase64 = await this.fileConversionService.convertToBase64(
        'assets/baked_goods_2.jpeg'
      );

      // Check for successful conversion to Base64
      if (typeof imageBase64 !== 'string') {
        console.error('Image conversion to Base64 failed.');
        return;
      }

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
        model: 'gemini-pro-vision',
        ...generationConfig,
      });

      let prompt = [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: imageBase64,
          },
        },
        {
          text: 'Provide a recipe.',
        },
      ];

      const result = await model.generateContent(prompt);
      const response = await result.response;
      console.log(response.candidates?.[0].content.parts[0].text);
      console.log(response);
    } catch (error) {
      console.error('Error converting file to Base64', error);
    }
  }

}
