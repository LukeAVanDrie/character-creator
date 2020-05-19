class Dragonborn extends Race {
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
}
