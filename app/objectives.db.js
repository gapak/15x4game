
var objectives = {};
objectives.db = [

    new Objective('computer', 'Computer', 'A useful tool for work and entertainment.', [], {likes: 15000, design: 1500, money: 150, ideas: 15}),

    new Objective('dungeon', 'Dungeon', 'The game.', ['computer'], {likes: 20000}, function () { Player.revealSecret('dungeon'); }),
    new Objective('space', 'Space', 'The game.', ['computer'], {design: 2000}, function () { Player.revealSecret('space'); }),
    new Objective('rally', 'Rally', 'The game.', ['computer'], {money: 200}, function () { Player.revealSecret('rally'); }),
    new Objective('castle', 'Enlightener', 'The game about education and enlighting.', ['computer'], {ideas: 20}, function () { Player.revealSecret('castle'); }),

    /*
    new Objective('sold_for_knowledge_1', 'Perseverance', 'Description', ['learn 1'], {knowledge: 10}),
    new Objective('sold_for_knowledge_2', 'Discipline', 'Description', ['learn 2', 'sold_for_knowledge_1'], {knowledge: 20}),
    new Objective('sold_for_knowledge_3', 'Motivation', 'Description', ['learn 3', 'sold_for_knowledge_2'], {knowledge: 30}),
    new Objective('sold_for_knowledge_4', 'Purposefulness', 'Description', ['learn 4', 'sold_for_knowledge_3'], {knowledge: 40}),
    */

    new Objective('sold_for_likes_1', 'Social network group. Storages for likes', 'Allows to make groups in the VC and FB', ['likes 1'], {likes: 1000}),
    new Objective('sold_for_likes_2', 'Instagram. Storages for likes', 'Upload photos from event', ['sold_for_likes_1'], {likes: 10000}),
    new Objective('sold_for_likes_3', 'Youtube channel. Storages for likes', 'Upload lectures video', ['sold_for_likes_2'], {likes: 100000}),
    new Objective('sold_for_likes_4', 'Site. Storages for likes', 'Let all information about you knowledge be available in one place', ['sold_for_likes_3'], {likes: 10000000}),

    new Objective('sold_for_design_1', 'Business cards. Storages for design', 'The face of your company', ['design 1'], {design: 100}),
    new Objective('sold_for_design_2', 'Posters. Storages for design', 'A more quality poster is leads to greater attendance', ['sold_for_design_1'], {design: 1000}),
    new Objective('sold_for_design_3', 'Booklets. Storages for design', 'Show an ingenious engineering solution for all', ['sold_for_design_2'], {design: 10000}),
    new Objective('sold_for_design_4', 'Handbooks. Storages for design', 'Let everyone see how you are organized', ['sold_for_design_3'], {design: 100000}),
    
    new Objective('sold_for_money_1', 'Purse. Storages for money', 'You spend a pocket money on a project', ['money 1'], {money: 10}),
    new Objective('sold_for_money_2', 'Safe. Storages for money', 'Several people share their money for a project', ['sold_for_money_1'], {money: 100}),
    new Objective('sold_for_money_3', 'Bank account. Storages for money', 'You have a few benefactors', ['sold_for_money_2'], {money: 1000}),
    new Objective('sold_for_money_4', 'Charitable Foundation. Storages for money', 'You\'re so big company that now you have your own fund', ['sold_for_money_3'], {money: 10000}),

    new Objective('sold_for_ideas_1', 'Repetition. Storages for ideas', 'Importantly! Do not forget apples', ['ideas 1'], {ideas: 1}),
    new Objective('sold_for_ideas_2', 'Astro-event. Storages for ideas', 'Ideas knowledge not fall down from the sky', ['sold_for_ideas_1'], {ideas: 10}),
    new Objective('sold_for_ideas_3', 'Party. Storages for ideas', 'The best ideas are born during leisure', ['sold_for_ideas_2'], {ideas: 100}),
    new Objective('sold_for_ideas_4', 'Festival. Storages for ideas', 'You will be very experienced if you don\'t die', ['sold_for_ideas_3'], {ideas: 1000}),

];


objectives.buy = function (name) {
    //console.log(name);
    objectives.db.filter(function (val) {
        return (val.name == name) ? 1 : 0;
    }).forEach(function (objective, id, array) {
        if (Player.withdrawArray(objective.cost)) {
            message("Objective reached: " + objective.name);
            array[0].reached = 1;
            Player.revealSecret(objective.name);
            if (typeof objective.init_code === 'function') {
                objective.init_code();
            }
        }
    });
};

objectives.getHTML = function () {
    var html = `<hr>
        <button class="collapsar" data-toggle="collapse" data-target="#objectives_collapse">-</button>
        Objectives:
        <div class="collapse in" id="objectives_collapse">
            <div id="objectives">`;
    
    objectives.db.filter(function (objective) {
        return objective.is_reached();
    }).forEach(function (objective, id, arr) {

        html += `
        <div class="objective_element">
            <span class="objective_name">`;
                if (!objective.reached) {
                    html += `<button onclick="objectives.buy('${objective.name}')">buy</button>`;
                }
                    html += `${objective.label}. ${objective.text} [`;
            
                for (var key in objective.cost) {
                   html += `${key}: ${objective.cost[key]} `;
                }
                html += `] 
            </span>
        </div>`;
    });
    html += `</div></div>`;
    return html;
};