
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