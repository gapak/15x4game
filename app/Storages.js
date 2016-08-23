
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
			likes: new Billet('storage for likes', {cultural_approval: C2_resources_rates.cultural_approval}, 1.4, "Expands the maximum size of the likes."),
			design: new Billet('storage for design', {cultural_concept: C2_resources_rates.cultural_concept}, 1.4, "Expands the maximum size of the design."),
			money: new Billet('storage for money', {cultural_project: C2_resources_rates.cultural_project}, 1.4, "Expands the maximum size of the money."),
			ideas: new Billet('storage for ideas', {cultural_reform: C2_resources_rates.cultural_reform}, 1.4, "Expands the maximum size of the ideas.")
		}, 
		tier4: {
			likes: new Billet('storage for likes', {cultural_approval: C2_resources_rates.cultural_approval}, 1.5, "Expands the maximum size of the likes."),
			design: new Billet('storage for design', {cultural_concept: C2_resources_rates.cultural_concept}, 1.5, "Expands the maximum size of the design."),
			money: new Billet('storage for money', {cultural_project: C2_resources_rates.cultural_project}, 1.5, "Expands the maximum size of the money."),
			ideas: new Billet('storage for ideas', {cultural_reform: C2_resources_rates.cultural_reform}, 1.5, "Expands the maximum size of the ideas.")
		} 
	}	
};

Storages.getR1HTML = function () {
    var html = `<hr><button class="collapsar" data-toggle="collapse" data-target="#resources_collapse">-</button>
    Resources:
    <div id="resources">`;

	var resources_html = "";
    var storages_html = "";


    resources.forEach(function(resource) {
		storages_html += `<div class="flex-container-column">`;

        resources_html += `
       	<div class="flex-element resource_element"> 
        	${resource.capitalizeFirstLetter()}: 
            ${Player[resource].toFixed(2)} <span class="flex-element" id="${resource}_indicator"><span class = "resource_limit">/ 
            ${Player.getLimit(resource).toFixed(2)} </span></span>`;

        var sb = Storages.buildings;  

        var secret_class = (Player.found_secrets.indexOf(`sold_for_${resource}_1`) == -1) ? "init_hidden" : "";
        storages_html += `
        	<div class="flex-element ${secret_class}" id="sold_for_${resource}_1_container">
	        	${sb.tier1[resource].name}: ${sb.tier1[resource].level}
	            <button onclick = "Storages.upgradeBuilding(1, '${resource}')">Up1:
	            	${Storages.getUpgradeCostBuilding(1, resource)[resource].toFixed(2)} ${resource} 
	            </button>
	        </div>`;

        var secret_class = (Player.found_secrets.indexOf(`sold_for_${resource}_2`) == -1) ? "init_hidden" : "";
        storages_html += `
        	<div class="flex-element ${secret_class}">
	        	${sb.tier2[resource].name}: ${sb.tier2[resource].level}
	            <button onclick = "Storages.upgradeBuilding(2, '${resource}')">Up2: 
	            	${Storages.getUpgradeCostBuilding(2, resource)[resource].toFixed(2)} ${resource} 
	            </button>
	        </div>`;

        var secret_class = (Player.found_secrets.indexOf(`sold_for_${resource}_3`) == -1) ? "init_hidden" : "";
        storages_html += `
        	<div class="flex-element ${secret_class}">
	        	${sb.tier3[resource].name}: ${sb.tier3[resource].level}
	            <button onclick = "Storages.upgradeBuilding(3, '${resource}')">Up3:
	            	${Storages.getUpgradeCostBuildingHTML(3, resource)}
	            </button>
	        </div>`;

        var secret_class = (Player.found_secrets.indexOf(`sold_for_${resource}_4`) == -1) ? "init_hidden" : "";
        storages_html += `
        	<div class="flex-element ${secret_class}">
	        	${sb.tier4[resource].name}:  ${sb.tier4[resource].level} 
	            <button onclick = "Storages.upgradeBuilding(4, '${resource}')">Up4:
	            	${Storages.getUpgradeCostBuildingHTML(4, resource)}
	            </button>
	        </div>`;

        resources_html += `</div>`;

		storages_html += `</div>`;
    });


	html += `
	    <div class="flex-element flex-container-row"> ${resources_html}</div>
	    <div id="resources_collapse" class="flex-element flex-container-column"> 
	    	<div class="flex-element flex-container-row">
	    		${storages_html} 
	    	</div>
	    </div>`;

    html += `</div>`;
    return html;
};

Storages.getC2HTML = function () {
    var html = `<hr><button class="collapsar" data-toggle="collapse" data-target="#resources_collapse">-</button>
    Cultural Artifacts:
    <div id="C2_resources" class="flex-element flex-container-row">`;
   
    C2_resources.forEach(function(C2_resource) {		
        html += `
       	<div class="flex-element resource_element"> 
        	${C2_resource.capitalizeFirstLetter()}: 
            ${Player[C2_resource].toFixed(2)} 
            <span class="flex-element" id="${C2_resource}_indicator"></span>`;    
        	html += `
        </div>`;	
    });

    html += `</div>`;
    return html;
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

Storages.getUpgradeCostBuildingHTML = function(tier, building) {
	var html = '';
	var price = [];
	var upgrade_cost = this.buildings['tier' + tier][building].getUpgradeCost();
   	for (var resource_name in upgrade_cost) {
            price.push(`${upgrade_cost[resource_name].toFixed(2)} ${resource_name}`);
        }
        price = price.join(', ');
    return price;
};