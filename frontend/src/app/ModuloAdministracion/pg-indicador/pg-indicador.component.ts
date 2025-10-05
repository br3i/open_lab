

import { Component, OnInit } from '@angular/core';
// Si usas PrimeNG Toast agrega este provider y usa messageService (opcional)
// import { MessageService } from 'primeng/api';

interface SubIndicador {
  id: string;
  descripcion: string;
}
interface Indicador {
  id: string;
  nombre: string;
  subindicadores: SubIndicador[];
}
interface Eje {
  id: string;
  nombre: string;
  indicadores: Indicador[];
}

// Fila plana para la tabla inicial
interface FilaPlano {
  eje: Eje | null;
  indicador: Indicador | null;
  subindicador: SubIndicador | null;
}

const LS_KEY_EJES = 'bar_ejes_indicadores_v1';

@Component({
  selector: 'app-pg-indicador',
  templateUrl: './pg-indicador.component.html',
  styleUrls: ['./pg-indicador.component.css']
})
export class PgIndicadorComponent  implements OnInit {

  ejes: Eje[] = [];
tablaPlano: FilaPlano[] = [];

ejeActual: Eje = { id: '', nombre: '', indicadores: [] }; // 👈 inicializado
indicadorSeleccionado: Indicador | null = null;

nuevoIndicadorNombre = '';
nuevoSubDesc = '';

indicadorEditId: string | null = null;
indicadorEdicion = { id: '', nombre: '' };

subEditId: string | null = null;
subEdicion = { id: '', descripcion: '' };


  // ======== UI: filtro y modal ========
  filtroGlobal = '';
  visibleModalEje = false;
  esNuevoEje = false;


  constructor(
    // private messageService: MessageService
  ) {}

  // ========================== Ciclo de vida ==========================
  ngOnInit(): void {
    this.cargarEjesLocal();
  }

  // ========================== Persistencia local ==========================
  private guardarEjesLocal(): void {
    localStorage.setItem(LS_KEY_EJES, JSON.stringify(this.ejes));
    this.rebuildTablaPlano();
    // this.toast('success', 'Guardado', 'Base local actualizada');
  }

  private cargarEjesLocal(): void {
    const raw = localStorage.getItem(LS_KEY_EJES);
    if (raw) {
      try {
        this.ejes = JSON.parse(raw);
        this.rebuildTablaPlano();
        return;
      } catch {
        // noop
      }
    }

    // -------- Semilla por defecto solicitada --------
    const ejeNutricion: Eje = {
      id: this.uid(),
      nombre: 'Nutrición',
      indicadores: [
        { id: this.uid(), nombre: 'A · Alimentos aptos para consumo (Kg)', subindicadores: [] },
        { id: this.uid(), nombre: 'B · Alimentos con consumo inmediato (Kg)', subindicadores: [] },
        { id: this.uid(), nombre: 'C · Producción (Kg)', subindicadores: [] },
        { id: this.uid(), nombre: 'D · Total de kilos recibidos en el mes', subindicadores: [] },
        { id: this.uid(), nombre: 'Total de raciones de 343 g entregadas', subindicadores: [] },
        { id: this.uid(), nombre: 'Recuperación de alimentos (A+B+C)/D (%)', subindicadores: [] },
        { id: this.uid(), nombre: 'Instituciones beneficiadas (#)', subindicadores: [] },
        { id: this.uid(), nombre: 'Personas alimentadas mensualmente (#)', subindicadores: [] },
        { id: this.uid(), nombre: 'Personal que labora en la fundación (#)', subindicadores: [] },
      ],
    };

    const ejeAmbiente: Eje = {
      id: this.uid(),
      nombre: 'Ambiente',
      indicadores: [{ id: this.uid(), nombre: 'CO2 evitadas (tn)', subindicadores: [] }],
    };

    const ejeEquidad: Eje = {
      id: this.uid(),
      nombre: 'Equidad de Género',
      indicadores: [{ id: this.uid(), nombre: 'Mujeres apoyadas FF (#)', subindicadores: [] }],
    };

    this.ejes = [ejeNutricion, ejeAmbiente, ejeEquidad];
    this.guardarEjesLocal();
  }

