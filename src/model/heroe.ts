export enum HeroeSide {
    LIGHT,
    DARK
}

export class Heroe {

    constructor(public id: string, public name: string, public description: string, public side: HeroeSide) { }
}