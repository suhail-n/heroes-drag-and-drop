import { Bind } from '../decorators/bind.js';
import { validator } from '../utils/validate.js';
import { heroeState } from '../state/heroe.js';
import { HeroeSide } from '../model/heroe.js';
import { Component } from './base.js';


export class HeroeForm extends Component<HTMLDivElement, HTMLFormElement>{
    
    // private hostEl: HTMLDivElement;
    // private templateEl: HTMLTemplateElement;
    // private element: HTMLFormElement;
    private heroeNameEl: HTMLInputElement;
    private descriptionEl: HTMLTextAreaElement;

    constructor() {
        super("heroe-input", "app", true);
        
        // get input elements
        this.heroeNameEl = <HTMLInputElement>this.element.querySelector("#heroe-name");
        this.descriptionEl = <HTMLTextAreaElement>this.element.querySelector("#description");
        
        // execute init
        this.onInit()
    }

    onInit() {
        this.centerElement();
        this.element.addEventListener('submit', this.onSubmitHandler);
    }

    render () {}

    /**
     * get form inputs and validate
     */
    getInputs(): {name: string, description: string} |  void{
        const heroeName: string = this.heroeNameEl.value;
        if(!validator({value: heroeName, minLength: 3, maxLength: 20})) {
            alert("Heroe name must be greater than 3 and less than 20 charaters");
            return
        }
        const description: string = this.descriptionEl.value;
        if(!validator({value: description, minLength: 5, maxLength: 100})) {
            alert("Heroe Description must be greater than 5 and less than 100 charaters");
            return
        }
        
        return {name: heroeName, description: description}
    }

    clearInputs() {
        this.heroeNameEl.value = "";
        this.descriptionEl.value = "";
    }

    @Bind
    private onSubmitHandler(event: Event) {
        event.preventDefault()
        const heroe = this.getInputs();
        if(!heroe) {
            return;
        }
        this.clearInputs();
        heroeState.addHeroe(heroe.name, heroe.description, HeroeSide.LIGHT);
    }

    private centerElement() {
        const center = document.createElement("center");
        this.element.parentElement!.insertBefore(center, this.element);
        center.appendChild(this.element);
    }
}