  private rebuildTablaPlano(): void {
    const rows: FilaPlano[] = [];
    for (const eje of this.ejes) {
      if (!eje.indicadores?.length) {
        rows.push({ eje, indicador: null, subindicador: null });
        continue;
      }
      for (const ind of eje.indicadores) {
        if (!ind.subindicadores?.length) {
          rows.push({ eje, indicador: ind, subindicador: null });
          continue;
        }
        for (const sub of ind.subindicadores) {
          rows.push({ eje, indicador: ind, subindicador: sub });
        }
      }
    }
    this.tablaPlano = this.aplicarFiltro(rows);
  }

  // ========================== Filtro global ==========================
  filtrarPlano(): void {
    this.rebuildTablaPlano();
  }

  private aplicarFiltro(rows: FilaPlano[]): FilaPlano[] {
    const f = this.filtroGlobal.trim().toLowerCase();
    if (!f) return rows;
    return rows.filter((r) => {
      const e = r.eje?.nombre?.toLowerCase() ?? '';
      const i = r.indicador?.nombre?.toLowerCase() ?? '';
      const s = r.subindicador?.descripcion?.toLowerCase() ?? '';
      return e.includes(f) || i.includes(f) || s.includes(f);
    });
  }

  // ========================== Toolbar / Modal ==========================
  abrirModalEje(modo: 'nuevo' | 'editar' = 'nuevo', eje?: Eje): void {
    if (modo === 'nuevo') {
      this.esNuevoEje = true;
      this.ejeActual = {
        id: this.uid(),
        nombre: '',
        indicadores: [],
      };
      this.indicadorSeleccionado = null;
    } else {
      if (!eje) return;
      this.esNuevoEje = false;
      // Clonar profundo para evitar editar por referencia
      this.ejeActual = JSON.parse(JSON.stringify(eje));
      this.indicadorSeleccionado = null;
    }
    this.resetEdiciones();
    this.visibleModalEje = true;
  }

  // Desde tabla plana → abre modal apuntando al eje correspondiente
  editarFila(row: FilaPlano): void {
    if (!row.eje) return;
    this.abrirModalEje('editar', row.eje);

    // Si viene con indicador/sub, precargar selección para comodidad
    if (row.indicador) {
      setTimeout(() => {
        this.seleccionarIndicadorParaSubs(row.indicador!);
      });
    }
  }

  // Eliminar según profundidad de la fila (sub > ind > eje)
  eliminarFila(row: FilaPlano): void {
    if (row.eje && row.indicador && row.subindicador) {
      // eliminar sub
      const eje = this.ejes.find((e) => e.id === row.eje!.id);
      const ind = eje?.indicadores.find((i) => i.id === row.indicador!.id);
      if (ind) {
        ind.subindicadores = ind.subindicadores.filter((s) => s.id !== row.subindicador!.id);
      }
      this.guardarEjesLocal();
      // this.toast('success', 'Eliminado', 'Sub-indicador eliminado');
      return;
    }

    if (row.eje && row.indicador && !row.subindicador) {
      // eliminar indicador
      const eje = this.ejes.find((e) => e.id === row.eje!.id);
      if (eje) {
        eje.indicadores = eje.indicadores.filter((i) => i.id !== row.indicador!.id);
      }
      this.guardarEjesLocal();
      // this.toast('success', 'Eliminado', 'Indicador eliminado');
      return;
    }

    if (row.eje && !row.indicador) {
      // eliminar eje
      this.ejes = this.ejes.filter((e) => e.id !== row.eje!.id);
      this.guardarEjesLocal();
      // this.toast('success', 'Eliminado', 'Eje eliminado');
    }
  }

  // ========================== Acciones dentro del modal ==========================
  guardarEjeActual(): void {
    const nombre = (this.ejeActual.nombre || '').trim();
    if (!nombre) {
      // this.toast('warn', 'Datos incompletos', 'Ingresa el nombre del eje');
      return;
    }

    if (this.esNuevoEje) {
      this.ejes.unshift({ ...this.ejeActual, nombre });
      // this.toast('success', 'Eje creado', 'Se agregó un nuevo eje');
    } else {
      // Reemplazar por id
      const idx = this.ejes.findIndex((e) => e.id === this.ejeActual.id);
      if (idx >= 0) {
        this.ejes[idx] = JSON.parse(JSON.stringify(this.ejeActual));
        // this.toast('success', 'Cambios guardados', 'Eje actualizado');
      }
    }

    this.guardarEjesLocal();
  }

