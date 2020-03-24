import { Listener, Subject, Observer } from '../utils/observer.js';
import { Hero, HeroSide } from '../model/hero.js';

class State<T> implements Subject<T>{
    listeners: Listener<T>[] = [];

    addListener(listener: Listener<T>): void {
        this.listeners.push(listener);
    }
}

export class HeroState extends State<Hero> implements Observer {

    _heroes: Hero[];

    private static instance: HeroState;
    
    /**
     * make a clone of the state and send it back
     */
    public get heroes() : Hero[] {
        return this._heroes.map(hero => JSON.parse(JSON.stringify(hero)));
    }
    
    private constructor() {
        super();
        this._heroes = [];
    }
    
    static getInstance() {
        if(!HeroState.instance) {
            HeroState.instance = new HeroState();
        }
        return HeroState.instance;
    }
    
    addHeroe(name: string, description: string, side: HeroSide) {
        const hero = new Hero(
            Math.random().toString(),
            name,
            description,
            side);

            this._heroes.push(hero);
            this.notify();
    }

    updateHeroe(hero: Hero) {
        const foundHeroe = this._heroes.find(h => h.id === hero.id);
        if(foundHeroe!.side !== hero.side) {
            foundHeroe!.side = hero.side;
            this.notify();
        }
    }

    notify(): void {
        this.listeners.map(listener => listener(this.heroes));
    }
        
}

export const heroState = HeroState.getInstance();