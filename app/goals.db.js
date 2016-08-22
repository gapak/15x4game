
var goals = {};

goals.db = [
    new Goal("culture", "First of all try to find some friends"),
    new Goal("volunteers 1", "For growing you must found 15 volunteers."),
    new Goal("communication 1", "Upgrade communication to level 15 for unlock attentiveness."),
    new Goal("popularization 1", "Upgrade popularization to level 15 for unlock education."),
    new Goal("volunteers 2", "For growing you must found 30 volunteers."),

    new Goal("resources 1", "Collect some resources for unlock objectives"),
    new Goal("resources 2", "Collect many resources for unlock events"),

    new Goal("teamwork 1", "Upgrade teamwork to level 15 for able to upgrade departments."),
    new Goal("share 1", "Share you knowledge 15 times for able to increase your skill."),
    new Goal("volunteers 3", "For growing you must found 45 volunteers."),
    new Goal("motivation 1", "Upgrade motivation to level 15 for unlock activism."),
    new Goal("accepted_lectures 1", "Accept 15 lectures for able to add additional time for lecturer."),
    new Goal("hold_events 1", "Hold 15 events for able to cancel event."),
    new Goal("share 2", "Share you knowledge 30 times for able to read books."),
    new Goal("volunteers 4", "For growing you must found 60 volunteers."),

    new Goal("resources 3", "Collect a lot of resources for unlock resource sharing"),

    new Goal("share 3", "Share you knowledge 45 times for able to do job."),

    new Goal("accepted_lectures 2", "Accept 30 lectures for able to change lecture title."),
    new Goal("hold_events 2", "Hold 30 events for able to invent new event."),

    new Goal("share 4", "Share you knowledge 60 times for able to start your own project."),
];


goals.achieve = function (name) {
    goals.db.filter(function (val) {
        return (val.name == name) ? 1 : 0;
    }).forEach(function (value, id, array) {
        array[0].reached = 1;
    });
};