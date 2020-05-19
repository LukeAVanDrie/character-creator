class Halfling extends Race {
    constructor(name, subStatBonuses) {
        if (new.target === Halfling) {
            throw new TypeError("cannot directly instantiate the abstract instance Halfling")
        }
        
        const age = new Age(20, 250);
        const languages = [LanguageEnum.COMMON, LanguageEnum.HALFLING];
        const statBonuses = Stats.mergeStats(subStatBonuses, {
            "dexterity": 2
        });

        super(name, age, SizeEnum.SMALL, 25, languages, [], [], [], statBonuses);
    }
}

class LightfootHalfling extends Halfling {
    constuctor() {
        const statBonuses = {
            "charisma": 1
        }

        super("Lightfoot Halfling", statBonuses);
    }
}

class StoutHalfling extends Halfling {
    constuctor() {
        const statBonuses = {
            "constitution": 1
        }

        super("Stout Halfling", statBonuses);
    }
}
