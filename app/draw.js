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
    w("badges_container", badges.getHTML());
    w("objectives_container", objectives.getHTML());


  
    w("actions_container", actions.getHTML());

    
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
