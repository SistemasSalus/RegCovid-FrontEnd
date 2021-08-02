import { Component, Input, Output, EventEmitter, Renderer2, OnDestroy } from '@angular/core';
import pageSettings from '../../../config/page-settings';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { SessionService } from '../../auth/services/session.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnDestroy {
  @Input() pageSidebarTwo;
  @Output() toggleSidebarRightCollapsed = new EventEmitter<boolean>();
  @Output() toggleMobileSidebar = new EventEmitter<boolean>();
  @Output() toggleMobileRightSidebar = new EventEmitter<boolean>();
  pageSettings = pageSettings;
  username: string;
  mobileSidebarToggle() {
    this.toggleMobileSidebar.emit(true);
  }
  mobileRightSidebarToggle() {
    this.toggleMobileRightSidebar.emit(true);
  }
  toggleSidebarRight() {
    this.toggleSidebarRightCollapsed.emit(true);
  }

  mobileTopMenuToggle() {
    this.pageSettings.pageMobileTopMenuToggled = !this.pageSettings.pageMobileTopMenuToggled;
  }

  mobileMegaMenuToggle() {
    this.pageSettings.pageMobileMegaMenuToggled = !this.pageSettings.pageMobileMegaMenuToggled;
  }

  ngOnDestroy() {
    this.pageSettings.pageMobileTopMenuToggled = false;
    this.pageSettings.pageMobileMegaMenuToggled = false;
  }

  constructor(
    private renderer: Renderer2,
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService,
  ) {
    this.username = this.sessionService.getUser().userName;
  }

  logout() {
    this.authService.doLogoutUser();
    // this.authService.logout().subscribe((success) => {
    //   if (success) {
    this.router.navigate(['/login']);
    //   }
    // });
  }
}
