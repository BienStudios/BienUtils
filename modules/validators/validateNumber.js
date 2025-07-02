import helperSentinel from "./../helpers/helperSentinel.js";

/**
 * Valida una entrada de texto, reemplazando el texto original por un texto
 * sanitizado, permitiendo únicamente números y puntos (`.`);
 * @description - Recibe el evento de una entrada de usuario (`input`), lo
 * valida mediante nuestra API y lo codifica a un valor inofensivo para un
 * backend o base de datos. Por defecto, los transforma en HTML Entity. En caso
 * de encontrar alguna anomalía o intento de hostilidad, asignará un data-value
 * "hostil", por lo que podrás manejar el evento.
 * @param {Event} e - Evento provocado al intentar enviar el formulario.
 * @returns {void} - Transforma directamente el valor, sin devolver nada.
 * @example
 * input.addEventListener("blur", validateNumber);
 * // Para `keydown`, sólo se activará con la tecla "Enter"
 * input.addEventListener("keydown", validateNumber);
 */
export default async function validateNumber(e) {
    if (e.type === "keydown") {
        if (e.key !== "Enter") return;
    }
    let rs;
    try {
        rs = await helperSentinel(e.target.value, "numeric+dot", "HTML");
    } catch (e) {
        throw new Error(`No se pudo sanitizar el valor: ${e}`);
    }
    if (rs) {
        if (rs.hostility) {
            e.target.dataset.value = "hostil";
        }
    }
}