import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ServiciosWebCentral } from '../../ModuloServiciosWeb/ServiciosBancoAlimentosCentral.component';
import { Mensajes } from '../../ModuloHerramientas/Mensajes.component';
import { FuncionesGenerales } from '../../ModuloHerramientas/FuncionesGenerales.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pg-gestioncontrato',
  templateUrl: './pg-gestioncontrato.component.html',
  styleUrls: ['./pg-gestioncontrato.component.css'],
  providers: [ConfirmationService, MessageService]
})


export class PgGestioncontratoComponent implements OnInit {

  public dialogClausulasVisible: boolean = false; // Control para mostrar el diálogo de clausulas
  public dialogSubclausulasVisible: boolean = false; // Control para mostrar el diálogo de subclausulas
  public dialogItemVisible: boolean = false; // Control para mostrar el diálogo de "Ver Items"


  public dialogVerClausulaVisible: boolean = false; // Control para mostrar el diálogo de "Ver Cláusula"
  public dialogVerSubclausulaVisible: boolean = false; // Control para mostrar el diálogo de "Ver Subcláusula"
  public dialogVerItemVisible: boolean = false; // Control para mostrar el diálogo de "Ver Items"


  // Variables relacionadas con las cláusulas
  public ListadoClausula: any = [];
  public ListadoClausulaActivas: any = [];
  public ListadoClausulaActivasFiltrado: any = [];

  public selectedClausulas: any[] = []; // Cláusulas seleccionadas para múltiples
  public clausulaVisualizada: any = {}; // Inicializamos clausulaVisualizada como un objeto vacío

  public expandirClausulas: boolean = false; // Control de expansión de la tabla de cláusulas
  public visibleNuevaClausula: boolean = false; // Diálogo para agregar nueva cláusula
  public visibleEditarClausula: boolean = false; // Diálogo para editar cláusula
  public visibleEliminarClausula: boolean = false; // Diálogo para cambiar estado de cláusula

  public clausulaSeleccionada: any = null; // Cláusula seleccionada
  public strEstadoClausula: string = ''; // Texto que indica si la cláusula está activa o desactivada
  public clausula_strTitulo: string = ''; // Nombre de la cláusula para registrar
  public clausula_strDescripcion: any = "";
  public clausulasSeleccionadasString: string = '';



  // Variables relacionadas con las subcláusulas
  public ListadoSubclausula: any = [];
  public ListadoSubclausulaActivas: any = [];
  public ListadoSubclausulaActivasFiltradas: any = [];

  public selectedSubclausulas: any[] = []; // subcláusula seleccionadas para múltiples
  public subclausulaVisualizada: any = {}; // Inicializamos subclausulaVisualizada como un objeto vacío
  // Mapa para guardar las subcláusulas seleccionadas por cada cláusula
  public selectedSubclausulasPorClausula: { [key: number]: any[] } = {};


  public expandedSubclausulas: boolean = false; // Control de expansión de la tabla de items
  public visibleNuevaSubclausula: boolean = false; // Diálogo para agregar nueva subcláusula
  public visibleEditarSubclausula: boolean = false; // Diálogo para editar subcláusula
  public visibleEliminarSubclausula: boolean = false; // Diálogo para cambiar estado de subcláusula

  public subclausulaSeleccionada: any = null; // Subcláusula seleccionada
  public strEstadoSubclausula: string = ''; // Texto que indica si la subcláusula está activa o desactivada
  public subclausula_strTitulo: string = ''; // Nombre de la subcláusula para registrar
  public subclausula_strDescripcion: any = "";
  public subclausulasSeleccionadasString: string = '';


  // Variables relacionadas con las items
  public ListadoItem: any = [];
  public ListadoItemActivas: any = [];
  public ListadoItemActivasFiltradas: any = [];

  public selectedItems: any[] = []; // items seleccionadas para múltiples
  public itemVisualizado: any = {}; // Inicializamos itemVisualizado como un objeto vacío
  // Mapa para guardar las subcláusulas seleccionadas por cada cláusula
  public selectedItemsPorSubclausula: { [key: number]: any[] } = {};

  public expandedItems: boolean = false; // Control de expansión de la tabla de items
  public visibleNuevoItem: boolean = false; // Diálogo para agregar nueva items
  public visibleEditarItem: boolean = false; // Diálogo para editar items
  public visibleEliminarItem: boolean = false; // Diálogo para cambiar estado de items

