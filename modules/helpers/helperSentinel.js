import sentinel from "./../../constants/sentinel.js";

/**
 * Verificación con backend de la entrada de usuario. Puedes implementarla también en tu
 * backend, realizando una consulta a "https://dealer-app.com.ar/sentinel/sanitize", el cual
 * recibirá un Objeto JSON basado en POST. Debes suministrarle al endpoint:
 *
 * `input`: El texto que quieres validar.
 *
 * `profile`: Perfil de verificación y filtro. Puedes validar que la cadena sea completamente
 * alfanumérica (`"alnum"`), que tenga sólo números y puntos (`"numeric+dot"`), o que se
 * conserve completamente el texto, pero reemplazando los caracteres.
 *
 * `encoding`: Criterio por el cual serán reemplazados los caracteres especiales. Puedes
 * definir que sean convertidos en Entidades HTML (`"HTML"`), que se conviertan bajo el
 * formato de Unicode (`"UNICODE"`) o bajo el formato ASCII (`"ASCII"`).
 *
 * **¡ADVERTENCIA!** Una vez los datos estén sanitizados, asegure un par de puntos:
 *
 * - ¡No agregar directamente al HTML! Evita el uso de `nodo.innerHTML`. Como mejor
 * alternativa, se recomienda encarecidamente `nodo.innerText` o `nodo.textContent`. Te
 * Asegurará que ante una "reconversión" de caracteres, el texto seguirá siendo inofensivo.
 *
 * - Configura tus encabezados de seguridad (Content-Security-Policy) en tu servidor. Esto
 * proporcionará una capa extra de seguridad ante ejecuciones inesperadas.
 *
 * - Si los valores los almacenarás en una base de datos, ten en cuenta un par de puntos:
 *
 * 1. Si trabajas con SQL, independientemente del lenguaje que manejes en tu servidor o backend,
 * usa Sentencias Preparadas (`Prepared Statements`) para asignar los datos finalmente a tu
 * Base de Datos.
 *
 * 2. Si trabajas con NoSQL, evita a toda costa métodos que interpreten texto, tales como `eval()`
 * o `exec()`.
 *
 * 3. **NUNCA**, independientemente de la Base de Datos de la que hagas uso, almacenes los
 * valores sanitizados en campos ejecutables. Elije `TEXT`, `string` o similares.
 *
 * @description Se puede usar para validar lo obtenido de un formulario antes de que este pase
 * al backend. Se validará y se obtendrá una resupuesta con el valor limpio, el que puede ser
 * almacenado sin nigún riesgo.
 * @param {string} - input Texto de entrada de usuario que se quiere validar.
 * @param {Profile} - profile Perfil o criterio que se desea mantener.
 *
 * `"alnum"`: Permitirá sólo letras sin acentuaciones y números. Ideal para Tokens o códigos
 * de validación simple.
 *
 * `"numeric+dot"`: Permitirá únicamente números y puntos. Excelente para solicitar IPs.
 *
 * `"any"`: Permitirá todos los caracteres, haciendo reemplazo de ciertos caracteres.
 * @param {Encoding} - encoding Define el tipo de codificación de caracteres.
 * Permite tener un mejor control sobre cómo se manejará en el frontend la renderización de los
 * mismos.
 * @returns {Sentinel} - Retorna lo directamente obtenido de la consulta.
 * @example
 * const nameInput = document.querySelector("#name-input");
 * const form = document.querySelector("form");
 * form.addEventListener("submit", async function (e) {
 *     e.preventDefault();
 *     const result = await helperSentinel(nameInput.value, "any", "UNICODE");
 *     nameInput.value = result.value;
 *     e.target.submit();
 * });
 *
 * @typedef {"alnum"|"numeric+dot"|"any"} Profile
 * @typedef {"HTML"|"UNICODE"|"ASCII"} Encoding
 *
 * @typedef {Object} Sentinel
 * @property {string} profile - Perfil bajo el cual se sanitiza el texto.
 * @property {string} encoding - Tipo de codificación empleada. Puedes usar su valor para
 * establecer condiciones al momento de trabajar con el valor recibido.
 * @property {string} value - Valor limpio y sanitizado.
 * @property {boolean} hostility - Bandera de detección de anomalías. Si su valor es `true`,
 * es porque posiblemente se haya detectado un intento de ataque.
 * @property {Matches} matches - Mapa con las categorías de amenaza detectada.
 *
 * @typedef {Object} Matches
 * @property {boolean} xss - `true` en caso de detectar amenaza Cross-Site-Scripting.
 * @property {boolean} sql - `true` en caso de detectar amenaza de injección SQL.
 * @property {boolean} cmd - Si encuentra intentos de comandos, será `true`.
 * @property {boolean} sym - En caso de cruzarse con símbolos sospechosos, su valor
 * será asignado a `true`.
 */
export default async function helperSentinel(input, profile, encoding) {
    if (
        !typeof input === "string" ||
        !(profile === "alnum" || profile === "numeric+dot" || profile === "any") ||
        !(encoding === "HTML" || encoding === "UNICODE" || encoding === "ASCII")
    ) throw new Error(`Ingrese los datos en formato válido, por favor. Los tres parámetros deben ser cadenas de texto.`);
    const rs = await fetch(sentinel, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            input: input,
            profile: profile,
            encoding: encoding
        })
    });
    if (!rs.ok) {
        throw new Error(`No se pudo verificar con BienUtilsSentinel: ${rs.statusText}`)
    }
    return await rs.json();
}