function draw_all() {
    function w(element_id, text) {
        document.getElementById(element_id).innerHTML = text;
    }

    w("day_indicator", LogPanel.day.toFixed());
    w("volunteers_indicator", Player.volunteers.toFixed(2));
    w("volunteers_memory_indicator", Player.volunteers_memory.toFixed(2));

    w("culture_container", Civilization.getHTML());
    w("departments_container", Department.getHTML());
    w("resources_container", Storages.getHTML());
    w("events_container", Event.getHTML());
    w("offered_lecture_container", Lecture.getHTML());

    w("hype", Lecture.hype);   
    w("knowledge_indicator", Player.knowledge.toFixed(2));
    w("ap_indicator", Player.action_points.toFixed(2));


    var skill_html = "";
    skills.forEach(function(skill) {
        skill_html += '<div class="flex-element flex-container-column" id="' + skill + '">';
        skill_html += '<span id="' + skill + '_indicator">' + skill.capitalizeFirstLetter() + ': ' + Player[skill].toFixed(2) + '/60</span>';
        skill_html += '<button onclick="Player.selfStudy(\'' + skill + '\')">Self-study</button>';
        skill_html += '<button onclick="Player.books(\'' + skill + '\')">Books</button>';
        skill_html += '<button onclick="Player.work(\'' + skill + '\')">Work</button>';
        skill_html += '<button onclick="Player.petProject(\'' + skill + '\')">Pet-project</button>';
        skill_html += '</div>';
    });

    w("skills", skill_html);


    /*
    w("writing_indicator", Player.writing.toFixed(2));
    w("drawing_indicator", Player.drawing.toFixed(2));
    w("programming_indicator", Player.programming.toFixed(2));
    w("management_indicator", Player.management.toFixed(2));

    w("money_indicator", Player.money.toFixed(2));
    w("ideas_indicator", Player.ideas.toFixed(2));
    w("decor_indicator", Player.design.toFixed(2));
    w("likes_indicator", Player.likes.toFixed(2));

     */


    var badges_html = "";
    badges.db.filter(function (badge) {
        return badge.reached;
    }).forEach(function (val, id, arr) {
        badges_html += '<div class="badge_element"><span class="badge_name">' + val.label + '. ' + val.text + '</span></div>';
    });
    w("badges", badges_html);


    var objectives_html = "";
    objectives.db.filter(function (objective) {
        return objective.is_reached();
    }).forEach(function (objective, id, arr) {

        objectives_html += '<div class="objective_element"><span class="objective_name">';
        if (!objective.reached) {
            objectives_html += '<button onclick="objectives.buy(\'' + objective.name + '\')">buy</button>';
        }
        objectives_html += objective.label + '. "' + objective.text + '"' + " [";
        
        for (var key in objective.cost) {
            objectives_html += key + ": " + objective.cost[key];
        }
        objectives_html += '] </span></div>';
    });
    w("objectives", objectives_html);


    var actions_html = "";
    actions.db.filter(function (action) {
        return action.is_reached();
    }).forEach(function (action, id, arr) {
        Player.revealSecret('actions');
        actions_html += '<div class="action_element">';
        actions_html += '<button onclick="actions.do(\'' + action.name + '\')">do</button>';
        actions_html += '<span class="action_name">' + action.name + '.</span>';
        actions_html += '<span class="action_text"> "' + action.text + '" </span>';
        actions_html += '</div>';
    });
    w("actions", actions_html);

    
    var startups_html = "";
    startups.db.forEach(function (startup, id, arr) {
        startups_html += '<div class="startup_element">';
        startups_html += '<button onclick="startups.do(\'' + startup.name + '\')">do</button>';
        startups_html += '<span class="startup_name">' + startup.label + '.</span>';
        startups_html += '<span class="startup_text"> "' + startup.text + '" </span>';
        startups_html += '</div>';
    });
    w("startups", startups_html);



    var reputations_html = "";
    ["kindness", "generosity", "thoughtfulness", "innovativeness"].forEach(function(reputation_name) {
        reputations_html += '<div class="flex-element reputation_element">' + reputation_name.capitalizeFirstLetter() + ': ' +
            Player[reputation_name].toFixed(2) + '<span class="flex-element" id="' + reputation_name + '_indicator"></span></div>';
    });
    w("reputations", reputations_html);

    var log_message_html = "";
    for(var i=LogPanel.message.length-1; i>=0; i--){
        log_message_html += '<li><div class="log_message_element"><span class="log_message_name">' + LogPanel.message[i] + '</span></div></li>';
    };
    w("log_message", log_message_html);



    w("space_container", Space.getHTML());
    w("rally_container", Rally.getHTML());

    w("dungeon_battlefield_container", Dungeon.getBattlefieldString());

}
