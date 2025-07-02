/**
 * @typedef {Object} Help
 * @property {string} title - Título del centro de ayuda.
 * @property {Array<Description>} content - Contenido del centro de ayuda, cada elemento debe
 * @property {string} footer - Pie de página del centro de ayuda.
 * @description Objeto que representa el centro de ayuda de BienUtils, que contiene
 * información útil para los usuarios sobre cómo utilizar la biblioteca y sus módulos.

 * @typedef {Object} Description
 * @property {string} name - Nombre de la sección o tema.
 * @property {Array<string>|string} description - Lista de descripciones o descripción simple sobre el tema.
 * @property {string|null} example - Ejemplo de uso del tema (opcional).
 * @description Este objeto representa el centro de ayuda de BienUtils, que contiene
 * información útil para los usuarios sobre cómo utilizar la biblioteca y sus módulos.
 */
const Help = {
    title: "Centro de ayuda - BienUtils",
    content: [],
    footer: "¡Gracias por ser parte de nosotros! BienStudios Develops."
};

const createCompoundInput = {
    name: "createCompoundInput",
    description: [
        "Crea y retorna un HTMLDivElement, el cual incluye las clases \"container\", \"grid-rows-2\" y \"cursor-pointer\". Dentro, contendrá un label definido por el usuario más la clase \"label\", y un contenedor, también HTMLDivElement, el cual, a su vez, contendrá un HTMLParagraphElement con la clase \"input__placeholder\", que bajo el evento click (aplicado al contenedor principal), lo cambiará por el input asignado por el usuario, al cual se añadirá la clase \"input\". Ambos elementos, tanto \"input\" como \"label\", pueden ser objetos como Elementos HTML.",
        "Primer parámetro -input-: Si se pasa como objeto, entre sus propiedades deberá tener \"id\" (para ser referenciado), \"name\" (para obtener una clave donde guardarás su valor), \"value\" (Para que tenga un valor por defecto. También se agregará al HTMLParagraphElement), y opcionalmente, podrás añadirle \"pattern\" (para que sea revisado por el navegador antes de pasar al servidor), \"title\" (para mostrar al usuario un mensaje si el pattern impide avanzar), \"placeholder\" (para añadir una guía mientras el input no tenga valor. Puedes ejemplificar el cómo esperas que se ingrese el valor), recomendablemente \"handler\" (función asociada al input. Lo ideal es que se agregue para el evento \"blur\", y guarde el valor del input en alguna variable para luego ser sanitizada y almacenada), y \"type\" (Definirá el tipo de input. Si no se asigna, se tomará como type=\"text\").",
        "Segundo parámetro -label-: Si se pasa como objeto, debe tener las propiedades \"text\" (para ser usado como texto del HTMLLabelElement), y opcionalmente \"for\" (para referenciar al HTMLInputElement con el mismo ID). En cambio, se puede pasar como HTMLLabelElement directamente, y conservará las propiedades que le asignes.",
        "Tercer parámetro -prefix-: (Opcional) Se añadirá como \"data-prefix\" al contenedor del input. Podrás hacerlo visual en el DOM mediante CSS.",
        "Cuarto parámetro -suffix-: (Opcional) Se añadira como \"data-suffix\" al contenedor del input. También, podrás manipular su estilo con CSS."
    ]
};
Help.content.push(createCompoundInput);

const createContainer = {
    name: "createContainer",
    description: [
        "Crea y retorna un HTMLDivElement, el cual te servirá para añadir contenido de forma dinámica a tu aplicación.",
        "Este método incluirá la clase \"container\" por defecto, pero puedes añadirle más clases o estilos según tus necesidades. Para ello, puedes pasar como argumento un array de clases (como strings) y se añadirán a la clase del elemento.",
        "Ideal para ahorrar un par de líneas en tu código y evitar errores al crear contenedores de forma manual.",
    ]
};
Help.content.push(createContainer);

const createInput = {
    name: "createInput",
    description: [
        "Creará o añadirá un HTMLInputElement a un HTMLDivElement con la clase container.",
        "El input podrá ser recibido como objeto o como HTMLInputElement, tal como en createCompoundInput."
    ]
};
Help.content.push(createInput);

