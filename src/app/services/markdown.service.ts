import { Injectable } from '@angular/core';
declare let showdown: any;

const converter = new showdown.Converter();
@Injectable({
    providedIn: 'root',
})
export class MarkdownService {
    getHtml(text: string) {
        return converter.makeHtml(text);
    }
}