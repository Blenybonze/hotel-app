import { Component } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { TranslationService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private translationService: TranslationService,
    private themeService: ThemeService,
  ) { }

  setLanguage(strLanguage: string) {
    this.translationService.useLanguage(strLanguage);
  }

  checkLanguage() {
    return this.translationService.languageSelected();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  checkTheme() {
    return this.themeService.checkTheme();
  }

}
