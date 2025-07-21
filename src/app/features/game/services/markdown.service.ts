import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { marked } from 'marked';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarkdownService {
  private readonly http: HttpClient = inject(HttpClient);

  public loadMarkdown(path: string): Observable<string> {
    return this.http.get(path, { responseType: 'text' }).pipe(
      map((data) => {
        return marked.parse(data, {
          gfm: true,
          breaks: true,
          async: false,
        });
      }),
      catchError((err) => {
        console.error('Failed to load markdown:', err);
        return of('Could not load the rules for this game.');
      }),
    );
  }
}
