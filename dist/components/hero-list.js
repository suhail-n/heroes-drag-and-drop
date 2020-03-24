var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { heroState } from '../state/hero.js';
import { SingleHero } from './hero-single.js';
import { HeroSide } from '../model/hero.js';
import { Component } from './base.js';
import { Bind } from '../decorators/bind.js';
export class HeroList extends Component {
    constructor(name) {
        super("hero-list", "app", false, name);
        this.name = name;
        this.ulElement = this.element.querySelector("ul");
        this.render();
        this.onInit();
    }
    dragOverHandler(event) {
        console.log("drag over handler");
        event.preventDefault();
        this.ulElement.classList.add("dragging");
    }
    dropHandler(event) {
        event.preventDefault();
        const heroId = event.dataTransfer.getData("text");
        this.flipHeroeSide(heroId);
        this.ulElement.classList.remove("dragging");
    }
    dragLeaveHandler(_) {
        console.log("drag leave handler");
        this.ulElement.classList.remove("dragging");
    }
    flipHeroeSide(heroId) {
        const foundHeroe = heroState.heroes.find(hero => hero.id === heroId);
        const currentSide = foundHeroe.side === HeroSide.LIGHT ? 'light' : 'dark';
        if (foundHeroe && currentSide !== this.name) {
            foundHeroe.side = foundHeroe.side === HeroSide.LIGHT ? HeroSide.DARK : HeroSide.LIGHT;
            heroState.updateHeroe(foundHeroe);
        }
    }
    onInit() {
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("dragleave", this.dragLeaveHandler);
        this.element.addEventListener("drop", this.dropHandler);
        const side = this.name === 'light' ? HeroSide.LIGHT : HeroSide.DARK;
        heroState.addListener((heroes) => {
            const ulEle = this.element.querySelector("ul");
            ulEle.innerHTML = '';
            console.log("UL ID: " + ulEle.id);
            heroes.map((hero) => hero.side === side ? new SingleHero(ulEle.id, hero) : null);
        });
    }
    render() {
        this.element.querySelector("ul").id = `${this.name}-heroes`;
        this.element.querySelector("h2").innerText = this.name;
    }
}
__decorate([
    Bind
], HeroList.prototype, "dragOverHandler", null);
__decorate([
    Bind
], HeroList.prototype, "dropHandler", null);
__decorate([
    Bind
], HeroList.prototype, "dragLeaveHandler", null);
//# sourceMappingURL=hero-list.js.map