
function Department(name) {
    this.name = name;
    this.workers = 0;
    this.level = 0;

    this.multiplying_skill = {'smm': 'writing', 'design': 'drawing', 'site': 'programming', 'docs': 'management'}[this.name];
    this.base_resource = {'smm': 'likes', 'design': 'design', 'site': 'money', 'docs': 'ideas'}[this.name];
    this.base_rate = resources_rates[this.base_resource];

    this.countOfWork = 0;
    this.supervision = 0;
    this.isSupervision = 0;

    this.setSupervision = function (skilllvl) {
        this.supervision = this.isSupervision * (1 + skilllvl / 30 + this.countOfWork * 1.5);
    };

    this.increase = function() {
        if (Player.volunteers < 1) {
            message('Not enough free volunteers');
        } else if (this.workers + 1 > Civilization.updates.teamwork.level) {
            message('Not enough teamwork');
        } else {
            Player.volunteers--;
            this.workers++;
            draw_all();
        }
    };

    this.decrease = function() {
        if (this.workers >= 1) {
            Player.volunteers++;
            this.workers--;
            draw_all();
        //    message('One volunteer from the Department of ' + this.name + ' was released.');
        }
        else {
            message('Not enough volunteers in department');
        }
    };

    this.upgrade = function() {
        if (Player.withdrawArray(this.getUpgradeCost())) {
            this.level++;
            draw_all();
        }
    };

    this.getUpgradeCost = function() {
        var cost = {};
      //  cost[this.base_resource] = Math.pow(this.base_rate + (this.level * 0.1 * this.base_rate) , ((this.level*0.1) + 1));
        cost[this.base_resource] = this.base_rate * (1 + Math.pow(this.level, 1.5));
        return cost;
    };

    this.getEfficiency = function() {
        return Civilization.getGlobalBonus() * (this.workers + this.supervision) * (1 + (0.1 * this.level)) * (1 + (Player[this.multiplying_skill] / 60));
    };

    this.getProductivity = function() {
        var adjustment = 10 / 60 / 60;
     //   console.log(this.name, rate, adjustment);
        return this.getEfficiency() * this.base_rate * adjustment;
    };


    return this;
}

Department.getHTML = function() {
    var html = `<hr><button class="collapsar" data-toggle="collapse" data-target="#departments_collapse">-</button>
    Departments: 
    <div class="collapse in" id="departments_collapse">
    <div class="flex-container-row" id="departments">`;
    
    for (var key in Player.departments) {
        var department = Player.departments[key];
        var upgrade_cost = department.getUpgradeCost();
        for (var resource_name in upgrade_cost) break;
        var price = upgrade_cost[resource_name];
        var secret_class = (Player.found_secrets.indexOf("upgrade_department") == -1) ? "init_secret" : "";

        html += `
        <div class = "flex-element flex-container-column" id = "${key}">
            <div class="flex-element">${key.capitalizeFirstLetter()}</div>
            <div class = "${secret_class} flex-element">
                Level: <span id="${key}level"> ${department.level}</span>
                <button onclick = "Player.upgradeDepartment('${key}');">
                    Up: ${price.toFixed(2)} ${resource_name} 
                </button>
            </div>
                
            <div>Workers: <span id="${key}_volunteers">  
                ${department.workers} / ${(Civilization.updates.teamwork.level)} </span>
                <button class = "" onclick="Player.increaseDepartment('${key}');">+</button>
                <button class = "" onclick="Player.decreaseDepartment('${key}');">-</button>
            </div>

            <div class="flex-element">
                Efficiency: <span id="${key}_productivity"> 
                ${Player.getDepartmentEfficiency(key).toFixed(2)}</span>
            </div>
            <div class="flex-element">
                Productivity: <span id="${key}_productivity"> 
                ${Player.getDepartmentProductivity(key).toFixed(2)} ${department.base_resource} </span>
            </div>
        </div>`;
    }

    html += `</div></div>`;
    return html;
};