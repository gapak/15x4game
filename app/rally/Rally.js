

var RallyHelper = {};
RallyHelper.generateTrack = function() {
    var track = [];
    track.push({type: 'line', speed: 150, curve: 0, length: 1000});
    track.push({type: 'dirt', speed: 80, curve: 45, length: 600});
    track.push({type: 'hill', speed: 50, curve: 90, length: 300});
    track.push({type: 'road', speed: 100, curve: 30, length: 800});
    return track;
};


var Rally = {
    skills: {
        attention: new Billet('attention', {race_win_points: 1}, 0, ''),
        coordination: new Billet('coordination', {race_win_points: 1}, 0, ''),
        concentration: new Billet('concentration', {race_win_points: 1}, 0, ''),
        perception: new Billet('perception', {race_win_points: 1}, 0, '')},
    car: {
        wheels: new Billet('wheels', {likes: resources_rates.likes}, 1.5, ''),
        transmission: new Billet('transmission', {design: resources_rates.design}, 1.5, ''),
        engine: new Billet('engine', {money: resources_rates.money}, 1.5, ''),
        electronic: new Billet('electronic', {ideas: resources_rates.ideas}, 1.5, '')},
    strategies: {
        stable: {attention: 10, coordination: -5, concentration: -5, perception: 0},
        dynamic: {attention: -5, coordination: 10, concentration: 0, perception: -5},
        fast: {attention: -5, coordination: 0, concentration: 10, perception: -5},
        safe: {attention: 0, coordination: -5, concentration: -5, perception: 10}},
    current_strategy: 'dynamic',
    in_race: 0,
    track: RallyHelper.generateTrack(),
    current_part: null,
    current_speed: 0

};

Rally.tick = function () {
    if (this.in_race) {
        var max_speed = this.getMaxSpeed();
        if (this.current_speed < max_speed) {
            this.current_speed += (1 / (max_speed / (max_speed - this.current_speed))) * this.getAcceleration();
        }
        else {
            this.current_speed -= (1 / (max_speed / (max_speed - this.current_speed))) * 2 * this.getAcceleration();
        }
    }
};

Rally.getHTML = function () {
    var html = `    
    <hr>
    <button class="collapsar btn btn-default" data-toggle="collapse" data-target="#rally_collapse"></button>
    Rally. Wins: ${Player.race_win_points_memory}, new wins: ${Player.race_win_points}.
    <div class="collapse in" id="rally_collapse">
        <div id="rally" class="flex-container-column">`;
    html += `
            <div>
                <div class="flex-element flex-container-column">`;

    html += `<div class="flex-element flex-container-row">`;
    for (var skill_id in this.skills) {
        var skill = this.skills[skill_id];
        var upd_button = (Player.race_win_points >= 1) ? `<button class="btn btn-default" onclick="Rally.upgradeSkill('${skill_id}')">Up</button>` : '';
        html += `
                <div class="flex-element">
                Skill ${skill.name}: ${skill.level} ${upd_button}
                </div>`;
    }
    html += `</div>`;

    html += `<div class="flex-element flex-container-row">`;
    for (var part_id in this.car) {
        var part = this.car[part_id];
        var upd_button = `<button class="btn btn-default" onclick="Rally.upgradeCar('${part_id}')">Up: ${JSON.stringify(Rally.getUpgradeCost(part_id))}</button>`;
        html += `
                <div class="flex-element">
                Part ${part.name}: ${part.level} ${upd_button}
                </div>`;
    }
    html += `</div>`;

    if (this.in_race) {
        html += `<h3 class="flex-element text-center">Lap: 0/10</h3>`;
        html += `<div class="flex-element flex-container-row">`;
        for (var strategy_id in this.strategies) {
            var strategy = this.strategies[strategy_id];
            var strategy_lable = (this.current_strategy == strategy_id) ? "Selected" : '<button class="btn btn-default" onclick="Rally.selectStrategy(\'' + strategy_id + '\');">Select</button>';

            html += `
                    <div class="flex-element">
                        ${strategy_lable} ${strategy_id} strategy
                    </div>`;
        }
        html += `</div>`;

        html += `    <div class="flex-element flex-container-row">
                         <h3 class="flex-element text-center">Drift: ${Rally.getDrift().toFixed(2)}%</h3>
                         <h3 class="flex-element text-center">Speed: ${Rally.getSpeed().toFixed(2)}</h3>
                         <h3 class="flex-element text-center">Flip: ${Rally.getFlip().toFixed(2)}%</h3>
                     </div>`;

        html += `</div>`;
    }
    else {
        html += '       <button class="btn btn-default" onclick="Rally.start();">Start Rally</button>';
    }
        html += `   </div>
                </div>
            </div>
        </div>`;
    return html;
};

Rally.start = function () {
    if (Player.action_points < 1) {
        message("Not enough action points.");
        return false;
    }

    Player.action_points--;
    this.in_race = 1;
    this.current_part = this.track[0];
};

Rally.selectStrategy = function (strategy_id) {
    this.current_strategy = strategy_id;
};

Rally.getSpeed = function () {
    return this.current_speed;
};

Rally.getMaxSpeed = function() {
    return 100 + this.car.engine.level + this.skills.concentration.level + this.strategies[this.current_strategy].concentration;
};

Rally.getAcceleration = function() {
    return 10 + this.car.transmission.level + this.skills.coordination.level + this.strategies[this.current_strategy].coordination;
};

Rally.getDrift = function () {
    return this.current_speed * this.current_part.curve * 0.1 * (60 - (this.car.wheels.level + this.skills.attention.level + this.strategies[this.current_strategy].attention));
};

Rally.getFlip = function () {
    return this.current_speed * this.current_part.curve * 0.01 * (60 - (this.car.electronic.level + this.skills.perception.level + this.strategies[this.current_strategy].perception));
};


Rally.upgradeSkill = function(part) {
    this.skills[part].upgrade();
};

Rally.upgradeCar = function(part) {
    this.car[part].upgrade();
};

Rally.getUpgradeCost = function(part) {
    return Rally.car[part].getUpgradeCost();
};
