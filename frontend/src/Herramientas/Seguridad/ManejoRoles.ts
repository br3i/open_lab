import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class VariablesRoles {
    Administrador: number = 1; 
    Beneficiario: number = 2;
    Director: number = 4;
    Practicante = 3;
    TecnicoAdmin: number = 6;
    TecnicoOperativo: number = 37
    Voluntario: number = 38

}