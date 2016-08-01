
var objectives = {};
objectives.db = [
    new Objective('sold for will 1', 'Perseverance', 'Spent 10', ['learn 1'], {will: 10}),
    new Objective('sold for will 2', 'Discipline', 'Spent 10', ['learn 2', 'sold for will 1'], {will: 20}),
    new Objective('sold for will 3', 'Motivation', 'Spent 10', ['learn 3', 'sold for will 2'], {will: 30}),
    new Objective('sold for will 4', 'Purposefulness', 'Spent 10', ['learn 4', 'sold for will 3'], {will: 40}),
    
    new Objective('sold for money 1', 'Telephone', 'Spent 10', ['money 1'], {money: 1000}),
    new Objective('sold for money 2', 'Notebook', 'Spent 10', ['sold for money 1'], {money: 2000}),
    new Objective('sold for money 3', 'Home', 'Spent 10', ['sold for money 2'], {money: 3000}),
    new Objective('sold for money 4', 'Office', 'Spent 10', ['sold for money 3'], {money: 4000}),

    new Objective('sold for ideas 1', 'Repetition', 'Spent 10', ['ideas 1'], {ideas: 1}),
    new Objective('sold for ideas 2', 'Astro-event', 'Spent 10', ['sold for ideas 1'], {ideas: 2}),
    new Objective('sold for ideas 3', 'Party', 'Spent 10', ['sold for ideas 2'], {ideas: 3}),
    new Objective('sold for ideas 4', 'Festival', 'Spent 10', ['sold for ideas 3'], {ideas: 4}),

    new Objective('sold for design 1', 'Business cards', 'Spent 10', ['design 1'], {design: 10}),
    new Objective('sold for design 2', 'Posters', 'Spent 10', ['sold for design 1'], {design: 20}),
    new Objective('sold for design 3', 'Booklets', 'Spent 10', ['sold for design 2'], {design: 30}),
    new Objective('sold for design 4', 'Handbooks', 'Spent 10', ['sold for design 3'], {design: 40}),

    new Objective('sold for likes 1', 'Social network group', 'Spent 10', ['likes 1'], {likes: 100}),
    new Objective('sold for likes 2', 'Youtube channel', 'Spent 10', ['sold for likes 1'], {likes: 200}),
    new Objective('sold for likes 3', 'Site', 'Spent 10', ['sold for likes 2'], {likes: 300}),
    new Objective('sold for likes 4', 'Journal', 'Spent 10', ['sold for likes 3'], {likes: 400}),

];


objectives.buy = function (name) {
    //console.log(name);
    objectives.db.filter(function (val) {
        return (val.name == name) ? 1 : 0;
    }).forEach(function (objective, id, array) {
        //console.log(objective);
        var payable = 1;
        for (var key in objective.cost) {
            if (objective.cost[key] > Player[key]) {
                payable = 0;
                message("Not enough " + (objective.cost[key] - Player[key]) + " of " + key + " for " + name + ".");
            }
        }
        if (payable) {
            message("Objective reached: " + array[0].name + " (" + name + ")");
            array[0].reached = 1;
            for (var key in objective.cost) {
                Player.paid(key, objective.cost[key]);
            }
        }

    });
};