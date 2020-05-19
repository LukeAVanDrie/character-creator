class Race {
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
}
