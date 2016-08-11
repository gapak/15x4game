


var SpaceHelper = {};
SpaceHelper.generateMarket = function() {
    return {'iron': {price: 100, count: 100}, 'oil': {price: 100, count: 100}, 'uranium': {price: 100, count: 100}, 'iridium': {price: 100, count: 100}};
};


var Space = {};

Space = {
    state: 'system', // warp, planet, system, flight

    current_system: 0,
    current_object: {id: 0, type: 'system'},

    flight: {
        counter: 0,
        length: 0,
        target: {id: null, type: null, obj: null},
        arrival_function: {}
    },

    map: {
        systems: [
            {
                name: 'Solar',

                planets: [
                    {
                        name: 'Venus',
                        action: {
                            name: 'Transform 100 iridium to 1 cultural project',
                            code: function () {
                                if (Player.ship.withdraw('iridium', 100)) {
                                    Player.reward('cultural_project', 1);
                                }
                            }
                        },
                        services: {store: {}, trade: {}}
                    },
                    {
                        name: 'Earth', produce: 'oil',
                        action: {
                            name: 'Transform 1000 conventional units to 1 oil',
                            code: function () {
                                if (Player.withdraw('conventional_units', 1000)) {
                                    Player.ship.reward('oil', 1);
                                }
                            }
                        },
                        services: {store: {}, trade: {}}
                    },
                    {
                        name: 'Mars',
                        action: {
                            name: 'Transform 1000 conventional units to Repair',
                            code: function () {
                                if (Player.withdraw('conventional_units', 1000)) {
                                    Player.ship.repair();
                                }
                            }
                        },
                        services: {store: {}, trade: {}}
                    },
                    {
                        name: 'Titan',
                        action: {
                            name: 'Transform 100 uranium to 1 cultural approval',
                            code: function () {
                                if (Player.ship.withdraw('uranium', 100)) {
                                    Player.reward('cultural_approval', 1);
                                }
                            }
                        },
                        services: {store: {}, trade: {}}
                    }
                ],

                stations: [
                    {
                        name: 'Education University',
                        action: {
                            name: 'Transform 100 likes to 1 uranium',
                            code: function () {
                                if (Player.withdraw('likes', 1000)) {
                                    Player.ship.reward('uranium', 1);
                                }
                            }
                        },
                        services: {store: [], trade: {}}
                    },
                    {
                        name: 'Business Center',
                        action: {
                            name: 'Transform 10 money to 1 iridium',
                            code: function () {
                                if (Player.withdraw('money', 10)) {
                                    Player.ship.reward('iridium,', 1);
                                }
                            }
                        },
                        services: {store: [], trade: {}}
                    }
                ],

                belts: [
                    {name: 'Main-belt', produce: 'iron', rocks: []},
                    {name: 'Greek camp', produce: 'iron', rocks: []},
                    {name: 'Trojan camp', produce: 'iron', rocks: []},
                    {name: 'Centaurs tribe', produce: 'iron', rocks: []}
                ]
            },
            {
                name: 'Orsala',

                planets: [
                    {name: 'Gliese',
                        action: {
                            name: 'Transform 100 oil to 1 cultural reform',
                            code: function () {
                                if (Player.ship.withdraw('oil', 100)) {
                                    Player.reward('cultural_reform', 1);
                                }
                            }
                        },
                        services: {store: {}, trade: {}}},
                    {
                        name: 'Arette',
                        produce: 'iridium',
                        action: {
                            name: 'Transform 1000 conventional units to 1 iridium',
                            code: function () {
                                if (Player.withdraw('conventional_units', 1000)) {
                                    Player.ship.reward('iridium', 1);
                                }
                            }
                        },
                        services: {store: {}, trade: {}}
                    },
                    {name: 'Kepler',
                        action: {
                            name: 'Transform 1000 conventional units to Repair',
                            code: function () {
                                if (Player.withdraw('conventional_units', 1000)) {
                                    Player.ship.repair();
                                }
                            }
                        },
                        services: {store: {}, trade: {}}},
                    {name: 'Ko Pur',
                        action: {
                            name: 'Transform 100 iron to 1 cultural concept',
                            code: function () {
                                if (Player.ship.withdraw('iron', 100)) {
                                    Player.reward('cultural_concept', 1);
                                }
                            }
                        },
                        services: {store: {}, trade: {}}}
                ],

                stations: [
                    {
                        name: 'Science Observational',
                        action: {
                            name: 'Transform 100 design to 1 iron',
                            code: function () {
                                if (Player.withdraw('design', 100)) {
                                    Player.ship.reward('iron', 1);
                                }
                            }
                        },
                        services: {store: [], trade: SpaceHelper.generateMarket()}
                    },
                    {
                        name: 'Pirate Hangout',
                        action: {
                            name: 'Transform 1 ideas to 1 oil',
                            code: function () {
                                if (Player.withdraw('ideas', 1)) {
                                    Player.ship.reward('oil', 1);
                                }
                            }
                        },
                        services: {store: [], trade: {}}
                    }
                ],

                belts: [
                    {name: 'Main-belt', produce: 'uranium', rocks: []},
                    {name: 'Maya camp', produce: 'uranium', rocks: []},
                    {name: 'Aztec camp', produce: 'uranium', rocks: []},
                    {name: 'Leviathan shore', produce: 'uranium', rocks: []}
                ]
            }
        ]
    }
};

Space.tick = function () {
    if (this.state == 'flight') {
        this.flight.counter++;
        if (this.flight.counter == this.flight.length) {
            message("Arrival!");
            this.flight_arrival_function();
        }
    }
};

