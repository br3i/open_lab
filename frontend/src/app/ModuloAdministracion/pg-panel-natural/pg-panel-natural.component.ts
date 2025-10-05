import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ServiciosWeb } from '../../ModuloServiciosWeb/ServiciosFavorita.component';

@Component({
  selector: 'app-pg-panel-natural',
  templateUrl: './pg-panel-natural.component.html',
  styleUrls: ['./pg-panel-natural.component.css']
})
export class PgPanelNaturalComponent {
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

          // Si la IA indica que es un gráfico...
          if (this.resultado.type === 'bar' || this.resultado.type === 'pie') {
            this.chartType = this.resultado.type;

            // ===== ¡AQUÍ ESTÁ LA MEJORA CLAVE! =====
            // Usamos la nueva función para "traducir" los datos al formato de PrimeNG
            this.chartData = this.transformDataForChart(this.resultado.data);
            // =========================================

            // Ajustamos las opciones visuales del gráfico
            const isPie = this.chartType === 'pie';
            this.chartOptions.scales.x.display = !isPie;
            this.chartOptions.scales.y.display = !isPie;
          }
        } else {
            this.resultado = response.data || { title: 'Error', type: 'table', data: [] };
            this.mostrarError(response.mensaje || 'La respuesta del servidor no fue exitosa.');
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.mostrarError('No se pudo conectar con el servidor.');
      }
    });
  }

  /**
   * --- ¡NUEVA FUNCIÓN TRADUCTORA! ---
   * Transforma un array de datos simple de la IA en el formato que espera PrimeNG Charts.
   * @param dataArray El array de datos de la IA (ej: [{ fundacion: 'F1', valor: 100 }])
   * @returns El objeto de datos formateado para p-chart.
   */
  private transformDataForChart(dataArray: any[]): any {
    if (!dataArray || dataArray.length === 0) {
      return { labels: [], datasets: [] };
    }

    // Identifica dinámicamente la clave para las etiquetas (el primer string)
    // y la clave para los valores (el primer número).
    const firstItem = dataArray[0];
    const labelKey = Object.keys(firstItem).find(key => typeof firstItem[key] === 'string');
    const valueKey = Object.keys(firstItem).find(key => typeof firstItem[key] === 'number');

    if (!labelKey || !valueKey) {
        console.error("No se pudieron determinar las claves para el gráfico.", firstItem);
        return { labels: [], datasets: [] };
    }

    const labels = dataArray.map(item => item[labelKey]);
    const data = dataArray.map(item => item[valueKey]);

    return {
      labels: labels,
      datasets: [
        {
          label: this.resultado.title || 'Resultado',
          data: data,
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#26A69A', '#AB47BC', '#FF7043'],
          borderColor: '#FFFFFF'
        }
      ]
    };
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

  formatTableCell(value: any, key: string): string {
    if (value === null || value === undefined) {
      return '';
    }
    if (key.toLowerCase().includes('año') || key.toLowerCase().includes('anio')) {
      return value.toString();
    }
    if(typeof value === 'string' && value.includes('%')){
      return value;
    }
    if (typeof value === 'number') {
      return value.toLocaleString('es-EC');
    }
    return String(value);
  }
}
