import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from 'src/app/modules/auth/services/login.service';
import { CartService } from 'src/app/modules/cart/services/cart.service';
import { LoaderService } from '../../services/loader.service';
import { RouterOutlet } from '@angular/router';
import { routeTransitionAnimations } from '../../models/route-transition-animations';



@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  animations: [routeTransitionAnimations]
})
export class ToolbarComponent {

  isDarkTheme: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    public loaderService: LoaderService, 
    public cartService: CartService,
    public loginService: LoginService) {}

    ngOnInit(): void {
      this.isDarkTheme = localStorage.getItem('theme') === "Dark" ? true : false; 
      this.loaderService.isDarkTheme = this.isDarkTheme;
    }

    storeThemeSelection() {
      localStorage.setItem('theme', this.isDarkTheme ? "Dark" : "Light");
      this.loaderService.isDarkTheme = this.isDarkTheme;
    }

    prepareRoute(outlet: RouterOutlet) {
      return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState'];
    }
}
