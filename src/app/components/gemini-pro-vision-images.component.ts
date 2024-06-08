import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { FileConversionService } from '../services/file-conversion.service';
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/generative-ai';
import { environment } from 'src/environments/environment';
import { ChatComponent } from './chat.component';
import { Message } from '../models';

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

@Component({
  selector: 'ga-gemini-pro-vision-images',
  standalone: true,
  imports: [
    ChatComponent,
  ],
  template: `
    <h5>Text from text-and-images input (multimodal)</h5>
    <ga-chat
      [messages]="messages()"
      (send)="enter($event)"
    >
    </ga-chat>
  `,
  styles: ``,
})
export class GeminiProVisionImagesComponent {
  messages = signal<Message[]>([]);

  enter(text: string) {
    this.updateMessage(text);
    this.sendMessage(text);
  }

  private updateMessage(text: string, isUser: boolean = true) {
    if (!text) {
      return;
    }

    this.messages.set([
      ...this.messages(),
      { content: text, isUser, }
    ]);
  }
  private fileConversionService = inject(FileConversionService);

  async sendMessage(text: string) {
    try {
      let imageBase64 = await this.fileConversionService.convertToBase64(
        'assets/baked_goods_2.jpeg'
      );

      // Check for successful conversion to Base64
      if (typeof imageBase64 !== 'string') {
        console.error('Image conversion to Base64 failed.');
        return;
      }

      let prompt = [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: imageBase64,
          },
        },
        {
          text,
        },
      ];

      const result = await model.generateContent(prompt);
      const response = await result.response;
      console.log(response.candidates?.[0].content.parts[0].text);
      console.log(response);
      this.updateMessage(response.candidates?.[0].content.parts[0].text ?? '', false);

    } catch (error) {
      console.error('Error converting file to Base64', error);
    }
  }

}
