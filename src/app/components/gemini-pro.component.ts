import { Component, signal } from '@angular/core';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
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
  model: 'gemini-pro',
  ...generationConfig,
});

@Component({
  selector: 'ga-gemini-pro',
  standalone: true,
  imports: [
    ChatComponent,
  ],
  template: `
    <h2>Text from text-only input (text)</h2>
    <ga-chat
      [messages]="messages()"
      (send)="enter($event)"
    >
    </ga-chat>
  `,
  styles: ``
})
export class GeminiProComponent {
  messages = signal<Message[]>([]);

  enter(text: string) {
    this.updateMessage(text);
    this.testGeminiPro(text);
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

  async testGeminiPro(prompt: string) {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    console.log(response.candidates?.[0].content.parts[0].text);
    console.log(response.text());
    this.updateMessage(response.text(), false);
  }
}
