
var badges = {};

badges.db = [

    new Badge("tick 1", "Lost coordinator", "A month of your coordination is passed. You understand what's what.",
        function () { return (Gatherer.events.ticks > 30); }, function () {}),
    new Badge("tick 2", "Verified coordinator", "A ear of your coordination is passed. You steeled enough to avoid mistakes.",
        function () { return (Gatherer.events.ticks > 356); }, function () { Player.revealSecret('upgrade_department'); Player.revealSecret('cancel_event');  }),
    new Badge("tick 3", "Experienced coordinator", "A ten ear of your coordination is passed. You ready to invent something new.",
        function () { return (Gatherer.events.ticks > 356*10); }, function () { Player.revealSecret('invent');  }),
    new Badge("tick 4", "Hardened coordinator", "A century of your coordination is passed.",
        function () { return (Gatherer.events.ticks > 356*100); }, function () {}),

    new Badge("act 1", "", "You act 15 times."),
    new Badge("act 2", "", "You act 30 times."),
    new Badge("act 3", "", "You act 45 times."),
    new Badge("act 4", "", "You act 60 times."),

    new Badge("resources 1", "Resources dabbling", "You collect some.",
        function () { return ((Gatherer.collection.likes * 1 + Gatherer.collection.design * 10 + Gatherer.collection.money * 100 + Gatherer.collection.ideas * 1000) > 1000); }, function () { Player.revealSecret('objectives'); }),
    new Badge("resources 2", "Resources collector", "You collect many.",
        function () { return ((Gatherer.collection.likes * 1 + Gatherer.collection.design * 10 + Gatherer.collection.money * 100 + Gatherer.collection.ideas * 1000) > 1000 * 10); }, function () { Player.revealSecret('events'); }),
    new Badge("resources 3", "Resources achiever", "You have wealth.",
        function () { return ((Gatherer.collection.likes * 1 + Gatherer.collection.design * 10 + Gatherer.collection.money * 100 + Gatherer.collection.ideas * 1000) > 1000 * 100); }, function () { Player.revealSecret('sharing'); }),
    new Badge("resources 4", "Resources tycoon", "You have a huge savings.",
        function () { return ((Gatherer.collection.likes * 1 + Gatherer.collection.design * 10 + Gatherer.collection.money * 100 + Gatherer.collection.ideas * 1000) > 1000 * 1000); }, function () {}),

    new Badge("volunteers 1", "Group", "Founded 15 volunteers."),
    new Badge("volunteers 2", "Company", "Founded 30 volunteers."),
    new Badge("volunteers 3", "Community", "Founded 45 volunteers."),
    new Badge("volunteers 4", "Organization", "Founded 60 volunteers."),

    new Badge("learn 1", "", "You learn how to learning."),
    new Badge("learn 2", "", "You learn how to learning right."),
    new Badge("learn 3", "", "You learn how to learning fast."),
    new Badge("learn 4", "", "You learn how to learning things you needed."),



    new Badge("share 1", "Ready to learn", "You shared your knowledge 15 times.",
        function () { return (Gatherer.events.knowledge_sharing >= 15); }, function () { Player.revealSecret('skills'); Player.revealSecret('self_study'); }),
    new Badge("share 2", "Ready to read", "You shared your knowledge 30 times.",
        function () { return (Gatherer.events.knowledge_sharing >= 30); }, function () { Player.revealSecret('books'); }),
    new Badge("share 3", "Ready to work", "You shared your knowledge 45 times.",
        function () { return (Gatherer.events.knowledge_sharing >= 45); }, function () { Player.revealSecret('work'); }),
    new Badge("share 4", "Ready to lead", "You shared your knowledge 60 times.",
        function () { return (Gatherer.events.knowledge_sharing >= 60); }, function () { Player.revealSecret('pet_project'); }),


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



    new Badge("writing 1", "", "Mom thinks that you write as Dostoevsky."),
    new Badge("writing 2", "", "You think that you write as Dostoevsky."),
    new Badge("writing 3", "", "Everyone thinks that you write as Dostoevsky."),
    new Badge("writing 4", "", "Dostoevsky thinks you write as Dostoevsky."),

    new Badge("drawing 1", "", "You can draw a cat."),
    new Badge("drawing 2", "", "You can draw a man."),
    new Badge("drawing 3", "", "You can draw site."),
    new Badge("drawing 4", "", "You do can draw a cat."),

    new Badge("programming 1", "", "You feel the difference between a code and a broken encoding."),
    new Badge("programming 2", "", "You feel the difference between a Class and an Object."),
    new Badge("programming 3", "", "You feel the difference between Mixins and Traits."),
    new Badge("programming 4", "", "You feel the difference between the Wrapper, the Proxy, the Facade and the Composite."),

    new Badge("management 1", "", "You think that people do not listen to you."),
    new Badge("management 2", "", "You think that people are listening to you."),
    new Badge("management 3", "", "You know that people are listening to you."),
    new Badge("management 4", "", "You know that people do not listen to you."),


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