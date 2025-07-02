import createContainer from "./createContainer.js";
import createInput from "./createInput.js";

/**
 * Crea un input compuesto, el cual puede recibir los mismos parámetros que `createInput()`,
 * y un `label`, el cual será asignado para referenciar al mismo.
 * @description Devolverá un contenedor principal con 2 elementos, un `HTMLLabelElement`, y un
 * nuevo contenedor, el cual, en su interior, anidará un `HTMLParagraphElement`, que al ser
 * cliqueado, lo reemplazará por un `HTMLInputElement` para modificar su valor. Al hacer `"blur"`,
 * volverá a ser reemplazado por el `HTMLParagraphElement`.
 *
 * **¡NOTA!** En este caso, es **MUY** recomendable asignar un manipulador al `input`, por lo
 * menos para el evento `"blur"`, ya que si quieres guardar datos, recuerda que el elemento
 * `HTMLInputElement` será borrado en cada `"blur"`.
 * @param {import("./createInput").Input|HTMLInputElement} input - Entrada de usuario (`input`)
 * la cual se quiere englobar.
 * @param {Label|HTMLLabelElement} label - Etiqueta para el input. Le dirá al usuario qué esperas
 * que él introduzca en el campo.
 * @param {string|null} [type="text"] - Añade un tipo al creador básico de inputs.
 * @param {string|null} [prefix=null] - Añade un data-prefix al contenedor de `input`.
 * @param {string|null} [suffix=null] - Añade un data-suffix al contenedor de `input`.
 * @throws {Error} - En determinados casos, lanzará error. Asegúrate de imprimirlos correctamente
 * para gestionar la correcta ejecución de la función.
 * @returns {HTMLDivElement} - Devuelve un contenedor, con las clases "container"; "grid-columns-2",
 * lo que te permitirá definir un modificador para esa clase (idea: que se aplique `display: grid;`
 * y `grid-template-columns: repeat(2, 1fr);`); y "cursor-pointer", para que crees un modificador que
 * permita asignar `cursor: pointer;` al elemento. Dentro, contendrá el `label` asignador y un contenedor,
 * el cuál contendrá la clase "container" y un elemento de texto y el `input`. El contenedor principal
 * tendrá asignado un oyente para intercambiar entre ambos elementos.
 *
 * @typedef {Object} Label
 * @property {string} text - Texto que contendrá el label. Guiará al usuario para saber qué esperas
 * que el escriba.
 * @property {string} for - Indica a que ID apunta. Debe sel el mismo ID que tenga el input al que quieres
 * que haga referencia.
 */
export default function createCompoundInput(input, label, type = "text", prefix = null, suffix = null) {
    if (
        !(typeof input === "object" || input instanceof HTMLInputElement)
        || !(typeof label === "object" || label instanceof HTMLLabelElement)
    ) throw new Error(`La función debe recibir un elemento correcto de HTMLInputElement para "input" y HTMLLabelElement para "label". Opcionalmente, puede recibir un objeto para cada parámetro con las características del mismo.`);
    if (!input.value?.trim()) throw new Error(`El input debe tener un valor por defecto para que esta característica sea correctamente usada. Si no, el cuadro de texto que reemplazará al input, no contendrá nada.`);
    let clabel;
    let cinput;
    const container = createContainer(["grid-columns-2", "cursor-pointer"]);
    const inputContainer = createInput(input, type, prefix, suffix);
    container.appendChild(inputContainer);
    console.log("Hasta acá, bien");
    cinput = inputContainer.firstElementChild;
    inputContainer.removeChild(cinput);
    const inputText = document.createElement("p");
    inputContainer.appendChild(inputText);
    inputText.classList.add("input__placeholder");
    inputText.textContent = input.value;
    if (label instanceof HTMLLabelElement) clabel = label;
    if (typeof label === "object") {
        clabel = document.createElement("label");
        if (!label.text?.trim()) throw new Error(`Debes añadir un texto para agregar en la etiqueta. Añade "text" como atributo del objeto.`);
        clabel.textContent = label.text;
        if (label.id?.trim()) clabel.id = label.id.trim();
        if (label.for?.trim()) clabel.setAttribute("for", label.for.trim());
    }
    container.insertBefore(clabel, inputContainer);
    clabel.classList.add("label");
    if (!clabel.hasAttribute("for") && input.name?.trim()) clabel.setAttribute("for", input.name);
    if (!clabel.hasAttribute("for")) console.warn('Por buenas prácticas, no es bueno que tu label no incluya un "for".');
    container.addEventListener("click", function(e) {
        if (e.target.firstElementChild instanceof HTMLParagraphElement) {
            const p = e.target.firstElementChild;
            e.target.replaceChild(cinput, p);
            cinput.focus();
            cinput.addEventListener("blur", function () {
                e.target.replaceChild(p, cinput);
            });
        }
    });
    return container;
}