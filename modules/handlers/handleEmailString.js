import handleString from "./handleString.js";

/**
 * Manipulador "en vivo" de la entrada de texto. Limpia entradas "raras" y valida
 * un formato correcto de correo electrónico.
 * @description Mientras el input tenga un valor inválido, se agregará la clase
 * "invalid-email" al input, por lo que podrás rastrearlo antes de validar por backend.
 * La removerá cuando el valor sea válido.
 * @param {Event} e - Evento desencadenado por el input del Usuario.
 * @returns {void} Modifica directamente el valor de entrada. No devuelve nada.
 * @example
 * const input = document.createElement("input");
 * input.type = "email";
 * // ¡AVISO! Es ideal que el oyente se asigne al evento tipo "input".
 * input.addEventListener("input", handleEmailString);
 * document.querySelector(".form").appendChild(input);
 */
export default function handleEmailString(e) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(e.target.value)) {
        e.target.classList.add("invalid-value");
    } else {
        e.target.classList.remove("invalid-value");
    }
    handleString(e);
}