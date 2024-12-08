import './styles.scss';
import { VNodeRenderer } from "./scripts/VNodeRenderer";

class App {
    private vDOMRenderer: VNodeRenderer;

    constructor() {
        this.vDOMRenderer = new VNodeRenderer();
        this.vDOMRenderer.renderComponentsFromJSON("./assets/component.json", document.querySelector("#app"));
    }
}

const app = new App();
export { App };