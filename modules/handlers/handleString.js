/**
 * Manipulador "en vivo" de la entrada de texto. Impide entradas "anormales".
 * @description Valida y elimina cadenas sospechosas, validadas por RegEx.
 * @param {Event} e - Evento de entrada (`input`) generado por el usuario.
 * @returns {void} Modifica directamente el valor del input, por lo que no tiene un retorno.
 * @example
 * const input = document.createInput("input");
 * input.type = "text";
 * // ¡AVISO! Es ideal que el oyente se asigne al evento tipo "input".
 * input.addEventListener("input", handleString);
 * document.querySelector(".form").appendChild(input);
 */
export default function handleString (e) {
    const regex = /(--|;|\sOR\s|\sAND\s|<script>|<\/script>|onerror=|onclick=|["'])|[\u0000-\u001F]/gi;
    e.target.value = e.target.value.replace(regex, '');
}