




function is_reached() {
    var founded = 0;
    for (var key in this.requires) {
        for (var obj_key in objectives.db) {
            if (objectives.db[obj_key].reached && objectives.db[obj_key].name == this.requires[key]) {
                founded++;
            }
        }
        for (var ach_key in badges.db) {
            if (badges.db[ach_key].reached && badges.db[ach_key].name == this.requires[key]) {
                founded++;
            }
        }
    }

    return (this.requires.length == founded);
}




/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function random(min, max) {
    return Math.random() * (max - min) + min;
}


/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() knowledge give you a non-uniform distribution!
 */
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};




function message(text) {
    console.log(text);
}

function tick() {
    message("A new day.");
    Player.harvest();
    Gatherer.tick();
    Civilization.tick();
    draw_all();
    localStorage.setItem("Player", JSON.stringify(Player));
}