  public itemSeleccionado: any = null; // items seleccionada
  public strEstadoItem: string = ''; // Texto que indica si la items está activa o desactivada
  public items_strTitulo: string = ''; // Nombre de la items para registrar
  public items_strDescripcion: any = "";
  public itemsSeleccionadosString: string = '';

  //Contrato
  public contrato_strIdentificador: string = '';
  public contrato_strTitulo: string = '';
  public contrato_strDescripcion: string = '';
  public value: string = ''; // Variable para almacenar el contenido del textarea


  //Variobales para la funcion de contrato- clausula 
  public RelacionClausulaSubclausula: any[] = []; // subcláusula seleccionadas para múltiples
  public RelacionSubclausulaItems: any[] = []; // subcláusula seleccionadas para múltiples

  public strArchivoreporte64: any = "";
  public visiblepdfContrato: boolean = false;

  public mostrarModalAyuda: boolean = false;



  constructor
    (
      private servicios: ServiciosWebCentral,
      private messageService: MessageService,
      private mensajes: Mensajes,
      private confirmationService: ConfirmationService,
      private funciones: FuncionesGenerales,
      private sanitizer: DomSanitizer,

    ) { }
  async ngOnInit() {
    await this.ListadoClausulas();
    this.activarExpandirClausulas();
    this.activarExpandirSubclausulas();
    this.activarExpandirItems();


  }

  abrirAyuda() {
    this.mostrarModalAyuda = true;
  }

  // Función para mostrar el diálogo de la lista de cláusulas desde "Nueva Cláusula"
  ModalDialogClausula() {
    this.dialogClausulasVisible = true;
  }

  ModalDialogSubclausula() {
    this.dialogSubclausulasVisible = true;
  }

  ModalDialogItem() {
    this.dialogItemVisible = true;
  }

  //FUNCIONES PARA CLAUSULAS
  // Listar clausulas Activos
  async ListadoClausulas() {
    try {
      const data = await new Promise<any>(resolve => this.servicios.ListadoClausulaActivos().subscribe(translated => resolve(translated)));
      if (data.success) {
        this.ListadoClausulaActivas = data.datos;
        this.ListadoClausulaActivasFiltrado = [...this.ListadoClausulaActivas];

        console.log("DATOS CLAUSULA", this.ListadoClausulaActivas)
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar la lista de cláusulas.' });
      }
    } catch (error) {
      console.error('Error al listar cláusulas', error);
    }
  }

  filtrarClausula(event: any) {
    const query = event.target.value.toLowerCase();
    this.ListadoClausulaActivasFiltrado = this.ListadoClausulaActivas.filter((clausula: any) =>
      clausula.clausula_strtitulo.toLowerCase().includes(query) ||
      clausula.clausula_strdescripcion.toLowerCase().includes(query)
    );
  }

  filtrarSubclausula(event: any) {
    const query = event.target.value.toLowerCase();
    this.ListadoSubclausulaActivasFiltradas = this.ListadoSubclausulaActivas.filter((subclausula: any) =>
      subclausula.ousubclausula_strtitulo.toLowerCase().includes(query) ||
      subclausula.ousubclausula_strdescripcion.toLowerCase().includes(query)
    );
  }

  filtrarItem(event: any) {
    const query = event.target.value.toLowerCase();
    this.ListadoItemActivasFiltradas = this.ListadoItemActivas.filter((item: any) =>
      item.ouitems_strtitulo.toLowerCase().includes(query) ||
      item.ouitems_strdescripcion.toLowerCase().includes(query)
    );
  }

  // Función para confirmar la selección de cláusulas
  confirmarClausulas() {
    if (this.selectedClausulas.length === 0) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Debes seleccionar al menos una cláusula.' });
      return;
    }

    // Mapeamos los títulos de las cláusulas seleccionadas para mostrar un resumen en el mensaje
    const clausulasSeleccionadas = this.selectedClausulas.map(clausula => clausula.clausula_strtitulo).join(', ');
    this.messageService.add({ severity: 'success', summary: 'Cláusulas seleccionadas', detail: `Has seleccionado: ${clausulasSeleccionadas}` });

    // Actualizamos el listado completo de cláusulas seleccionadas en ListadoClausula
    this.ListadoClausula = [...this.selectedClausulas]; // Guardar las cláusulas seleccionadas como un nuevo arreglo

