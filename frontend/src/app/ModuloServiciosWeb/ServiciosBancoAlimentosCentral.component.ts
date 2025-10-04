
  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { UrlServicios } from './urlServiciosWeb.component';
  @Injectable({
    providedIn: 'root'
  })
  export class ServiciosWebCentral {
    urlServiciosBancoAlimentos: String = "";
    user: any;
    authToken: any;
    constructor(private http: HttpClient, server: UrlServicios, private hpptclient: HttpClient) {
      this.urlServiciosBancoAlimentos = server.urlServicio;

    }

    ListadoTipoEmpresaActivos() {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutatipoempresa/ListadoTipoEmpresaActivos')
    }

  ListadoTipoEmpresa() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutatipoempresa/ListadoTipoEmpresa')
  }

  ActualizacionTipoEmpresa(idTipoempresa: any, strNombre: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idTipoempresa + "/" + strNombre;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutatipoempresa/ActualizarTipoEmpresa' + parametros)
  }
  
  EstadoCambiarTipoEmpresa(idTipoempresa: any, blEstado: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idTipoempresa + "/" + blEstado;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutatipoempresa/ActualizarTipoEmpresaEstado' + parametros)
  }

  NuevoTipoEmpresa(strNombre: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + strNombre;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutatipoempresa/CrearTipoEmpresa' + parametros)
  }

  //TIPO SOLICITUD
  ListadoTipoSolicitud() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutatiposolicitud/ListadoTipoSolicitud')
  }

  ActualizacionTipoSolicitud(idTiposolicitud: any, strNombre: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idTiposolicitud + "/" + strNombre;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutatiposolicitud/ActualizarTipoSolicitud' + parametros)
  }
  
  EstadoCambiarTipoSolicitud(idTiposolicitud: any, blEstado: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idTiposolicitud + "/" + blEstado;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutatiposolicitud/ActualizarTipoSolicitudEstado' + parametros)
  }

  NuevoTipoSolicitud(strNombre: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + strNombre;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutatiposolicitud/CrearTipoSolicitud' + parametros)
  }

  //Ingreso de empresa

  IngresoEmpresa(contenido: any) {
    return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutaempresa/IngresarEmpresaSolicitud', contenido)
  }

  ActualizarEmpresaRepresentante(contenido: any) {
    return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutaempresa/ActualizarEmpresaRepresentante', contenido)
  }


  IngresoFundacion(contenido: any) {
    return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutaempresa/IngresarFundacionSolicitud', contenido)
  }

  ListadoCargoEmpresa() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaempresa/ListadoCargoEmpresaActivos')
  }

  ActualizarEstadoEmpresa(idempresa:any ,empresa_blestado:any){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idempresa + "/" + empresa_blestado;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaempresa/ActualizarEstadoEmpresa' + parametros)
  }

  //Listado para Empresas/fundacion segun el tipo solicitud
  ListadoSolicitudEmpresas(idTipoSolicitud:any,idTipoEntidad:any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/"+ idTipoSolicitud + "/" + idTipoEntidad;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaempresa/ListadoEmpresa'+ parametros)
  }

  ListadoEmpresasAceptadasActivas(idTipoSolicitud:any,idTipoEntidad:any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/"+ idTipoSolicitud + "/" + idTipoEntidad;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaempresa/ListadoEmpresasAceptadasActivas'+ parametros)
  }

  ObtenerLogoEmpresa(idPersona: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idPersona;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutapersonas/ObtenerPersonaFoto' + parametros)
  }

  ObtenerAnexoDadoIdEmpresa(idEmpresa:any){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idEmpresa;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaempresa/ObtenerAnexoDadoIdEmpresa' + parametros)
  }

  ActualizarEstadoSolicitudEmpresa(idsolicitud:any ,idtiposolicitud:any){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idsolicitud + "/" + idtiposolicitud;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaempresa/ActualizarEstadoSolicitudEmpresa' + parametros)
  }

  ActualizarEstadoLogicoSolicitudEmpresa(idsolicitud:any ,blEstado:any){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idsolicitud + "/" + blEstado;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaempresa/ActualizarEstadoLogicoSolicitudEmpresa' + parametros)
  }

  // Servicio para obtener una empresa o fundación que tenga solicitudes (Aceptadas, rechazadas o pendientes)

  ObtenerEmpresaRucSolicitudActivo(strRuc: any, idTipoEntidad: any, idTipoSolicitud: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + strRuc + "/" + idTipoEntidad + "/" + idTipoSolicitud;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaempresa/ObtenerEmpresaRucSolicitudActivo' + parametros)
  }

  ObtenerEmpresaDadoRuc(strRuc: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + strRuc;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaempresa/ObtenerEmpresaDadoRuc' + parametros)
  }

 //CLAUSULA

 ListadoClausulaActivos() {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaclausula/ListadoClausulaActivos')
}

