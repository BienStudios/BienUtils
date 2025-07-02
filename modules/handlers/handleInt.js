/**
 * Manipulador de valor para números enteros.
 * @param {Event} e - Evento disparado por el usuario al modificar el input.
 * @returns {void} - Manipula directamente el valor final. No retorna nada.
 */
export default function handleInt(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
}