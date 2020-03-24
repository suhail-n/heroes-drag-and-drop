import { Hero, HeroSide } from '../model/hero.js';
import { Component } from './base.js';
import { Draggable } from '../model/drag-and-drop.js';
import { Bind } from '../decorators/bind.js';

export class SingleHero extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
   
    hero: Hero

    constructor(hostElementId: string, hero: Hero) {
        super("single-hero", hostElementId, false);
        this.hero = hero;
        this.onInit();
        this.render();
    }

    @Bind
    dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData("text", this.hero.id);
        this.hostEl.classList.add("dragging");
        this.element.classList.add("dragging");

    }

    @Bind
    dragEndHandler(_: DragEvent): void {
        this.hostEl.classList.remove("dragging");
        this.hostEl.querySelector("li")?.classList.remove("dragging"); 
        this.hostEl.querySelectorAll("li").forEach((li: HTMLLIElement) => li.classList.remove("dragging"));
    }
    
    protected onInit() {
        this.element.addEventListener("dragstart", this.dragStartHandler);
        this.element.addEventListener("dragend", this.dragEndHandler);
    }
    
    protected render(): void {
        // add element to dom
        this.element.querySelector("h3")!.innerText = this.hero.name;
        this.element.querySelector("p")!.innerText = `Powers: \n${this.hero.description}\n${this.hero.side === HeroSide.LIGHT ? "LIGHT" : "DARK"}`;
    }
}