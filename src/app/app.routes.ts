import { Routes } from '@angular/router';
import { GeminiProComponent } from './components/gemini-pro.component';
import { GeminiProChatComponent } from './components/gemini-pro-chat.component';
import { GeminiProVisionImagesComponent } from './components/gemini-pro-vision-images.component';
import { GeminiProStreamingComponent } from './components/gemini-pro-streaming.component';
import { GeminiProWithVertexAiComponent } from './components/gemini-pro-with-vertex-ai.component';

const routes: Routes = [
    {
        path: 'gemini-pro',
        component: GeminiProComponent
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
        path: 'gemini-pro-with-vertext-ai',
        component: GeminiProWithVertexAiComponent
    },
    {
        path: '**',
        redirectTo: 'gemini-pro'
    },
];

export default routes;
