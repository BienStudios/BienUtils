/**
 * Manipulador para números decimales.
 * @description Limpia entradas de usuario para acpetar únicamente valores numéricos
 * con un separador decimal.
 * @param {Event} e - Evento que dispara la entrada de usuario.
 */
export default function handleDecimal(e) {
    const input = e.target;
    const raw = input.value;
    const sanitized = raw.replace(/[^0-9.]/g, '');
    if (sanitized !== raw) {
        input.value = sanitized;
    }
}