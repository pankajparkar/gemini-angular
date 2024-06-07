import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
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
  styles: ``
})
export class GeminiProStreamingComponent {
  messages = signal<Message[]>([{
    content: 'Generate a poem.',
    isUser: true,
  }]);

  enter(text: string) {
    this.sendMessage(text);
    this.testGeminiProStreaming(text);
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

  async testGeminiProStreaming(text: string) {
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
    }
    const output = (await streamingResp.response).text()
    console.log('aggregated response: ' + output);
    this.sendMessage(output ?? '', false);
  }

}
