import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'gemini-pro',
    loadComponent: () => import('./components/gemini-pro-text.component').then(c => c.GeminiProTextComponent),
  },
  {
    path: 'gemini-pro-chat',
    loadComponent: () => import('./components/gemini-pro-chat.component').then(c => c.GeminiProChatComponent),
  },
  {
    path: 'gemini-pro-vision-images',
    loadComponent: () => import('./components/gemini-pro-vision-images.component').then(c => c.GeminiProVisionImagesComponent),
  },
  {
    path: 'gemini-pro-streaming',
    loadComponent: () => import('./components/gemini-pro-streaming.component').then(c => c.GeminiProStreamingComponent),
  },
  {
    path: '**',
    redirectTo: 'welcome'
  },
];

export default routes;
