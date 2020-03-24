import { heroeState } from '../state/heroe.js';
import { SingleHero } from './heroe-single.js';
import { HeroeSide } from '../model/heroe.js';
import { Heroe } from '../model/heroe.js';
import { Component } from './base.js';
import { DragTarget } from '../model/drag-and-drop.js';
import { Bind } from '../decorators/bind.js';

export class HeroeList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {

    private ulElement: HTMLUListElement;

    constructor(private name: 'light' | 'dark') {
        super("heroe-list", "app", false, name);
        this.ulElement = <HTMLUListElement> this.element.querySelector("ul")!;
        this.render();
        this.onInit();
        
    }

    @Bind
    dragOverHandler(event: DragEvent): void {
        console.log("drag over handler")
        event.preventDefault();
        this.ulElement.classList.add("dragging");
    }
    
    @Bind
    dropHandler(event: DragEvent): void {
        event.preventDefault();
        const heroeId: string = event.dataTransfer!.getData("text");
        this.flipHeroeSide(heroeId);
        this.ulElement.classList.remove("dragging");
        
    }

    @Bind
    dragLeaveHandler(_: DragEvent): void {
        console.log("drag leave handler")
        this.ulElement.classList.remove("dragging");
    }

    flipHeroeSide(heroeId: string) {
        const foundHeroe = heroeState.heroes.find(heroe => heroe.id === heroeId);
        const currentSide = foundHeroe!.side === HeroeSide.LIGHT ? 'light' : 'dark'
        if (foundHeroe && currentSide !== this.name) {
            foundHeroe!.side = foundHeroe!.side === HeroeSide.LIGHT ? HeroeSide.DARK : HeroeSide.LIGHT;
            heroeState.updateHeroe(foundHeroe);
        }

    }
    
    onInit() {
        // add drag and drop listeners
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("dragleave", this.dragLeaveHandler);
        this.element.addEventListener("drop", this.dropHandler);

        // add listener
        const side: HeroeSide = this.name === 'light' ? HeroeSide.LIGHT : HeroeSide.DARK;

        heroeState.addListener((heroes: Heroe[]) => {
            // empty ul element
            const ulEle = this.element.querySelector("ul")!;
            ulEle.innerHTML = '';
            console.log("UL ID: " + ulEle.id);
            heroes.map((heroe: Heroe) => heroe.side === side ? new SingleHero(ulEle.id, heroe) : null  );
        });
    }
    
    render() {
        // add id
        this.element.querySelector("ul")!.id = `${this.name}-heroes`;
        // set text
        this.element.querySelector("h2")!.innerText = this.name;
    }
}