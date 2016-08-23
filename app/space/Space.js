

var SpaceHelper = {};

SpaceHelper.price_guide = {
    solar:  {iron: 80, oil: 90, uranium: 120, iridium: 110},
    orsala: {iron: 120, oil: 110, uranium: 80, iridium: 90},
};

SpaceHelper.generateMarket = function(base_prices) {
    return {
        'iron': SpaceHelper.generateOrder(base_prices.iron),
        'oil': SpaceHelper.generateOrder(base_prices.oil),
        'uranium': SpaceHelper.generateOrder(base_prices.uranium),
        'iridium': SpaceHelper.generateOrder(base_prices.iridium)
    };
};

SpaceHelper.generateOrder = function (base_price) {
    var count = rand(80, 120);
    var medium_price = parseInt(((100 * base_price) / count).toFixed(0));
    var sell_price = rand(medium_price, medium_price+10);
    var buy_price = rand(medium_price-10, medium_price);
    console.log(base_price, count, medium_price, sell_price, buy_price);
    return {'sell_price': sell_price, 'buy_price': buy_price, count: count};
};

SpaceHelper.generateBeltAction = function(type) {
    return {
        'name': 'Mine '+type,
        'code': function () {
            if (Player.ship.checkSpace()) {
                if (Player.withdrawEnthusiasm()) {
                    Player.ship.reward(type, 1);
                }
            }
        }
    }
};


var Space = {};

Space = {
    state: 'system', // warp, planet, system, flight

    current_system: 0,
    current_object: {id: 0, type: 'system'},

    flight: {
        counter: 0,
        length: 0,
        warp_active: 0,
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
                        services: {store: {}, trade: SpaceHelper.generateMarket(SpaceHelper.price_guide.solar)}
                    },
                    {
                        name: 'Earth', produce: 'oil',
                        action: {
                            name: 'Transform 1000 conventional units to 1 oil',
                            code: function () {
                                if (Player.ship.checkSpace()) {
                                    if (Player.withdraw('conventional_units', 1000)) {
                                        Player.ship.reward('oil', 1);
                                    }
                                }
                            }
                        },
                        services: {store: {}, trade: SpaceHelper.generateMarket(SpaceHelper.price_guide.solar)}
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
                        services: {store: {}, trade: SpaceHelper.generateMarket(SpaceHelper.price_guide.solar)}
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
                        services: {store: {}, trade: SpaceHelper.generateMarket(SpaceHelper.price_guide.solar)}
                    }
                ],

                stations: [
                    {
                        name: 'Education University',
                        action: {
                            name: 'Transform 1000 likes to 1 uranium',
                            code: function () {
                                if (Player.withdraw('likes', 1000)) {
                                    Player.ship.reward('uranium', 1);
                                }
                            }
                        },
                        services: {store: [], trade: SpaceHelper.generateMarket(SpaceHelper.price_guide.solar)}
                    },
                    {
                        name: 'Business Center',
                        action: {
                            name: 'Transform 10 money to 1 iridium',
                            code: function () {
                                if (Player.withdraw('money', 10)) {
                                    Player.ship.reward('iridium', 1);
                                }
                            }
                        },
                        services: {store: [], trade: SpaceHelper.generateMarket(SpaceHelper.price_guide.solar)}
                    }
                ],

                belts: [
                    {name: 'Main-belt', action: SpaceHelper.generateBeltAction('iron'), rocks: {name: 'iron', count: 60}},
                    {name: 'Greek camp', action: SpaceHelper.generateBeltAction('iron'), rocks: {name: 'iron', count: 60}},
                    {name: 'Trojan camp', action: SpaceHelper.generateBeltAction('iron'), rocks: {name: 'iron', count: 60}},
                    {name: 'Centaurs tribe', action: SpaceHelper.generateBeltAction('iron'), rocks: {name: 'iron', count: 60}}
                ]
            },
            {
                name: 'Orsala',

                planets: [
                    {
                        name: 'Gliese',
                        action: {
                            name: 'Transform 100 oil to 1 cultural reform',
                            code: function () {
                                if (Player.ship.withdraw('oil', 100)) {
                                    Player.reward('cultural_reform', 1);
                                }
                            }
                        },
                        services: {store: {}, trade: SpaceHelper.generateMarket(SpaceHelper.price_guide.orsala)}
                    },
                    {
                        name: 'Arette',
                        action: {
                            name: 'Transform 1000 conventional units to 1 iridium',
                            code: function () {
                                if (Player.withdraw('conventional_units', 1000)) {
                                    Player.ship.reward('iridium', 1);
                                }
                            }
                        },
                        services: {store: {}, trade: SpaceHelper.generateMarket(SpaceHelper.price_guide.orsala)}
                    },
                    {
                        name: 'Kepler',
                        action: {
                            name: 'Transform 1000 conventional units to Repair',
                            code: function () {
                                if (Player.withdraw('conventional_units', 1000)) {
                                    Player.ship.repair();
                                }
                            }
                        },
                        services: {store: {}, trade: SpaceHelper.generateMarket(SpaceHelper.price_guide.orsala)}
                    },
                    {
                        name: 'Ko Pur',
                        action: {
                            name: 'Transform 100 iron to 1 cultural concept',
                            code: function () {
                                if (Player.ship.withdraw('iron', 100)) {
                                    Player.reward('cultural_concept', 1);
                                }
                            }
                        },
                        services: {store: {}, trade: SpaceHelper.generateMarket(SpaceHelper.price_guide.orsala)}
                    }
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
                        services: {store: [], trade: SpaceHelper.generateMarket(SpaceHelper.price_guide.orsala)}
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
                        services: {store: [], trade: SpaceHelper.generateMarket(SpaceHelper.price_guide.orsala)}
                    }
                ],

                belts: [
                    {name: 'Main-belt', action: SpaceHelper.generateBeltAction('uranium'), rocks: {name: 'uranium', count: 60}},
                    {name: 'Maya camp', action: SpaceHelper.generateBeltAction('uranium'), rocks: {name: 'uranium', count: 60}},
                    {name: 'Aztec camp', action: SpaceHelper.generateBeltAction('uranium'), rocks: {name: 'uranium', count: 60}},
                    {name: 'Leviathan shore', action: SpaceHelper.generateBeltAction('uranium'), rocks: {name: 'uranium', count: 60}}
                ]
            }
        ]
    }
};