const fillSelectableGroup = {
    name: "fillSelectableGroup",
    description: [
        "Función simple: añade un oyente para hacer seleccionable un grupo de elementos dentro de un contenedor.",
        "¡Atención! Los elementos seleccionables, deben contener la clase \"option__selectable\"",
        "Parámetro -container-: HTMLDivElement al cual se le quiere aplicar el oyente."
    ]
};
Help.content.push(fillSelectableGroup);

const handleAlphaNumeric = {
    name: "handleAlphaNumeric",
    description: [
        "Manipula el valor de una entrada de usuario.",
        "Permite únicamente letras del abecedario SIN acentuación, y números.",
        "Útil en el caso de validación de tokens o códigos de validación simples."
    ]
};
Help.content.push(handleAlphaNumeric);

const handleDecimal = {
    name: "handleDecimal",
    description: "Manipulará el valor de un input, para admitir sólo un punto decimal y números."
};
Help.content.push(handleDecimal);

const handleEmailString = {
    name: "handleEmailString",
    description: [
        "Manipulará el valor de un input, para verificar que este tenga el formato correcto de un correo electrónico. Añadirá la clase \"invalid-value\" mientras el elemento no cumpla el formato requerido"
    ]
};
Help.content.push(handleEmailString);

const handleInt = {
    name: "handleInt",
    description: "Manipulará el valor de un input, para verificar que este corresponda a un número entero (sin signo)."
};
Help.content.push(handleInt);

const handleString = {
    name: "handleString",
    description: "Manipulará el valor de un input, para no permitir entradas \"sospechosas\"."
};
Help.content.push(handleString);

const handleTel = {
    name: "handleTel",
    description: "Manipulará el valor de un input, para validar el formato normal de un número de celular o teléfono."
};
Help.content.push(handleTel);

const helperSentinel = {
    name: "helperSentinel",
    description: [
        "Solicitará validación y limpieza a nuestra API y cambiará el valor del input por el valor limpio que retorne.",
        "Primer parámetro -input-: valor del input el cual se quiere limpiar.",
        "Segundo parámetro -profile-: perfil de limpieza del texto. \"alnum\" para conservar únicamente letras (sin acentuación) y números, \"numeric+dot\" para conservar números y punto como separador decimal, y \"any\" para conservar toda la cadena",
        "Tercer parámetro -encoding-: Los carateres se reemplazarán por la codificación que aquí definas. \"HTML\" convertirá los símbolos en entidades HTML, \"UNICODE\" los convertirá en códigos Unicode, y \"ASCII\" los codificará a códigos ASCII",
        "Devolverá un Objeto Sentinel. Puedes chequear su contenido en <https://github.com/LocoBrianGG/BienUtilsSentinel>"
    ]
};
Help.content.push(helperSentinel);

const helperSubdomainRouter = {
    name: "helperSubdomainRouter",
    description: "Muy similar a helperRouter, pero con una configuración \"más avanzada\". Podrás manejar subdominios de tu página. Para página sin subdominio, apúntalo hacia \"@\". Es aconsejable añadir un \"404\" por cada subdominio. Y llámalo así en \"route\", ya que ahí apuntará Router si no encuentra la vista que buscas. Si no encuentra \"404\", terminará arrojando error."
};
Help.content.push(helperSubdomainRouter);

const validateAlphaNumeric = {
    name: "validateAlphaNumeric",
    description: "Apoyándose de \"helperSentinel\", limpia una cadena manteniendo sólo números y letras (sin tildes ni acentuación)."
};
Help.content.push(validateAlphaNumeric);

const validateNumber = {
    name: "validateNumber",
    description: "Se apoya en nuestra API para limpiar y conservar únicamente números y puntos decimales"
};
Help.content.push(validateNumber);

const validateString = {
    name: "validateString",
    description: "Confirma y limpia con nuestra API una cadena de texto. Devolverá los símbolos codificados a Entidades HTML."
};
Help.content.push(validateString);
export default Help;