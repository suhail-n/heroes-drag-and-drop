export enum HeroSide {
    LIGHT,
    DARK
}

export class Hero {

    constructor(public id: string, public name: string, public description: string, public side: HeroSide) { }
}