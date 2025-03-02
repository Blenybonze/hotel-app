import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en'); // Default language
    const savedLang = localStorage.getItem('language');
    this.useLanguage(savedLang || 'en'); // Load saved language
  }

  get currentLanguage(): string {
    return this.translate.currentLang;
  }

  useLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('language', language); // Save language preference
  }

  languageSelected(): string {
    return this.translate.currentLang;
  }
}