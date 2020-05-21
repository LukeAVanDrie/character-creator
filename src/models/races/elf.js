import Race from "./race";
import Age from "../age";
import Stats from "../stats";
import { LanguageEnum, SizeEnum, WeaponEnum } from "../enums/bundle";

export class Elf extends Race {
    constructor(name, speed, otherLanguage, subWeaponProfs, subStatBonuses) {
        if (new.target === Elf) {
            throw new TypeError("cannot directly instantiate the abstract instance Elf")
        }
        
        const age = new Age(100, 750);
        const languages = [LanguageEnum.COMMON, LanguageEnum.ELVISH];
        if (otherLanguage) {
            languages.push(otherLanguage)
        }
        const statBonuses = Stats.mergeStats(subStatBonuses, {
            "dexterity": 2
        });

        super(name, age, SizeEnum.MEDIUM, speed, languages, subWeaponProfs, [], [], statBonuses);
    }
}

export class HighElf extends Elf {
    constructor(language) {
        const weaponProfs = [
            WeaponEnum.LONGSWORD, 
            WeaponEnum.SHORTSWORD, 
            WeaponEnum.LONGBOW
        ];
        const statBonuses = {
            "intelligence": 1
        }

        super("High Elf", 35, language, weaponProfs, statBonuses);
    }

    static generate(args) {
        const requiredArgs = ["language"];
        const result = Race.validateArgs(args, requiredArgs);
        return {
            missingArgs: result.missingArgs,
            requiredArgs: requiredArgs,
            class: (result.missingArgs.length > 0) ? undefined : new HighElf(...result.finalArgs)
        }
    } 
}

export class WoodElf extends Elf {
    constructor() {
        const weaponProfs = [
            WeaponEnum.LONGSWORD, 
            WeaponEnum.SHORTSWORD, 
            WeaponEnum.SHORTBOW, 
            WeaponEnum.LONGBOW
        ];
        const statBonuses = {
            "wisdom": 1
        }

        super("Wood Elf", 30, undefined, weaponProfs, statBonuses);
    }

    static generate() {
        return {
            missingArgs: [],
            requiredArgs: [],
            class: new WoodElf()
        }
    } 
}

export class DarkElf extends Elf {
    constructor() {
        const weaponProfs = [
            WeaponEnum.RAPIER, 
            WeaponEnum.SHORTSWORD, 
            WeaponEnum.HAND_CROSSBOW
        ];
        const statBonuses = {
            "charisma": 1
        }

        super("Dark Elf", 30, undefined, weaponProfs, statBonuses);
    }

    static generate() {
        return {
            missingArgs: [],
            requiredArgs: [],
            class: new DarkElf()
        }
    } 
}
