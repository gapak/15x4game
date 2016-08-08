

var Storages = {
	buildings: { 
		tier1: {
			likes: new Billet('storage for likes', {likes: resources_rates.likes}, 1.2, "Expands the maximum size of the likes."),
			design: new Billet('storage for design', {design: resources_rates.design}, 1.2, "Expands the maximum size of the design."),
			money: new Billet('storage for money', {money: resources_rates.money}, 1.2, "Expands the maximum size of the money."),
			ideas: new Billet('storage for ideas', {ideas: resources_rates.ideas}, 1.2, "Expands the maximum size of the ideas.")
		}, 
		tier2: {
			likes: new Billet('storage for likes', {likes: resources_rates.likes}, 1.3, "Expands the maximum size of the likes."),
			design: new Billet('storage for design', {design: resources_rates.design}, 1.3, "Expands the maximum size of the design."),
			money: new Billet('storage for money', {money: resources_rates.money}, 1.3, "Expands the maximum size of the money."),
			ideas: new Billet('storage for ideas', {ideas: resources_rates.ideas}, 1.3, "Expands the maximum size of the ideas.")
		}, 
		tier3: {
			likes: new Billet('storage for likes', {likes: resources_rates.likes}, 1.4, "Expands the maximum size of the likes."),
			design: new Billet('storage for design', {design: resources_rates.design}, 1.4, "Expands the maximum size of the design."),
			money: new Billet('storage for money', {money: resources_rates.money}, 1.4, "Expands the maximum size of the money."),
			ideas: new Billet('storage for ideas', {ideas: resources_rates.ideas}, 1.4, "Expands the maximum size of the ideas.")
		}, 
		tier4: {
			likes: new Billet('storage for likes', {likes: resources_rates.likes}, 1.5, "Expands the maximum size of the likes."),
			design: new Billet('storage for design', {design: resources_rates.design}, 1.5, "Expands the maximum size of the design."),
			money: new Billet('storage for money', {money: resources_rates.money}, 1.5, "Expands the maximum size of the money."),
			ideas: new Billet('storage for ideas', {ideas: resources_rates.ideas}, 1.5, "Expands the maximum size of the ideas.")
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
