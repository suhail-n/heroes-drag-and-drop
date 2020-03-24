export class Component {
    constructor(templateId, hostId, insertBeginning, newElementId) {
        this.templateEl = document.getElementById(templateId);
        this.hostEl = document.getElementById(hostId);
        const importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild;
        this.importTemplate(insertBeginning);
        if (newElementId) {
            this.element.id = newElementId;
        }
    }
    importTemplate(insertBeginning) {
        if (insertBeginning) {
            this.hostEl.insertAdjacentElement('afterbegin', this.element);
        }
        else {
            this.hostEl.insertAdjacentElement('beforeend', this.element);
        }
    }
}
//# sourceMappingURL=base.js.map