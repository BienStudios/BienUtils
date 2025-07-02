import createContainer from "./createContainer.js";
import handleString from "./../handlers/handleString.js";
import handleDecimal from "./../handlers/handleDecimal.js";
import handleTel from "./../handlers/handleTel.js";
import handleEmailString from "./../handlers/handleEmailString.js";
import validateString from "./../validators/validateString.js";
import validateNumber from "./../validators/validateNumber.js";

/**
 * Asistente para crear Entradas de Usuario.
 * @description - Recibe una instancia de `HTMLInputElement` o un objeto con las cualidades
 * de un input, y crea un contenedor con el input dentro de él. Le puedes asignar un prefijo
 * y/o sufijo, el cual se asignará al contenedor y podrás estilizarlo luego con CSS para
 * mejoras visuales.
 * @param {Input|HTMLInputElement} - input Elemento el cual será devuelto dentro del contenedor.
 *
 * **¡NOTA!** Si el input es ya un elemento del DOM, no debe estar dentro de él, ya que se
 * devolverá dentro de un `HTMLDivElement`.
 * @param {string} [type="text"] - Tipo del input. Puede ser omitido.
 * @param {string|null} [prefix=null] - Se asignará como `data-prefix` al HTMLDivElement retornado.
 * @param {string|null} [suffix=null] - Se asignará como `data-suffix` al HTMLDivElement retornado.
 * @throws {Error} - En determinados casos, lanzará error. Asegúrate de imprimirlos y corregir lo
 * que esté perjudicando a la ejecución.
 * @returns {HTMLDivElement} - `HTMLDivElement` contenedor, con clase "container". Contendrá el
 * `HTMLInputElement` dentro con la clase "input", más los datos provistos. Incluirá un oyente
 * de tipo `"input"` según el `type` declarado o ya incorporado con el `HTMLInputElement`, y dos
 * oyentes de tipo `"keydown"` y `"blur"` para validación en tiempo real.
 *
 * @typedef {Object} Input
 * @property {Type|undefined} type - Tipo que le quieres asignar a tu input. Puede ignorarse, y se
 * asignará el tipo que se defina en el parámetro `type` de la función (o por defecto: `"text"`).
 * @property {string|undefined} id - ID el cual será asignado al `HTMLInputElement`. Útil para
 * asignarle un label en otro momento.
 * @property {string|undefined} name - Nombre asignado para el input. Es recomendable definirlo,
 * ya que será la llave del valor que adquiera la entrada del Usuario (especialmente para FormData).
 * @property {string|undefined} pattern - Patrón HTML rastreable para el navegador. Puede omitirse.
 * @property {string|undefined} title - Si asignas un patrón (`pattern`), éste texto le servirá al
 * usuario para saber por qué su texto fué rechazado.
 * @property {string|undefined} placeholder - Texto que servirá de guía dentro de la entrada de
 * usuario, ya que podrá guiar o ejemplificar lo que en él se espera. Puede omitirse.
 * @property {string|undefined} value - Valor por defecto del `HTMLInputElement`. Puede omitirse.
 * @property {function|undefined} handler - Define un manipulador para saber qué realizará al evento
 * `"keydown"` y `"blur"`. Se asigna principalmente en caso de necesitar guardar su valor en alguna
 * variable.
 *
 * @typedef {"text"|"number"|"email"|"password"|"tel"} Type
 */
export default async function createInput(input, type = "text", prefix = null, suffix = null) {
    if (!(typeof input === "object" || input instanceof HTMLInputElement)) throw new Error(`El argumento de "input" debe ser un HTMLInputElement o un objeto con sus características.`);
    const container = createContainer();
    if (prefix) container.dataset.prefix = prefix;
    if (suffix) container.dataset.suffix = suffix;
    let cinput;
    if (input instanceof HTMLInputElement) cinput = input;
    else cinput = document.createElement("input");
    container.appendChild(cinput);
    console.log("Input añadido como nodo");
    cinput.classList.add("input");
    if (type?.trim()) cinput.type = type.trim();
    if (input.id?.trim()) cinput.id = input.id.trim();
    if (input.name?.trim()) cinput.name = input.name.trim();
    if (input.pattern?.trim()) cinput.pattern = input.pattern.trim();
    if (input.title?.trim()) cinput.title = input.title.trim();
    if (input.min?.trim()) cinput.min = input.min.trim();
    if (input.max?.trim()) cinput.max = input.max.trim();
    if (input.step?.trim()) cinput.step = input.step.trim();
    if (input.inputMode?.trim()) cinput.inputMode = input.inputMode.trim();
    if (input.placeholder?.trim()) cinput.placeholder = input.placeholder.trim();
    if (input.value?.trim()) cinput.value = input.value.trim();
    if (input.handler && typeof input.handler === "function") cinput.addEventListener("input", input.handler);
    switch (cinput.type) {
        case "text":
        case "password":
            cinput.addEventListener("input", handleString);
            cinput.addEventListener("paste", handleString);
            break;
        case "number":
            cinput.addEventListener("input", handleDecimal);
            cinput.addEventListener("paste", handleDecimal);
            break;
        case "tel":
            cinput.addEventListener("input", handleTel);
            cinput.addEventListener("paste", handleTel);
            break;
        case "email":
            cinput.addEventListener("input", handleEmailString);
            cinput.addEventListener("paste", handleEmailString);
            break;
    }
    if (cinput.type !== "number") {
        cinput.addEventListener("keydown", validateString);
        cinput.addEventListener("blur", validateString);
    } else {
        cinput.addEventListener("keydown", validateNumber);
        cinput.addEventListener("blur", validateNumber);
    }
    return container;
}