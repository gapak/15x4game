

var Castle = {
    in_battle: 0,
    current_wave_counter: 0,
    current_wave: [],
    battleground: [],
    base_hp: 100,
    towers: {
        mentoring: new Billet('mentoring', {likes: resources_rates.likes}, 1.2, "Enlighten the first enemy."),
        training: new Billet('training', {design: resources_rates.design}, 1.2, "Enlightens all not fanatical enemies."),
        revelation: new Billet('revelation', {money: resources_rates.money}, 1.2, "Enlighten the first fanatical enemy."),
        illumination: new Billet('illumination', {ideas: resources_rates.ideas}, 1.2, "Enlighten a random enemy.")
    }
};

Castle.tick = function() {
    if (this.battleground.length > 0) {
        var mass_damage = 0.01 * this.towers.mentoring.level;
        var first_damage = 0.1 * this.towers.training.level;
        var fanatic_damage = 0.1 * this.towers.revelation.level;
        var random_damage = 1 * this.towers.illumination.level;

        for (var id in this.battleground) break;
        this.battleground[id].hp.current -= first_damage;

        for (var id in this.battleground) {
            if (this.battleground[id].type == 'fanatic') {
                this.battleground[id].hp.current -= fanatic_damage;
                break;
            }
        }

        this.battleground[rand(0, this.battleground.length-1)].hp.current -= random_damage;

        this.battleground.forEach(function (unit, id) {
            this.battleground[id].hp.current -= mass_damage;

            if (this.battleground[id].hp.current < 0) {
                this.giveTrophy(this.battleground[id]);
                this.battleground.splice(id, 1);
            }
            else {
                if (this.battleground[id].progress < 100) {
                    this.battleground[id].progress += this.battleground[id].speed;
                    if (this.battleground[id].progress > 100) this.battleground[id].progress = 100;
                }
                else {
                    this.base_hp -= this.battleground[id].attack;
                }
            }

        }, this);
    }

    if (this.current_wave.length > 0) {
        this.battleground.push(this.current_wave.pop());
    }

    if (this.current_wave.length == 0 && this.battleground.length == 0) {
        this.in_battle = 0;
    }

};

Castle.getHTML = function() {
    var html = `    <hr>
        <button class="collapsar" data-toggle="collapse" data-target="#castle_collapse">-</button>
        <div>Education. Base HP: ${this.base_hp} Wave: ${this.current_wave_counter}. <button onclick="Castle.sendNextWave();">Next Wave</button></div>
        <div class="collapse in" id="castle_collapse">
            <div class="flex-container-column" id="castle">
                <div class="flex-container-row" id="castle_towers">`;

    for (var key in this.towers) {
        html += this.towers[key].getHTML(key, '', 'Castle.upgradeTower');
    }

    html +=    `</div>
                <div class="flex-container-column text-center" id="castle_enemies">`;

    if (this.battleground.length) html +=`<h3 class="flex-element">Classes:</h3>
                    <div class="flex-container-row">
                        <div class="flex-element">Name:</div>
                        <div class="flex-element">Type:</div>
                        <div class="flex-element">Progress:</div>
                        <div class="flex-element">Hp:</div>
                        <div class="flex-element">Dmg:</div>
                        <div class="flex-element">Speed:</div>
                    </div>
`;

    for (var key in this.battleground) {
        var enemy = this.battleground[key];
        html +=    `<div class="flex-container-row">
                        <div class="flex-element">${enemy.name}. </div>
                        <div class="flex-element">${enemy.type}. </div>
                        <div class="flex-element">${enemy.progress.toFixed(2)}%. </div>
                        <div class="flex-element">${enemy.hp.current.toFixed(2)}/${enemy.hp.max.toFixed(2)}. </div>
                        <div class="flex-element">${enemy.attack.toFixed(2)}. </div>
                        <div class="flex-element">${enemy.speed.toFixed(2)}. </div>
                    </div>
        `;
    }

    html += `</div></div>
        <div>
            Population: ${Player.td_trophy} 
        </div>

    </div>`;
    return html;
};

Castle.upgradeTower = function(tower) {
    this.towers[tower].upgrade();
};

Castle.sendNextWave = function() {
    this.in_battle = 1;
    this.current_wave_counter++;
    this.current_wave = this.current_wave.concat(this.generateWave());

};

Castle.generateWave = function () {
    var wave = [];

    var enemies = [
        {name: 'blockhead', type: 'normal', hp: {max: 10, current: 10}, attack: 1, speed: 1, progress: 0},
        {name: 'fool', type: 'fast', hp: {max: 5, current: 5}, attack: 1, speed: 2, progress: 0},
        {name: 'ignoramus', type: 'fanatic', hp: {max: 6, current: 6}, attack: 1.5, speed: 1, progress: 0},
        {name: 'breaker', type: 'tanked', hp: {max: 20, current: 20}, attack: 2, speed: 0.5, progress: 0},
        ];

    for (var i = 0; i < this.current_wave_counter; i++) {
        var enemy = enemies[rand(0, enemies.length-1)];

        var rate = 1 + (0.1 * Math.sqrt(this.current_wave_counter-1));

        enemy.hp.max *= rate;
        enemy.hp.current *= rate;
        enemy.attack *= rate;
        enemy.speed *= rate;


        wave.push(enemy);
    }
    return wave;
};

Castle.giveTrophy = function (enemy) {
    message('Trophy!');
    Player.td_trophy++;
};
