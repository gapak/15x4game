
var objectives = {};
objectives.db = [
    new Objective('sold for will 1', 'Perseverance', 'Description', ['learn 1'], {will: 10}),
    new Objective('sold for will 2', 'Discipline', 'Description', ['learn 2', 'sold for will 1'], {will: 20}),
    new Objective('sold for will 3', 'Motivation', 'Description', ['learn 3', 'sold for will 2'], {will: 30}),
    new Objective('sold for will 4', 'Purposefulness', 'Description', ['learn 4', 'sold for will 3'], {will: 40}),

    new Objective('sold for likes 1', 'Social network group', 'Allows to make groups in the VC and FB', ['likes 1'], {likes: 1000}),
    new Objective('sold for likes 2', 'Instagram', 'Upload photos from event', ['sold for likes 1'], {likes: 2000}),
    new Objective('sold for likes 3', 'Youtube channel', 'Upload lectures video', ['sold for likes 2'], {likes: 3000}),
    new Objective('sold for likes 4', 'Site', 'Let all information about you will be available in one place', ['sold for likes 3'], {likes: 4000}),

    new Objective('sold for design 1', 'Business cards', 'The face of your company', ['design 1'], {design: 100}),
    new Objective('sold for design 2', 'Posters', 'A more quality poster is leads to greater attendance', ['sold for design 1'], {design: 200}),
    new Objective('sold for design 3', 'Booklets', 'Show an ingenious engineering solution for all', ['sold for design 2'], {design: 300}),
    new Objective('sold for design 4', 'Handbooks', 'Let everyone see how you are organized', ['sold for design 3'], {design: 400}),
    
    new Objective('sold for money 1', 'Purse', 'You spend a pocket money on a project', ['money 1'], {money: 10}),
    new Objective('sold for money 2', 'Safe', 'Several people share their money for your project', ['sold for money 1'], {money: 20}),
    new Objective('sold for money 3', 'Bank account', 'You have a few benefactors', ['sold for money 2'], {money: 30}),
    new Objective('sold for money 4', 'Charitable Foundation', 'You\'re so big company that now you have your own fund', ['sold for money 3'], {money: 40}),

    new Objective('sold for ideas 1', 'Repetition', 'Importantly! Do not forget apples', ['ideas 1'], {ideas: 1}),
    new Objective('sold for ideas 2', 'Astro-event', 'Ideas will not fall down from the sky', ['sold for ideas 1'], {ideas: 2}),
    new Objective('sold for ideas 3', 'Party', 'The best ideas are born during leisure', ['sold for ideas 2'], {ideas: 3}),
    new Objective('sold for ideas 4', 'Festival', 'You will be very experienced if you don\'t die', ['sold for ideas 3'], {ideas: 4}),

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