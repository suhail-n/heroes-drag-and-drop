import { Hero } from '../model/hero.js';
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listener) {
        this.listeners.push(listener);
    }
}
export class HeroState extends State {
    constructor() {
        super();
        this._heroes = [];
    }
    get heroes() {
        return this._heroes.map(hero => JSON.parse(JSON.stringify(hero)));
    }
    static getInstance() {
        if (!HeroState.instance) {
            HeroState.instance = new HeroState();
        }
        return HeroState.instance;
    }
    addHeroe(name, description, side) {
        const hero = new Hero(Math.random().toString(), name, description, side);
        this._heroes.push(hero);
        this.notify();
    }
    updateHeroe(hero) {
        const foundHeroe = this._heroes.find(h => h.id === hero.id);
        if (foundHeroe.side !== hero.side) {
            foundHeroe.side = hero.side;
            this.notify();
        }
    }
    notify() {
        this.listeners.map(listener => listener(this.heroes));
    }
}
export const heroState = HeroState.getInstance();
//# sourceMappingURL=hero.js.map