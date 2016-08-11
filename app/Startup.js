
function Startup(name, label, size, text, cost, reward) {
    this.name = name;
    this.label = label;
    this.size = size;
    this.text = text;
    this.cost = cost;
    this.reward = reward;
    this.workplace = new Workplace(name, up_cost, ((size * 0.1) + 1.2), text);
}

Startup.generator = function (skill_name) {
    var sizes = ['solo', 'small', 'medium', 'big', 'gigantic'];

    var skill_level = Player[skill_name];
    var size = 0;

    var name = '';
    var label = '';
    var text = 'qwerty';
    var cost = {};
    var reward = {};


    function r(n) { return Math.floor(Math.random()*n); }


    if          (skill_level >= 0 && skill_level < 15) {
        size = r(2);
    } else if   (skill_level >= 15 && skill_level < 30) {
        size = r(2)+1;
    } else if   (skill_level >= 30 && skill_level < 45) {
        size = r(2)+2;
    } else if   (skill_level >= 45 && skill_level < 60) {
        size = r(2)+3;
    }

    console.log(size);

    for (var i = 0; i < size; i ++) {
        var cost_res = Object.keys(resources_rates)[r(4)];
        cost[cost_res] = resources_rates[cost_res];
        var reward_res = Object.keys(resources_rates)[r(4)];
        reward[reward_res] = resources_rates[reward_res];
    }

    name = skill_name + '_' + size;
    label = sizes[size].capitalizeFirstLetter() + ' ' + skill_name;

    return new Startup(name, label, size, text, cost, reward);
};

