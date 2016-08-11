

    var Civilization = {
    global_bonus: 0,

    updates: {
        communication: new Billet('communication', {culture: culture_rate}, 1.5, "Raises culture soft-cap."),
        attentiveness: new Billet('attentiveness', {culture: culture_rate}, 1.6, "Soften culture soft-cap."),
        teamwork: new Billet('teamwork', {culture: culture_rate}, 1.7, "Expands the maximum size of the teams."),
        sharing: new Billet('sharing', {culture: culture_rate * 10}, 1.8, "Expands maximum storage size."),
    },
    works: {
        popularization: new Workplace('popularization', {culture: culture_rate}, 1.3, "Slowly increase volunteers, consuming culture."),
        education: new Workplace('education', {culture: culture_rate}, 1.4, "Slowly increase knowledge, consuming culture."),
        motivation: new Workplace('motivation', {culture: culture_rate}, 1.5, "Increases global bonus, consuming culture."),
        activism: new Workplace('activism', {culture: culture_rate}, 1.6, "Decreases global bonus, slowly increase action points."),
    }
};

Civilization.tick = function() {
  //  console.log(Player, Civilization);
    Player.culture_rate = 0;

    this.global_bonus = 0;

    Player.culture_soft_cap = (Civilization.updates.communication.level) * 10;
    if (!Player.culture_soft_cap) Player.culture_soft_cap = 10;
    if (Player.culture_soft_cap < 10) Player.culture_soft_cap = 10;

    var soft_cap = Math.sqrt(Player.culture - Player.culture_soft_cap);
    Player.culture_rate = Civilization.getGlobalBonus() * Player.volunteers * 0.1 / (soft_cap ? (soft_cap / ((( Civilization.updates.attentiveness.level - 1) * 0.1) + 1)) : 1);
   // console.log(Player.culture_rate, Civilization.global_bonus, Player.volunteers, soft_cap);
    if (Player.culture_rate > 0) Player.reward('culture', Player.culture_rate, 1);

    if (Civilization.works.motivation.workers > 0 &&
        Player.withdraw('culture', Civilization.works.motivation.workers * 0.01, 1)) {
        Player.culture_rate -= Civilization.works.motivation.workers * 0.01;
        this.global_bonus += Civilization.works.motivation.getEfficiency() / Civilization.getGlobalBonus();
    }

    if (Civilization.works.activism.workers > 0) {
        Player.culture_rate -= Civilization.works.activism.workers * 0.01;
        this.global_bonus -= Civilization.works.activism.getEfficiency() / Civilization.getGlobalBonus();
        var debuff = Player.volunteers_memory * 1000 + Player.action_points * 1000 + (Player.likes + Player.design * 10 + Player.money * 100 + Player.ideas * 1000);
        Player.action_points += Civilization.works.activism.getEfficiency() * 10 / (1 + debuff);
    }

    if (Civilization.works.popularization.workers > 0 &&
        Player.withdraw('culture', Civilization.works.popularization.workers * 0.01, 1)) {
        Player.culture_rate -= Civilization.works.popularization.workers * 0.01;
        var new_volunteers = Civilization.works.popularization.getEfficiency() * 0.01 * Math.max(100, 200 - Player.volunteers_memory) / Math.pow(Player.volunteers_memory, 2);
        Gatherer.found(new_volunteers);
        Player.volunteers += new_volunteers;
        Player.volunteers_memory += new_volunteers;
    }

    if (Civilization.works.education.workers > 0 &&
        Player.withdraw('culture', Civilization.works.education.workers * 0.01, 1)) {
        Player.culture_rate -= Civilization.works.education.workers * 0.01;
        Player.revealSecret('knowledge');
        Player.knowledge += Civilization.works.education.getEfficiency() * 0.01 * 2 / (2 * (1 + Player.writing + Player.drawing + Player.programming + Player.management + 5*Player.knowledge + 0.5*Player.volunteers_memory));
    }

};

Civilization.getGlobalBonus = function() {
    return (1+(Civilization.global_bonus / 100));
};

Civilization.getHTML = function() {
    var html = `    <hr>
        <button class="collapsar" data-toggle="collapse" data-target="#culture_collapse">-</button>
        <div>Community. Global Bonus: <span id="global_bonus_indicator">${Civilization.global_bonus.toFixed(2)}</span>%</div>
        <div>Culture: <span id="culture_indicator">${Player.culture.toFixed(2)}</span>/<span id="culture_limit_indicator">${Player.culture_soft_cap.toFixed(2)}</span> (<span id="culture_rate_indicator">${Player.culture_rate.toFixed(2)}</span>/sec)</div>
        <div class="collapse in" id="culture_collapse">
            <div class="flex-container-column" id="culture">
                <div class="flex-container-row" id="culture_updates">`;

    for (var key in Civilization.updates) {
        var update = Civilization.updates[key];
        var secret_class = (Player.found_secrets.indexOf(update.name) == -1) ? " init_hidden " : "";
        html += update.getHTML(key, secret_class, 'Civilization.upgradeUpdate');
        /*
        var upgrade_cost = update.getUpgradeCost();
        for (var resource_name in upgrade_cost) break;
        var price = upgrade_cost[resource_name];


        html += `    <div class="flex-element flex-container-column ${secret_class}" id="${key}_container">
                        <div class="flex-element flex-container-row ">
                            ${key.capitalizeFirstLetter()}
                            <div class="${secret_class}">: <span id="${key}level">${update.level}</span></div>
                        </div>
                        <div class="flex-element"><button onclick="Civilization.upgradeUpdate('${key}');">Up: ${price.toFixed(2)} ${resource_name}</button></div>
                        <div class="flex-element">${update.text}</div>
                    </div>`;*/
    }

    html += `</div><br><div class="flex-container-row " id="culture_works">`;

    for (var key in Civilization.works) {
        var work = Civilization.works[key];
        var secret_class = (Player.found_secrets.indexOf(work.name) == -1) ? " init_hidden " : "";
        html += `    <div class="flex-element flex-container-column ${secret_class}" id="${key}_container">
                        <div class="flex-element flex-container-row ">
                            ${key.capitalizeFirstLetter()}
                            <div class="${secret_class}">: <span id="${key}level">${work.level}</span></div>
                        </div>`;

        var upgrade_cost = work.getUpgradeCost();
        for (var resource_name in upgrade_cost) break;
        var price = upgrade_cost[resource_name];

        html += `<div class="flex-element"><button onclick="Civilization.upgradeWork('${key}');">Up: ${price.toFixed(2)} ${resource_name}</button></div>`;
        html += `<div class="flex-element">
            <span id="${key}_volunteers">Workers: ${work.workers}/${Civilization.updates.teamwork.level}</span>
            <button class = "" onclick="Civilization.increaseWork('${key}');"> + </button>
            <button class = "" onclick="Civilization.decreaseWork('${key}');"> - </button>
            </div>`;
        html += `<div class="flex-element">${work.text}</div></div>`;
    }

    html += `</div></div></div>`;

    return html;
};

Civilization.upgradeUpdate = function(update) {
    this.updates[update].upgrade();
};

Civilization.getUpgradeCostUpdate = function(update) {
    return this.updates[update].getUpgradeCost();
};

Civilization.increaseWork = function(work) {
    this.works[work].increase();
};

Civilization.decreaseWork = function(work) {
    this.works[work].decrease();
};

Civilization.upgradeWork = function(work) {
    this.works[work].upgrade();
};

Civilization.getUpgradeCostWork = function(work) {
    return this.works[work].getUpgradeCost();
};


