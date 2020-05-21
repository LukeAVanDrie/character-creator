import Race from "./race";
import Age from "../age";
import { LanguageEnum, SizeEnum } from "../enums/bundle";

export class Dragonborn extends Race {
    constructor(ancestry) {
        const age = new Age(15, 80);
        const languages = [LanguageEnum.COMMON, LanguageEnum.DRACONIC];
        const statBonuses = {
            "strength":  2,
            "charisma": 1
        }

        super("Dragonborn", age, SizeEnum.MEDIUM, 30, languages, [], [], [], statBonuses);
        this.ancestry = ancestry;
    }

    static generate(args) {
        const requiredArgs = ["ancestry"];
        const result = Race.validateArgs(args, requiredArgs);
        return {
            missingArgs: result.missingArgs,
            requiredArgs: requiredArgs,
            class: (result.missingArgs.length > 0) ? undefined : new Dragonborn(...result.finalArgs)
        }
    } 
}
