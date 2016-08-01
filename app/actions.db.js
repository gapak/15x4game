
var actions = {};
actions.db = [

    // raw work
    new Action("Rewriting", "", ["writing 1"], function(){raw_work("writing");}),
    new Action("Logo Drawing", "", ["drawing 1"], function(){raw_work("drawing");}),
    new Action("Coding", "", ["programming 1"], function(){raw_work("programming");}),
    new Action("Calling", "", ["management 1"], function(){raw_work("management");}),


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
    }),


    // writing
    new Action("likes to random", "likes to random", ["writing 1"], function () {
        if (Player.likes >= 1) { Player.likes--; actions.random_reward(); } else { message("Not enough likes."); }
    }),
    new Action("Fun-art", "Win or fail: You newer know!", ["writing 2"], function () {
        if (Player.likes >= 1) { Player.likes--; Player.reward("design", 1); } else { message("Not enough likes."); }
    }),
    new Action("Call for assistance", "The right to give money 15x4 must be earned.", ["writing 3"], function () {
        if (Player.likes >= 1) { Player.likes--; Player.reward("money", 100); } else { message("Not enough likes."); }
    }),
    new Action("Fest video", "Viral video about our community.", ["writing 4"], function () {
        if (Player.likes >= 1) { Player.likes--; Player.reward("ideas", 1); } else { message("Not enough likes."); }
    }),

    // drawing
    new Action("design to random", "design to random", ["drawing 1"], function () {
        if (Player.design >= 1) { Player.design--; actions.random_reward(); } else { message("Not enough design."); }
    }),
    new Action("Posters for the Event", "DIN font, neat style, bold colors.", ["drawing 2"], function () {
        if (Player.design >= 1) { Player.design--; Player.reward("likes", 1); } else { message("Not enough design."); }
    }),
    new Action("Kat's pictures", "Picture for ideas search post.", ["drawing 3"], function () {
        if (Player.design >= 1) { Player.design--; Player.reward("ideas", 1); } else { message("Not enough design."); }
    }),
    new Action("Design to money", "Design to money", ["drawing 4"], function () {
        if (Player.design >= 1) { Player.design--; Player.reward("money", 1); } else { message("Not enough design."); }
    }),

    // programming
    new Action("Money to random", "Money to random", ["programming 1"], function () {
        if (Player.money >= 100) { Player.money--; actions.random_reward(); } else { message("Not enough money."); }
    }),
    new Action("Apples for repetition", "Twenty kilograms of apples. Popularization never been so heavy.", ["programming 2"], function () {
        if (Player.money >= 100) { Player.money--; Player.reward("ideas", 1); } else { message("Not enough money."); }
    }),
    new Action("Advertising", "We all hate adds", ["programming 3"], function () {
        if (Player.money >= 100) { Player.money--; Player.reward("likes", 1); } else { message("Not enough money."); }
    }),
    new Action("Order merchandising", "Full set of pen, notebook and t-shirt!", ["programming 4"], function () {
        if (Player.money >= 100) { Player.money--; Player.reward("design", 1); } else { message("Not enough money."); }
    }),

    // management
    new Action("ideas to random", "ideas to random", ["management 1"], function () {
        if (Player.ideas >= 1) { Player.ideas--; actions.random_reward(); } else { message("Not enough ideas."); }
    }),
    new Action("Ideas help", "We all together are 15x4.", ["management 2"], function () {
        if (Player.ideas >= 1) { Player.ideas--; Player.reward("money", 1); } else { message("Not enough ideas."); }
    }),
    new Action("Volunteer-designer", "It is necessary to draw it up yesterday.", ["management 3"], function () {
        if (Player.ideas >= 1) { Player.ideas--; Player.reward("design", 1); } else { message("Not enough ideas."); }
    }),
    new Action("Astronomical Event", "Looking stars in night.", ["management 4"], function () {
        if (Player.ideas >= 1) { Player.ideas--; Player.reward("likes", 1); } else { message("Not enough ideas."); }
    })

];



actions.random_reward = function () {
    var rand = Math.floor(Math.random()*4);
    switch (rand) {
        case 0:
            Player.reward("money", 1);
            break;
        case 1:
            Player.reward("ideas", 1);
            break;
        case 2:
            Player.reward("design", 1);
            break;
        case 3:
            Player.reward("likes", 1);
            break;
    }
};



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

function raw_work(skill_name) {
    var k = 10;
    Player.reward("likes", (1 + Player[skill_name]/60) * resources_rates[skill_name] * k);
}