  // ------ Indicadores ------
  agregarIndicador(): void {
    const nombre = (this.nuevoIndicadorNombre || '').trim();
    if (!nombre) return;

    const nuevo: Indicador = {
      id: this.uid(),
      nombre,
      subindicadores: [],
    };

    this.ejeActual.indicadores.unshift(nuevo);
    this.nuevoIndicadorNombre = '';
    this.guardarEjeActual(); // persiste en ejes y refresca
  }

  eliminarIndicador(indId: string): void {
    this.ejeActual.indicadores = this.ejeActual.indicadores.filter((i) => i.id !== indId);
    if (this.indicadorSeleccionado?.id === indId) this.indicadorSeleccionado = null;
    this.guardarEjeActual();
  }

  iniciarEdicionIndicador(ind: Indicador): void {
    this.indicadorEditId = ind.id;
    this.indicadorEdicion = { id: ind.id, nombre: ind.nombre };
  }

  guardarEdicionIndicador(): void {
    if (!this.indicadorEditId) return;
    const target = this.ejeActual.indicadores.find((i) => i.id === this.indicadorEditId);
    if (target) {
      target.nombre = (this.indicadorEdicion.nombre || '').trim();
    }
    this.indicadorEditId = null;
    this.indicadorEdicion = { id: '', nombre: '' };
    this.guardarEjeActual();
  }

  cancelarEdicionIndicador(): void {
    this.indicadorEditId = null;
    this.indicadorEdicion = { id: '', nombre: '' };
  }

  seleccionarIndicadorParaSubs(ind: Indicador): void {
    // Selecciona el indicador dentro del EJE ACTUAL (usar id)
    const real = this.ejeActual.indicadores.find((i) => i.id === ind.id);
    this.indicadorSeleccionado = real ?? null;
    this.resetEdicionSub();
  }

  // ------ Sub-indicadores ------
  agregarSubIndicador(): void {
    if (!this.indicadorSeleccionado) return;
    const desc = (this.nuevoSubDesc || '').trim();
    if (!desc) return;

    this.indicadorSeleccionado.subindicadores.unshift({
      id: this.uid(),
      descripcion: desc,
    });

    this.nuevoSubDesc = '';
    this.guardarEjeActual();
  }

  iniciarEdicionSub(sub: SubIndicador): void {
    this.subEditId = sub.id;
    this.subEdicion = { id: sub.id, descripcion: sub.descripcion };
  }

  guardarEdicionSub(): void {
    if (!this.indicadorSeleccionado || !this.subEditId) return;

    const target = this.indicadorSeleccionado.subindicadores.find((s) => s.id === this.subEditId);
    if (target) {
      target.descripcion = (this.subEdicion.descripcion || '').trim();
    }

    this.resetEdicionSub();
    this.guardarEjeActual();
  }

  cancelarEdicionSub(): void {
    this.resetEdicionSub();
  }

  eliminarSubIndicador(subId: string): void {
    if (!this.indicadorSeleccionado) return;
    this.indicadorSeleccionado.subindicadores =
      this.indicadorSeleccionado.subindicadores.filter((s) => s.id !== subId);
    this.guardarEjeActual();
  }

  // ========================== Utilidades ==========================
  private uid(): string {
    return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
  }

  private resetEdiciones(): void {
    this.indicadorEditId = null;
    this.indicadorEdicion = { id: '', nombre: '' };
    this.resetEdicionSub();
  }

  private resetEdicionSub(): void {
    this.subEditId = null;
    this.subEdicion = { id: '', descripcion: '' };
  }

  // private toast(severity: 'success' | 'info' | 'warn' | 'error', summary: string, detail: string) {
  //   this.messageService.add({ severity, summary, detail });
  // }
}
