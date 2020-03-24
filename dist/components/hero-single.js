var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { HeroSide } from '../model/hero.js';
import { Component } from './base.js';
import { Bind } from '../decorators/bind.js';
export class SingleHero extends Component {
    constructor(hostElementId, hero) {
        super("single-hero", hostElementId, false);
        this.hero = hero;
        this.onInit();
        this.render();
    }
    dragStartHandler(event) {
        event.dataTransfer.setData("text", this.hero.id);
        this.hostEl.classList.add("dragging");
        this.element.classList.add("dragging");
    }
    dragEndHandler(_) {
        var _a;
        this.hostEl.classList.remove("dragging");
        (_a = this.hostEl.querySelector("li")) === null || _a === void 0 ? void 0 : _a.classList.remove("dragging");
        this.hostEl.querySelectorAll("li").forEach((li) => li.classList.remove("dragging"));
    }
    onInit() {
        this.element.addEventListener("dragstart", this.dragStartHandler);
        this.element.addEventListener("dragend", this.dragEndHandler);
    }
    render() {
        this.element.querySelector("h3").innerText = this.hero.name;
        this.element.querySelector("p").innerText = `Powers: \n${this.hero.description}\n${this.hero.side === HeroSide.LIGHT ? "LIGHT" : "DARK"}`;
    }
}
__decorate([
    Bind
], SingleHero.prototype, "dragStartHandler", null);
__decorate([
    Bind
], SingleHero.prototype, "dragEndHandler", null);
//# sourceMappingURL=hero-single.js.map