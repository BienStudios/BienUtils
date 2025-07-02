/**
 * @class SubDomainRouter
 * @classdesc Inicia el proceso de enrutamiento de tu página web. Principalmente orientado
 * a Single Page Applications, permite el comportamiento de enrutado entre tus páginas.
 *
 * @typedef {Object} Config
 * @property {URL|string} baseURL - URL base de tu página web. Evitar el "/" al final del mismo.
 * @property {HTMLDivElement|string} container - Elemento `div` encargado de contener a tu aplicación o
 * la dirección de este en tu servidor. **NO** agregues el "/" inicial ni el ".js".
 * @property {Array<Subdomain>} subdomains - Lista de subdominios.
 *
 * @typedef {Object} Subdomain
 * @property {component|string} component - Función que retorna el componente asociado al subdominio o
 * la dirección para encontrarlo en tu servidor. **NO** agregues el "/" inicial ni el ".js".
 * @property {Array<Route>} routes - Lista de rutas posibles en el subdominio.
 *
 * @typedef {Object} Route
 * @property {string} route - Texto que representa una ruta añadida y permitida. Deberá existir un "route" 404,
 * ya que de no encontrar algún otro elemento, se cargará este por default.
 * @property {component|string} component - Componente propio de la ruta, llamémosle "vista". Debe ser una función
 * que retorne el elemento para asignar dentro del componente del subdominio, o una ruta que lleve al módulo de la
 * función. **NO** agregues el "/" inicial ni el ".js".
 */
class SubdomainRouter {
    #subdomain;
    #settings;
    #ready = false;

    /**
     * Inicia los parámetros de la clase.
     * @param {string|URL|Config} config - Recibe una configuración inicial. Puede ser un Objeto JS, una URL
     * que dirija hacia un "`.properties`", o una cadena de texto que represente esa URL.
     */
    async init(config) {
        this.#settings = await this.#loadConfig(config);
        this.#ready = true;
    }

