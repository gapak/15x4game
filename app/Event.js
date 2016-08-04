

var event_counter = 0;


function Event(event_number, cost, lectures) {
    this.event_number = event_number;
    this.cost = cost;
    this.lectures = lectures;
}


Event.generator = function () {
    lectures.db.sort(function() { return Math.round(Math.random()); } );

    var tumbler = Math.round(Math.random());
    var first = Math.random();
    var second = Math.random();

    var price_of_responsibility = (event_counter) ? Math.pow(1 + 0.3 * event_counter,  Math.pow(1 + event_counter/60, 1 + (4/event_counter))) : 1;


    var cardinalities = {
        likes: (tumbler) ? first : second,
        design: (!tumbler) ? first : second,
        money: (tumbler) ? 1 - first : 1 - second,
        ideas: (!tumbler) ? 1 - first : 1 - second
    };

    var cost = {
        likes:  Math.round(1000 * cardinalities.likes * price_of_responsibility),
        design: Math.round(100 * cardinalities.design * price_of_responsibility),
        money:  Math.round(10 * cardinalities.money * price_of_responsibility),
        ideas:  Math.round(1 * cardinalities.ideas * price_of_responsibility)
    };

    var balance_sum = cost.likes * 1 + cost.design * 10 + cost.money * 100 + cost.ideas * 1000;
    var balance_ratio = balance_sum/price_of_responsibility;

    event_counter++;
    message("Generate new event. Counter: " + event_counter + ". Price of responsibility: " + price_of_responsibility.toFixed(2) + ". Balance sum: " + balance_sum.toFixed(0) + ". Balance ratio:" + balance_ratio.toFixed(0));

    return new Event(event_counter, cost, [lectures.db[0], lectures.db[1], lectures.db[2], lectures.db[3]]);
};


Event.holdEvent = function(event_id) {
    if (Player.withdrawArray(events.db[event_id].cost)) {
        events.db[event_id].lectures.forEach(function(lecture, id, arr) {
            if (!lecture.is_performed) {
                Player.knowledge++;
                Player.revealSecret('knowledge');
                Player.revealSecret('skills');
            }
            lecture.is_performed++;
            Player.action_points += lecture.is_performed;
        });

        events.db.splice(event_id, 1);
        this.invent();
        draw_all();
    }
};


var canceled_event_counter = 0;
Event.cancelEvent = function(event_id) {
    canceled_event_counter++;
    Player.action_points += canceled_event_counter;
    events.db.splice(event_id, 1);
    this.invent();
    draw_all();
};

Event.invent = function () {
    if (Player.action_points < 1) {
        message("Not enough action points.");
        return false;
    }

    events.db.push(Event.generator());
};


Event.inventButton = function () {
    if (Player.action_points < 1) {
        message("Not enough action points.");
        return false;
    }
    Player.action_points--;

    this.invent();
};

