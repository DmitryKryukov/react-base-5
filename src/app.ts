import './styles.scss';
import { VNodeRenderer } from "./scripts/VNodeRenderer";

class App {
    private vNodeRenderer: VNodeRenderer;

    constructor() {
        this.vNodeRenderer = new VNodeRenderer();
        this.vNodeRenderer.renderComponentsFromJSON("./assets/component.json", document.querySelector("#app"));
    }
}

const app = new App();
export { App };