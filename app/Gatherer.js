
var Gatherer = {
    events: {
        learn: {selfStudy: 0, books: 0, work: 0, petProject: 0},
        increase: 0,
        increase_skill: 0,
        increase_resource: 0,
        decrease: 0,
        ticks: 0,
        found: 0,
        search: 0
    }
};

Gatherer.increaseSkill = function (skill, value) {
    if (Player[skill] - value < 15 && Player[skill] >= 15 ) { badges.achieve(skill + " 1"); }
    if (Player[skill] - value < 30 && Player[skill] >= 30 ) { badges.achieve(skill + " 2"); }
    if (Player[skill] - value < 45 && Player[skill] >= 45 ) { badges.achieve(skill + " 3"); }
    if (Player[skill] - value < 60 && Player[skill] >= 60 ) { badges.achieve(skill + " 4"); }

    if (this.events.increase_skill < 15 && this.events.increase_skill + 1 >= 15 ) { badges.achieve("learn 1"); }
    if (this.events.increase_skill < 30 && this.events.increase_skill + 1 >= 30 ) { badges.achieve("learn 2"); }
    if (this.events.increase_skill < 45 && this.events.increase_skill + 1 >= 45 ) { badges.achieve("learn 3"); }
    if (this.events.increase_skill < 60 && this.events.increase_skill + 1 >= 60 ) { badges.achieve("learn 4"); }

    this.events.increase_skill++;
};

Gatherer.increaseResource = function (resource, value) {
    
    if (Player[resource] - value < (resources_rates[resource] * 1) && Player[resource] >= (resources_rates[resource] * 1)  ) { badges.achieve(resource + " 1"); }
    if (Player[resource] - value < (resources_rates[resource] * 10) && Player[resource] >= (resources_rates[resource] * 10)  ) { badges.achieve(resource + " 2"); }
    if (Player[resource] - value < (resources_rates[resource] * 100) && Player[resource] >= (resources_rates[resource] * 100)  ) { badges.achieve(resource + " 3"); }
    if (Player[resource] - value < (resources_rates[resource] * 1000) && Player[resource] >= (resources_rates[resource] * 1000)  ) { badges.achieve(resource + " 4"); }

    if (this.events.increase_resource < 100 && this.events.increase_resource + 1 >= 100 ) { badges.achieve("resources 1"); Player.revealSecret('sharing'); }
    if (this.events.increase_resource < 1000 && this.events.increase_resource + 1 >= 1000 ) { badges.achieve("resources 2");  Player.revealSecret('objectives'); }
    if (this.events.increase_resource < 10000 && this.events.increase_resource + 1 >= 10000 ) { badges.achieve("resources 3"); }
    if (this.events.increase_resource < 100000 && this.events.increase_resource + 1 >= 100000 ) { badges.achieve("resources 4"); }

    this.events.increase_resource++;
};


Gatherer.decrease = function (skill, value) {
    /*
    if (Player[skill] < 15 && Player[skill] + value >= 15 ) { badges.achieve(skill + " 1"); }
    if (Player[skill] < 30 && Player[skill] + value >= 30 ) { badges.achieve(skill + " 2"); }
    if (Player[skill] < 45 && Player[skill] + value >= 45 ) { badges.achieve(skill + " 3"); }
    if (Player[skill] < 60 && Player[skill] + value >= 60 ) { badges.achieve(skill + " 4"); }
    */
    this.events.decrease++;
};

Gatherer.learn = function (method) {
    if (this.events.learn[method] < 15 && this.events.learn[method] + 1 >= 15) { badges.achieve(method + " 1"); }
    if (this.events.learn[method] < 30 && this.events.learn[method] + 1 >= 30) { badges.achieve(method + " 2"); }
    if (this.events.learn[method] < 45 && this.events.learn[method] + 1 >= 45) { badges.achieve(method + " 3"); }
    if (this.events.learn[method] < 60 && this.events.learn[method] + 1 >= 60) { badges.achieve(method + " 4"); }
    this.events.learn[method]++;
};

Gatherer.search = function () { // ?
    if (this.events.search < 15 && this.events.search + 1 >= 15) { badges.achieve(method + " 1"); }
    if (this.events.search < 30 && this.events.search + 1 >= 30) { badges.achieve(method + " 2"); }
    if (this.events.search < 45 && this.events.search + 1 >= 45) { badges.achieve(method + " 3"); }
    if (this.events.search < 60 && this.events.search + 1 >= 60) { badges.achieve(method + " 4"); }
    this.events.search++;
};

Gatherer.found = function () {
    if (this.events.found < 15 && this.events.found + 1 >= 15) { badges.achieve("volunteers 1"); Player.revealSecret('departments'); }
    if (this.events.found < 30 && this.events.found + 1 >= 30) { badges.achieve("volunteers 2"); }
    if (this.events.found < 45 && this.events.found + 1 >= 45) { badges.achieve("volunteers 3"); Player.revealSecret('motivation'); }
    if (this.events.found < 60 && this.events.found + 1 >= 60) { badges.achieve("volunteers 4"); }
    this.events.found++;
};

Gatherer.tick = function () {
    if (this.events.ticks < 7 && this.events.ticks + 1 >= 7 ) { badges.achieve("tick 1"); Event.invent(); Player.revealSecret('culture'); }
    if (this.events.ticks < 30 && this.events.ticks + 1 >= 30 ) { badges.achieve("tick 1");    }
    if (this.events.ticks < 356 && this.events.ticks + 1 >= 356 ) { badges.achieve("tick 2"); Player.revealSecret('upgrade_department'); Player.revealSecret('cancel_event'); }
    if (this.events.ticks < 356*10 && this.events.ticks + 1 >= 356*10 ) { badges.achieve("tick 3"); Player.revealSecret('invent'); }
    if (this.events.ticks < 356*100 && this.events.ticks + 1 >= 356*100 ) { badges.achieve("tick 4"); }
    this.events.ticks++;
};