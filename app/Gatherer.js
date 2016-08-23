
var Gatherer = {
    collection: {},
    events: {
        knowledge_sharing: 0,
        hold_events: 0,

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

Gatherer.collect = function (resource, quantity) {
    if (this.collection[resource]) {
    this.collection[resource] += quantity;
    }
    else {
        this.collection[resource] = quantity;
    }
};

Gatherer.holdEvent = function () {
    this.events.hold_events++;
};

Gatherer.increaseSkill = function (skill, value) {
    this.events.increase_skill++;
};

Gatherer.increaseResource = function (resource, value) {
    var rate = 0;
    if (resource == 'culture') {
        rate = culture_rate * 10;
        if (Player[resource] - value < (rate / 10) && Player[resource] >= (rate / 10)  ) { Player.revealSecret('culture'); }
        if (Player[resource] - value < (rate * 1) && Player[resource] >= (rate * 1)  ) { badges.achieve(resource + " 1");  }
        if (Player[resource] - value < (rate * 10) && Player[resource] >= (rate * 10)  ) { badges.achieve(resource + " 2"); }
        if (Player[resource] - value < (rate * 100) && Player[resource] >= (rate * 100)  ) { badges.achieve(resource + " 3"); }
        if (Player[resource] - value < (rate * 1000) && Player[resource] >= (rate * 1000)  ) { badges.achieve(resource + " 4"); }
    }

    this.events.increase_resource++;
};


Gatherer.decrease = function (skill, value) {
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
    /*if (this.events.search < 15 && this.events.search + 1 >= 15) { badges.achieve(method + " 1"); }
    if (this.events.search < 30 && this.events.search + 1 >= 30) { badges.achieve(method + " 2"); }
    if (this.events.search < 45 && this.events.search + 1 >= 45) { badges.achieve(method + " 3"); }
    if (this.events.search < 60 && this.events.search + 1 >= 60) { badges.achieve(method + " 4"); }*/
    this.events.search++;
};

Gatherer.found = function (inflow) {
    return false;

    /*if (Player.volunteers_memory < 15 && Player.volunteers_memory + inflow >= 15) { badges.achieve("volunteers 1"); Player.revealSecret('education'); Player.revealSecret('teamwork'); }
    if (Player.volunteers_memory < 30 && Player.volunteers_memory + inflow >= 30) { badges.achieve("volunteers 2"); Player.revealSecret('departments'); }
    if (Player.volunteers_memory < 45 && Player.volunteers_memory + inflow >= 45) { badges.achieve("volunteers 3"); Player.revealSecret('motivation'); }
    if (Player.volunteers_memory < 60 && Player.volunteers_memory + inflow >= 60) { badges.achieve("volunteers 4"); Player.revealSecret('activism'); }
    */
};

Gatherer.tick = function () {
    this.events.ticks++;
};