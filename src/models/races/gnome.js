import Race from "./race";
import Age from "../age";
import Stats from "../stats";
import { LanguageEnum, SizeEnum, ToolEnum } from "../enums/bundle";

export class Gnome extends Race {
    constructor(name, toolProf, subStatBonuses) {
        if (new.target === Gnome) {
            throw new TypeError("cannot directly instantiate the abstract instance Gnome")
        }
        
        const age = new Age(40, 500);
        const languages = [LanguageEnum.COMMON, LanguageEnum.GNOMISH];
        const toolProfs = toolProf || [];
        const statBonuses = Stats.mergeStats(subStatBonuses, {
            "intelligence": 2
        });

        super(name, age, SizeEnum.SMALL, 25, languages, [], [], toolProfs, statBonuses);
    }
}

export class ForestGnome extends Gnome {
    constructor() {
        const statBonuses = {
            "dexterity": 1
        }

        super("Forest Gnome", undefined, statBonuses);
    }

    static generate() {
        return {
            missingArgs: [],
            requiredArgs: [],
            class: new ForestGnome()
        }
    } 
}

export class RockGnome extends Gnome {
    constructor() {
        const toolProf = Object.keys(ToolEnum).map(tool => ToolEnum[tool]);
        const statBonuses = {
            "constitution": 1
        }

        super("Rock Gnome", toolProf, statBonuses);
    }

    static generate() {
        return {
            missingArgs: [],
            requiredArgs: [],
            class: new RockGnome()
        }
    } 
}
