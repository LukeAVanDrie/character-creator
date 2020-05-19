class Human extends Race {
    constructor(otherLanguage) {
        const age = new Age(18, 100);
        const languages = [LanguageEnum.COMMON, otherLanguage];
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
}
