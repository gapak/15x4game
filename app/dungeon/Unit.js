
function Unit () {
    this.team = ''; // ally, enemy
    this.symbol = '';

    this.skills = {
        weapon: 0,
        armor: 0,
        hp: 0,
        mp: 0
    };

    this.weapon = {
        sword: 0,
        shield: 0,
        bow: 0,
        staff: 0
    };

    this.armor = {
        helm: 0,
        chest: 0,
        gloves: 0,
        boots: 0
    };

    this.bottles = {
        hp: 0,
        mp: 0,
        rage: 0,
        firebomb: 0
    };

    this.magic = {
        heal: 0,
        wave: 0,
        rage: 0,
        fireball: 0
    };

    this.hp = {current: 0, max: 0};
    this.mp = {current: 0, max: 0};
    this.stamina = {current: 0, max: 0};
    this.poise = {current: 0, max: 0};

    this.effects = {
        heal: {tick: 0, power: 0},
        rage: {tick: 0, power: 0}
    };

    this.getDamage = function (range) {
        if (range == 1) {
            return Math.max(this.getDamageFromSword(), this.getDamageFromStaffMelee());
        } else if (range <= 5) {
            return Math.max(this.getDamageFromBow(), this.getDamageFromStaffRange());
        } else if (range <= 10) {
            return this.getDamageFromBow();
        }
        else {
            return 0;
        }
    };

    this.getDamageFromSword = function () {
        return 20;
    };

    this.getDamageFromBow = function () {
        return 10;
    };

    this.getDamageFromStaffRange = function () {
        return 15;
    };

    this.getDamageFromStaffMelee = function () {
        return 5;
    };


    this.getDefFloat = function () {
        return 0;
    };

    this.getDefPercent = function () {
        return 0;
    };

    this.getDefChanceBoots = function () {
        return 0;
    };

    this.getDefChanceShield = function () {
        return 0;
    };

    this.AI = function (id) {
        if (this.team == 'ally') {
            if (Dungeon.map[id].special == 'exit') {
                message('exit');
                if (this == Player.unit) Dungeon.exit();
            }
            else if (Dungeon.map[id + 1].unit) {
                message('fight');
            }
            else {
                message('clear');
                Dungeon.unitMove(id, id + 1);
            }
        }
        else {
            //return false;
        }
    };

}

