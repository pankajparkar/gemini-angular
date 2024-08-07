import { Component, inject, signal } from '@angular/core';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { environment } from 'src/environments/environment';
import { ChatComponent } from './chat.component';
import { Message } from '../models';
import { MarkdownService } from '../services/markdown.service';

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
  model: 'gemini-1.5-pro',
  ...generationConfig,
});

@Component({
  selector: 'ga-gemini-pro-streaming',
  standalone: true,
  imports: [
    ChatComponent,
  ],
  template: `
    <h5>Content as is created using streaming (stream)</h5>
    <ga-chat
      [messages]="messages()"
      (send)="enter($event)"
    >
    </ga-chat>
  `,
  styles: ``
})
export class GeminiProStreamingComponent {
  messages = signal<Message[]>([]);
  markdown = inject(MarkdownService);

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

  async sendMessage(text: string) {
    const prompt = {
      contents: [
        {
          role: 'user',
          parts: [{ text }],
        },
      ],
    };
    const streamingResp = await model.generateContentStream(prompt);
    for await (const item of streamingResp.stream) {
      console.log('stream chunk: ' + item.text());
      this.updateMessage(item.text() ?? '', false);
    }
    const output = (await streamingResp.response).text()
    console.log('aggregated response: ' + output);

  }

}
