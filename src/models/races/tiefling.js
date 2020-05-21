import Race from "./race";
import Age from "../age";
import { LanguageEnum, SizeEnum } from "../enums/bundle";

export class Tiefling extends Race {
    constructor() {
        const age = new Age(18, 100);
        const languages = [LanguageEnum.COMMON, LanguageEnum.INFERNAL];
        const statBonuses = {
            "intelligence": 1,
            "charisma": 2
        }

        super("Tiefling", age, SizeEnum.MEDIUM, 30, languages, [], [], [], statBonuses);
    }

    static generate() {
        return {
            missingArgs: [],
            requiredArgs: [],
            class: new Tiefling()
        }
    } 
}
