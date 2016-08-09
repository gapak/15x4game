

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

    return this;
}
