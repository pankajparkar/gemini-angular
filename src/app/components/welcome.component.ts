import { Component } from '@angular/core';

@Component({
  selector: 'ga-welcome',
  standalone: true,
  imports: [],
  template: `
    <div class="welcome-container">
      welcome to the work of AI!
    </div>
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
