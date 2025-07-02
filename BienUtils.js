/**
 * @class BienUtils
 * @classdesc ¡IMPORTANTE! Para usar la aplicación, deber de iniciarla con el
 * método asíncrono "init()".
 * Para una correcta implementación, debes encerrar el "init" dentro
 * de un bloque try/catch o una cadena de promesas then/catch.
 * La clase ya incluye un acceso globalizado (`BienUtils` o `window.BienUtils`),
 * pero puedes importar la instancia de sí misma y llamarla como gustes.
 * @example
 * import app from "{repositorio}/BienUtils.js";
 * try {
 *     await app.init();
 * } catch (e) {
 *     console.error(`No se pudo iniciar "app": ${e}`);
 * }
 * @example
 * BienUtils.init().then(() => {
 *     console.log("BienUtils iniciado con éxito");
 * }).catch(e => {
 *     console.warn(`No se pudo iniciar BienUtils: ${e}`);
 * });
 */
class BienUtils {
    #origin = "http://localhost:8081";
    #Version;
    #Directories;
    #Help;

    /**
     * Inicia la aplicación. Es importante ejecutarla ANTES de realizar
     * cualquier función relacionada a la aplicación.
     * ¡IMPORTANTE! esta función es asíncrona, por lo que deberás manejar
     * correctamente la ejecución de la misma, ya sea dentro de un bloque try/catch,
     * o en una cadena de promesas then/catch.
     * @returns {void} No retornará nada. Importará los módulos estrictamente
     * necesarios para funcionar.
     * @example
     * let continue;
     * try {
     *     await BienUtils.init();
     *     continue = true;
     * } catch (e) {
     *     console.error(`Ocurrió algo inesperado: ${e}`);
     *     continue = false;
     * }
     * @example
     * let continue;
     * BienUtils.init().then(() => {
     *     continue = true;
     * }).catch(e => {
     *     console.error(`Ocurrió algo inesperado: ${e}`);
     *     continue = false;
     * });
     */
    async init() {
        try {
            this.#Directories = (await import(`${this.#origin}/data/Directories.js`)).default;
            this.#Help = (await import(`${this.#origin}/data/Help.js`)).default;
            this.#Version = (await import(`${this.#origin}/data/Version.js`)).default;
        } catch (e) {
            throw new Error(`No fué posible cargar los módulos. Error: ${e}`);
        }
    }

