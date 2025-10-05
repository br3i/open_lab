import { AfterViewInit, Component } from '@angular/core';

declare var iniciarDatos: any; 

@Component({
  selector: 'app-modulo-pago',
  templateUrl: './modulo-pago.component.html',
  styleUrls: ['./modulo-pago.component.css']
})
export class ModuloPagoComponent implements AfterViewInit{
  data = { 
  /* Requerido. Email de la cuenta PagoPlux del Establecimiento */ 
  PayboxRemail: "string", 
  /* Requerido. Email del usuario que realiza el pago */ 
  PayboxSendmail: "string", 
  /* Requerido. Nombre del establecimiento en PagoPlux */ 
  PayboxRename: "string", 
  /* Requerido. Nombre del usuario que realiza el pago */ 
  PayboxSendname: "string", 
  /* Requerido. Monto total de productos o servicios que no aplican impuestos, 
  máximo 2 decimales. Ejemplo: 100.00, 10.00, 1.00 */ 
  PayboxBase0: "string", 
  /* Requerido. Monto total de productos o servicios que aplican impuestos, el 
  valor debe incluir el impuesto, máximo 2 decimales. Ejemplo: 100.00, 10.00, 1.00 
  posee el valor de los productos con su impuesto incluido */ 
  PayboxBase12: "string", 
  /* Requerido. Descripción del pago */ 
  PayboxDescription: "string", 
  /* Requerido Tipo de Ejecución 
  * Production: true (Modo Producción, Se procesarán cobros y se 
  cargarán al sistema, afectará a la tdc) 
  * Production: false (Modo Prueba, se realizarán cobros de prueba y no   
  se guardará ni afectará al sistema) 
  */ 
  PayboxProduction: false, 
  /* Requerido Ambiente de ejecución 
  * prod: Modo Producción, Se procesarán cobros y se cargarán al sistema,   
  afectará a la tdc. 
  * sandbox: Modo Prueba, se realizarán cobros de prueba 
  */ 
  PayboxEnvironment: "sandbox", 
  /* Requerido. Lenguaje del Paybox 
  * Español: es | (string) (Paybox en español) 
  */ 
  PayboxLanguage: "es", 
  /* Requerido. Identifica el tipo de iframe de pagoplux por defecto true 
  
      */ 
      PayboxPagoPlux: true, 
  
      /* 
        * Requerido. dirección del tarjetahabiente 
      */ 
      PayboxDirection: "string", 
  
      /* 
        * Requerido. Teléfono del tarjetahabiente 
      */ 
      PayBoxClientPhone: "número telefónico del tarjetahabiente", 
  
      /* Opcionales 
      *  Solo aplica para comercios que tengan habilitado pagos 
            internacionales 
          */ 
      PayBoxClientName: 'string', 
      PayBoxClientIdentification: 'string', 
  
      /* SOLO PARA PAGOS RECURRENTES 
      *  Solo aplica para comercios que tengan habilitado pagos 
            recurrentes 
          */ 
  
      /* Requerido 
        True -> en caso de realizar un pago recurrente 
          False -> si es pago normal 
      */ 
      PayboxRecurrent: true, 
  
      /* Requerido 
        Id o nombre exacto del plan registrado en el comercio en la   
                plataforma de pagoplux 
      */ 
      PayboxIdPlan: 'Plan Mensual', 
  
      /** 
       * true -> los cobros se realizan de manera automática según la 
                 frecuencia del plan asignado en PAGOPLUX 
      * false -> los cobros se realizan mediante solicitud 
      */ 
      PayboxPermitirCalendarizar: true, 
  
      /* Requerido 
      * true -> El débito se realiza en el momento del pago 
      * false -> El débito se realizará en la fecha de corte según el plan 
        contratado 
      */ 
      PayboxPagoInmediato: true, 

  /* Requerido 
  true -> si desea realizar un pago de prueba de 1$ y reverso del 
  mismo de manera automática 
  NOTA: PayboxPagoImediato debe ser igual false 
  false -> no se realizará ningún cobro de prueba 
  */ 
  PayboxCobroPrueba: false, 
  /* 
  Descripción o comentario que se asignó a la transacción. 
  NOTA:Acepta solo 300 caracteres, si supera el valor se realizará un 
  truncamiento automático. 
  */ 
  consumptionCode: 'string' 
  }; 
  //Ejemplo dentro del .ts para la carga de los datos dentro de la variable data. 
  ngAfterViewInit() { 
  // Se inicia la carga de archivos de Paybox 
  iniciarDatos(this.data); 
  }

}