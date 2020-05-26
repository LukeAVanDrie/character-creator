import Race from "./race";
import Age from "../age";
import { LanguageEnum, SizeEnum } from "../enums/bundle";

export class Human extends Race {
    constructor(language) {
        const age = new Age(18, 100);
        const languages = [LanguageEnum.COMMON, language];
        const statBonuses = {
            "strength":  1,
            "dexterity": 1,
            "constitution": 1,
            "intelligence": 1,
            "wisdom": 1,
            "charisma": 1
        }

        super("Human", age, SizeEnum.MEDIUM, 30, languages, [], [], [], statBonuses);
    }

    static generate(args) {
        const requiredArgs = ["language"];
        const result = Race.validateArgs(args, requiredArgs);
        return {
            missingArgs: result.missingArgs,
            requiredArgs: requiredArgs,
            class: (result.missingArgs.length > 0) ? undefined : new Human(...result.finalArgs)
        }
    } 
}
