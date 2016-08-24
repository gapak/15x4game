

function Workplace(name, base_cost_array, cost_grow_rate, text, custom_modification) {
    Billet.apply(this, arguments);
    this.custom_modification = custom_modification;

    this.workers = 0;


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

    this.getEfficiency = function() {
        var custom = (typeof(this.custom_modification) === 'function') ? this.custom_modification() : 1;
        return Civilization.getHappiness() * this.workers * (1 + (0.1 * this.level)) * custom;
    };

    this.getProductivity = function() {
        var custom = 1;
        if (typeof(this.custom_modification) === 'function') {
            custom = this.custom_modification();
        }

        var adjustment = 10 / 60 / 60;
        //   console.log(this.name, rate, adjustment);
        return this.getEfficiency() * this.base_rate * adjustment * custom;
    };


    this.getHTML = function(key, secret_class, address) {
        var upgrade_cost = this.getUpgradeCost();
        var price = [];
        for (var resource_name in upgrade_cost) {
            price.push(`${upgrade_cost[resource_name].toFixed(2)} ${resource_name}`);
        }
        price = price.join(', ');

        var season_bonus_html = '';
        if (typeof(this.custom_modification) === 'function') {
            var season_bonus = this.custom_modification() ;
            if (season_bonus !== 1) {
                season_bonus_html += `
    <div class="flex-element">
        Season bonus: ${season_bonus*100}%
    </div>`
            }
        }

        var html = `    
    <div class="flex-element flex-container-column ${secret_class}" id="${key}_container">
        <div class="flex-element flex-container-row ">
            ${key.capitalizeFirstLetter()}
            <div class="${secret_class}">: <span id="${key}_level">${this.level}</span></div>
        </div>
        ${season_bonus_html}
    <div class="flex-element">
        <button class="btn btn-default" onclick="${address}('${key}');">Up: ${price}</button>
    </div>
    <div class="flex-element">
        <span id="${key}_volunteers">Workers: ${this.workers}/${Civilization.updates.teamwork.level}</span>
        <button class="btn btn-default" onclick="Civilization.increase('${key}');"> + </button>
        <button class="btn btn-default" onclick="Civilization.decrease('${key}');"> - </button>
    </div>
    
    <div class="flex-element">
        Efficiency: <span id="${key}_productivity"> 
        ${this.getEfficiency().toFixed(2)}</span>
    </div>
    
    <div class="flex-element">${this.text}</div></div>`;

        return html;
    };

    return this;
}

/*
Workplace.getHTML = function(key, secret_class, address) {
    var upgrade_cost = this.getUpgradeCost();
    var price = [];
    for (var resource_name in upgrade_cost) {
        price.push(`${upgrade_cost[resource_name].toFixed(2)} ${resource_name}`);
    }
    price = price.join(', ');

    var html = `
    <div class="flex-element flex-container-column ${secret_class}" id="${key}_container">
        <div class="flex-element flex-container-row ">
            ${key.capitalizeFirstLetter()}
            <div class="${secret_class}">: <span id="${key}level">${this.level}</span></div>
        </div>
    <div class="flex-element">
        <button onclick="${address}('${key}');">Up: ${price}</button>
    </div>
    <div class="flex-element">
        <span id="${key}_volunteers">Workers: ${this.workers}/${Civilization.updates.teamwork.level}</span>
        <button class = "" onclick="Civilization.increase('${key}');"> + </button>
        <button class = "" onclick="Civilization.decrease('${key}');"> - </button>
    </div>
    <div class="flex-element">${work.text}</div></div>`;

    return html;
};
*/

