import Race from "./race";
import Age from "../age";
import { LanguageEnum, SizeEnum } from "../enums/bundle";

export class HalfOrc extends Race {
    constructor() {
        const age = new Age(14, 75);
        const languages = [LanguageEnum.COMMON, LanguageEnum.ORC];
        const statBonuses = {
            "strength": 2,
            "constitution": 1
        }

        super("Half-Orc", age, SizeEnum.MEDIUM, 30, languages, [], [], [], statBonuses);
    }

    static generate() {
        return {
            missingArgs: [],
            requiredArgs: [],
            class: new HalfOrc()
        }
    } 
}
