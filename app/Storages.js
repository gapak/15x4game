var Storages = {
	buildings: { 
		tier1: {
			likes: new Building('storage for likes', ['upgradable'], 1.2, 'likes', function(){return 1;}, resources_rates['likes'], "Expands the maximum size of the likes."),
			design: new Building('storage for design', ['upgradable'], 1.2, 'design', function(){return 1;}, resources_rates['design'], "Expands the maximum size of the design."),
			money: new Building('storage for money', ['upgradable'], 1.2, 'money', function(){return 1;}, resources_rates['money'], "Expands the maximum size of the money."),
			ideas: new Building('storage for ideas', ['upgradable'], 1.2, 'ideas', function(){return 1;}, resources_rates['ideas'], "Expands the maximum size of the ideas.")
		}, 
		tier2: {
			likes: new Building('storage for likes', ['upgradable'], 1.3, 'likes', function(){return 1;}, resources_rates['likes'], "Expands the maximum size of the likes."),
			design: new Building('storage for design', ['upgradable'], 1.3, 'design', function(){return 1;}, resources_rates['design'], "Expands the maximum size of the design."),
			money: new Building('storage for money', ['upgradable'], 1.3, 'money', function(){return 1;}, resources_rates['money'], "Expands the maximum size of the money."),
			ideas: new Building('storage for ideas', ['upgradable'], 1.3, 'ideas', function(){return 1;}, resources_rates['ideas'], "Expands the maximum size of the ideas.")
		}, 
		tier3: {
			likes: new Building('storage for likes', ['upgradable'], 1.4, 'likes', function(){return 1;}, resources_rates['likes'], "Expands the maximum size of the likes."),
			design: new Building('storage for design', ['upgradable'], 1.4, 'design', function(){return 1;}, resources_rates['design'], "Expands the maximum size of the design."),
			money: new Building('storage for money', ['upgradable'], 1.4, 'money', function(){return 1;}, resources_rates['money'], "Expands the maximum size of the money."),
			ideas: new Building('storage for ideas', ['upgradable'], 1.4, 'ideas', function(){return 1;}, resources_rates['ideas'], "Expands the maximum size of the ideas.")
		}, 
		tier4: {
			likes: new Building('storage for likes', ['upgradable'], 1.5, 'likes', function(){return 1;}, resources_rates['likes'], "Expands the maximum size of the likes."),
			design: new Building('storage for design', ['upgradable'], 1.5, 'design', function(){return 1;}, resources_rates['design'], "Expands the maximum size of the design."),
			money: new Building('storage for money', ['upgradable'], 1.5, 'money', function(){return 1;}, resources_rates['money'], "Expands the maximum size of the money."),
			ideas: new Building('storage for ideas', ['upgradable'], 1.5, 'ideas', function(){return 1;}, resources_rates['ideas'], "Expands the maximum size of the ideas.")
		} 
	}	
};

Storages.increaseBuilding = function(tier, building) {
    this.buildings['tier' + tier][building].increase();
};

Storages.decreaseBuilding = function(tier, building) {
    this.buildings['tier' + tier][building].decrease();
};

Storages.upgradeBuilding = function(tier, building) {
    this.buildings['tier' + tier][building].upgrade();
};

Storages.getUpgradeCostBuilding = function(tier, building) {
	//console.log(tier + " " + building);
    return this.buildings['tier' + tier][building].getUpgradeCost();
};
