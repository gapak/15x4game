

var startups = {};

startups.db = [];

startups.found = function (skill_name) {
    Player.revealSecret('startups');

    var startup = Startup.generator(skill_name);
    startups.db.push(startup);
    return startup;
};






startups.do = function (name) {
    if (Player.action_points < 1) {
        message("Not enough action points.");
        return false;
    }

    console.log(name);

    var startup = startups.db.filter(function (val) {
        return (val.name == name) ? 1 : 0;
    })[0];

    console.log(startup);

    var cost_checked = 0;
    for (var key in startup.cost) {
        if (Player[key] > startup.cost[key]) {
            cost_checked++;
        }
        else {
            message("Not enough " + key + ".");
        }
    }

    if (cost_checked == startup.cost.length) {
        for (var key in startup.cost) {
            Player.withdraw(key, startup.cost[key]);
        }
        for (var key in startup.reward) {
            Player.reward(key, startup.reward[key]);
        }

        Player.action_points--;
    }

    console.log(startup);

};
