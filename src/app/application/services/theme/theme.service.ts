// src/app/application/services/theme.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Serviço de aplicação para gerenciar o tema da aplicação (claro/escuro).
 * Ele persiste a preferência do usuário no localStorage e emite o tema atual
 * através de um Observable.
 */
@Injectable({
  providedIn: 'root', // Torna o serviço um singleton
})
export class ThemeService {
  // BehaviorSubject para armazenar o tema atual e notificar os inscritos
  private _currentTheme: BehaviorSubject<string>;

  constructor() {
    // Inicializa o tema a partir do localStorage ou 'light' como padrão
    const initialTheme = localStorage.getItem('theme') || 'light';
    this._currentTheme = new BehaviorSubject<string>(initialTheme);
    // Aplica a classe do tema ao elemento <html> no início
    this.applyThemeToHtml(initialTheme);
  }

  /**
   * Retorna um Observable do tema atual.
   * Componentes podem se inscrever neste Observable para reagir a mudanças de tema.
   */
  get currentTheme$(): Observable<string> {
    return this._currentTheme.asObservable();
  }

  /**
   * Obtém o tema atual de forma síncrona.
   * @returns O tema atual ('light' ou 'dark').
   */
  get currentTheme(): string {
    return this._currentTheme.value;
  }

  /**
   * Alterna entre o tema 'light' e 'dark'.
   * Atualiza o localStorage e emite o novo tema.
   */
  toggleTheme(): void {
    const newTheme = this._currentTheme.value === 'light' ? 'dark' : 'light';
    this._currentTheme.next(newTheme);
    localStorage.setItem('theme', newTheme);
    this.applyThemeToHtml(newTheme);
  }

  /**
   * Aplica a classe do tema ao elemento <html> do documento.
   * Remove as classes de tema antigas e adiciona a nova.
   * @param theme O tema a ser aplicado ('light' ou 'dark').
   */
  private applyThemeToHtml(theme: string): void {
    // Remove ambas as classes de tema antes de adicionar a correta
    document.documentElement.classList.remove('light-theme', 'dark-theme');
    // Adiciona a classe de tema com o sufixo '-theme'
    document.documentElement.classList.add(`${theme}-theme`);
  }
}