ListadoClausula() {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaclausula/ListadoClausulaTodos')
}

ActualizacionClausula(contenido: any) {
  return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutaclausula/ActualizarClausula',contenido)
}

EstadoCambiarClausula(idClausula: any, clausula_blEstado: any) {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  let parametros = "/" + idClausula + "/" + clausula_blEstado;
  return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaclausula/ActualizarClausulaEstado' + parametros)
}

NuevaClausula(contenido: any) {
  return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutaclausula/CrearClausula', contenido)
}

 //SUBCLAUSULA
//Listado de subclausulas de una clausula
 ListadoSubclausulaActivos(idClausula: any) {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  let parametros = "/" + idClausula ;
  return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutasubclausula/ListaSubclausulaDadoIdclausula'+ parametros)
}

ListadoSubclausula() {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutasubclausula/ListadoSubclausulaTodos')
}

ActualizacionSubclausula(contenido: any) {
  return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutasubclausula/ActualizarSubclausula',contenido)
}

EstadoCambiarSubclausula(idSubclausula: any, subclausula_blEstado: any) {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  let parametros = "/" + idSubclausula + "/" + subclausula_blEstado;
  return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutasubclausula/ActualizarSubclausulaEstado' + parametros)
}

NuevaSubclausula(contenido: any) {
  return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutasubclausula/CrearSubclausula', contenido)
}

//ITEMS

//Listado de subclausulas de una clausula
ListadoItemActivos(idSubclausula: any) {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  let parametros = "/" + idSubclausula ;
  return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaitem/ListaSubclausulaDadoIdsubclausula'+ parametros)
}

ListadoItem() {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaitem/ListadoItemTodos')
}

ActualizacionItem(contenido: any) {
  return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutaitem/ActualizarItem',contenido)
}

EstadoCambiarItem(idItem: any, item_blEstado: any) {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  let parametros = "/" + idItem + "/" + item_blEstado;
  return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaitem/ActualizarItemEstado' + parametros)
}

NuevoItem(contenido: any) {
  return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutaitem/CrearItem', contenido)
}

//Relaciones entre tablas para contrato
NuevaRelacionClausulaSubclausula(clau_sub_idClausula: any, clau_sub_idSubclausula: any) {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  let parametros = "/" + clau_sub_idClausula + "/" + clau_sub_idSubclausula
  return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaclausula/CrearRelacionClausulaSubclausula' + parametros)
}

NuevaRelacionSubclausulaItems(sub_items_idSubclausula: any,sub_items_idItems: any) {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  let parametros = "/" + sub_items_idSubclausula + "/" + sub_items_idItems
  return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutasubclausula/CrearRelacionSubclausulaItems' + parametros)
}

//Acciones para tabla conveio_clausula

NuevoContrato(contenido: any) {
  return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutacontrato/CrearContrato', contenido)
}

NuevoContratoClausula(idContrato:any, idClausula:any) {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  let parametros = "/" + idContrato + "/" + idClausula;
  return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutacontrato/CrearContratoClausula' + parametros)
}

NuevoContratoClausulaSubclausula(idContrato:any,idClausula:any, idSubclausula:any) {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json'); 
  let parametros = "/" + idContrato + "/" + idClausula + "/" + idSubclausula;
  return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutacontrato/CrearContratoClausulaSubclausula' + parametros)
}

NuevoContratoSubclausulaItems(idContrato:any,idSubclausula:any, idItems:any) {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  let parametros =  "/" + idContrato + "/" + idSubclausula + "/" + idItems;
  return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutacontrato/CrearContratosubclausulaItems' + parametros)
}

ListadoContratoTodos() {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutacontrato/ListadoContratoTodos')
}

ListadoContratoActivos() {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutacontrato/ListadoContratoActivos')
}

EstadoCambiarContrato(idContrato: any, blEstado:any) {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  let parametros = "/" + idContrato + "/" + blEstado;
  return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutacontrato/ActualizarContratoEstado' + parametros)
}

ObtenerpdfEstructuraContrato(idContrato: any) {
    let parametros = "/" + idContrato ;
  return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutacontrato/ObtenerpdfEstructuraContrato' + parametros)
}


PrevisualizacionpdfContrato(contenido: any) {
  return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutacontrato/PrevisualizacionpdfContrato', contenido)
}

GenerarpdfContrato(contenido: any) {
  return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutacontrato/GenerarpdfContrato', contenido)
}

//Servicios para llenar un convenio

ListadoConvenioTodos() {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaconvenio/ListadoConvenioTodos')
}

ListadoConvenioDadoIdTipoDonnate(idTipoDonante:any) {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
    let parametros = "/" + idTipoDonante;
  return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaconvenio/ListadoConvenioDadoIdTipoDonnate'+parametros)
}

