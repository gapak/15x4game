





function draw_all() {
    function w(element_id, text) {
        //    message("w("+element_id+", "+text+")");
        document.getElementById(element_id).innerHTML = text;
    }


    w("volunteers_indicator", Player.volunteers.toFixed(2));
    w("volunteers_memory_indicator", Player.volunteers_memory.toFixed(2));


    var department_html = "";
    for (var key in Player.departments) {
        var department = Player.departments[key];
        department_html += '<div class="flex-element flex-container-column" id="' + key + '">';
        department_html += '<div class="flex-element">' + key.capitalizeFirstLetter() + '</div>';

        var secret_class = (Player.found_secrets.indexOf("upgrade_department") == -1) ? "init_secret" : "";
        department_html += '<div class="' + secret_class + ' flex-element">';
        department_html += 'Level: <span id="' + key + 'level"> ' + department.level + ' </span>';

        var upgrade_cost = department.getUpgradeCost();
        for (var resource_name in upgrade_cost) break;
        var price = upgrade_cost[resource_name];

        department_html += '<button onclick="Player.upgradeDepartment(\'' + key + '\');">Up: ' + price.toFixed(2) + ' ' + resource_name + ' </button>';
        department_html += '</div>';
        department_html += '<div>';
        department_html += 'Workers: <span id="' + key + '_volunteers"> ' + department.workers + ' </span>';
        department_html += '<button class = "" onclick="Player.increaseDepartment(\'' + key + '\');">+</button>';
        department_html += '<button class = "" onclick="Player.decreaseDepartment(\'' + key + '\');">-</button>';
        department_html += '</div>';
        department_html += '<div class="flex-element">';
        department_html += 'Efficiency: <span id="' + key + '_productivity"> ' + Player.getDepartmentEfficiency(key).toFixed(2) + ' </span>';
        department_html += '</div>';
        department_html += '<div class="flex-element">';
        department_html += 'Productivity: <span id="' + key + '_productivity"> ' + Player.getDepartmentProductivity(key).toFixed(2) + ' ' + department.base_resource + ' </span>';
        department_html += '</div>';
        department_html += '</div>';
    }
    w("departments", department_html);

    
    var events_html = "";
    events.db.forEach(function (event, id) {
        events_html += '<div class="flex-element">';
        events_html += '<button id="hold_event_container" onclick="Event.holdEvent(\'' + id + '\')">Hold Event</button>';
        var secret_class = (Player.found_secrets.indexOf("cancel_event") == -1) ? "init_secret" : "";
        events_html += '<button class="' + secret_class + '" onclick="Event.cancelEvent(\'' + id + '\')">Cancel Event</button>';

        events_html += '<br>Cost:';
        events_html += '<div class="flex-container-row">';
        for (var key in event.cost) {
            events_html += '<div class="flex-element">' + key.capitalizeFirstLetter() + ": " + event.cost[key] + '</div>';
        }
        events_html += '</div>';

        events_html += 'Lectures:';
        event.lectures.forEach(function (lecture) {
            events_html += '<div class="event_element">';
            var lecture_badge = lecture.is_performed ? '' : 'Новая! ';
            events_html += '<span class="lecture_name" title="' + lecture.text + '">' + lecture_badge + '' + lecture.name + '.</span>';
            events_html += '</div>';
        });
        events_html += '</div>';
    });
    w("events", events_html);
    
    
    
    
    w("will_indicator", Player.will.toFixed(2));
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



    var resources_html = "";
    resources.forEach(function(resource) {
        resources_html += '<div class="flex-element resource_element">' + resource.capitalizeFirstLetter() + ': ' +
            Player[resource].toFixed(2) + '<span class="flex-element" id="' + resource + '_indicator"></span></div>';
    });
    w("resources", resources_html);

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
            objectives_html += key + ": " + objective.cost[key] +",";
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

}
