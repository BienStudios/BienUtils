/**
 * Recibe un contenedor de elementos con clase "option__selectable". Cuando se haga click en un
 * elemento con dicha clase, se limpiará la clase "select" de todos los elementos que la contengan,
 * y se la asignará al que haya disparado el evento dentro del contenedor.
 * @param {HTMLDivElement} container - Elemento contenedor de las opciones a las que se les quiere
 * hacer "seleccionables".
 * @throws {Error} Lanzará error si no pasas un `HTMLDivElement` como parámetro.
 * @returns {void} Como el cambio lo aplica directamente, no retornará nada.
 */
export default function fillSelectableGroup(container) {
    if (!container instanceof HTMLDivElement) throw new Error(`El contenedor que pases como argumento, debe ser un HTMLDivElement.`);
    container.addEventListener("click", function(e) {
        const clicked = e.target.closest(".option__selectable");
        if (!clicked) return;
        Array.from(e.target.children).forEach(c => c.classList.remove("selected"));
        clicked.classList.add("selected");
    });
}