
var badges = {};

badges.db = [

    new Badge("tick 1", "Lost coordinator", "A month of your coordination is passed. You understand what's what.",
        function () { return (Gatherer.events.ticks > 30); }, function () {}),
    new Badge("tick 2", "Verified coordinator", "A year of your coordination is passed. You steeled enough to avoid mistakes.",
        function () { return (Gatherer.events.ticks > 356); }, function () {}),
    new Badge("tick 3", "Experienced coordinator", "A ten year of your coordination is passed. You ready to invent something new.",
        function () { return (Gatherer.events.ticks > 356*10); }, function () {}),
    new Badge("tick 4", "Hardened coordinator", "A century of your coordination is passed. You elder and htonic.",
        function () { return (Gatherer.events.ticks > 356*100); }, function () {}),

    
    new Badge("resources 1", "Resources dabbling", "You collect some.",
        function () { return ((Gatherer.collection.likes * 1 + Gatherer.collection.design * 10 + Gatherer.collection.money * 100 + Gatherer.collection.ideas * 1000) > 500); }, function () { Player.revealSecret('objectives'); goals.achieve('resources 1'); }),
    new Badge("resources 2", "Resources collector", "You collect many.",
        function () { return ((Gatherer.collection.likes * 1 + Gatherer.collection.design * 10 + Gatherer.collection.money * 100 + Gatherer.collection.ideas * 1000) > 500 * 10); }, function () { Player.revealSecret('events'); goals.achieve('resources 2'); }),
    new Badge("resources 3", "Resources achiever", "You have wealth.",
        function () { return ((Gatherer.collection.likes * 1 + Gatherer.collection.design * 10 + Gatherer.collection.money * 100 + Gatherer.collection.ideas * 1000) > 500 * 100); }, function () { Player.revealSecret('sharing'); goals.achieve('resources 3'); }),
    new Badge("resources 4", "Resources tycoon", "You have a huge savings.",
        function () { return ((Gatherer.collection.likes * 1 + Gatherer.collection.design * 10 + Gatherer.collection.money * 100 + Gatherer.collection.ideas * 1000) > 500 * 1000); }, function () {}),


    new Badge("communication 1", "Talking", "Communication upgraded to level 15.",
        function () { return (Civilization.updates.communication.level >= 15); }, function () { Player.revealSecret('attentiveness'); goals.achieve('communication 1'); }),
    new Badge("communication 2", "Discussing", "Communication upgraded to level 30.",
        function () { return (Civilization.updates.communication.level >= 30); }, function () {}),
    new Badge("communication 3", "Telepathy", "Communication upgraded to level 45.",
        function () { return (Civilization.updates.communication.level >= 45); }, function () {}),
    new Badge("communication 4", "Hivemind", "Communication upgraded to level 60.",
        function () { return (Civilization.updates.communication.level >= 60); }, function () {}),

    new Badge("attentiveness 1", "Attention to friends", "Attentiveness upgraded to level 15.",
        function () { return (Civilization.updates.attentiveness.level >= 15); }, function () {}),
    new Badge("attentiveness 2", "Attention to known", "Attentiveness upgraded to level 30.",
        function () { return (Civilization.updates.attentiveness.level >= 30); }, function () {}),
    new Badge("attentiveness 3", "Attention to all", "Attentiveness upgraded to level 45.",
        function () { return (Civilization.updates.attentiveness.level >= 45); }, function () {}),
    new Badge("attentiveness 4", "Non-violence communication", "Attentiveness upgraded to level 60.",
        function () { return (Civilization.updates.attentiveness.level >= 60); }, function () {}),

    new Badge("teamwork 1", "Group work", "Teamwork upgraded to level 15.",
        function () { return (Civilization.updates.teamwork.level >= 15); }, function () { Player.revealSecret('upgrade_department'); goals.achieve('teamwork 1'); }),
    new Badge("teamwork 2", "Command work", "Teamwork upgraded to level 30.",
        function () { return (Civilization.updates.teamwork.level >= 30); }, function () {}),
    new Badge("teamwork 3", "Cooperative work", "Teamwork upgraded to level 45.",
        function () { return (Civilization.updates.teamwork.level >= 45); }, function () {}),
    new Badge("teamwork 4", "Congregation work", "Teamwork upgraded to level 60.",
        function () { return (Civilization.updates.teamwork.level >= 60); }, function () {}),

    new Badge("sharing 1", "Sharing with friends", "Sharing upgraded to level 15.",
        function () { return (Civilization.updates.sharing.level >= 15); }, function () {}),
    new Badge("sharing 2", "Sharing with known", "Sharing upgraded to level 30.",
        function () { return (Civilization.updates.sharing.level >= 30); }, function () {}),
    new Badge("sharing 3", "Sharing with all", "Sharing upgraded to level 45.",
        function () { return (Civilization.updates.sharing.level >= 45); }, function () {}),
    new Badge("sharing 4", "Asceticism", "Sharing upgraded to level 60.",
        function () { return (Civilization.updates.sharing.level >= 60); }, function () {}),


    new Badge("popularization 1", "Light of Science", "Popularization upgraded to level 15.",
        function () { return (Civilization.works.popularization.level >= 15); }, function () { Player.revealSecret('education'); goals.achieve('popularization 1'); }),
    new Badge("popularization 2", "Trend to quantum", "Popularization upgraded to level 30.",
        function () { return (Civilization.works.popularization.level >= 30); }, function () {}),
    new Badge("popularization 3", "Viral ideas", "Popularization upgraded to level 45.",
        function () { return (Civilization.works.popularization.level >= 45); }, function () {}),
    new Badge("popularization 4", "Science-pop Rock concert", "Popularization upgraded to level 60.",
        function () { return (Civilization.works.popularization.level >= 60); }, function () {}),

    new Badge("education 1", "School", "Education upgraded to level 15.",
        function () { return (Civilization.works.education.level >= 15); }, function () {}),
    new Badge("education 2", "High School", "Education upgraded to level 30.",
        function () { return (Civilization.works.education.level >= 30); }, function () {}),
    new Badge("education 3", "University", "Education upgraded to level 45.",
        function () { return (Civilization.works.education.level >= 45); }, function () {}),
    new Badge("education 4", "Academy", "Education upgraded to level 60.",
        function () { return (Civilization.works.education.level >= 60); }, function () {}),

    new Badge("motivation 1", "Working with target", "Motivation upgraded to level 15.",
        function () { return (Civilization.works.motivation.level >= 15); }, function () { Player.revealSecret('activism'); goals.achieve('motivation 1'); }),
    new Badge("motivation 2", "Working with sense", "Motivation upgraded to level 30.",
        function () { return (Civilization.works.motivation.level >= 30); }, function () {}),
    new Badge("motivation 3", "Target of life", "Motivation upgraded to level 45.",
        function () { return (Civilization.works.motivation.level >= 45); }, function () {}),
    new Badge("motivation 4", "Sense of life", "Motivation upgraded to level 60.",
        function () { return (Civilization.works.motivation.level >= 60); }, function () {}),

    new Badge("activism 1", "Opinion", "Activism upgraded to level 15.",
        function () { return (Civilization.works.activism.level >= 15); }, function () {}),
    new Badge("activism 2", "Changes", "Activism upgraded to level 30.",
        function () { return (Civilization.works.activism.level >= 30); }, function () {}),
    new Badge("activism 3", "Bettering", "Activism upgraded to level 45.",
        function () { return (Civilization.works.activism.level >= 45); }, function () {}),
    new Badge("activism 4", "Revolution", "Activism upgraded to level 60.",
        function () { return (Civilization.works.activism.level >= 60); }, function () {}),


    new Badge("smm 1", "Public page", "Smm upgraded to level 15.",
        function () { return (Player.departments.smm.level >= 15); }, function () {}),
    new Badge("smm 2", "Scheduled posting", "Smm upgraded to level 30.",
        function () { return (Player.departments.smm.level >= 30); }, function () {}),
    new Badge("smm 3", "Multinetwork Crossposting", "Smm upgraded to level 45.",
        function () { return (Player.departments.smm.level >= 45); }, function () {}),
    new Badge("smm 4", "Community based smm", "Smm upgraded to level 60.",
        function () { return (Player.departments.smm.level >= 60); }, function () {}),

    new Badge("design 1", "Logos", "Design upgraded to level 15.",
        function () { return (Player.departments.design.level >= 15); }, function () {}),
    new Badge("design 2", "Posters", "Design upgraded to level 30.",
        function () { return (Player.departments.design.level >= 30); }, function () {}),
    new Badge("design 3", "Booklets", "Design upgraded to level 45.",
        function () { return (Player.departments.design.level >= 45); }, function () {}),
    new Badge("design 4", "Bigboards", "Design upgraded to level 60.",
        function () { return (Player.departments.design.level >= 60); }, function () {}),

    new Badge("site 1", "Page", "Site upgraded to level 15.",
        function () { return (Player.departments.site.level >= 15); }, function () {}),
    new Badge("site 2", "Site", "Site upgraded to level 30.",
        function () { return (Player.departments.site.level >= 30); }, function () {}),
    new Badge("site 3", "Portal", "Site upgraded to level 45.",
        function () { return (Player.departments.site.level >= 45); }, function () {}),
    new Badge("site 4", "Social Network", "Site upgraded to level 60.",
        function () { return (Player.departments.site.level >= 60); }, function () {}),

    new Badge("docs 1", "Notes", "Docs upgraded to level 15.",
        function () { return (Player.departments.docs.level >= 15); }, function () {}),
    new Badge("docs 2", "Tasks", "Docs upgraded to level 30.",
        function () { return (Player.departments.docs.level >= 30); }, function () {}),
    new Badge("docs 3", "Manuals", "Docs upgraded to level 45.",
        function () { return (Player.departments.docs.level >= 45); }, function () {}),
    new Badge("docs 4", "Handbook", "Docs upgraded to level 60.",
        function () { return (Player.departments.docs.level >= 60); }, function () {}),


    new Badge("volunteers 1", "Group", "Founded 15 volunteers.",
        function () { return (Player.volunteers_memory >= 15); }, function () { Player.revealSecret('teamwork'); goals.achieve('volunteers 1'); Goal.displayed_goals_count++; }),
    new Badge("volunteers 2", "Company", "Founded 30 volunteers.",
        function () { return (Player.volunteers_memory >= 30); }, function () { Player.revealSecret('departments'); goals.achieve('volunteers 2'); }),
    new Badge("volunteers 3", "Community", "Founded 45 volunteers.",
        function () { return (Player.volunteers_memory >= 45); }, function () { Player.revealSecret('motivation'); goals.achieve('volunteers 3'); }),
    new Badge("volunteers 4", "Organization", "Founded 60 volunteers.",
        function () { return (Player.volunteers_memory >= 60); }, function () { goals.achieve('volunteers 4'); Goal.displayed_goals_count++; }),


    new Badge("share 1", "Ready to learn", "You shared your knowledge 15 times.",
        function () { return (Gatherer.events.knowledge_sharing >= 15); }, function () { Player.revealSecret('skills'); Player.revealSecret('self_study'); goals.achieve('share 1'); }),
    new Badge("share 2", "Ready to read", "You shared your knowledge 30 times.",
        function () { return (Gatherer.events.knowledge_sharing >= 30); }, function () { Player.revealSecret('books'); goals.achieve('share 2'); }),
    new Badge("share 3", "Ready to work", "You shared your knowledge 45 times.",
        function () { return (Gatherer.events.knowledge_sharing >= 45); }, function () { Player.revealSecret('work'); goals.achieve('share 3'); }),
    new Badge("share 4", "Ready to lead", "You shared your knowledge 60 times.",
        function () { return (Gatherer.events.knowledge_sharing >= 60); }, function () { Player.revealSecret('pet_project'); goals.achieve('share 4'); }),


    new Badge("hold_events 1", "", "You was hold 15 events.",
        function () { return (Gatherer.events.hold_events >= 15); }, function () { Player.revealSecret('cancel_event'); goals.achieve('hold_events 1'); }),
    new Badge("hold_events 2", "", "You was hold 30 events.",
        function () { return (Gatherer.events.hold_events >= 30); }, function () { Player.revealSecret('invent'); goals.achieve('hold_events 2');  }),
    new Badge("hold_events 3", "", "You was hold 45 events.",
        function () { return (Gatherer.events.hold_events >= 45); }, function () {}),
    new Badge("hold_events 4", "", "You was hold 60 events.",
        function () { return (Gatherer.events.hold_events >= 60); }, function () {}),


    new Badge("accepted_lectures 1", "A new brunch", "You accepted 15 lectures.",
        function () { return (lectures.db.length >= 60 + 15); }, function () { Player.revealSecret('add_time'); goals.achieve('accepted_lectures 1'); }),
    new Badge("accepted_lectures 2", "Stable brunch", "You accepted 30 lectures.",
        function () { return (lectures.db.length >= 60 + 30); }, function () { Player.revealSecret('change_theme'); goals.achieve('accepted_lectures 2');  }),
    new Badge("accepted_lectures 3", "Old brunch", "You accepted 45 lectures.",
        function () { return (lectures.db.length >= 60 + 45); }, function () {}),
    new Badge("accepted_lectures 4", "Main brunch", "You accepted 60 lectures.",
        function () { return (lectures.db.length >= 60 + 60); }, function () {}),


    new Badge("learn 1", "", "You learn how to learning.",
        function () { return (Gatherer.events.increase_skill >= 15); }),
    new Badge("learn 2", "", "You learn how to learning right.",
        function () { return (Gatherer.events.increase_skill >= 30); }),
    new Badge("learn 3", "", "You learn how to learning fast.",
        function () { return (Gatherer.events.increase_skill >= 45); }),
    new Badge("learn 4", "", "You learn how to learning things you needed.",
        function () { return (Gatherer.events.increase_skill >= 60); }),

    new Badge("selfStudy 1", "", "15 Self Studies"),
    new Badge("selfStudy 2", "", "30 Self Studies"),
    new Badge("selfStudy 3", "", "45 Self Studies"),
    new Badge("selfStudy 4", "", "60 Self Studies"),

    new Badge("books 1", "", "15 Books"),
    new Badge("books 2", "", "30 Books"),
    new Badge("books 3", "", "45 Books"),
    new Badge("books 4", "", "60 Books"),

    new Badge("work 1", "", "15 Works"),
    new Badge("work 2", "", "30 Works"),
    new Badge("work 3", "", "45 Works"),
    new Badge("work 4", "", "60 Works"),

    new Badge("petProject 1", "", "15 Pet-projects"),
    new Badge("petProject 2", "", "30 Pet-projects"),
    new Badge("petProject 3", "", "45 Pet-projects"),
    new Badge("petProject 4", "", "60 Pet-projects"),




    new Badge("culture 1", "", "You feel the cultural growth."),
    new Badge("culture 2", "", "You feel the cultural rise."),
    new Badge("culture 3", "", "You led a moral imperative."),
    new Badge("culture 4", "", "You are part of the cultural revolution."),



    new Badge("writing 1", "", "Mom thinks that you write as Dostoevsky.",
        function () { return Player[writing] >= 15; }, function () { badges.achieve(writing + " 1"); }),
    new Badge("writing 2", "", "You think that you write as Dostoevsky.",
        function () { return Player[writing] >= 30; }, function () { badges.achieve(writing + " 2"); 
            Player.addSupervision(skills_departments[writing]); }),
    new Badge("writing 3", "", "Everyone thinks that you write as Dostoevsky.",
        function () { return Player[writing] >= 45; }, function () { badges.achieve(writing + " 3"); }),
    new Badge("writing 4", "", "Dostoevsky thinks you write as Dostoevsky.",
        function () { return Player[writing] >= 60; }, function () { badges.achieve(writing + " 4"); }),

    new Badge("drawing 1", "", "You can draw a cat.",
        function () { return Player[drawing] >= 15; }, function () { badges.achieve(drawing + " 1"); }),
    new Badge("drawing 2", "", "You can draw a man.",
        function () { return Player[drawing] >= 30; }, function () { badges.achieve(drawing + " 2");
        Player.addSupervision(skills_departments[drawing]); }),
    new Badge("drawing 3", "", "You can draw site.",
        function () { return Player[drawing] >= 45; }, function () { badges.achieve(drawing + " 3"); }),
    new Badge("drawing 4", "", "You do can draw a cat.",
        function () { return Player[drawing] >= 60; }, function () { badges.achieve(drawing + " 4"); }),

    new Badge("programming 1", "", "You feel the difference between a code and a broken encoding.",
        function () { return Player[programming] >= 15; }, function () { badges.achieve(programming + " 1"); }),
    new Badge("programming 2", "", "You feel the difference between a Class and an Object.",
        function () { return Player[programming] >= 30; }, function () { badges.achieve(programming + " 2"); 
        Player.addSupervision(skills_departments[programming]); }),
    new Badge("programming 3", "", "You feel the difference between Mixins and Traits.",
        function () { return Player[programming] >= 45; }, function () { badges.achieve(programming + " 3"); }),
    new Badge("programming 4", "", "You feel the difference between the Wrapper, the Proxy, the Facade and the Composite.",
        function () { return Player[programming] >= 60; }, function () { badges.achieve(programming + " 4"); }),

    new Badge("management 1", "", "You think that people do not listen to you.",
        function () { return Player[management] >= 15; }, function () { badges.achieve(management + " 1"); }),
    new Badge("management 2", "", "You think that people are listening to you.",
        function () { return Player[management] >= 30; }, function () { badges.achieve(management + " 2"); 
        Player.addSupervision(skills_departments[management]); }),
    new Badge("management 3", "", "You know that people are listening to you.",
        function () { return Player[management] >= 45; }, function () { badges.achieve(management + " 3"); }),
    new Badge("management 4", "", "You know that people do not listen to you.",
        function () { return Player[management] >= 60; }, function () { badges.achieve(management + " 4"); }),


    new Badge("act 1", "", "You act 15 times."),
    new Badge("act 2", "", "You act 30 times."),
    new Badge("act 3", "", "You act 45 times."),
    new Badge("act 4", "", "You act 60 times."),


    new Badge("likes 1", "Likes dabbling", "You earned 1000 likes.",
        Badge.checkResourcesGenerator('likes', 1), function () {}),
    new Badge("likes 2", "Likes collector", "You earned 10000 likes.",
        Badge.checkResourcesGenerator('likes', 2), function () {}),
    new Badge("likes 3", "Likes achiever", "You earned 100000 likes.",
        Badge.checkResourcesGenerator('likes', 3), function () {}),
    new Badge("likes 4", "Likes tycoon", "You earned 1000000 likes.",
        Badge.checkResourcesGenerator('likes', 4), function () {}),

    new Badge("design 1", "Design dabbling", "You earned 100 design.",
        Badge.checkResourcesGenerator('design', 1), function () {}),
    new Badge("design 2", "Design collector", "You earned 1000 design.",
        Badge.checkResourcesGenerator('design', 2), function () {}),
    new Badge("design 3", "Design achiever", "You earned 10000 design.",
        Badge.checkResourcesGenerator('design', 3), function () {}),
    new Badge("design 4", "Design tycoon", "You earned 100000 design.",
        Badge.checkResourcesGenerator('design', 4), function () {}),

    new Badge("money 1", "Money dabbling", "You earned 10 money.",
        Badge.checkResourcesGenerator('money', 1), function () {}),
    new Badge("money 2", "Money collector", "You earned 100 money.",
        Badge.checkResourcesGenerator('money', 2), function () {}),
    new Badge("money 3", "Money achiever", "You earned 1000 money.",
        Badge.checkResourcesGenerator('money', 3), function () {}),
    new Badge("money 4", "Money tycoon", "You earned 10000 money.",
        Badge.checkResourcesGenerator('money', 4), function () {}),

    new Badge("ideas 1", "Ideas dabbling", "You earned 1 ideas.",
        Badge.checkResourcesGenerator('ideas', 1), function () {}),
    new Badge("ideas 2", "Ideas collector", "You earned 10 ideas.",
        Badge.checkResourcesGenerator('ideas', 2), function () {}),
    new Badge("ideas 3", "Ideas achiever", "You earned 100 ideas.",
        Badge.checkResourcesGenerator('ideas', 3), function () {}),
    new Badge("ideas 4", "Ideas tycoon", "You earned 1000 ideas.",
        Badge.checkResourcesGenerator('ideas', 4), function () {})

];

badges.achieve = function (name) {
    badges.db.filter(function (val) {
        return (val.name == name) ? 1 : 0;
    }).forEach(function (value, id, array) {
        array[0].reached = 1;
        Player.revealSecret('badges');
        message("Badge reached: " + array[0].name);
    });
};

badges.getHTML = function () {

    var html = `<hr>
        <button class="collapsar" data-toggle="collapse" data-target="#badges_collapse">-</button>
        <span title="some achievements open next parts of game-play">Achievements:</span>
        <div class="collapse in" id="badges_collapse">
            <div id="badges">`;

    badges.db.filter(function (badge) {
        return badge.reached;
    }).forEach(function (val, id, arr) {
        html += `<div class="badge_element"><span class="badge_name">${val.label}. ${val.text}</span></div>`;
    });
    html += `</div></div>`;
    return html;
};