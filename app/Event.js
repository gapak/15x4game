

var event_counter = 0;

function Event(event_number, cost, lectures) {
    this.event_number = event_number;
    this.cost = cost;
    this.lectures = lectures;
}


Event.generator = function () {
    event_counter++;
    lectures.db.sort(function() { return Math.round(Math.random()); } );

    var tumbler = Math.round(Math.random());
    var first = Math.random();
    var second = Math.random();

    var price_of_responsibility = Math.pow(1 + 0.2 * event_counter,  Math.pow(1 + event_counter/60, 1 + (4/event_counter)));


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

    message("Generate new event. Counter: " + event_counter + ". Price of responsibility: " + price_of_responsibility.toFixed(2) + ". Balance sum: " + balance_sum.toFixed(0) + ". Balance ratio:" + balance_ratio.toFixed(0));

    return new Event(event_counter, cost, [lectures.db[0], lectures.db[1], lectures.db[2], lectures.db[3]]);
};


Event.holdEvent = function(event_id) {
    if (Player.withdrawArray(events.db[event_id].cost)) {
        events.db[event_id].lectures.forEach(function(lecture, id, arr) {
            if (!lecture.is_performed) {
                lecture.is_performed++;
                Player.will++;
            }
        });

        Player.revealSecret('will');
        Player.revealSecret('skills');
        events.db.splice(event_id, 1);
        this.invent();
        draw_all();
    }
};

Event.cancelEvent = function(event_id) {
    //console.log(event_id);
    //console.log(events.db);
    events.db.splice(event_id, 1);
    //console.log(events.db);
    this.invent();
    //console.log(events.db);
    draw_all();
};


Event.invent = function () {
    events.db.push(Event.generator());
};