

function Billet(name, base_cost_array, cost_grow_rate , text) {
    this.name = name;
    this.base_cost_array = base_cost_array;
    this.cost_grow_rate = cost_grow_rate;
    this.text = text;
    this.level = 1;

    this.upgrade = function() {
        if (Player.withdrawArray(this.getUpgradeCost())) {
            this.level++;
            draw_all();
        }
    };

    this.getUpgradeCost = function() {
        var cost = {};
        for (var key in this.base_cost_array) {
            cost[key] = this.base_cost_array[key] * Math.pow(this.level, this.cost_grow_rate);

        }
        return cost;
    };

    this.getHTML = function(key, secret_class, address) {
        var upgrade_cost = this.getUpgradeCost();
        var price = [];
        for (var resource_name in upgrade_cost) {
            price.push(`${upgrade_cost[resource_name].toFixed(2)} ${resource_name}`);
        }
        price = price.join(', ');

        var html = `<div class="flex-element flex-container-column ${secret_class}" id="${key}_container">
                        <div class="flex-element flex-container-row ">
                            ${key.capitalizeFirstLetter()}
                            <div class="${secret_class}">: <span id="${key}level">${this.level}</span></div>
                        </div>
                        <div class="flex-element"><button onclick="${address}('${key}');">Up: ${price}</button></div>
                        <div class="flex-element">${this.text}</div>
                    </div>`;

        return html;
    };

    return this;
}
