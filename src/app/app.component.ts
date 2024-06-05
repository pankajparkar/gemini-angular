import { MatDrawerMode, MatSidenav, MatSidenavContainer, MatSidenavContent, } from '@angular/material/sidenav';
import { MatRadioButton, MatRadioGroup, } from '@angular/material/radio';
import { MatList, MatListItem } from '@angular/material/list';
import { Component, viewChild } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'ga-root',
  standalone: true,
  template: `
    <ga-navbar (onToggle)="sidenav()?.toggle()"></ga-navbar>
    <mat-sidenav-container class="example-container">
      <mat-sidenav [mode]="'push'">
        <p>
          <mat-list role="list" (click)="sidenav()?.toggle()">
            <mat-list-item role="listitem" routerLink="gemini-pro">
              Gemini Pro
            </mat-list-item>
            <mat-list-item role="listitem" routerLink="gemini-pro-chat">
              Gemini ProChat
            </mat-list-item>
            <mat-list-item role="listitem" routerLink="gemini-pro-vision-images">
              Gemini Pro Vision Images
            </mat-list-item>
            <mat-list-item role="listitem" routerLink="gemini-pro-streaming">
              Gemini Pro Streaming
            </mat-list-item>
            <!-- <mat-list-item role="listitem" routerLink="gemini-pro">
              Gemini Pro With Vertex AI Via REST
            </mat-list-item> -->
          </mat-list>
        </p>
      </mat-sidenav>
      <mat-sidenav-content>
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  imports: [
    NavbarComponent,
    MatSidenav, MatSidenavContainer, MatSidenavContent,
    MatRadioGroup,
    MatList,
    MatListItem,
    MatRadioButton,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
  ],
  styles: `
    .mat-sidenav-container {
      position: absolute;
      top: 64px;
      bottom: 0;
      left: 0;
      right: 0;
    }
  `
})
export class AppComponent {
  mode = new FormControl('over' as MatDrawerMode);
  sidenav = viewChild(MatSidenav);
}
