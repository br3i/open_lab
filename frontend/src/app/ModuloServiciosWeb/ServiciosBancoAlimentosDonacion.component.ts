
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlServicios } from './urlServiciosWeb.component';
@Injectable({
  providedIn: 'root'
})
export class ServiciosWebDonacion {
  urlServiciosBancoAlimentos: String = "";
  user: any;
  authToken: any;
  constructor(private http: HttpClient, server: UrlServicios, private hpptclient: HttpClient) {
    this.urlServiciosBancoAlimentos = server.urlServicio;

  }


  ListadoUnidadMedidaActivos() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutatipounidadmedida/ListadoUnidadMedidaActivos')
  }

  ListadoUnidadMedida() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutatipounidadmedida/ListadoUnidadMedidaTodos')
  }

  ActualizacionUnidadMedida(contenido: any) {
    return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutatipounidadmedida/ActualizarUnidadMedida', contenido)
  }

  EstadoCambiarUnidadMedida(idUnidadMedida: any, unidad_blEstado: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idUnidadMedida + "/" + unidad_blEstado;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutatipounidadmedida/ActualizarUnidadMedidaEstado' + parametros)
  }

  NuevaUnidadMedida(contenido: any) {
    return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutatipounidadmedida/CrearUnidadMedida', contenido)
  }


  ListadoTipoDonacionActivos() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutatipodonacion/ListadoTipoDonacionActivos')
  }


  ListadoTipoContenedorActivos() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutatipocontenedor/ListadoTipoContenedorActivos')
  }

  ListadoEstadoDonacionActivos() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaprocesodonacion/ListadoEstadoDonacionActivos')
  }

  //Sucursales empresa
  ListadoSucursalEmpresa(idFundacion: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idFundacion;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaempresa/ListadoSucursalEmpresa' + parametros)
  }

  ListadoSucursalDadoIdEmpresaActivo(idFundacion: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idFundacion;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaempresa/ListadoSucursalEmpresaActivos' + parametros)
  }

  NuevaSucursal(contenido: any) {
    return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutaempresa/IngresarSucursal', contenido)
  }

  //Registro de donacion 

  IngresarDonacionDetalle(contenido: any) {
    return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutaprocesodonacion/IngresarDonacionDetalle', contenido)
  }

  ListadoDonacionIdEmpresa(idFundacion: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idFundacion;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaprocesodonacion/ListadoDonacionIdEmpresa' + parametros)
  }

  ListadoDetalleIdDonacion(idDonacion: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idDonacion;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaprocesodonacion/ListadoDetalleIdDonacion' + parametros)
  }

  ObtenerSucursal(idSucursal: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idSucursal;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaprocesodonacion/ObtenerSucursalDadoId' + parametros)
  }

  DetalleDonacionId(idDonacion: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idDonacion;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaprocesodonacion/DetalleDonacionId' + parametros)
  }

    DetalleDonacionPersonaId(idDonacion: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idDonacion;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaprocesodonacion/DetalleDonacionPersonaId' + parametros)
  }

  GrupoDonacionEmpresa(idFundacion: any, idEstadoDonacion: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idFundacion + "/" + idEstadoDonacion;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaprocesodonacion/GrupoDonacionEmpresa' + parametros)
  }

  GrupoDonacionPersona(idPersona: any, idEstadoDonacion: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idPersona + "/" + idEstadoDonacion;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaprocesodonacion/GrupoDonacionPersona' + parametros)
  }

  ListadoAlimentoDadoIdTipo(idTipoAlimento: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idTipoAlimento;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaalimento/ListadoAlimentoDadoIdTipo' + parametros)
  }

  ListadoTipoAlimentoActivos() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutatipoalimento/ListadoTipoAlimentoActivos')
  }

  GenerarPrevisualizacionDonaciones(contenido: any) {
    return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutareportesfundacion/pdfDonacionPrevisualizacion', contenido)
  }

  GenerarPdfActaEntrega(contenido: any) {
    return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutareportesfundacion/PdfActaEntrega', contenido)
  }
  //Servicios para la clasificación de donaciones

  ListadoDestinoDonacionctivos() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutadestinodonacion/ListadoDestinoDonacionActivos')
  }

  IngresarClasificacionDonacion(contenido: any) {
    return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutaclasificacion/IngresarClasificacionDonacion', contenido)
  }


  ListadoKitDisponibles(idEstadoDonacion: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idEstadoDonacion;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutadistribucion/ListadoKitDadoIdEstadoDonacion' + parametros)
  }

  ListadoDonacionFundacionIdEstado() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutadistribucion/ListadoDonacionFundacionIdEstado')
  }

  IngresarKitFundacion(contenido: any) {
    return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutadistribucion/IngresarDonacionFundacionKits', contenido)
  }

  ActualizarEstadoDonacionFundacion(idfundaciondonacion: any, fund_don_dtfechadonacion: any, fund_don_idestadoentrega: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idfundaciondonacion + "/" + fund_don_dtfechadonacion + "/" + fund_don_idestadoentrega;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutadistribucion/ActualizarEstadoDonacionFundacion' + parametros)
  }

  // Registrar clasificación y distribución 

  IngresarClasificacionDistribucionFundacion(contenido: any) {
    return this.hpptclient.post<any>(this.urlServiciosBancoAlimentos + '/rutadistribucion/IngresarClasificacionDistribucionFundacion', contenido)
  } 

    DetalleFundacionContenedor(idFundacionDonacion: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idFundacionDonacion;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutadistribucion/DetalleFundacionContenedor' + parametros)
  }

    DetalleFundacionAlimento(idFundacionDonacion: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let parametros = "/" + idFundacionDonacion;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutadistribucion/DetalleFundacionAlimento' + parametros)
  }


  // LISTAR ALIMENTOS ACTIVOS
  ListadoAlimentoActivos() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaalimento/ListadoAlimentoActivos');
  }

  // LISTAR TODOS LOS ALIMENTOS
  ListadoAlimento() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaalimento/ListadoAlimento');
  }

  // CREAR UN NUEVO ALIMENTO
  CrearAlimento(strNombre: string, strDescripcion: string, idTipoAlimento: number) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const parametros = `/${strNombre}/${strDescripcion}/${idTipoAlimento}`;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaalimento/CrearAlimento' + parametros);
  }

  // ACTUALIZAR UN ALIMENTO
  ActualizarAlimento(idAlimento: number, strNombre: string, strDescripcion: string, idTipoAlimento: number) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const parametros = `/${idAlimento}/${strNombre}/${strDescripcion}/${idTipoAlimento}`;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaalimento/ActualizarAlimento' + parametros);
  }

  // CAMBIAR ESTADO DE UN ALIMENTO
  CambiarEstadoAlimento(idAlimento: number, blEstado: boolean) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const parametros = `/${idAlimento}/${blEstado}`;
    return this.hpptclient.get<any>(this.urlServiciosBancoAlimentos + '/rutaalimento/CambiarEstadoAlimento' + parametros);
  }


}
