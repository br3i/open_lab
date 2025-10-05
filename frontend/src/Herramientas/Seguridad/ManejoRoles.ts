import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class VariablesRoles {
    Administrador: number = 1;
    Beneficiario: number = 2;
    Recolector: number = 53;
    Director: number = 4;
    Practicante: number = 3;
    TecnicoAdmin: number = 6;
    TecnicoOperativo: number = 7;
    Voluntario: number = 8;

}