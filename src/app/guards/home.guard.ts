import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { AdminService } from '../services/admin.service';

@Injectable({
    providedIn: 'root',
})
export class HomeGuard implements CanActivate {
    constructor(
        private router: Router,
        private alumnosService: AlumnosService,
        private teachersService: TeachersService,
        private adminService: AdminService
    ) { }

    async canActivate(): Promise<boolean> {
        const userId = localStorage.getItem('user_id');
        const role = localStorage.getItem('user_role');

        // Si el usuario no ha iniciado sesión, permitir el acceso a Home
        if (!userId || !role) {
            return true;
        }

        let personaldata;
        if (role === 'alumno') {
            personaldata = await this.alumnosService.getByUserId(userId);
        } else if (role === 'profesor') {
            personaldata = await this.teachersService.getByUserId(userId);
        } else if (role === 'admin') {
            return true;
        }

        // Si el usuario ha iniciado sesión pero no ha completado su registro,
        // redirigirlo a 'info-usuario' y no permitir el acceso a Home
        if (personaldata && !personaldata.apellidos) {
            this.router.navigate(['/info-usuario']);
            return false;
        }

        // Si el usuario ha iniciado sesión y ha completado su registro, permitir el acceso a Home
        return true;
    }
}
