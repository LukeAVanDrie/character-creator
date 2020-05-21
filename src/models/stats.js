export default class Stats {
    constructor() {
        this.strength = 0;
        this.dexterity = 0;
        this.constitution = 0;
        this.intelligence = 0;
        this.wisdom = 0;
        this.charisma = 0;
    }

    populateStats(values) {
        Object.keys(values).forEach(stat => {
            if (this[stat]) {
                this[stat] = values.stat;
            }
        });
    }

    static mergeStats(stats, otherStats) {
        const newStats = {
            ...stats,
            ...otherStats
        }
        
        Object.keys(stats).forEach(stat => {
            if (stats[stat]) {
                newStats[stat] += stats[stat];
            }
        });

        return stats;
    }
}
