import Race from "./race";
import Age from "../age";
import Stats from "../stats";
import { LanguageEnum, SizeEnum, WeaponEnum, ArmorEnum } from "../enums/bundle";

export class Dwarf extends Race {
    constructor(name, subArmorProfs, toolProf, subStatBonuses) {
        if (new.target === Dwarf) {
            throw new TypeError("cannot directly instantiate the abstract instance Dwarf")
        }
        
        const age = new Age(50, 350);
        const languages = [LanguageEnum.COMMON, LanguageEnum.DWARVISH];
        const weaponProfs = [
            WeaponEnum.BATTLE_AXE,
            WeaponEnum.HAND_AXE, 
            WeaponEnum.LIGHT_HAMMER,
            WeaponEnum.WARHAMMER
        ];
        const armorProfs = subArmorProfs;
        const toolProfs = [toolProf];
        const statBonuses = Stats.mergeStats(subStatBonuses, {
            "constitution": 2
        });

        super(name, age, SizeEnum.MEDIUM, 25, languages, weaponProfs, armorProfs, toolProfs, statBonuses);
    }
}

export class HillDwarf extends Dwarf {
    constructor(toolProficiency) {
        const statBonuses = {
            "wisdom": 1
        }

        super("Hill Dwarf", [], toolProficiency, statBonuses);
    }

    static generate(args) {
        const requiredArgs = ["toolProficiency"];
        const result = Race.validateArgs(args, requiredArgs);
        return {
            missingArgs: result.missingArgs,
            requiredArgs: requiredArgs,
            class: (result.missingArgs.length > 0) ? undefined : new HillDwarf(...result.finalArgs)
        }
    } 
}

export class MountainDwarf extends Dwarf {
    constructor(toolProficiency) {
        const armorProfs = [ArmorEnum.LIGHT, ArmorEnum.MEDIUM];
        const statBonuses = {
            "strength": 2
        }

        super("Mountain Dwarf", armorProfs, toolProficiency, statBonuses);
    }

    static generate(args) {
        const requiredArgs = ["toolProficiency"];
        const result = Race.validateArgs(args, requiredArgs);
        return {
            missingArgs: result.missingArgs,
            requiredArgs: requiredArgs,
            class: (result.missingArgs.length > 0) ? undefined : new MountainDwarf(...result.finalArgs)
        }
    } 
}
