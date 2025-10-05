const fetch = require('node-fetch');
// ¡Importante! Cambiamos el nombre para que coincida con el nuevo archivo de datos
const { mockFoundationData } = require('../modelo/mock.data.js');

const API_KEY = process.env.GEMINI_API_KEY; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`;

/**
 * Genera el prompt del sistema (el "cerebro" de la IA) de forma parametrizable.
 * @returns {string} El prompt con las instrucciones para la IA.
 */
function generarSystemPrompt() {
    const schema = `{ anio: number, eje: "Nutrición" | "Equidad", indicador: string, valor: number, unidad: string, beneficiarios: number }`;

    return `
        Eres un analista de datos experto para una fundación sin fines de lucro. Tu misión es analizar datos de impacto social y presentar los resultados de forma clara.

        El esquema de los datos que analizarás es:
        ${schema}

        Tus Reglas Estrictas:
        1.  Analiza la pregunta del usuario para entender su intención (ej: comparar años, ver indicadores de un eje, encontrar el valor más alto).
        2.  Realiza los cálculos necesarios sobre el conjunto de datos 'mockFoundationData'.
        3.  Decide la mejor visualización:
            -   'table': Para respuestas puntuales y específicas (ej: "¿cuál fue el valor del indicador de equidad en 2024?").
            -   'bar': Para comparar valores entre diferentes categorías (ej: "comparar la reducción de desnutrición entre 2024 y 2025").
            -   'pie': Para mostrar la proporción de un total (ej: "distribución de beneficiarios por eje en 2025").
        4.  El campo 'type' en tu respuesta DEBE ser 'table', 'bar', o 'pie'.
        5.  Formatea el campo 'data' según el 'type':
            -   Para 'table': Un array de objetos. Ej: [{ "Indicador": "Acceso a Educación", "Valor": "90%" }].
            -   Para 'bar' o 'pie': Un objeto con 'labels' (array de strings) y 'datasets' (array de objetos). SIEMPRE proporciona 6 colores hexadecimales profesionales.
        6.  **REGLA DE SEGURIDAD:** Si la pregunta es ambigua o no se puede responder, DEBES devolver type: 'table' y un array de 'data' vacío.

        Formato de Salida (JSON Estricto):
        Debes devolver ÚNICAMENTE un objeto JSON válido con la siguiente estructura. No añadas texto ni explicaciones.

        {
          "title": "Un título descriptivo para el resultado",
          "type": "table" | "bar" | "pie",
          "data": [],
          "originalQuery": "La pregunta original del usuario"
        }
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
        Conjunto de Datos (mockFoundationData): ${JSON.stringify(mockFoundationData)}
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

