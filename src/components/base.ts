export abstract class Component<H extends HTMLElement, E extends HTMLElement> {
    
    protected templateEl: HTMLTemplateElement;
    protected hostEl: H;
    protected element: E;

    constructor(templateId: string, hostId: string, insertBeginning: boolean, newElementId?: string) {
        // get the template element
        this.templateEl = <HTMLTemplateElement>document.getElementById(templateId)!;
        this.hostEl = <H> document.getElementById(hostId)!;

        // import node from template element
        const importedNode = document.importNode(this.templateEl.content, true)!;
        this.element = <E>importedNode.firstElementChild;
        this.importTemplate(insertBeginning);
        
        // add new element id
        if(newElementId){
            this.element.id = newElementId;
        } 
    }
    
    // import template into the host element
    private importTemplate(insertBeginning: boolean) {
        if(insertBeginning) {
            this.hostEl.insertAdjacentElement('afterbegin', this.element);
        } else {
            this.hostEl.insertAdjacentElement('beforeend', this.element)
        }
    }

    protected abstract onInit(): void;
    protected abstract render(): void;
}

