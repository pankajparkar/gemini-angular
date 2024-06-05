import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDrawerMode, MatSidenav, MatSidenavContainer, MatSidenavContent, } from '@angular/material/sidenav';
import { MatRadioButton, MatRadioGroup, } from '@angular/material/radio';
import { MatList, MatListItem } from '@angular/material/list';
import { Component, inject, viewChild } from '@angular/core';
import { FileConversionService } from './services/file-conversion.service';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { NavbarComponent } from './components/navbar/navbar.component';
import { environment } from 'src/environments/environment';
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
  public http = inject(HttpClient);

  ngOnInit(): void {
    // Google AI
    //this.TestGeminiPro();
    //this.TestGeminiProChat();
    // this.TestGeminiProVisionImages();
    // this.TestGeminiProStreaming();

    // Vertex AI
    //this.TestGeminiProWithVertexAIViaREST();
  }

  ////////////////////////////////////////////////////////
  // Google AI - requires API KEY from Google AI Studio
  ////////////////////////////////////////////////////////

  async TestGeminiProStreaming() {
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

    const prompt = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: 'Generate a poem.',
            },
          ],
        },
      ],
    };
    const streamingResp = await model.generateContentStream(prompt);

    for await (const item of streamingResp.stream) {
      console.log('stream chunk: ' + item.text());
    }
    console.log('aggregated response: ' + (await streamingResp.response).text());
  }

  ////////////////////////////////////////////////////////
  // VertexAI - requires Google Cloud Account + Setup
  ////////////////////////////////////////////////////////

  async TestGeminiProWithVertexAIViaREST() {
    // Docs: https://cloud.google.com/vertex-ai/docs/generative-ai/model-reference/gemini#request_body
    //   const prompt = this.buildPrompt('What is the largest number with a name?');
    //   const endpoint = this.buildEndpointUrl(environment.PROJECT_ID);
    //   let headers = this.getAuthHeaders(
    //     environment.GCLOUD_AUTH_PRINT_ACCESS_TOKEN
    //   );

    //   this.http.post(endpoint, prompt, { headers }).subscribe((response: any) => {
    //     console.log(response.candidates?.[0].content.parts[0].text);
    //     console.log(response);
    //   });
    // }

    // buildPrompt(text: string) {
    //   return {
    //     contents: [
    //       {
    //         role: 'user',
    //         parts: [
    //           {
    //             text: text,
    //           },
    //         ],
    //       },
    //     ],
    //     safety_settings: {
    //       category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
    //       threshold: 'BLOCK_LOW_AND_ABOVE',
    //     },
    //     generation_config: {
    //       max_output_tokens: 100,
    //     },
    //   };
  }

  buildEndpointUrl(projectId: string) {
    const BASE_URL = 'https://us-central1-aiplatform.googleapis.com/';
    const API_VERSION = 'v1'; // may be different at this time
    const MODEL = 'gemini-pro';

    let url = BASE_URL; // base url
    url += API_VERSION; // api version
    url += '/projects/' + projectId; // project id
    url += '/locations/us-central1'; // google cloud region
    url += '/publishers/google'; // publisher
    url += '/models/' + MODEL; // model
    url += ':generateContent'; // action

    return url;
  }

  getAuthHeaders(accessToken: string) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
    return headers;
  }
}
