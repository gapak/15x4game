

var buildings = {};
buildings.db = [];

function Building(name, types, price_ratio, price_resource, multiplying_formula, base_rate, text) {
    this.name = name;
    this.types = types; // [] of: simple, upgradable, maintainable
    this.price_ratio = price_ratio;
    this.price_resource = price_resource;
    this.multiplying_formula = multiplying_formula; // function() { return (1 + (Player[this.multiplying_skill] / 60); }
    this.base_rate = base_rate;
    this.text = text;

    this.workers = 0;
    this.level = 0;

    this.increase = function() {
        if (Player.volunteers < 1) {
            message('Not enough free volunteers');
        } else if (this.workers > Civilization.buildings.teamwork.level ) {
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
     //   console.log(this.price_resource, this.base_rate, this.level, this.price_ratio)
        cost[this.price_resource] = this.base_rate * (1 + Math.pow(this.level, this.price_ratio));
        return cost;
    };

    this.getEfficiency = function() {
        return this.workers * (1 + (0.1 * this.level)) * this.multiplying_formula();
    };

    this.getProductivity = function() {
        var adjustment = 10 / 60 / 60;
        //   console.log(this.name, rate, adjustment);
        return this.getEfficiency() * this.base_rate * adjustment;
    };

    return this;
}