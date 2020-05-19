class Tiefling extends Race {
    constructor() {
        const age = new Age(18, 100);
        const languages = [LanguageEnum.COMMON, LanguageEnum.INFERNAL];
        const statBonuses = {
            "intelligence": 1,
            "charisma": 2
        }

        super("Tiefling", age, SizeEnum.MEDIUM, 30, languages, [], [], [], statBonuses);
    }
}
