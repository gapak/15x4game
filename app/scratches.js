


function message(text) {
    if(text == "A new day."){LogPanel.day++;}
    //else if (text.includes("Balance ratio")) {}
    else{LogPanel.messages.push(new LogMessage(false,text));}
    console.log(text);
    //console.log(LogPanel.messages);
}

function tick() {
    message("A new day.");
    Player.harvest();
    Gatherer.tick();
    Badge.tick();
    Civilization.tick();
    Dungeon.tick();
    Space.tick();
    Rally.tick();
    Castle.tick();
    Lecture.tick();
    Startup.tick();
    localStorage.setItem("Player", JSON.stringify(Player));
    localStorage.setItem("lectures.db", JSON.stringify(lectures.db));

    draw_all();
}





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

function sum( obj ) {
    var sum = 0;
    for( var el in obj ) {
        if( obj.hasOwnProperty( el ) ) {
            sum += parseFloat( obj[el] );
        }
    }
    return sum;
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

function sum( obj ) {
    return Object.keys( obj )
        .reduce( function( sum, key ){
            return sum + parseFloat( obj[key] );
        }, 0 );
}




