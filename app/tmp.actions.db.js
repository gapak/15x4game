
var actions = {};
actions.db = [

    // learn
    new Action("Work hard", "One will, one job.", ["learn 1"], function () {
        if (Player.will >= 1) { Player.will--; Player.reward("money", 100); } else { message("Not enough will."); }
    }),
    new Action("Search ideas", "All day on their feet.", ["learn 2"], function () {
        if (Player.will >= 10) { Player.will -= 10; Player.reward("ideas", 1); } else { message("Not enough will."); }
    }),
    new Action("Draw design", "Try to play with the square shape.", ["learn 3"], function () {
        if (Player.will >= 1) { Player.will--; Player.reward("design", 1); } else { message("Not enough will."); }
    }),
    new Action("Collect likes", "Hey, look at me, do as I do!", ["learn 4"], function () {
        if (Player.will >= 1) { Player.will--; Player.reward("likes", 10); } else { message("Not enough will."); }
    }),

    // writing
    new Action("Money to random", "Money to random", ["writing 1"], function () {
        if (Player.money >= 100) { Player.money--; actions.random_reward(); } else { message("Not enough money."); }
    }),
    new Action("ideas to random", "ideas to random", ["writing 2"], function () {
        if (Player.ideas >= 1) { Player.ideas--; actions.random_reward(); } else { message("Not enough ideas."); }
    }),
    new Action("design to random", "design to random", ["writing 3"], function () {
        if (Player.design >= 1) { Player.design--; actions.random_reward(); } else { message("Not enough design."); }
    }),
    new Action("likes to random", "likes to random", ["writing 4"], function () {
        if (Player.likes >= 1) { Player.likes--; actions.random_reward(); } else { message("Not enough likes."); }
    }),

    // design
    new Action("Apples for repetition", "Twenty kilograms of apples. Popularization never been so heavy.", ["drawing 1"], function () {
        if (Player.money >= 100) { Player.money--; Player.reward("ideas", 1); } else { message("Not enough money."); }
    }),
    new Action("Volunteer-designer", "It is necessary to draw it up yesterday.", ["drawing 2"], function () {
        if (Player.ideas >= 1) { Player.ideas--; Player.reward("design", 1); } else { message("Not enough ideas."); }
    }),
    new Action("Posters for the Event", "DIN font, neat style, bold colors.", ["drawing 3"], function () {
        if (Player.design >= 1) { Player.design--; Player.reward("likes", 1); } else { message("Not enough design."); }
    }),
    new Action("Call for assistance", "The right to give money 15x4 must be earned.", ["drawing 4"], function () {
        if (Player.likes >= 1) { Player.likes--; Player.reward("money", 100); } else { message("Not enough likes."); }
    }),
    
    // programming
    new Action("Advertising", "We all hate adds", ["programming 1"], function () {
        if (Player.money >= 100) { Player.money--; Player.reward("likes", 1); } else { message("Not enough money."); }
    }),
    new Action("Ideas help", "We all together are 15x4.", ["programming 2"], function () {
        if (Player.ideas >= 1) { Player.ideas--; Player.reward("money", 1); } else { message("Not enough ideas."); }
    }),
    new Action("Kat's pictures", "Picture for ideas search post.", ["programming 3"], function () {
        if (Player.design >= 1) { Player.design--; Player.reward("ideas", 1); } else { message("Not enough design."); }
    }),
    new Action("Fun-art", "Win or fail: You newer know!", ["programming 4"], function () {
        if (Player.likes >= 1) { Player.likes--; Player.reward("design", 1); } else { message("Not enough likes."); }
    }),

    // management
    new Action("Order merchandising", "Full set of pen, notebook and t-shirt!", ["management 1"], function () {
        if (Player.money >= 100) { Player.money--; Player.reward("design", 1); } else { message("Not enough money."); }
    }),
    new Action("Astronomical Event", "Looking stars in night.", ["management 2"], function () {
        if (Player.ideas >= 1) { Player.ideas--; Player.reward("likes", 1); } else { message("Not enough ideas."); }
    }),
    new Action("Design to money", "Design to money", ["management 3"], function () {
        if (Player.design >= 1) { Player.design--; Player.reward("money", 1); } else { message("Not enough design."); }
    }),
    new Action("Fest video", "Viral video about our community.", ["management 4"], function () {
        if (Player.likes >= 1) { Player.likes--; Player.reward("ideas", 1); } else { message("Not enough likes."); }
    }),


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

