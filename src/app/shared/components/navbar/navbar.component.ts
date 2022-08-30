import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';
import { TranslateModule } from '@ngx-translate/core';

declare var jQuery: any;


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})


export class NavbarComponent implements OnInit {
  loginbtn: boolean = false;
  logoutbtn: boolean = false;
  supportedLanguages = ['ar', 'en'];
  currentLanguage: string = '';
  constructor(private _AuthService: AuthService, public translate: TranslateService) {
    translate.addLangs(this.supportedLanguages);
    translate.setDefaultLang('ar');
    this.currentLanguage = localStorage.getItem('currentLanguage') || 'ar';
    translate.use(this.currentLanguage);
    _AuthService.getLoggedInName.subscribe((name) => this.changeName(name));
    if (this._AuthService.isLoggedIn()) {
      this.loginbtn = false;
      this.logoutbtn = true;
    } else {
      this.loginbtn = true;
      this.logoutbtn = false;
    }
  }

  ngOnInit(): void {
    (function ($) {
      $(".toggle").click(function (e: any) {
        e.preventDefault();
        $(".toggle").toggleClass("toggle-on");
      });
    })(jQuery);
  }


  changeCurrentLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('currentLanguage', lang);
  }

  private changeName(name: boolean): void {
    this.logoutbtn = name;
    this.loginbtn = !name;
  }
  logout() {
    this._AuthService.deleteToken();
    window.location.href = window.location.href;
  }

}
