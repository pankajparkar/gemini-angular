import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'ga-gemini-pro-with-vertex-ai',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatLabel,
    MatInput,
  ],
  template: `
    <mat-form-field>
      <mat-label>Enter your email</mat-label>
      <input matInput
        placeholder="pat@example.com"
        required>
    </mat-form-field>

    <button mat-button (click)="process()">
      Process
    </button>
  `,
  styles: ``
})
export class GeminiProWithVertexAiComponent {

  private http = inject(HttpClient);

  process() {
    this.testGeminiProWithVertexAIViaREST();
  }

  ////////////////////////////////////////////////////////
  // VertexAI - requires Google Cloud Account + Setup
  ////////////////////////////////////////////////////////

  async testGeminiProWithVertexAIViaREST() {
    // Docs: https://cloud.google.com/vertex-ai/docs/generative-ai/model-reference/gemini#request_body
    // const prompt = this.buildPrompt('What is the largest number with a name?');
    // const endpoint = this.buildEndpointUrl(environment.PROJECT_ID);
    // let headers = this.getAuthHeaders(
    //   environment.GCLOUD_AUTH_PRINT_ACCESS_TOKEN
    // );

    // this.http.post(endpoint, prompt, { headers }).subscribe((response: any) => {
    //   console.log(response.candidates?.[0].content.parts[0].text);
    //   console.log(response);
    // });
  }

  buildPrompt(text: string) {
    return {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: text,
            },
          ],
        },
      ],
      safety_settings: {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
      generation_config: {
        max_output_tokens: 100,
      },
    };
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
