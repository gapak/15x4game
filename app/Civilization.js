

var Civilization = {
    global_bonus: 0,

    buildings: {
        teamwork: new Building('teamwork', ['upgradable'], 1.4, 'culture', function(){return 1;}, culture_rate),
        sharing: new Building('sharing', [], 1.4, 'culture', function(){return 1;}, culture_rate),
        motivation: new Building('motivation', ['upgradable', 'maintainable'], 1.4, 'culture', function(){return 1;}, culture_rate),
        education: new Building('education', ['upgradable', 'maintainable'], 1.4, 'culture', function(){return 1;}, culture_rate)
    }
};


Civilization.tick = function() {
  //  console.log(Player, Civilization);

    Player.reward('culture', (1+(this.global_bonus / 100)) * Player.volunteers * 0.01, 1);

    if (Civilization.buildings.motivation.workers > 0 &&
        Player.withdraw('culture', Civilization.buildings.motivation.workers * 0.01, 1)) {
    //    message('bonus!');
        this.global_bonus = Civilization.buildings.motivation.workers * (1 + (0.1 * Civilization.buildings.motivation.level));
    }
    else {
     //   message('minus!');
        this.global_bonus = 0;
    }

    if (Civilization.buildings.education.workers > 0 &&
        Player.withdraw('culture', Civilization.buildings.education.workers * 0.01, 1)) {
        Player.will += (1 + (0.1 * Civilization.buildings.motivation.level)) * 0.01 * 1 / (1+ (Player.writing + Player.drawing + Player.programming + Player.management + 2*Player.will));
    }

};


Civilization.increaseBuilding = function(building) {
    this.buildings[building].increase();
};

Civilization.decreaseBuilding = function(building) {
    this.buildings[building].decrease();
};

Civilization.upgradeBuilding = function(building) {
    this.buildings[building].upgrade();
};

Civilization.getUpgradeCostBuilding = function(building) {
    return this.buildings[building].getUpgradeCost();
};

Civilization.getBuildingEfficiency = function(building) {
    return this.buildings[building].getEfficiency();
};

Civilization.getBuildingProductivity = function(building) {
    return this.buildings[building].getProductivity();
};

