export class Preloading {
    constructor(dom) {
        this.visible = dom.visible;
    }

    load(node) {
        node.firstElementChild.classList.toggle(this.visible);
    }
}
