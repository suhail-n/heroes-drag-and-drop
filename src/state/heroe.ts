import { Heroe, HeroeSide } from '../model/heroe.js';
import { Listener, Subject, Observer } from '../utils/observer.js';


class State<T> implements Subject<T>{
    listeners: Listener<T>[] = [];

    addListener(listener: Listener<T>): void {
        this.listeners.push(listener);
    }
}

export class HeroeState extends State<Heroe> implements Observer {

    _heroes: Heroe[];

    private static instance: HeroeState;
    
    /**
     * make a clone of the state and send it back
     */
    public get heroes() : Heroe[] {
        return this._heroes.map(heroe => JSON.parse(JSON.stringify(heroe)));
    }
    
    private constructor() {
        super();
        this._heroes = [];
    }
    
    static getInstance() {
        if(!HeroeState.instance) {
            HeroeState.instance = new HeroeState();
        }
        return HeroeState.instance;
    }
    
    addHeroe(name: string, description: string, side: HeroeSide) {
        const heroe = new Heroe(
            Math.random().toString(),
            name,
            description,
            side);

            this._heroes.push(heroe);
            this.notify();
    }

    updateHeroe(heroe: Heroe) {
        const foundHeroe = this._heroes.find(h => h.id === heroe.id);
        if(foundHeroe!.side !== heroe.side) {
            foundHeroe!.side = heroe.side;
            this.notify();
        }
    }

    notify(): void {
        this.listeners.map(listener => listener(this.heroes));
    }
        
}

export const heroeState = HeroeState.getInstance();