    // Cerramos el diálogo de contratos/cláusulas
    this.dialogClausulasVisible = false;
    this.visibleNuevaClausula = false;
  }

  // Función para alternar el estado de expansión del formulario de Cláusulas
  activarExpandirClausulas() {
    this.expandirClausulas = !this.expandirClausulas;
  }

  // Mostrar diálogo para agregar nueva cláusula
  ModalNuevoClausula() {
    this.clausula_strTitulo = '';
    this.visibleNuevaClausula = true;
  }

  // Mostrar diálogo para visualizar una cláusula
  VerClausula(clausula: any) {
    this.clausulaVisualizada = clausula ? { ...clausula } : {}; // Si 'clausula' es null o undefined, inicializa como objeto vacío
    this.dialogVerClausulaVisible = true;
  }

  // Mostrar diálogo para editar una cláusula
  ModalEditarClausula(clausula: any) {
    this.clausulaSeleccionada = { ...clausula }; // Hacer una copia de la cláusula seleccionada
    this.ListadoSubclausula = [];  // Limpiar la lista de subcláusulas mostradas en la tabla
    this.selectedSubclausulas = this.selectedSubclausulasPorClausula[this.clausulaSeleccionada.idclausula] || [];     // Si ya hay subcláusulas seleccionadas para esta cláusula, cargarlas
    this.visibleEditarClausula = true;
    this.ListadoSubclausulas();
    this.ListadoSubclausula = this.ListadoSubclausula.concat(this.selectedSubclausulas);  // Llenar la tabla con las subcláusulas seleccionadas para esta cláusula
  }

  // Mostrar diálogo para cambiar el estado de una cláusula
  ModalEliminarClausula(clausula: any) {
    this.clausulaSeleccionada = { ...clausula };
    this.visibleEliminarClausula = true;
  }

  async RegistrarNuevaClausula() {
    if (this.clausula_strTitulo != "") {
      let content = {
        objClausula: {
          "idclausula": null,
          "clausula_strtitulo": this.clausula_strTitulo,
          "clausula_strdescripcion": this.clausula_strDescripcion,
          "clausula_blestado": null,
          "clausula_fechacreacion": null,
        }
      };

      try {
        const dataClausula = await new Promise<any>(resolve =>
          this.servicios.NuevaClausula(content).subscribe(translated => resolve(translated))
        );

        if (dataClausula.success) {
          // Volver a cargar la lista de cláusulas activas para obtener la nueva cláusula
          await this.ListadoClausulas();

          // Limpiar los campos de entrada de la cláusula
          this.clausula_strTitulo = '';
          this.clausula_strDescripcion = '';

          // Seleccionar automáticamente la cláusula recién creada
          const nuevaClausula = dataClausula.datos[0]; // Asegúrate de obtener la primera cláusula creada

          const clausulaEncontrada = this.ListadoClausulaActivas.find((clausula: any) => clausula.idclausula === nuevaClausula.ouidclausula);

          if (clausulaEncontrada) {
            this.selectedClausulas = [...this.selectedClausulas, clausulaEncontrada]; // Añadir a las cláusulas seleccionadas
          }

          // Mostrar la cláusula seleccionada en la tabla de cláusulas
          this.ListadoClausula = [...this.selectedClausulas];

          this.messageService.add({ severity: 'success', summary: 'Success', detail: this.mensajes.RegistroExitoso });
          this.visibleNuevaClausula = false;
          this.expandirClausulas = true;

        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this.mensajes.RegistroError });
        }
      } catch (error) {
        console.error('Error al registrar la cláusula:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al registrar la cláusula.' });
      }
    } else {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Por favor, ingresa el título de la cláusula.' });
    }
  }
  // Actualizar la cláusula seleccionada
  async ActualizarClausula() {
    // Crear el objeto con los datos de título y descripción
    let content = {
      objClausula: {
        "idclausula": this.clausulaSeleccionada.idclausula,
        "clausula_strtitulo": this.clausula_strTitulo || this.clausulaSeleccionada.clausula_strtitulo,
        "clausula_strdescripcion": this.clausula_strDescripcion || this.clausulaSeleccionada.clausula_strdescripcion
      }
    };

    try {
      // Llamar al servicio para actualizar solo título y descripción
      const dataClausula = await new Promise<any>(resolve =>
        this.servicios.ActualizacionClausula(content).subscribe(translated => { resolve(translated) })
      );

      if (dataClausula.success) {
        await this.ListadoClausulas();

        const index = this.selectedClausulas.findIndex((clausula: any) => clausula.idclausula === content.objClausula.idclausula);
        if (index !== -1) {
          this.selectedClausulas[index].clausula_strtitulo = content.objClausula.clausula_strtitulo;
          this.selectedClausulas[index].clausula_strdescripcion = content.objClausula.clausula_strdescripcion;
        }

        this.messageService.add({ severity: 'success', summary: 'Success', detail: this.mensajes.ActualizacionExitosa });

        this.visibleEditarClausula = false;

      }
    } catch (error) {
      console.error('Error al actualizar la cláusula:', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.mensajes.ErrorServidor });
    }
  }
  // Función para eliminar la cláusula seleccionada de la lista a nivel frontend
  async EliminarClausula() {
    try {
      if (!this.clausulaSeleccionada || !this.ListadoClausula) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No hay cláusula seleccionada o la lista está vacía.' });
        return;
      }

      this.ListadoClausula = this.ListadoClausula.filter((cl: any) => cl.idclausula !== this.clausulaSeleccionada.idclausula);
      this.selectedClausulas = this.selectedClausulas.filter((cl: any) => cl.idclausula !== this.clausulaSeleccionada.idclausula);

      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cláusula eliminada con éxito.' });

      this.clausulaSeleccionada = null;
      this.visibleEliminarClausula = false;  // Cerrar el modal si es necesario
    } catch (error) {
      console.error('Error al eliminar la cláusula:', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al eliminar la cláusula.' });
    }
  }

  // FUNCIONES PARA SUBCLAUSULA 

  // Listar subclausulas Activas por clausula
  async ListadoSubclausulas() {
    try {
      const data = await new Promise<any>(resolve => this.servicios.ListadoSubclausulaActivos(this.clausulaSeleccionada.idclausula).subscribe(translated => resolve(translated)));
      if (data.success) {
        this.ListadoSubclausulaActivas = data.datos;
        this.ListadoSubclausulaActivasFiltradas = [...this.ListadoSubclausulaActivas];

        const seleccionadas = this.selectedSubclausulas.map((subclausula: any) => subclausula.idsubclausula);
        this.ListadoSubclausula.forEach((subclausula: any) => {
          if (seleccionadas.includes(subclausula.idsubclausula)) {
            subclausula.selected = true; // Marca la subcláusula como seleccionada
          }
        });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar la lista de subclausulas.' });
      }
    } catch (error) {
      console.error('Error al listar subcláusulas', error);
    }
  }

  // Función para confirmar la selección de subcláusulas
  confirmarSubclausulas() {
    if (this.selectedSubclausulas.length === 0) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Debe seleccionar al menos una subcláusula.' });
      return;
    }

    this.selectedSubclausulasPorClausula[this.clausulaSeleccionada.idclausula] = [...this.selectedSubclausulas];
    const subclausulasSeleccionadas = this.selectedSubclausulas.map(subclausula => subclausula.ousubclausula_strtitulo).join(', ');
    this.messageService.add({ severity: 'success', summary: 'Subcláusulas seleccionadas', detail: `Has seleccionado: ${subclausulasSeleccionadas}` });

    // Actualizar la lista de subcláusulas seleccionadas en ListadoSubclausula
    this.ListadoSubclausula = [...this.selectedSubclausulas];

    // Cerrar el diálogo de subcláusulas
    this.dialogSubclausulasVisible = false;
    this.visibleNuevaSubclausula = false;
  }

  // Función para alternar el estado de expansión del formulario de Subcáusulas
  activarExpandirSubclausulas() {
    this.expandedSubclausulas = !this.expandedSubclausulas;
  }

  // Mostrar diálogo para agregar nueva subcláusula
  ModalNuevoSubclausula() {
    this.subclausula_strTitulo = '';
    this.visibleNuevaSubclausula = true;
  }

  // Mostrar diálogo para visualizar una subcláusula
  VerSubclausula(subclausula: any) {
    this.subclausulaVisualizada = subclausula ? { ...subclausula } : {}; // Inicializar como objeto vacío si es null
    this.dialogVerSubclausulaVisible = true;
  }

  // Mostrar diálogo para editar una subcláusula
  ModalEditarSubclausula(subclausula: any) {
    this.subclausulaSeleccionada = { ...subclausula }; // Hacer una copia de la subcláusula seleccionada

    this.ListadoItem = [];  // Limpiar la lista de subcláusulas mostradas en la tabla
    this.selectedItems = this.selectedItemsPorSubclausula[this.subclausulaSeleccionada.ouclau_sub_idsubclausula] || [];     // Si ya hay items seleccionados para esta subcláusula, cargarlas
    this.visibleEditarSubclausula = true;
    this.ListadoItems();

    this.ListadoItem = this.ListadoItem.concat(this.selectedItems);  // Llenar la tabla con los items seleccionados para esta subcláusula
  }

  // Mostrar diálogo para eliminar una subcláusula
  ModalEliminarSubclausula(subclausula: any) {
    this.subclausulaSeleccionada = { ...subclausula };
    this.visibleEliminarSubclausula = true;
  }

  async RegistrarNuevaSubclausula() {
    if (this.subclausula_strTitulo != "") {
      let content = {
        objSubclausula: {

          "idsubclausula": null,
          "subclausula_strtitulo": this.subclausula_strTitulo,
          "subclausula_strdescripcion": this.subclausula_strDescripcion,
          "subclausula_blestado": null,
          "subclausula_fechacreacion": null,

        }
      };
      try {
        const dataSubclausula = await new Promise<any>(resolve => this.servicios.NuevaSubclausula(content).subscribe(translated => { resolve(translated) }));

        if (dataSubclausula.success) {

          this.subclausula_strTitulo = ''; // Limpiar campos
          this.subclausula_strDescripcion = '';

          // Seleccionar automáticamente la cláusula recién creada
          const nuevaSubclausula = dataSubclausula.datos[0]; // Asegúrate de obtener la primera subcláusula creada

          this.RelacionClausulaSubclausula = await new Promise<any>(resolve => this.servicios.NuevaRelacionClausulaSubclausula(this.clausulaSeleccionada.idclausula, nuevaSubclausula.ouidsubclausula).subscribe(translated => { resolve(translated) }));

          await this.ListadoSubclausulas();

          const subclausulaEncontrada = this.ListadoSubclausulaActivasFiltradas.find((subclausula: any) => subclausula.ouclau_sub_idsubclausula === nuevaSubclausula.ouidsubclausula);

          if (subclausulaEncontrada) {
            // Actualizar el ngModel del p-table en el modal para reflejar la nueva subcláusula seleccionada
            this.selectedSubclausulas = [...this.selectedSubclausulas, subclausulaEncontrada]; // Añadir a las subcláusulas seleccionadas
          }


          // Mostrar la subcláusula seleccionada en la tabla de subcláusulas
          this.ListadoSubclausula = [...this.selectedSubclausulas];


          this.messageService.add({ severity: 'success', summary: 'Success', detail: this.mensajes.RegistroExitoso });
          this.visibleNuevaSubclausula = false;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this.mensajes.RegistroError });
        }

      } catch (error) {
        console.error('Error al registrar la cláusula:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al registrar la cláusula.' });
      }
    } else {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Por favor, ingresa el título de la cláusula.' });
    }
  }

  // Actualizar la subcláusula seleccionada
  async ActualizarSubclausula() {
    // Crear el objeto con los datos de título y descripción
    let content = {
      objSubclausula: {
        "idsubclausula": this.subclausulaSeleccionada.ouclau_sub_idsubclausula,  // id de la subcláusula seleccionada
        // Si no hay un nuevo título ingresado, usar el título actual
        "subclausula_strtitulo": this.subclausula_strTitulo || this.subclausulaSeleccionada.ousubclausula_strtitulo,
        // Si no hay una nueva descripción ingresada, usar la descripción actual
        "subclausula_strdescripcion": this.subclausula_strDescripcion || this.subclausulaSeleccionada.ousubclausula_strdescripcion
      }
    };

    try {
      // Llamar al servicio para actualizar solo título y descripción
      const dataSubclausula = await new Promise<any>(resolve =>
        this.servicios.ActualizacionSubclausula(content).subscribe(translated => { resolve(translated) })
      );

      if (dataSubclausula.success) {
        // Actualizar la lista de subcláusulas y limpiar los campos
        await this.ListadoSubclausulas();

        // Buscar el subclausula en la lista de seleccionadas y actualizarla
        const index = this.selectedSubclausulas.findIndex((subclausula: any) => subclausula.ouclau_sub_idsubclausula === content.objSubclausula.idsubclausula);
        if (index !== -1) {
          // Actualizar los valores del item seleccionada en la lista
          this.selectedSubclausulas[index].ousubclausula_strtitulo = content.objSubclausula.subclausula_strtitulo;
          this.selectedSubclausulas[index].ousubclausula_strdescripcion = content.objSubclausula.subclausula_strdescripcion;
        }

        this.messageService.add({ severity: 'success', summary: 'Success', detail: this.mensajes.ActualizacionExitosa });
        this.visibleEditarSubclausula = false;  // Cerrar el modal si es el caso

      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.mensajes.ActualizacionError });
      }
    } catch (error) {
      console.error('Error al actualizar la subcláusula:', error);
      // Mostrar mensaje de error si ocurre un problema en el servidor
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.mensajes.ErrorServidor });
    }
  }

  // Función para eliminar la subcláusula seleccionada de la lista a nivel frontend
  async EliminarSubclausula() {
    try {
      if (!this.subclausulaSeleccionada || !this.ListadoSubclausula) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No hay subcláusula seleccionada o la lista está vacía.'
        });
        return;
      }

      const idEliminar = this.subclausulaSeleccionada.ouclau_sub_idsubclausula;

      if (!idEliminar) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'ID de subcláusula no válido.'
        });
        return;
      }

      // Eliminar de Listado visual
      this.ListadoSubclausula = this.ListadoSubclausula.filter(
        (cl: any) => cl.ouclau_sub_idsubclausula !== idEliminar
      );

      // Eliminar de lista seleccionada actual
      this.selectedSubclausulas = [...(this.selectedSubclausulas || [])].filter(
        (cl: any) => cl.ouclau_sub_idsubclausula !== idEliminar
      );

      // 👉 ACTUALIZAR lista global por cláusula
      const idClausula = this.clausulaSeleccionada?.idclausula;
      if (idClausula) {
        this.selectedSubclausulasPorClausula[idClausula] = this.selectedSubclausulas;
      }

      // Notificación
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Subcláusula eliminada con éxito.'
      });

      this.subclausulaSeleccionada = null;
      this.visibleEliminarSubclausula = false;

    } catch (error) {
      console.error('Error al eliminar la subcláusula:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Ocurrió un error al eliminar la subcláusula.'
      });
    }
  }

  // FUNCIONES PARA ITEMS 

  // Listar items Activas
  async ListadoItems() {
    try {
      const data = await new Promise<any>(resolve => this.servicios.ListadoItemActivos(this.subclausulaSeleccionada.ouclau_sub_idsubclausula).subscribe(translated => resolve(translated)));
      if (data.success) {
        this.ListadoItemActivas = data.datos;
        this.ListadoItemActivasFiltradas = [...this.ListadoItemActivas];

        // Unir las items seleccionadas previamente para esta subcláusula a la tabla
        const seleccionadas = this.selectedItems.map((item: any) => item.iditem);
        this.ListadoItem.forEach((item: any) => {
          if (seleccionadas.includes(item.iditem)) {
            item.selected = true; // Marca la item como seleccionada
          }
        });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar la lista de items.' });
      }
    } catch (error) {
      console.error('Error al listar item', error);
    }
  }

  // Función para confirmar la selección de item
  confirmarItems() {
    if (this.selectedItems.length === 0) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Debes seleccionar al menos un item.' });
      return;
    }
    this.selectedItemsPorSubclausula[this.subclausulaSeleccionada.ouclau_sub_idsubclausula] = [...this.selectedItems];
    this.messageService.add({ severity: 'success', summary: 'Items seleccionados con exito' });

    this.ListadoItem = [...this.selectedItems];

    // Cerrar el diálogo de subcláusulas
    this.dialogItemVisible = false;
    this.visibleNuevoItem = false;

  }

  // Función para alternar el estado de expansión del formulario de Subcáusulas
  activarExpandirItems() {
    this.expandedItems = !this.expandedItems;
  }

  // Mostrar diálogo para agregar nueva item
  ModalNuevoItem() {
    this.items_strTitulo = '';
    this.visibleNuevoItem = true;
  }

  // Mostrar diálogo para visualizar una item
  VerItem(item: any) {
    this.itemVisualizado = item ? { ...item } : {}; // Inicializar como objeto vacío si es null
    this.dialogVerItemVisible = true;
  }

  // Mostrar diálogo para editar una item
  ModalEditarItem(item: any) {
    this.itemSeleccionado = { ...item }; // Hacer una copia de la item seleccionada
    this.visibleEditarItem = true;
  }

  // Mostrar diálogo para eliminar una item
  ModalEliminarItem(item: any) {
    this.itemSeleccionado = { ...item };
    this.visibleEliminarItem = true;
  }

  async RegistrarNuevoItem() {
    if (this.items_strTitulo != "") {
      let content = {
        objItem: {
          "iditems": null,
          "items_strtitulo": this.items_strTitulo,
          "items_strdescripcion": this.items_strDescripcion,
          "items_blestado": null,
          "items_fechacreacion": null,
        }
      };
      try {
        const dataItem = await new Promise<any>(resolve => this.servicios.NuevoItem(content).subscribe(translated => { resolve(translated) }));
        if (dataItem.success) {

          this.items_strTitulo = ''; // Limpiar campos
          this.items_strDescripcion = '';

          const nuevoItem = dataItem.datos[0]; // Asegúrate de obtener la primera item creada

          this.RelacionSubclausulaItems = await new Promise<any>(resolve => this.servicios.NuevaRelacionSubclausulaItems(this.subclausulaSeleccionada.ouclau_sub_idsubclausula, nuevoItem.ouiditems).subscribe(translated => { resolve(translated) }));

          await this.ListadoItems();
          const itemEncontrada = this.ListadoItemActivasFiltradas.find((item: any) => item.ousub_items_iditems === nuevoItem.ouiditems);

          if (itemEncontrada) {
            // Actualizar el ngModel del p-table en el modal para reflejar la nueva item seleccionada
            this.selectedItems = [...this.selectedItems, itemEncontrada];
          }
          // Mostrar la item seleccionada en la tabla de items
          this.ListadoItem = [...this.selectedItems];

          this.messageService.add({ severity: 'success', summary: 'Success', detail: this.mensajes.RegistroExitoso });
          this.visibleNuevoItem = false;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this.mensajes.RegistroError });
        }
      } catch (error) {
        console.error('Error al registrar el item:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al registrar el item.' });
      }
    } else {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Por favor, ingresa el título del item.' });
    }
  }

  // Actualizar la item seleccionada
  async ActualizarItem() {
    let content = {
      objItem: {
        "iditems": this.itemSeleccionado.ousub_items_iditems,
        "items_strtitulo": this.items_strTitulo || this.itemSeleccionado.ouitems_strtitulo,
        "items_strdescripcion": this.items_strDescripcion || this.itemSeleccionado.ouitems_strdescripcion
      }
    };
    try {
      // Llamar al servicio para actualizar solo título y descripción
      const dataItem = await new Promise<any>(resolve =>
        this.servicios.ActualizacionItem(content).subscribe(translated => { resolve(translated) })
      );

      if (dataItem.success) {
        await this.ListadoItems();
        const index = this.selectedItems.findIndex((items: any) => items.ousub_items_iditems === content.objItem.iditems);
        if (index !== -1) {
          // Actualizar los valores del item seleccionada en la lista
          this.selectedItems[index].ouitems_strtitulo = content.objItem.items_strtitulo;
          this.selectedItems[index].ouitems_strdescripcion = content.objItem.items_strdescripcion;
        }
        this.messageService.add({ severity: 'success', summary: 'Success', detail: this.mensajes.ActualizacionExitosa });
        this.visibleEditarItem = false;  // Cerrar el modal si es el caso

      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.mensajes.ActualizacionError });
      }
    } catch (error) {
      console.error('Error al actualizar la item:', error);
      // Mostrar mensaje de error si ocurre un problema en el servidor
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.mensajes.ErrorServidor });
    }
  }

  // Función para eliminar la Item seleccionada de la lista a nivel frontend
  async EliminarItem() {
    try {
      // Verificar que el item seleccionado y la lista de ítems existan
      if (!this.itemSeleccionado || !this.ListadoItem) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No hay item seleccionado o la lista está vacía.' });
        return;
      }

      // Verificar que el item seleccionado tenga un ID válido
      if (!this.itemSeleccionado.ousub_items_idsubclausula) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'ID de item no válido.' });
        return;
      }

      this.ListadoItem = this.ListadoItem.filter((item: any) => item.ousub_items_idsubclausula !== this.itemSeleccionado.ousub_items_idsubclausula);

      this.selectedItems = this.selectedItems.filter((item: any) => item.ousub_items_idsubclausula !== this.itemSeleccionado.ousub_items_idsubclausula);

      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Item eliminado con éxito.' });

      this.itemSeleccionado = null;
      this.visibleEliminarItem = false;
    } catch (error) {
      console.error('Error al eliminar el item:', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al eliminar el item.' });
    }
  }

  //FUNCION PARA GUARDAR Y PREVISUALIZAR Contrato Contrato
  async previsualizarContrato() {
    if (this.contrato_strTitulo === "") {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Por favor, ingresa el título del contrato.' });
      return;
    }

    // Construir el objeto de previsualización del contrato
    let contenido = {
      objPrevisualizacion: {
        idcontrato: null,
        contrato_strtitulo: this.contrato_strTitulo || null,
        contrato_strdescripcion: this.contrato_strDescripcion || null,
        contrato_blestado: null,
        contrato_fechacreacion: null,
        clausulas: this.selectedClausulas.map(clausula => {
          return {
            idclausula: clausula.idclausula || null,
            clausula_titulo: clausula.clausula_strtitulo || null,
            clausula_descripcion: clausula.clausula_strdescripcion || null,

            // Aquí accedemos directamente a las subcláusulas usando el ID de la cláusula
            subclausulas: (this.selectedSubclausulasPorClausula[clausula.idclausula] || []).map(subclausula => {
              return {
                idsubclausula: subclausula.ouclau_sub_idsubclausula || null,
                subclausula_titulo: subclausula.ousubclausula_strtitulo || null,
                subclausula_descripcion: subclausula.ousubclausula_strdescripcion || null,

                // Aquí accedemos directamente a los ítems usando el ID de la subcláusula
                items: (this.selectedItemsPorSubclausula[subclausula.ouclau_sub_idsubclausula] || []).map(item => {
                  return {
                    iditem: item.ousub_items_iditems || null,
                    item_titulo: item.ouitems_strtitulo || null,
                    item_descripcion: item.ouitems_strdescripcion || null
                  };
                })
              };
            })
          };
        })
      }
    };

    try {
      // Enviar el objeto para generar el PDF sin guardarlo en la base de datos
      const response = await new Promise<any>(resolve => this.servicios.PrevisualizacionpdfContrato(contenido).subscribe(translated => { resolve(translated) }));

      // Verificar si la respuesta del servidor contiene un error
      if (response.datos === "ERROR") {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo generar la previsualización del contrato, error en el servidor.' });
        console.error("El servidor devolvió un error al generar el PDF:", response);
        return;
      }

      if (response.success) {
        const blob = await this.funciones.converBase64toBlob(response.datos, 'application/pdf');
        this.strArchivoreporte64 = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
        this.visiblepdfContrato = true;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo generar la previsualización del contrato.' });
      }
    } catch (error) {
      console.error('Error en previsualizarContrato:', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al intentar generar la previsualización.' });
    }
  }

  async guardarContrato() {

    if (this.contrato_strTitulo != "") {
      let content = {
        objContrato: {
          "idcontrato": null,
          "contrato_stridentificador": this.contrato_strIdentificador,
          "contrato_strtitulo": this.contrato_strTitulo,
          "contrato_strdescripcion": this.contrato_strDescripcion,
          "contrato_blestado": null,
          "contrato_fechacreacion": null
        }
      };

      try {
        // Guardar el contrato
        const datacontrato = await new Promise<any>(resolve =>
          this.servicios.NuevoContrato(content).subscribe(translated => resolve(translated))
        );

        if (datacontrato.success) {

          // Obtener el contrato recién creado
          const nuevoContrato = datacontrato.datos[0];
          const idContrato = nuevoContrato.ouidcontrato;

          // Guardar las relaciones de cláusulas con el contrato
          for (let clausula of this.selectedClausulas) {
            await new Promise<any>(resolve =>
              this.servicios.NuevoContratoClausula(idContrato, clausula.idclausula).subscribe(translated => resolve(translated))
            );

            // Guardar las relaciones de subcláusulas con la cláusula
            const subclausulas = this.selectedSubclausulasPorClausula[clausula.idclausula] || [];
            for (let subclausula of subclausulas) {
              await new Promise<any>(resolve =>
                this.servicios.NuevoContratoClausulaSubclausula(idContrato, subclausula.ouclau_sub_idclausula, subclausula.ouclau_sub_idsubclausula).subscribe(translated => resolve(translated))
              );

              // Guardar las relaciones de los ítems con las subcláusulas
              const items = this.selectedItemsPorSubclausula[subclausula.ouclau_sub_idsubclausula] || [];
              for (let item of items) {
                await new Promise<any>(resolve =>
                  this.servicios.NuevoContratoSubclausulaItems(idContrato, item.ousub_items_idsubclausula, item.ousub_items_iditems).subscribe(translated => resolve(translated))
                );
              }
            }
          }

          this.messageService.add({ severity: 'success', summary: 'Success', detail: this.mensajes.RegistroExitoso });
          this.contrato_strTitulo = '';
          this.contrato_strDescripcion = '';
          this.selectedClausulas = [];
          this.selectedSubclausulasPorClausula = {};
          this.selectedItemsPorSubclausula = {};

          window.location.reload();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this.mensajes.RegistroError });
        }
      } catch (error) {
        console.error('Error al registrar el contrato:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al registrar el contrato.' });
      }
    } else {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Por favor, ingresa el título del contrato.' });
    }
  }

}