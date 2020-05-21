import Race from "./race";
import Age from "../age";
import { LanguageEnum, SizeEnum } from "../enums/bundle";

export class HalfElf extends Race {
    constructor(language) {
        const age = new Age(20, 180);
        const languages = [LanguageEnum.COMMON, LanguageEnum.ELVISH, language];
        const statBonuses = {
            "charisma": 2
        }
        
        super("Half-Elf", age, SizeEnum.MEDIUM, 30, languages, [], [], [], statBonuses);
    }

    static generate(args) {
        const requiredArgs = ["language"];
        const result = Race.validateArgs(args, requiredArgs);
        return {
            missingArgs: result.missingArgs,
            requiredArgs: requiredArgs,
            class: (result.missingArgs.length > 0) ? undefined : new HalfElf(...result.finalArgs)
        }
    } 
}
