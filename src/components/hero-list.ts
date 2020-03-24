import { heroState } from '../state/hero.js';
import { SingleHero } from './hero-single.js';
import { HeroSide } from '../model/hero.js';
import { Hero } from '../model/hero.js';
import { Component } from './base.js';
import { DragTarget } from '../model/drag-and-drop.js';
import { Bind } from '../decorators/bind.js';

export class HeroList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {

    private ulElement: HTMLUListElement;

    constructor(private name: 'light' | 'dark') {
        super("hero-list", "app", false, name);
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
        const heroId: string = event.dataTransfer!.getData("text");
        this.flipHeroeSide(heroId);
        this.ulElement.classList.remove("dragging");
        
    }

    @Bind
    dragLeaveHandler(_: DragEvent): void {
        console.log("drag leave handler")
        this.ulElement.classList.remove("dragging");
    }

    flipHeroeSide(heroId: string) {
        const foundHeroe = heroState.heroes.find(hero => hero.id === heroId);
        const currentSide = foundHeroe!.side === HeroSide.LIGHT ? 'light' : 'dark'
        if (foundHeroe && currentSide !== this.name) {
            foundHeroe!.side = foundHeroe!.side === HeroSide.LIGHT ? HeroSide.DARK : HeroSide.LIGHT;
            heroState.updateHeroe(foundHeroe);
        }

    }
    
    onInit() {
        // add drag and drop listeners
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("dragleave", this.dragLeaveHandler);
        this.element.addEventListener("drop", this.dropHandler);

        // add listener
        const side: HeroSide = this.name === 'light' ? HeroSide.LIGHT : HeroSide.DARK;

        heroState.addListener((heroes: Hero[]) => {
            // empty ul element
            const ulEle = this.element.querySelector("ul")!;
            ulEle.innerHTML = '';
            console.log("UL ID: " + ulEle.id);
            heroes.map((hero: Hero) => hero.side === side ? new SingleHero(ulEle.id, hero) : null  );
        });
    }
    
    render() {
        // add id
        this.element.querySelector("ul")!.id = `${this.name}-heroes`;
        // set text
        this.element.querySelector("h2")!.innerText = this.name;
    }
}