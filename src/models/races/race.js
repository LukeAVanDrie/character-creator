export default class Race {
    constructor(name, age, size, speed, languages, weaponProfs, armorProfs, toolProfs, statBonuses) {
        if (new.target === Race) {
            throw new TypeError("cannot directly instantiate the abstract instance Race")
        }

        this.name = name;
        this.age = age;
        this.size = size;
        this.speed = speed;
        this.languages = languages;
        this.weaponProfs = weaponProfs;
        this.armorProfs = armorProfs;
        this.toolProfs = toolProfs;
        this.statBonuses = statBonuses;
    }

    static getSubraces(race) {
        const subraceMap = {
            Dwarf: [
                { id: "HillDwarf", display: "Hill Dwarf" },
                { id: "MountainDwarf", display: "Mountain Dwarf" }
            ],
            Elf: [
                { id: "HighElf", display: "High Elf" },
                { id: "WoodElf", display: "Wood Elf" },
                { id: "DarkElf", display: "Dark Elf" }
            ],
            Gnome: [
                { id: "ForestGnome", display: "Forest Gnome" },
                { id: "RockGnome", display: "Rock Gnome" }
            ],
            Halfling: [
                { id: "LightfootHalfling", display: "Lightfoot Halfling" },
                { id: "StoutHalfling", display: "Stout Halfling" }
            ]
        }

        return subraceMap[race];
    }

    static validateArgs(args, requiredArgs) {
        let finalArgs = [];
        let missingArgs = [];

        requiredArgs.forEach(requiredArg => {
            if (args[requiredArg]) {
                finalArgs.push(args[requiredArg]);
            } else {
                missingArgs.push(requiredArg);
            }
        });

        return { missingArgs: missingArgs, finalArgs: finalArgs };
    }
} 
