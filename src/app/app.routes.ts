import { Routes } from '@angular/router';
import { GeminiProTextComponent } from './components/gemini-pro-text.component';
import { GeminiProChatComponent } from './components/gemini-pro-chat.component';
import { GeminiProVisionImagesComponent } from './components/gemini-pro-vision-images.component';
import { GeminiProStreamingComponent } from './components/gemini-pro-streaming.component';
import { WelcomeComponent } from './components/welcome.component';

const routes: Routes = [
    {
        path: 'welcome',
        component: WelcomeComponent
    },
    {
        path: 'gemini-pro',
        component: GeminiProTextComponent
    },
    {
        path: 'gemini-pro-chat',
        component: GeminiProChatComponent
    },
    {
        path: 'gemini-pro-vision-images',
        component: GeminiProVisionImagesComponent
    },
    {
        path: 'gemini-pro-streaming',
        component: GeminiProStreamingComponent
    },
    {
        path: '**',
        redirectTo: 'welcome'
    },
];

export default routes;
