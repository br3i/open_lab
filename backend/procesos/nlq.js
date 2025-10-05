const fetch = require('node-fetch');
// ¡Importante! Cambiamos el nombre para que coincida con el nuevo archivo de datos
const { mockEjesData } = require('../modelo/mock.data.js');

const API_KEY = process.env.GEMINI_API_KEY; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`;

/**
 * Genera el prompt del sistema (el "cerebro" de la IA) de forma parametrizable.
 * @returns {string} El prompt con las instrucciones para la IA.
 */
function generarSystemPrompt() {
    const schema = `
      [{
        nombreEje: string,
        indicadores: [{
          nombreIndicador: string,
          meta: number,
          unidadMedida: string,
          subIndicadores?: [{ // Opcional
            nombreSubIndicador: string,
            meta: number,
            unidadMedida: string,
            medicionesMensuales: [{ anio: number, mes: string, valor: number, fundacion: string }]
          }],
          medicionesMensuales?: [{ anio: number, mes: string, valor: number, fundacion: string }] // Opcional
        }]
      }]
    `;

    return `
        Eres un analista de datos experto para una fundación sin fines de lucro. Tu misión es analizar datos jerárquicos de impacto social y presentar los resultados de forma clara e intuitiva.

        El esquema de los datos que analizarás es:
        ${schema}

        Tus Habilidades y Reglas:
        1.  **Entiendes la Jerarquía:** Sabes que los Ejes contienen Indicadores, y los Indicadores pueden contener Sub-Indicadores o Mediciones Mensuales.
        2.  **Agregas Datos:** Puedes sumar los 'valor' de las 'medicionesMensuales' para obtener totales anuales, trimestrales o por fundación.
        3.  **Calculas Progreso:** Puedes comparar el total de un indicador con su 'meta' para determinar el porcentaje de avance.
        4.  **Decides la Mejor Visualización:**
            -   'table': Para respuestas puntuales y específicas (ej: "¿cuál fue el valor de un indicador en un mes específico?").
            -   'bar': Para comparar valores entre categorías (ej: "comparar desempeño por fundación", "evolución de un indicador por año").
            -   'pie': Para mostrar la proporción de un total (ej: "distribución de beneficiarios por eje").
        5.  **Formato de Salida (JSON Estricto):** Tu respuesta DEBE ser únicamente un objeto JSON válido con la siguiente estructura:
            {
              "title": "Un título claro y descriptivo para el resultado",
              "type": "table" | "bar" | "pie",
              "data": [],
              "originalQuery": "La pregunta original del usuario"
            }
        6.  **REGLA DE SEGURIDAD:** Si la pregunta es ambigua o no se puede responder, devuelve un 'title' explicativo, type: 'table' y un 'data' vacío.

        Ejemplo de Pregunta: "¿Cuál fue el progreso total del indicador 'Acceso a Educación' en 2024?"
        Tu Proceso Mental: 1. Encuentro el indicador 'Acceso a Educación'. 2. Sumo los 'valor' de sus mediciones en 2024. 3. Comparo la suma con la 'meta' del indicador. 4. Devuelvo una tabla con el resultado.
    `;
}

/**
 * Procesa una consulta en lenguaje natural utilizando la IA de Gemini.
 * @param {string} query - La pregunta del usuario.
 * @returns {object} - Un objeto JSON estructurado devuelto por la IA.
 */
async function procesarConsultaNLQ(query) {
    const systemPrompt = generarSystemPrompt();

    const userPrompt = `
        Pregunta del Usuario: "${query}"
        Conjunto de Datos (mockEjesData): ${JSON.stringify(mockEjesData)}
    `;

    const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: {
            responseMimeType: "application/json",
        }
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            console.error("Error en la API de Gemini:", response.statusText, await response.text());
            throw new Error('La respuesta de la IA no fue exitosa.');
        }

        const result = await response.json();
        const candidate = result.candidates?.[0];
        
        if (candidate && candidate.content?.parts?.[0]?.text) {
            const jsonResponse = JSON.parse(candidate.content.parts[0].text);

          
            console.log("Respuesta de la IA procesada:", JSON.stringify(jsonResponse, null, 2));


            return jsonResponse;
        } else {
            console.error("Respuesta inesperada de la IA:", JSON.stringify(result, null, 2));
            throw new Error('La respuesta de la IA no tiene el formato esperado.');
        }

    } catch (error) {
        console.error("Error al procesar la consulta con IA:", error);
        return {
            title: "Error al procesar la consulta",
            type: "table",
            data: [],
            originalQuery: query,
            error: error.message
        };
    }
}

module.exports = {
    procesarConsultaNLQ
};

