import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
// Importamos el servicio principal que ya modificaste
import { ServiciosWeb } from '../../ModuloServiciosWeb/ServiciosFavorita.component';


@Component({
  selector: 'app-pg-panel-principal',
  templateUrl: './pg-panel-principal.component.html',
  styleUrls: ['./pg-panel-principal.component.css']
})
export class PgPanelPrincipalComponent {
preguntaUsuario: string = '';
  isLoading: boolean = false;
  resultado: any = null;

  public chartData: any;
  public chartOptions: any;
  public chartType: string = 'bar';

  constructor(
    private serviciosWeb: ServiciosWeb,
    private messageService: MessageService
  ) {
    this.chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: { display: true, beginAtZero: true, ticks: { color: '#495057' } },
            x: { display: true, ticks: { color: '#495057' } }
        },
        plugins: {
            legend: {
                display: true,
                labels: { color: '#495057' }
            }
        }
    };
  }

  realizarConsulta(): void {
    if (!this.preguntaUsuario.trim() || this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.resultado = null;

    this.serviciosWeb.enviarConsultaNLQ(this.preguntaUsuario).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success && response.data) {
          this.resultado = response.data;

          console.log("Datos recibidos del backend:", this.resultado);

          if (this.resultado.type === 'bar' || this.resultado.type === 'pie') {
            this.chartType = this.resultado.type;
            this.chartData = this.resultado.data;

            if (this.chartType === 'pie') {
                this.chartOptions.scales.x.display = false;
                this.chartOptions.scales.y.display = false;
            } else {
                this.chartOptions.scales.x.display = true;
                this.chartOptions.scales.y.display = true;
            }
          }
        } else {
          if (response.data) {
              this.resultado = response.data;
          } else {
              this.mostrarError(response.mensaje || 'La respuesta del servidor no fue exitosa.');
          }
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.mostrarError('No se pudo conectar con el servidor. Intenta de nuevo.');
      }
    });
  }

  private mostrarError(mensaje: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: mensaje
    });
  }

  getObjectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  // ===== FUNCIÓN CORREGIDA =====
  /**
   * Da formato a los datos de la tabla de forma inteligente.
   * Ahora recibe la clave (nombre de la columna) para evitar formatear incorrectamente los años.
   * @param value El valor de la celda.
   * @param key El nombre de la columna.
   * @returns El valor formateado como string.
   */
  formatTableCell(value: any, key: string): string {
    if (value === null || value === undefined) {
      return '';
    }

    // Si la columna es 'Año' o 'anio', nunca le des formato de moneda.
    if (key.toLowerCase() === 'año' || key.toLowerCase() === 'anio') {
        return value.toString();
    }

    if (typeof value === 'string' && value.includes('%')) {
        return value;
    }

    if (typeof value === 'number') {
      // Aplica formato de moneda solo a valores numéricos que no son años
      return value.toLocaleString('es-EC');
    }

    return String(value);
  }
}
