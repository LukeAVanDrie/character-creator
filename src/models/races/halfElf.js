class HalfElf extends Race {
    constructor(otherLanguage) {
        const age = new Age(20, 180);
        const languages = [LanguageEnum.COMMON, LanguageEnum.ELVISH, otherLanguage];
        const statBonuses = {
            "charisma": 2
        }

        super("Half-Elf", age, SizeEnum.MEDIUM, 30, languages, [], [], [], statBonuses);
    }
}
