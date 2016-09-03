

var Dungeon = {
    map: [],
    in_battle: 0,
    player_position: 0
};


Dungeon.mapGenerator = function () {
    this.map = [];
    this.player_position = 0;
    for (var i = 0; i < 100; i++) {
        if (rand(0, 5) != 0) {
            this.map[i] = {symbol: '_', unit: null};
        }
        else {
            this.map[i] = {symbol: '~', unit: null};
        }
    }
    this.map[0].special = 'enter';
    this.map[99].special = 'exit';
};

Dungeon.getBattlefieldString = function () {
    if (this.in_battle) {
        return this.getMapString();
    }
    else {
        return this.getMenuString();
    }
};

Dungeon.getMapString = function () {
    var map_string = '';
    var visible_area = this.getVisibleArea();

    visible_area.forEach(function (place, id) {
        map_string += Dungeon.getPlaceString(id);
    });

    return map_string;
};

Dungeon.getVisibleArea = function () {
    var shift = (this.player_position > 5) ? this.player_position - 5 : 0;
    var visible_area = [];

    this.map.forEach(function (place, id) {
        if (id >= shift && id < shift + 20) {
            visible_area[id] = place;
        }
    });

    return visible_area; // this.map.slice(shift, shift + 20);
};

Dungeon.getPlaceString = function (id) {
    var place = this.map[id];

    if (place.unit) { return place.unit.symbol; }
    if (place.special == 'enter') { return '0'; }
    if (place.special == 'exit') { return 'O'; }

    return place.symbol;
};

Dungeon.getMenuString = function () {
    return '<button class="btn btn-default" onclick="Dungeon.go();">Go to dungeon</button>';
};

Dungeon.go = function () {
    if (Player.action_points < 1) {
        message("Not enough action points.");
        return false;
    }

    Player.action_points--;
    this.mapGenerator();
    this.map[0].unit = Player.unit;
    this.in_battle = 1;
};

Dungeon.tick = function () {
    if (this.in_battle == 0) {
        return false;
    }
    else {
        var visible_area = this.getVisibleArea();

        var units = [];

        visible_area.forEach(function (place ,id) {
            units[id] = place.unit;
        });

        units.forEach(function (unit, id) {
            if (!unit) return false;
            //console.log(unit);
            unit.AI(id);
        });
    }
};

Dungeon.unitMove = function (from_id, to_id) {
    var unit =  this.map[from_id].unit;
    if (unit == Player.unit) this.player_position = to_id;
    this.map[to_id].unit = unit;
    this.map[from_id].unit = null;
};

Dungeon.exit = function () {
    this.in_battle = 0;
    Player.knowledge++;
};


