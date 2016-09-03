
function Startup(name, label, size, text, cost, reward) {
    this.name = name;
    this.label = label;
    this.size = size;
    this.text = text;
    this.cost = cost;
    this.reward = reward;
    this.workplace = new Workplace(name, cost, ((size * 0.1) + 1.2), text);
}

Startup.generator = function (skill_name) {
    var sizes = ['solo', 'small', 'medium', 'big', 'gigantic'];

    var skill_level = Player[skill_name];
    var size = 0;

    var name = '';
    var label = '';
    var text = '';
    var cost = {};
    var reward = {};


    //function r(n) { return Math.floor(Math.random()*n); }


    if                               (skill_level < 15) {
        size = rand(1,2);
    } else if   (skill_level >= 15 && skill_level < 30) {
        size = rand(1,3);
    } else if   (skill_level >= 30 && skill_level < 45) {
        size = rand(1,4);
    } else if   (skill_level >= 45) {
        size = rand(1,5);
    }

    //console.log(size);

    for (var i = 0; i < size; i++) {
        var cost_res = resources[rand(0,3)];
        text += `Сonsumes ${cost_res}. `;
        cost[cost_res] = (cost[cost_res]) ? (resources_rates[cost_res] + cost[cost_res]) : resources_rates[cost_res];
        var reward_res = resources[rand(0,3)];
        text += `Produce ${reward_res}. `;
        reward[reward_res] = (reward[reward_res]) ? (resources_rates[reward_res] + reward[reward_res]) : resources_rates[reward_res];
    }

    name = skill_name + '_' + size;
    if (sizes < 0 && sizes > 4) alert(size);
    label = sizes[size].capitalizeFirstLetter() + ' ' + skill_name;

    console.log(cost, reward);
    return new Startup(name, label, size, text, cost, reward);
};

Startup.tick = function () {
    startups.db.forEach(function (startup, id) {
        if(startups.db[id].workplace.workers == 0) return false;
            var cost_per_tick = {};
            for (key in startups.db[id].cost) {
                cost_per_tick[key] = (startups.db[id].cost[key]) * adjustment;
            }

            var reward_per_tick = {};
            for (key in startups.db[id].reward) {
                reward_per_tick[key] = (startups.db[id].reward[key]) * adjustment;
            }

        if (Player.withdrawArray(cost_per_tick, 1)) Player.rewardArray(reward_per_tick, 1);    
    }); 
};

Startup.getHTML = function () {
    var html = `<hr>
        <button class="collapsar btn btn-default" data-toggle="collapse" data-target="#startups_collapse"></button>
        Startups:
        <div class="collapse in" id="startups_collapse">
            <div id="startups">`;

    //for (var key in Startup.workplace) {
    startups.db.forEach(function (startup, id, arr) {
        html += `<div class="startup_element">
            <span class="startup_name">${startup.label}.</span>
            <span class="startup_text"> "${startup.text}"</span>`;

        var upgrade_cost = Startup.getUpgradeCostWork(id);
        var price = [];
        for (var resource_name in upgrade_cost) {
            price.push(`${upgrade_cost[resource_name].toFixed(2)} ${resource_name}`);
        }
        price = price.join(', ');

        //console.log(upgrade_cost);
        html += `
        <div class="flex-element">
            <button class="btn btn-default" onclick="Startup.upgrade('${id}');">Up: ${price}</button>
        </div>

            <span id="${id}_volunteers">Workers: ${startups.db[id].workplace.workers}/${Civilization.updates.teamwork.level}</span>
            <button class="btn btn-default" onclick="Startup.increaseWorker('${id}');"> + </button>
            <button class="btn btn-default" onclick="Startup.decreaseWorker('${id}');"> - </button>
        </div>`;
    });

    html += `</div></div>`;
    return html;    
};


Startup.increaseWorker = function (id) {
    startups.db[id].workplace.increase();
};

Startup.decreaseWorker = function (id) {
    startups.db[id].workplace.decrease();
};

Startup.upgrade = function (id) {
    startups.db[id].workplace.upgrade();
};

Startup.getUpgradeCostWork = function(id) {
    return startups.db[id].workplace.getUpgradeCost();
};

