
var actions = {};
actions.db = [

    // raw work
    new Action("Rewriting", "Trying to get some resources. Writing boring texts for which no one will give money.", ["writing 1"], function(){actions.rawWork("writing");}),
    new Action("Logo Drawing", "Trying to get some resources. Seven logo options, zero sane.", ["drawing 1"], function(){actions.rawWork("drawing");}),
    new Action("Coding", "Trying to get some resources. define(true, false); // Happy debugging!", ["programming 1"], function(){actions.rawWork("programming");}),
    new Action("Calling", "Trying to get some resources. Cold sale as the heart of the former girlfriend.", ["management 1"], function(){actions.rawWork("management");}),


    // writing
    new Action("Likes to random", "Transform likes to random. You newer know!", ["writing 1"], function () {actions.randomReward("writing");}),
    new Action("Likes to design", "Fun-art. Win or fail: You newer know!", ["writing 2"], function () {actions.shiftReward("writing", 1);}),
    new Action("Likes to money", "Call for assistance. The right to give money 15x4 must be earned.", ["writing 3"], function () {actions.shiftReward("writing", 2);}),
    new Action("Likes to ideas", "Fest video. Viral video about our community.", ["writing 4"], function () {actions.shiftReward("writing", 3);}),

    // drawing
    new Action("Design to random", "Transform design to random. You newer know!", ["drawing 1"], function () {actions.randomReward("drawing");}),
    new Action("Design to likes", "Posters for the Event. DIN font, neat style, bold colors.", ["drawing 2"], function () {actions.shiftReward("drawing", 3);}),
    new Action("Design to ideas", "Kat's pictures. Picture for ideas search post.", ["drawing 3"], function () {actions.shiftReward("drawing", 2);}),
    new Action("Design to money", "Design to money", ["drawing 4"], function () {actions.shiftReward("drawing", 1);}),

    // programming
    new Action("Money to random", "Transform money to random. You newer know!", ["programming 1"], function () {actions.randomReward("programming");}),
    new Action("Money to design", "Apples for repetition. Twenty kilograms of apples. Popularization never been so heavy.", ["programming 2"], function () {actions.shiftReward("programming", 3);}),
    new Action("Money to ideas", "Advertising. We all hate adds", ["programming 3"], function () {actions.shiftReward("programming", 1);}),
    new Action("Money to likes", "Order merchandising. Full set of pen, notebook and t-shirt!", ["programming 4"], function () {actions.shiftReward("programming", 2);}),

    // management
    new Action("Ideas to random", "Transform ideas to random. You newer know!", ["management 1"], function () {actions.randomReward("management");}),
    new Action("Ideas to likes", "We all together are 15x4.", ["management 2"], function () {actions.shiftReward("management", 1);}),
    new Action("Ideas to money", "Astronomical Event. Looking stars in night.", ["management 3"], function () {actions.shiftReward("management", 3);}),
    new Action("Ideas to design", "It is necessary to draw it up yesterday.", ["management 4"], function () {actions.shiftReward("management", 2);}),


    // special
    new Action("Dark Ritual", "You have waited your reward.", ["tick 4"], function(){
        if (Player.volunteers >= 1) {
            Player.volunteers--;
            Player.will++;
            draw_all();
            message('Your will has been strengthened by infernal knowledge.');
        }
        else {
            message('Not enough free volunteers');
        }
    })

];





actions.do = function (name) {
    if (Player.action_points < 1) {
        message("Not enough action points.");
        return false;
    }

    //console.log(name);
    actions.db.filter(function (val) {
        return (val.name == name) ? 1 : 0;
    }).forEach(function (action, id, array) {
        //console.log(action);
        action.code();
        Player.action_points--;
    });
};



// ######################################################################

// Actions Library

actions.rawWork = function(skill_name) {
    var k = 0.1;
    Player.reward(skill_to_resource[skill_name], (1 + Player[skill_name]/60) * resources_rates[skill_to_resource[skill_name]] * k);
};

actions.randomReward = function(skill_name) {
    if (Player[skill_name] >= resources_rates[skill_to_resource[skill_name]]) {
        Player.withdraw(skill_to_resource[skill_name], resources_rates[skill_to_resource[skill_name]]);
        var new_resource = JSON.parse(JSON.stringify(resources_rates));
        delete new_resource[skill_to_resource[skill_name]];
        new_resource = new_resource[rand(0,2)];
        Player.reward(new_resource, resources_rates[new_resource]);
    } else { message("Not enough " + skill_to_resource[skill_name] + '.'); }
};

actions.shiftReward = function(skill_name, shift) {
    var from_resource = skill_to_resource[skill_name];
    var new_resource = resources[(resources.indexOf(from_resource)+shift)%4];

    console.log(from_resource, new_resource);
    console.log(resources[(resources.indexOf(from_resource)+shift)%4], (resources.indexOf(from_resource)+shift)%4 );
    console.log((resources.indexOf(from_resource)+shift), resources.indexOf(from_resource));
    console.log(from_resource, resources_rates[from_resource]);
    console.log(new_resource, resources_rates[new_resource]);


    if (Player[from_resource] >= resources_rates[from_resource]) {
        Player.withdraw(from_resource, resources_rates[from_resource]);
        Player.reward(new_resource, resources_rates[new_resource]);
    } else { message("Not enough " + skill_to_resource[skill_name] + '.'); }
};



