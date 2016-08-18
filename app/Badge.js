
function Badge(name, label, text, check_code, init_code) {
    this.name = name;
    this.label = label;
    this.text = text;
    this.check_code = check_code;
    this.init_code = init_code;
    this.reached = 0;
}

Badge.tick = function () {
    badges.db.forEach(function (badge) {
        if (!badge.reached) {
            if (typeof badge.check_code === 'function') {
                if (badge.check_code()) {
                    badge.reached = 1;
                    Player.revealSecret('badges');
                    message("Badge reached: " + badge.name);
                    if (typeof badge.init_code === 'function') {
                        badge.init_code();
                    }
                }
            }
        }
    });
};

Badge.checkResourcesGenerator = function (resource_name, badge_level) {
    return function () {
        return (Gatherer.collection[resource_name] > resources_rates[resource_name] * 0.1 * (Math.pow(10, badge_level)))
    };
};
