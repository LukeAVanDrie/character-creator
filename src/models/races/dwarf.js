class Dwarf extends Race {
    constructor(name, subArmorProfs, toolProf, subStatBonuses) {
        if (new.target === Dwarf) {
            throw new TypeError("cannot directly instantiate the abstract instance Dwarf")
        }
        
        const age = new Age(50, 350);
        const languages = [LanguageEnum.COMMON, LanguageEnum.DWARVISH];
        const weaponProfs = [
            WeaponEnum.BATTLE_AXE,
            WeaponEnum.HAND_AXE, 
            WeaponEnum.LIGHT_HAMMER,
            WeaponEnum.WARHAMMER
        ];
        const armorProfs = subArmorProfs;
        const toolProfs = [toolProf];
        const statBonuses = Stats.mergeStats(subStatBonuses, {
            "constitution": 2
        });

        super(name, age, SizeEnum.MEDIUM, 25, languages, weaponProfs, armorProfs, toolProfs, statBonuses);
    }
}

class HillDwarf extends Dwarf {
    constuctor(toolProf) {
        const statBonuses = {
            "wisdom": 1
        }

        super("Hill Dwarf", toolProf, statBonuses);
    }
}

class MountainDwarf extends Dwarf {
    constuctor(toolProf) {
        const armorProfs = [ArmorEnum.LIGHT, ArmorEnum.MEDIUM];
        const statBonuses = {
            "strength": 2
        }

        super("Mountain Dwarf", armorProfs, toolProf, statBonuses);
    }
}
