class HalfOrc extends Race {
    constructor() {
        const age = new Age(14, 75);
        const languages = [LanguageEnum.COMMON, LanguageEnum.ORC];
        const statBonuses = {
            "strength": 2,
            "constitution": 1
        }

        super("Half-Orc", age, SizeEnum.MEDIUM, 30, languages, [], [], [], statBonuses);
    }
}
