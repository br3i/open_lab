import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class VariablesRoles {
    Administrador: number = 1;
    Beneficiario: number = 33;
    Recolector: number = 10;
    Director: number = 31;
    Practicante = 35;
    TecnicoAdmin: number = 36;
    TecnicoOperativo: number = 37
    Voluntario: number = 38

}