import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const currentUserId = localStorage.getItem('user_id'); // obtén el ID del usuario del almacenamiento local
        const userRole = localStorage.getItem('user_role'); // obtén el rol del usuario del almacenamiento local
        let requestedUserId;

        if (route.params['studentId']) {
            requestedUserId = route.params['studentId'];
            if (userRole !== 'alumno') {
                this.router.navigate(['/']);
                return false;
            }
        } else if (route.params['teacherId']) {
            requestedUserId = route.params['teacherId'];
            if (userRole !== 'profesor') {
                this.router.navigate(['/']);
                return false;
            }
        } else if (route.params['adminId']) {
            requestedUserId = route.params['adminId'];
            if (userRole !== 'admin') {
                this.router.navigate(['/']);
                return false;
            }
        }

        if (currentUserId !== requestedUserId) {
            this.router.navigate(['/']);
            return false;
        }

        return true;
    }
}