    async navigate(input, state = {}) {
        if (!this.#ready) throw new Error(`El router aún no está cargado. Asegúrate de manejar bien los eventos asíncronos.`);
        const spinner = document.createElement("div");
        spinner.classList.add("spinner");
        if (!(typeof input === "string" || input instanceof URL) || typeof state !== "object") throw new Error(`Asegúrate que "input" sea una cadena de texto o una URL y "state" un objeto.`);
        if (typeof input === "string") {
            if (input.startsWith("/")) {
                input = new URL(`${location.protocol}//${location.hostname}/${input}`);
            } else if (input.startsWith("http")) {
                input = new URL(input);
            } else throw new Error(`El input no es una cadena válida. Debes pasarlo en el formato de una URL o un "path" (ruta).`);
        }
        const { subdomain, path } = this.#domainSplit(input);
        if (this.#subdomain && this.#subdomain !== subdomain) location.href = input;
        this.#subdomain = subdomain;
        console.group(`Navegación bajo el subdominio "${subdomain}", hacia "${path}", iniciada...`);
        const subdomainConfig = this.#settings.subdomains.find(s => s.subdomain === subdomain);
        if (!subdomainConfig) {
            console.warn("No hay elemento, cargando path \"404\" y su componente");
            await this.navigate("/404", state);
        }
        console.log("Buscando y asignando recursos al DOM...");
        await this.#loadContainer(subdomainConfig, spinner, path);
        console.log("Guardando en el historial...");
        history.pushState(state, "", `/${path}`);
        console.log("¡Finalizado con éxito!");
        console.groupEnd();
    }
    #domainSplit(input) {
        const domainParts = (this.#settings.baseURL instanceof URL) ? this.#settings.baseURL.hostname.split(".") : new URL(this.#settings.baseURL).hostname.split(".");
        let subdomain, path;
        const inputParts = input.hostname.split(".");
        subdomain = (inputParts.length > domainParts.length) ? inputParts.slice(0, inputParts.length - domainParts.length).join(".") : "@";
        path = input.pathname.replace(/^\/+/, "");
        return { subdomain, path };
    }
    async #loadContainer(config, spinner, path) {
        if (typeof this.#settings.container === "string") {
            this.#settings.container = document.querySelector(`#${this.#settings.container}`);
            if (!this.#settings.container) throw new Error(`No se encontró el contenedor "${this.#settings.container}" en el DOM.`);
        }
        this.#settings.container.innerHTML = "";
        this.#settings.container.appendChild(spinner);
        if (typeof config.component.default === "function") {
            this.#settings.container.innerHTML = "";
            this.#settings.container.appendChild(await config.component.default());
        } else if (typeof config.component === "string") {
            const component = await import(`${this.#settings.baseURL}/${config.component}.js`);
            if (!component) throw new Error(`No se encontró el componente de vista.`);
            this.#settings.container.innerHTML = "";
            this.#settings.container.appendChild(await component.default());
            const view = config.routes.find(r => r.route === path) ?? config.routes.find(r => r.route === "404");
            if (!view) throw new Error(`No se encontró la vista asociada al path ni un 404`);
            const viewComponent = (typeof view.component.default === "function" && typeof view.component !== "string") ? view.component : await import(`${this.#settings.baseURL}/${view.component}.js`);
            this.#settings.container.lastChild.appendChild(await viewComponent.default());
        }
    }

    // Interpretadores de los datos para el router.
    async #loadConfig(config) {
        if (typeof config === "object" && !config instanceof URL) return config;
        else if (typeof config === "string" || config instanceof URL) {
            const rs = await fetch(config);
            if (!rs.ok) throw new Error(`No pudimos acceder al archivo ".properties". Revisa que la dirección que nos proporcionas es correcta.`);
            const text = await rs.text();
            return this.#parseProperties(text);
        }
        else throw new Error(`Asegúrate que "config" sea un objeto o una URL hacia su ubicación.`);
    }
    #parseProperties(text) {
        const lines = text.split(/\r?\n/).filter(line => line.trim() && !line.trim().startsWith("#"));
        const obj = { subdomains: [] };
        const tempSubs = {};
        for (let line of lines) {
            let [key, value] = line.split('=');
            if (!key || !value) continue;
            key = key.trim();
            value = value.trim();
            if (key === "baseURL" || key === "container") obj[key] = value;
            else {
                const [subdomain, ...rest] = key.split('.');
                if (!tempSubs[subdomain]) tempSubs[subdomain] = { subdomain, routes: [] };
                if (rest[0] === "component" && rest.length === 1) tempSubs[subdomain].component = value;
                if (rest[0] === "routes") {
                    const routeId = rest[1];
                    if (!tempSubs[subdomain]._routes) tempSubs[subdomain]._routes = {};
                    if (!tempSubs[subdomain]._routes[routeId]) tempSubs[subdomain]._routes[routeId] = {};
                    const field = rest[2];
                    tempSubs[subdomain]._routes[routeId][field] = value;
                }
            }
        }
        for (const sub of Object.values(tempSubs)) {
            if(sub._routes) {
                sub.routes = Object.values(sub._routes);
                delete sub._routes;
            }
            obj.subdomains.push(sub);
        }
        return obj;
    }


    /**
    ¿Necesitas saber en qué subdominio te encuentras? Invoca este método.
    @description Si no hay un subdominio, lo devolverá como un "@".
    @returns {string} - Devuelve el subdominio bajo el que estás navegando.
    */
    getSubdomain() {
        return this.#subdomain;
    }

    /**
     * Método de análisis de iniciación.
     * @returns {boolean} - Obtiene el estado de iniciado el router. `true` cuando se inicie correctamente.
     */
    getReady() {
        return this.#ready;
    }
}

export default async function loadSubdomainRouter(config) {
    let router;
    try {
        router = new SubdomainRouter();
        await router.init(config);
        await router.navigate(new URL(`${location.protocol}//${location.hostname}/${location.pathname}`), { ready: true });
        window.addEventListener("popstate", async function() {
            await router.navigate(new URL(`${location.protocol}//${location.hostname}/${location.pathname}`), { ready: true });
        });
    } catch (e) {
        throw new Error(`Algo inesperado sucedió iniciando el Router: ${e}`);
    }
    return router;
}