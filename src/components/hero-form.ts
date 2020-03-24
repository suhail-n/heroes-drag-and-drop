import { Bind } from '../decorators/bind.js';
import { validator } from '../utils/validate.js';
import { heroState } from '../state/hero.js';
import { HeroSide } from '../model/hero.js';
import { Component } from './base.js';


export class HeroForm extends Component<HTMLDivElement, HTMLFormElement>{
    
    private heroNameEl: HTMLInputElement;
    private descriptionEl: HTMLTextAreaElement;

    constructor() {
        super("hero-input", "app", true);
        
        // get input elements
        this.heroNameEl = <HTMLInputElement>this.element.querySelector("#hero-name");
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
        const heroName: string = this.heroNameEl.value;
        if(!validator({value: heroName, minLength: 3, maxLength: 20})) {
            alert("Hero name must be greater than 3 and less than 20 charaters");
            return
        }
        const description: string = this.descriptionEl.value;
        if(!validator({value: description, minLength: 5, maxLength: 100})) {
            alert("Hero Description must be greater than 5 and less than 100 charaters");
            return
        }
        
        return {name: heroName, description: description}
    }

    clearInputs() {
        this.heroNameEl.value = "";
        this.descriptionEl.value = "";
    }

    @Bind
    private onSubmitHandler(event: Event) {
        event.preventDefault()
        const hero = this.getInputs();
        if(!hero) {
            return;
        }
        this.clearInputs();
        heroState.addHeroe(hero.name, hero.description, HeroSide.LIGHT);
    }

    private centerElement() {
        const center = document.createElement("center");
        this.element.parentElement!.insertBefore(center, this.element);
        center.appendChild(this.element);
    }
}