

var Civilization = {
    global_bonus: 0,

    buildings: {
        teamwork: new Building('teamwork', ['upgradable'], 1.4, 'culture', function(){return 1;}, culture_rate, "Expands the maximum size of the teams."),
        sharing: new Building('sharing', ['upgradable'], 1.6, 'culture', function(){return 1;}, culture_rate, "Expands maximum storage size."),
        motivation: new Building('motivation', ['upgradable', 'maintainable'], 1.4, 'culture', function(){return 1;}, culture_rate, "Give a global production bonus, consuming culture."),
        education: new Building('education', ['upgradable', 'maintainable'], 1.4, 'culture', function(){return 0.01;}, culture_rate, "Slowly increase your knowledge, consuming culture.")
    }
};


Civilization.tick = function() {
  //  console.log(Player, Civilization);


    Player.culture_rate = (1+(this.global_bonus / 100)) * Player.volunteers * 0.01;
    Player.reward('culture', Player.culture_rate, 1);

    if (Civilization.buildings.motivation.workers > 0 &&
        Player.withdraw('culture', Civilization.buildings.motivation.workers * 0.01, 1)) {
    //    message('bonus!');
        Player.culture_rate -= Civilization.buildings.motivation.workers * 0.01;
        this.global_bonus = Civilization.buildings.motivation.getEfficiency(); // .workers * (1 + (0.1 * Civilization.buildings.motivation.level));
    }
    else {
     //   message('minus!');
        this.global_bonus = 0;
    }

    if (Civilization.buildings.education.workers > 0 &&
        Player.withdraw('culture', Civilization.buildings.education.workers * 0.01, 1)) {
        Player.culture_rate -= Civilization.buildings.education.workers * 0.01;
        Player.revealSecret('knowledge');
        var knowledge240 = Civilization.buildings.education.getEfficiency() * 1 / (1 + 5*(Player.writing + Player.drawing + Player.programming + Player.management + 2*Player.knowledge));
        var knowledge60 = 1; // Civilization.buildings.education.getEfficiency() * 0.1 / (1 + 4 * Math.max(Player.writing, Player.drawing, Player.programming, Player.management, Player.knowledge));
        Player.knowledge += Math.min(knowledge240, knowledge60);
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

