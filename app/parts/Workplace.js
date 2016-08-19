

function Workplace(name, base_cost_array, cost_grow_rate, text) {
    Billet.apply(this, arguments);


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
        return Civilization.getHappiness() * this.workers * (1 + (0.1 * this.level));
    };

    this.getProductivity = function() {
        var adjustment = 10 / 60 / 60;
        //   console.log(this.name, rate, adjustment);
        return this.getEfficiency() * this.base_rate * adjustment;
    };

    return this;
}

//Workplace.prototype = Object.create(Billet.prototype);
//Workplace.prototype.constructor = Workplace;
