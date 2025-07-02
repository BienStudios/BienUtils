/**
 * Manipulador (para casos especiales o aislados) "en vivo" de la entrada de texto.
 * Permite solo letras mayúsculas y minúsculas sin tildes de ningún tipo, y números.
 * @description Ideal para inputs con tokens, o códigos simples con letras y números.
 * @param {Event} e - Evento disparado por la acción de entrada del usuario.
 * @returns {void} Limpia y valida internamente. No retorna su valor.
 * @example
 * const input = document.createElement("input");
 * input.type = "text";
 * // ¡AVISO! Es ideal que el oyente se asigne al evento tipo "input".
 * input.addEventListener("input", handleAlphaNumeric);
 * document.querySelector(".form").appendChild(input);
 * @deprecated
 */
export default function handleAlphaNumeric(e) {
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
}