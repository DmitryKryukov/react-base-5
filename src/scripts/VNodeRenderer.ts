type VNode = {
    tag: string;
    attrs?: Record<string, string>;
    children?: (VNode | string)[];
};

interface IVNodeRenderer {
    renderComponentsFromJSON(url: string, container: HTMLElement): Promise<void>;
};

class VNodeRenderer  implements IVNodeRenderer {
    public async renderComponentsFromJSON(url: string, container: HTMLElement): Promise<void> {
        const data = await this.fetchData(url);
        const element = this.createElement(data);
        container.appendChild(element);
    }

    private createElement(vnode: VNode | string): Node {
        return typeof vnode === 'string'
            ? document.createTextNode(vnode)
            : this.createHTMLElement(vnode);
    }

    private createHTMLElement(vnode: VNode): HTMLElement {
        const element = document.createElement(vnode.tag);
        this.setAttributes(element, vnode.attrs);
        this.appendChildren(element, vnode.children);
        return element;
    }

    private setAttributes(element: HTMLElement, attrs: Record<string, string> = {}): void {
        Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
    }

    private appendChildren(element: HTMLElement, children?: (VNode | string)[]): void {
        if (!children) return;
        children.forEach(child => {
            element.appendChild(this.createElement(child));
        });
    }

    private async fetchData(url: string): Promise<any> {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Ошибка ХТТП. Статус: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Ошибка получения данных:', error);
            throw error;
        }
    }

    private getMainWrapperElement(mainWrapper: HTMLElement | string): HTMLElement {
        if (typeof mainWrapper === 'string') {
            const element = document.querySelector(mainWrapper);
            if (!(element instanceof HTMLElement)) {
                throw new Error("Не смогли получить mainWrapperElement");
            }
            return element;
        }
        return mainWrapper;
    }
}

export { VNode, VNodeRenderer };