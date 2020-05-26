import Race from "./race";
import Age from "../age";
import Stats from "../stats";
import { LanguageEnum, SizeEnum } from "../enums/bundle";

export class Halfling extends Race {
    constructor(name, subStatBonuses) {
        if (new.target === Halfling) {
            throw new TypeError("cannot directly instantiate the abstract instance Halfling")
        }
        
        const age = new Age(20, 250);
        const languages = [LanguageEnum.COMMON, LanguageEnum.HALFLING];
        const statBonuses = Stats.mergeStats(subStatBonuses, {
            "dexterity": 2
        });

        super(name, age, SizeEnum.SMALL, 25, languages, [], [], [], statBonuses);
    }
}

export class LightfootHalfling extends Halfling {
    constructor() {
        const statBonuses = {
            "charisma": 1
        }

        super("Lightfoot Halfling", statBonuses);
    }

    static generate() {
        return {
            missingArgs: [],
            requiredArgs: [],
            class: new LightfootHalfling()
        }
    } 
}

export class StoutHalfling extends Halfling {
    constructor() {
        const statBonuses = {
            "constitution": 1
        }

        super("Stout Halfling", statBonuses);
    }

    static generate() {
        return {
            missingArgs: [],
            requiredArgs: [],
            class: new StoutHalfling()
        }
    } 
}