    /**
     * Puedes obtener información sobre la versión actual del paquete.
     * @param {boolean} [print=false] - Define si quieres que se imprima directamente por consola.
     * En caso de `false`, devolverá un string con el contenido.
     * @returns {string|void} Devuelve un texto imprimible por consola o imprime sin devolver nada.
     * @example
     * BienUtils.getVersion(true); // Imprimirá por consola la información de la versión.
     * @example
     * const pre = document.createElement("pre");
     * pre.textContent = BienUtils.getVersion(); // o getVersion(false);
     * // Agregará al body, un HTMLPreElement (<pre></pre>) con lo retornado por la función.
     * document.body.appendChild(pre);
     */
    getVersion(print = false) {
        let data = "Información de la versión:\n\n"
        if (typeof this.#Version.version === "string") {
            data += `Versión actual: ${this.#Version.version}\n\n`;
        }
        if (typeof this.#Version.content === "object" && Object.values(this.#Version.content).length > 0) {
            data += `Se incluye:\n`;
            Object.values(this.#Version.content).forEach(v => {
                if (Array.isArray(v)) {
                    v.forEach(c => data += `\t\u2022 ${c}\n`);
                }
            });
        }
        data += "\n";
        if (typeof this.#Version.next === "object" && Object.values(this.#Version.next).length > 0) {
            data += `Lo próximo en venir:\n`;
            Object.values(this.#Version.next).forEach(v => {
                if (Array.isArray(v)) {
                    v.forEach(c => data += `\t\u2022 ${c}\n`);
                }
            });
        }
        if (typeof print === "boolean" && print) {
            console.log(data);
            return;
        }
        return data;
    }

    /**
     * Provee un listado de módulos con su respectiva función, valores de retorno
     * y ejemplificaciones para que tengas una orientación de cómo y en qué caso
     * usar uno u otro.
     * @param {boolean} [print=false] - Determina si el valor se imprime directo por
     * consola. En caso de `false`, devolverá un string con el contenido.
     * @throws {Error} Si no se puede obtener el archivo (en /data/help.json),
     * se lanzará un error. Recomendable, como siempre, tratarlo dentro de un
     * bloque try/catch o try/catch/finally.
     * @returns {string|void} Obtienes un valor de texto plano, el cual puedes imprimir
     * por consola o puedes asignárselo a un elemento del DOM, preferiblemente <pre> para
     * ver su contenido en un formato editable con CSS.
     * @example
     * BienUtils.getHelp(true); // Imprimirá en consola la información de cada módulo importable.
     * @example
     * const pre = document.createElement("pre");
     * pre.textContent = BienUtils.getHelp(); // o getHelp(false);
     * // Agregará al body un HTMLPreElement (<pre></pre>) con el texto de retorno de la función.
     * document.body.appendChild(pre);
     */
    getHelp(print = false) {
        let data = "";
        if (this.#Help.title && typeof this.#Help.title === "string") {
            data += `${this.#Help.title.toUpperCase()}\n\n`;
        }
        if (Array.isArray(this.#Help.content)) {
            this.#Help.content.forEach(c => {
                data += `${c.name}:\n`;
                const descriptions = Array.isArray(c.description) ? c.description : [c.description];
                descriptions.forEach(d => data += ` - ${d}\n`);
                data += "\n";
            });
        }
        if (this.#Help.footer && typeof this.#Help.footer === "string") {
            data += `\n${this.#Help.footer}`;
        }
        if (typeof print === "boolean" && print) {
            console.log(data);
            return;
        }
        return data;
    }

    /*
    downloadPackage() {
        const link = `${this.#origin}/resources/projects/example.zip`;
        const a = document.createElement("a");
        a.href = link;
        a.download = link.split("/").pop();
        a.click();
    }
    */

    /**
     * Importará el módulo que necesitas para tu proyecto.
     * Esto permite que tu página no necesite cargar una gran cantidad de archivos y contenido,
     * lo que agiliza y reduce significativamente el tráfico de tu página. A largo plazo, es
     * bastante beneficioso.
     * @param {string} module - ¿Qué módulo necesitas para tu aplicación? Si no conoces los
     * módulos que disponemos para tí, te recomendamos hacer: console.log(await BienUtils.getHelp());
     * Nota: Si instancias este módulo en otra parte de tu aplicación con otro nombre, reemplaza
     * "BienUtils" con el nombre que le hayas dado.
     * @throws {Error} Si no se encuentra el módulo especificado, lanzará un error. Sería prudente
     * manejar esta función dentro de un bloque try/catch o una cadena de promesas then/catch.
     * @returns {Promise} - Devolverá la promesa de carga del módulo solicitado.
     * @example
     * let handler;
     * let validator;
     * try {
     *     handler = await BienUtils.importer("handleAlphaNumeric");
     *     validator = await BienUtils.importer("validateAlphaNumeric");
     * } catch (e) {
     *     console.warn(`No fué posible cargar las importaciones. Error: ${e}`);
     * }
     * const input = document.createElement("input");
     * input.type = "text";
     * if (handler) {
     *     input.addEventListener("input", handler);
     * }
     * if (validator) {
     *     input.addEventListener("blur", validator);
     *     input.addEventListener("keydown", validator);
     * }
     * @example
     * const input = document.createElement("input");
     * input.type = "text";
     * BienUtils.importer("handleAlphaNumeric").then(handler => {
     *     input.addEventListener("input", handler.default);
     *     console.log("¡Manipulador alfanumérico añadido con éxito!");
     * }).catch(e => {
     *     console.warn(`No se pudo añadir el manipulador al input. Motivo: ${e}`);
     * });
     * BienUtils.importer("validateAlphaNumeric").then(validator => {
     *     input.addEventListener("blur", validator.default);
     *     input.addEventListener("keydown", validator.default);
     *     console.log("¡Se añadió el validador con éxito!");
     * }).catch(e => {
     *     console.warn(`Hubo un problema cargando el validador: ${e}`);
     * });
     */
    async importer(module) {
        if (typeof module !== "string") {
            throw new Error(`El parámetro debe ser del tipo "cadena de texto" (string)`);
        }
        const keyFound = Object.keys(this.#Directories).find(k => module.startsWith(k));
        if (!keyFound) {
            throw new Error(`No se ha encontrado ninguna llave relacionada a un módulo. Probable falta de ortografía.`);
        }
        const path = `${this.#origin}/modules/${this.#Directories[keyFound]}/${module}.js`;
        console.group(`Importación de ${module}...`);
        try {
            const imported = await import(path);
            console.log(`¡Módulo ${module} importado correctamente!`);
            console.groupEnd();
            return imported.default;
        } catch (e) {
            console.warn(`No se pudo importar ${module} correctamente`)
            console.groupEnd();
            throw new Error(`No se pudo realizar la importación del módulo solicitado. Error: ${e}`);
        }
    }
}

/**
 * @global
 * @type {BienUtils}
 * @description Instancia de BienUtils, la cual se exporta como default. Una vez importada,
 * puedes utilizarla directamente sin necesidad de crear una nueva instancia.
 * @example
 * BienUtils.init().then(() => {
 *     console.log("BienUtils iniciado correctamente");
 * }).catch(e => {
 *     console.warn(`Algo no salió según lo esperado: ${e}`);
 * });
 * @example
 * import app from "https://{repositorio}/BienUtils.js";
 * try {
 *     await app.init();
 *     console.log("app iniciada correctamente");
 * } catch (e) {
 *     console.warn(`Algo no salió según lo esperado: ${e}`);
 * }
*/
const instance = new BienUtils();
window.BienUtils = instance;
export default instance;