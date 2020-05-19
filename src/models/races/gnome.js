class Gnome extends Race {
    constructor(name, toolProf, subStatBonuses) {
        if (new.target === Gnome) {
            throw new TypeError("cannot directly instantiate the abstract instance Gnome")
        }
        
        const age = new Age(40, 500);
        const languages = [LanguageEnum.COMMON, LanguageEnum.GNOMISH];
        const toolProfs = toolProf || [];
        const statBonuses = Stats.mergeStats(subStatBonuses, {
            "intelligence": 2
        });

        super(name, age, SizeEnum.SMALL, 25, languages, [], [], toolProfs, statBonuses);
    }
}

class ForestGnome extends Gnome {
    constuctor() {
        const statBonuses = {
            "dexterity": 1
        }

        super("Forest Gnome", undefined, statBonuses);
    }
}

class RockGnome extends Gnome {
    constuctor() {
        const toolProf = ToolEnum.ARTISAN;
        const statBonuses = {
            "constitution": 1
        }

        super("Rock Gnome", toolProf, statBonuses);
    }
}
