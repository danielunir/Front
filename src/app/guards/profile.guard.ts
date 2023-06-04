import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProfileGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const currentUserId = localStorage.getItem('user_id');

        // aquí intentamos obtener el id correcto basado en el tipo de perfil
        let requestedUserId;
        if (route.params['studentId']) {
            requestedUserId = route.params['studentId'];
        } else if (route.params['teacherId']) {
            requestedUserId = route.params['teacherId'];
        } else if (route.params['adminId']) {
            requestedUserId = route.params['adminId'];
        }

        if (currentUserId !== requestedUserId) {
            this.router.navigate(['/']);
            return false;
        }

        return true;
    }
}
