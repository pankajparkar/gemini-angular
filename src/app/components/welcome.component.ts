import { Component } from '@angular/core';
// import { GeminiProTextComponent } from './gemini-pro-text.component';

@Component({
  selector: 'ga-welcome',
  standalone: true,
  imports: [
    // GeminiProTextComponent,
  ],
  template: `
    <div class="welcome-container">
      welcome to the work of AI!
    </div>

    <!-- @defer (
      on timer(5s)
    ) {
      <ga-gemini-pro-text></ga-gemini-pro-text>
    } -->
  `,
  styles: `
    .welcome-container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: column;
      align-content: center;
      height: 100%;
    }
  `
})
export class WelcomeComponent {
}
