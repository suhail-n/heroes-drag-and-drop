export var HeroSide;
(function (HeroSide) {
    HeroSide[HeroSide["LIGHT"] = 0] = "LIGHT";
    HeroSide[HeroSide["DARK"] = 1] = "DARK";
})(HeroSide || (HeroSide = {}));
export class Hero {
    constructor(id, name, description, side) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.side = side;
    }
}
//# sourceMappingURL=hero.js.map