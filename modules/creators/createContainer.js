/**
 * Creador de contenedor. Crea un HTMLDivElement con la clase "container"
 * (<div class="container"></div>). Opcionalmente, puedes añadir más clases incluyendo
 * una Lista de cadenas de texto (Array<string>) con las clases que quieres añadir.
 * @param {Array<string>|string|null} classes - Lista de clases o clase extra para añadirle al contenedor.
 * @param {string} id - ID asignable al contenedor. Puede ser omitido.
 * @returns {HTMLDivElement} Devuelve el contenedor con sus clases ya asignadas. Listo
 * para incluirlo al DOM y/o agregarle contenido.
 * @example
 * let createContainer;
 * try {
 *     createContainer = await BienUtils.importer("createContainer");
 * } catch (e) {
 *     createContainer = null;
 *     console.log(`Un mensaje de captura de error... Error: ${e}`);
 * }
 * const classes = [
 *     "of-hidden",
 *     "csr-pointer"
 * ];
 * if (!createContainer) {
 *     return;
 * }
 * const container = createContainer.default(classes);
 * // Esto creará y retornará un HTMLDivElement con las clases "container", "of-hidden" y
 * // "csr-pointer" (<div class="container of-hidden csr-pointer"><div>);
 *
 * Si importas manualmente el repositorio, puedes usarlo con el nombre que tú elijas, sin
 * necesidad de "default();"
 */
export default function createContainer(classes = null, id = null) {
    if (!(classes === null || Array.isArray(classes) || typeof classes === "string")) throw new Error(`Puedes pasar una Lista de clases o una en particular para añadirle al contenedor.`);
    if (!(id === null || typeof id === "string")) throw new Error(`Puedes añadirle un ID al contenedor, pero debe ser una cadena de texto.`);
    const container = document.createElement("div");
    container.classList.add("container");
    if (id) container.id = id;
    if (typeof classes === "string") container.classList.add(classes);
    if (Array.isArray(classes) && classes.length > 0) {
        classes.forEach(c => {
            container.classList.add(c);
        });
    }
    return container;
}