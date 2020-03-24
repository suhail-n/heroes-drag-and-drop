var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Bind } from '../decorators/bind.js';
import { validator } from '../utils/validate.js';
import { heroState } from '../state/hero.js';
import { HeroSide } from '../model/hero.js';
import { Component } from './base.js';
export class HeroForm extends Component {
    constructor() {
        super("hero-input", "app", true);
        this.heroNameEl = this.element.querySelector("#hero-name");
        this.descriptionEl = this.element.querySelector("#description");
        this.onInit();
    }
    onInit() {
        this.centerElement();
        this.element.addEventListener('submit', this.onSubmitHandler);
    }
    render() { }
    getInputs() {
        const heroName = this.heroNameEl.value;
        if (!validator({ value: heroName, minLength: 3, maxLength: 20 })) {
            alert("Hero name must be greater than 3 and less than 20 charaters");
            return;
        }
        const description = this.descriptionEl.value;
        if (!validator({ value: description, minLength: 5, maxLength: 100 })) {
            alert("Hero Description must be greater than 5 and less than 100 charaters");
            return;
        }
        return { name: heroName, description: description };
    }
    clearInputs() {
        this.heroNameEl.value = "";
        this.descriptionEl.value = "";
    }
    onSubmitHandler(event) {
        event.preventDefault();
        const hero = this.getInputs();
        if (!hero) {
            return;
        }
        this.clearInputs();
        heroState.addHeroe(hero.name, hero.description, HeroSide.LIGHT);
    }
    centerElement() {
        const center = document.createElement("center");
        this.element.parentElement.insertBefore(center, this.element);
        center.appendChild(this.element);
    }
}
__decorate([
    Bind
], HeroForm.prototype, "onSubmitHandler", null);
//# sourceMappingURL=hero-form.js.map