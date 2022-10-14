import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Session } from "src/app/models/session";
import { AuthService } from "../../services/auth.service";

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate, CanActivateChild {
    public session!: Session;
    
    constructor(private authService: AuthService, private router: Router) {}

    public canActivate(next: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        this.authService.getSession().subscribe((session) => {
            this.session = session;
        });

        if (this.session.activeSession) {
            return true;
        } else {
            alert('No tiene permiso para acceder a este recurso!');
            this.router.navigate([`/dashboard/inicio`]);
            return false;
        }
    }

    public canActivateChild(next: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            return this.canActivate(next, state);
    }
}