ObtenerConvenioContratoDadoIdConv(conv_cont_idconvenio: any) {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  let parametros = "/" + conv_cont_idconvenio;
  return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaconvenio/ObtenerConvenioContratoDadoIdConv' + parametros)
}

//convenios activos por facha
ListadoTipoDonanteActivos() {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutatipodonante/ListadoTipoDonanteActivos')
}

ListadoTipoConvenioActivos() {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutatipoconvenio/ListadoTipoConvenioActivos')
}

ListadoPersonalDadoIdCargoActivos(idCargo:any) {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  let parametros = "/" + idCargo;
  return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutadatosorganizacion/ListadoPersonalDadoIdCargoActivos'+parametros)
}
ListadoPersonal() {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutadatosorganizacion/ListadoPersonal')
}

BuscarPersonalIdPersona(idPersona: any) {
  if (!idPersona || typeof idPersona !== 'string' || idPersona.trim() === "") {
      console.error("Error: ID Persona no válido", idPersona);
      return null;
  }
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this.hpptclient.get<any>(
      `${this.urlServiciosBancoAlimentos}/rutadatosorganizacion/BuscarPersonalIdPersona/${idPersona}`,
      { headers }
  );
}

InsertarPersonal(Contenido: any) {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutadatosorganizacion/InsertarPersonal', Contenido)
}
ActualizarPersonal(Contenido: any) {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  return this.hpptclient.put<any>(this.urlServiciosBancoAlimentos + '/rutadatosorganizacion/ActualizarPersonal', Contenido)
}

ActualizarEstadoPersonal(idPersona:any,blEstado:any) {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  let parametros = "/" + idPersona + "/" + blEstado;
  return this.hpptclient.put<any>(this.urlServiciosBancoAlimentos + '/rutadatosorganizacion/ActualizarEstadoPersonal'+ parametros, null, { headers })
}

ListadoRepresentantesEmpresaActivos(idempresa:any) {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  let parametros = "/" + idempresa;
  return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaempresa/ListadoRepresentantesEmpresaActivos'+ parametros)
}

ObtenerRepresentanteAnonimo(idPersona:any, idEmpresa:any, idCargo: any) {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  let parametros = "/" + idPersona + "/" + idEmpresa + "/" + idCargo;
  return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaempresa/ObtenerRepresentanteAnonimo'+ parametros)
}

IngresarAnonimoEmpresa(idPersona:any, idEmpresa:any, idCargo: any) {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  let parametros = "/" + idPersona + "/" + idEmpresa + "/" + idCargo;
  return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaempresa/IngresarAnonimoEmpresa'+ parametros)
}

RegistarConvenio(contenido: any) {
  return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutaconvenio/CrearConvenio', contenido)
}

RegistarConvenioAnexo(contenido: any) {
  return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutaconvenio/CrearConvenioAnexo', contenido)
}

RegistarConvenioContrato(contenido: any) {
  return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutaconvenio/CrearConvenioContrato', contenido)
}

//servicios para editar convenio

ObtenerEmpresaDadoId(idEmpresa: any) {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  let parametros = "/" + idEmpresa;
  return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaempresa/ObtenerEmpresaDadoId' + parametros)
}

ObtenerRepresentanteEmpresa(idRepresentante:any,idEmpresa: any, idCargo: number | null = null) {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  let parametros = "/" + idRepresentante+"/" + idEmpresa +"/" + idCargo;
  return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaempresa/ObtenerRepresentanteId' + parametros)
}
    
ObtenerConvenioDadoId(idConvenio: any) {
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  let parametros = "/" + idConvenio;
  return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaconvenio/ObtenerConvenioDadoId' + parametros)
}

//Registar a personal de las empresas donadoras

  NuevoPersonalEmpresa(contenido: any) {
    return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutaempresa/IngresarPersonalEmpresa', contenido)
  }

  //Métodos para los donates de tipo persona natural

  ListadoSolicitudDonantePersona(idTipoSolicitud: any,solicitud_blestado : any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idTipoSolicitud + "/" + solicitud_blestado ;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutadonantepersona/ListadoSolicitudDonante' + parametros)
  }

  ObtenerSolicitudPersonaActivo(idtiposolicitud: any, idPersona: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idtiposolicitud + "/"+ idPersona;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutadonantepersona/ObtenerSolicitudPersonaActivo' + parametros)
  }

  IngresarPersonaSolicitud(contenido: any) {
    return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutadonantepersona/IngresarPersonaSolicitud', contenido)
  }


  // Actualizar estados de las solicitudes 
  ActualizarCitaCorreoEmpresa(contenido: any) {
    return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutamensajesolicitud/mensajeSolicitud  ',contenido)
  }

  ActualizarCitaCorreoDonante(contenido: any) {
    return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutamensajesolicitud/mensajeSolicitudDonante  ',contenido)
  }

}
