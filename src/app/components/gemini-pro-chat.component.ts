import { Component, signal } from '@angular/core';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { environment } from 'src/environments/environment';
import { ChatComponent } from './chat.component';
import { Message } from '../models';

const messages = [
  { content: 'Hi there!', isUser: true, },
  { content: 'Great to meet you. What would you like to know?!', isUser: false, },
];

function transformToHistoryObject(msgs: Message[]) {
  return msgs.map(
    msg => ({
      role: msg.isUser ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }),
  )
}

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
  model: 'gemini-1.5-pro',
  ...generationConfig,
});

@Component({
  selector: 'ga-gemini-pro-chat',
  standalone: true,
  imports: [
    ChatComponent,
  ],
  template: `
    <h5>Multi-turn conversations (chat)</h5>
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

  private async sendMessage(prompt: string) {
    const chat = model.startChat({
      history: transformToHistoryObject(this.messages()),
      generationConfig: {
        maxOutputTokens: 100,
      },
    });
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    console.log(response.candidates?.[0].content.parts[0].text);
    console.log(response.text());
    this.updateMessage(response.text(), false);
  }
}
