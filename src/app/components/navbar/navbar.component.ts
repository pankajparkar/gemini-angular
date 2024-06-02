import { Component, output } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'ga-navbar',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatIconButton,
    MatToolbar,
  ],
  template: `
  <mat-toolbar>
    <button mat-icon-button (click)="onToggle.emit()">
      <mat-icon>menu</mat-icon>
    </button>
    <span>Gemini Angular</span>
    <span class="spacer"></span>
    <button mat-icon-button>
      <mat-icon>favorite</mat-icon>
    </button>
    <button mat-icon-button>
      <mat-icon>share</mat-icon>
    </button>
  </mat-toolbar>
  `,
  styles: `
    .spacer {
      flex: 1 1 auto;
    }
  `
})
export class NavbarComponent {
  onToggle = output();
}
