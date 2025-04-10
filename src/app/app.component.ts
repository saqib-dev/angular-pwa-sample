import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-pwa-app';
  deferredPrompt: any;
  showInstallButton = false;

  isIos = false;
  isInStandaloneMode = false;

  ngOnInit() {
    this.isIos = /iphone|ipad|ipod/.test(
      window.navigator.userAgent.toLowerCase()
    );
    this.isInStandaloneMode =
      'standalone' in window.navigator && (window.navigator as any).standalone;

    if (this.isIos && !this.isInStandaloneMode) {
      alert('To install this app, tap Share and select "Add to Home Screen".');
    }
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: Event) {
    event.preventDefault();
    this.deferredPrompt = event;
    this.showInstallButton = true;
  }

  installApp() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();

      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        this.deferredPrompt = null;
        this.showInstallButton = false;
      });
    }
  }
}