Space.tick = function () {
    if (this.state == 'flight') {
        this.flight.counter += this.calcSpeed();
        if (this.flight.counter >= this.flight.length) {
            message("Arrival!");
            this.flight_arrival_function();
        }
    }
};

Space.calcSpeed = function () {
    return (Player.ship.getSpeed()/100) * ((this.flight.warp_active ? 10 : 1));
};

Space.getHTML = function () {
    var html = `
    <hr>
    <button class="collapsar" data-toggle="collapse" data-target="#space_collapse">-</button>
    <div class="flex-element" id="space_title_container">${Space.getSpaceTitle()}</div>
    <div class="flex-element flex-container-row">`;

    space_resources.forEach(function (resource) {
        html += `
                <div class="flex-element">
                ${resource}: ${Player.ship.cargo.resources[resource]}`;
                if (['planet', 'station'].indexOf(Space.state) !== -1) {
                    var order = Space.getCurrentObject().services.trade[resource];
                    html += `
                        <button onclick="Space.buy('${resource}', ${order.count}, ${order.buy_price})">Buy ${order.buy_price}</button>
                        <button onclick="Space.sell('${resource}', ${order.count}, ${order.sell_price})">Sell ${order.sell_price}</button>
                        <span>in stock: ${order.count}</span>`;
                }
        html += `</div>`;
    });
    html += `</div>
    <div class="flex-element flex-container-row">
        <div class="flex-element">Cargo: ${Player.ship.getCargoFullness().toFixed(2)}/${Player.ship.getCargoCapacity()}</div>
        <div class="flex-element">Speed: ${(Space.calcSpeed()*100).toFixed(0)}/100</div>
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
        if (Space.flight.warp_active) {
            html += 'You in warp.';
        }
        else {
            html += 'You in flight.';
        }
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
            html +=`<div>Destination: ${Space.flight.target.obj.name} ${Space.flight.target.type}. </div>`;
            html +=`<div>Progress: ${Space.flight.counter.toFixed(0)}/${Space.flight.length} </div>`;
            if (Space.flight.warp_active !== 1) { html +=`<button onclick="Space.flyFast()">Activate Warp Drive</button>`; }
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
            html +=`<button onclick="Space.map.systems[${Space.current_system}]['${Space.current_object.type}s'][${Space.current_object.id}].action.code()">${Space.map.systems[Space.current_system][Space.current_object.type + 's'][Space.current_object.id].action.name}</button>`;
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


Space.getCurrentObject = function () {
    if (this.state == 'system') {
        return Space.map.systems[Space.current_system];
    }
    else {
        return Space.map.systems[Space.current_system][`${Space.current_object.type}s`][Space.current_object.id];
    }
};

Space.startFly = function(type, id) {
    console.log(type, id);
    this.state = 'flight';
    this.flight.target.type = type;
    this.flight.target.id = id;

    if (type == 'system') {
        this.flight.target.obj = Space.map.systems[id];
        if (Space.current_object.type == 'system') {
            this.current_system = id;
            this.flight.length = 420;
        }
        else {
            this.flight.length = 60;
        }
    }
    else {
        this.flight.target.obj = Space.map.systems[Space.current_system][type + 's'][id];
        this.flight.length = 60;
    }
    this.flight.counter = 0;
    this.flight_arrival_function = function () {
        Space.state = Space.flight.target.type;
        Space.current_object.id = Space.flight.target.id;
        Space.current_object.type = Space.flight.target.type;
        Space.flight.warp_active = 0;
        Space.flight.target = {id: null, type: null, obj: null};
    }


};

Space.flyFast = function() {
    if (Player.action_points < 1) {
        message("Not enough action points.");
        return false;
    }
    message('Warp drive active');
    Player.action_points--;
    Space.flight.warp_active = 1;
};

Space.start = function() {
    this.startFly('system', this.current_system);
};

Space.buy = function(resource, count, price) {
    if (!Player.ship.checkSpace()) return false;

    if (count < 1) {
        message(resource.capitalizeFirstLetter() + " out of stock")
        return false;
    }

    if (Player.withdraw('conventional_units', price)) {
        Space.getCurrentObject().services.trade[resource].count--;
        Player.ship.reward(resource, 1);
    }
};

Space.sell = function(resource, count, price) {
    if (Player.ship.withdraw(resource, 1)) {
        Player.reward('conventional_units', price)
    }
};





