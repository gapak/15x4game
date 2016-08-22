
function Goal(name, text) {
    this.name = name;
    this.text = text;
    this.reached = 0;
}

Goal.displayed_goals_count = 1;

Goal.getHTML = function () {
    var displayed_goals = [];

    for (var key in goals.db) {
        if (goals.db[key].reached === 0) {
            displayed_goals.push(`<span class="flex-element">${goals.db[key].text}</span>`);
            if (displayed_goals.length >= Goal.displayed_goals_count) break;
        }
    }

    var html = displayed_goals.join('');
    return html;
};