Space.getHTML = function () {
    var html = `
    <hr>
    <button class="collapsar" data-toggle="collapse" data-target="#space_collapse">-</button>
    <div class="flex-element" id="space_title_container">${Space.getSpaceTitle()}</div>
    <div class="flex-element flex-container-row">`;
    space_resources.forEach(function (resource) {
        var secret_class = (['planet', 'station'].indexOf(Space.state) == -1) ? ' init_secret ' : ' ';
        html += `
                <div class="flex-element">
                ${resource}: ${Player.ship.cargo.resources[resource]}
                <button class="${secret_class}" onclick="Space.buy('${resource}')">buy</button>
                <button class="${secret_class}" onclick="Space.sell('${resource}')">sell</button>
                </div>`;
    });
    html += `</div>
    <div class="flex-element flex-container-row">
        <div class="flex-element">Cargo: ${Player.ship.getCargoFullness()}/${Player.ship.getCargoCapacity()}</div>
        <div class="flex-element">Speed: 100/100</div>
        <div class="flex-element">Armor: 100/100</div>
        <div class="flex-element">Shield: 100/100</div>
    </div>
    <div class="collapse in" id="space_collapse">
        <div id="space_content_container" class="flex-container-column">
            ${Space.getSpaceString()}
        </div>
    </div>`;
    return html;
};



Space.getSpaceTitle = function () {
    var html = `Space. `;



    if (Space.state == 'flight') {
        html += 'You in warp.';
    }
    else {
        if (Space.current_object.type == 'system') {
            html += `You in ${Space.map.systems[Space.current_system].name} system. `;
        }
        else {
            var name = Space.map
            html += `You in ${Space.map.systems[Space.current_system][Space.current_object.type + 's'][Space.current_object.id].name} ${Space.current_object.type}. `;
        }
    }
    html += `You Conventional Units: ${Player.conventional_units}`;
    return html;
};


Space.getSpaceString = function () {
    var states = {
        system: function () {
            var html = `
            <div class="flex-element flex-container-column">
                <div class="flex-element flex-container-column">`;
            Space.map.systems[Space.current_system].planets.forEach(function (planet, id) {
                html += `<div><button onclick="Space.startFly('planet', ${id})">Fly</button> to ${planet.name} planet</div>`;
            });
            Space.map.systems[Space.current_system].belts.forEach(function (belt, id) {
                html += `<div><button onclick="Space.startFly('belt', ${id})">Fly</button> to ${belt.name} belt</div>`;
            });
            Space.map.systems[Space.current_system].stations.forEach(function (station, id) {
                html += `<div><button onclick="Space.startFly('station', ${id})">Fly</button> to ${station.name} station</div>`;
            });
            Space.map.systems.forEach(function (system, id) {
                if (id == Space.current_system) return;
                html += `<div><button onclick="Space.startFly('system', ${id})">Jump</button> to ${system.name} system</div>`;
            });
            html +=`</div></div>`;
            return html;
        },
        flight: function () {
            var html = `
            <div class="flex-element flex-container-column">
                <div class="flex-element flex-container-column">`;
            html +=`<div>Sped: ${Player.ship.getSpeed()}. </div>`;
            html +=`<div>Destination: ${Space.flight.target.obj.name} ${Space.flight.target.type}. </div>`;
            html +=`<div>Progress: ${Space.flight.counter}/${Space.flight.length} </div>`;
            html +=`</div></div>`;
            return html;
        },
        planet: function () {
            var html = `
            <div class="flex-element flex-container-column">
                <div class="flex-element flex-container-column">`;
            html +=`<button onclick="Space.map.systems[${Space.current_system}]['${Space.current_object.type}s'][${Space.current_object.id}].action.code()">${Space.map.systems[Space.current_system][Space.current_object.type + 's'][Space.current_object.id].action.name}</button>`;
            html +=`<button onclick="Space.start()">Start from the planet</button>`;
            html +=`</div></div>`;
            return html;
        },
        belt: function () {
            var html = `
            <div class="flex-element flex-container-column">
                <div class="flex-element flex-container-column">`;
            html +=`<button onclick="Space.start()">Moving away from the belt.</button>`;
            html +=`</div></div>`;
            return html;
        },
        station: function () {
            var html = `
            <div class="flex-element flex-container-column">
                <div class="flex-element flex-container-column">`;
            html +=`<button onclick="Space.map.systems[${Space.current_system}]['${Space.current_object.type}s'][${Space.current_object.id}].action.code()">${Space.map.systems[Space.current_system][Space.current_object.type + 's'][Space.current_object.id].action.name}</button>`;
            html +=`<button onclick="Space.start()">Start from the station</button>`;
            html +=`</div></div>`;
            return html;
        },
    };

    return states[this.state]();
};

Space.startFly = function(type, id) {
    console.log(type, id);
    this.state = 'flight';
    this.flight.target.type = type;
    this.flight.target.id = id;

    if (type == 'system') {
        this.flight.target.obj = Space.map.systems[id];
        this.current_system = id;
    }
    else {
        this.flight.target.obj = Space.map.systems[Space.current_system][type + 's'][id];
    }
    this.flight.counter = 0;
    this.flight.length = 5;
    this.flight_arrival_function = function () {
        Space.state = Space.flight.target.type;
        Space.current_object.id = Space.flight.target.id;
        Space.current_object.type = Space.flight.target.type;
        Space.flight.target = {id: null, type: null, obj: null};
    }


};

Space.start = function() {
    this.startFly('system', this.current_system);
};

Space.buy = function (resource) {
    var count = 0;
    var price = 0;
    if (Player.withdraw('conventional_units', price)) {
        Player.ship.reward('iridium', count);
    }
};

Space.sell = function (resource) {
    var count = 0;
    var price = 0;
    if (Player.ship.withdraw('iridium', count)) {

        Player.withdraw('conventional_units', price)
    }
};





