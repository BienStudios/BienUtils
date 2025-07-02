import handleString from "./handleString.js";

/**
 * Manipulador "en vivo" para las entradas tipo "tel" (teléfono).
 * Permite números, paréntesis y "+".
 * @param {Event} e - Evento de entrada que dispara el manipulador.
 * @returns {void} Actúa directamente sobre el valor, por lo que no retorna nada.
 * @example
 * let handleTel;
 * try {
 *     // Puedes usar la instancia Global (BienUtils) o el nombre
 *     // que tú le asignes a su importación
 *     handleTel = await BienUtils.importer("handleTel");
 * } catch (e) {
 *     console.error(`No se pudo importar el handler. Error: ${e}`);
 * }
 * const input = document.createElement("input");
 * input.type = "tel";
 * // ¡AVISO! Es ideal que el oyente se asigne al evento tipo "input".
 * if (handleTel) {
 *     input.addEventListener("input", handleTel);
 *     console.log("Handler asignado correctamente");
 * }
 * document.querySelector(".form").appendChild(input);
 * @example
 * let handleTel;
 * const input = document.createElement("input");
 * input.type = "tel";
 * BienUtils.importer("handleTel").then(handler => {
 *     input.addEventListener("input", handler);
 *     console.log("Handler importado con éxito");
 * }).catch(e => {
 *     console.error(`No se pudo importar el handler. Error: ${e}`)
 * });
 * document.querySelector(".form").appendChild(input);
 */
export default function handleTel(e) {
    e.target.value = e.target.value.replace(/[^0-9()+-]/g, "");
    handleString(e);
}