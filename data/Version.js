/**
 * @typedef {Object} Version
 * @property {number} version - La versión actual.
 * @property {Content} content - El contenido de la versión.
 * @property {Next} next - Elementos que se están desarrollando para la siguiente versión.
 * @description Provee la versión actual, su contenido y el próximo.

 * @typedef {Object} Content
 * @property {Array<string>} creators - Funciones para crear elementos.
 * @property {Array<string>} fillers - Funciones para rellenar elementos.
 * @property {Array<string>} handlers - Funciones para manejar eventos.
 * @property {Array<string>} helpers - Funciones de ayuda.
 * @property {Array<string>} validators - Funciones de validación.
 * @description Contiene las funciones de utilidad que tiene la versión actual.

 * @typedef {Object} Next
 * @property {Array<string>} creators - Funciones para crear elementos.
 * @property {Array<string>} fillers - Funciones para rellenar elementos.
 * @property {Array<string>} handlers - Funciones para manejar eventos.
 * @property {Array<string>} helpers - Funciones de ayuda.
 * @property {Array<string>} validators - Funciones de validación.
 * @description Contiene los elementos que se están desarrollando para la siguiente versión.
 */
const Version = {
    version: "1.0",
    content: {
        creators: [
            "createCompoundInput",
            "createContainer",
            "createInput",
        ],
        fillers: [
            "fillSelectableGroup",
        ],
        handlers: [
            "handleAlphaNumeric",
            "handleDecimal",
            "handleEmailString",
            "handleInt",
            "handleString",
            "handleTel"
        ],
        helpers: [
            "helperSentinel",
            "helperSubdomainRouter"
        ],
        validators: [
            "validateAlphaNumeric",
            "validateNumber",
            "validateString"
        ]
    },
    next: {
        creators: [
            "createFieldset",
            "createButton"
        ],
        fillers: [
            "fillContainer"
        ],
        handlers: [],
        helpers: [],
        validators: []
    }
};

export default Version;