var Time = {
    ticks: 0,
    day: 0,
    ear: 0,
    season: 'winter'
};

Time.tick = function () {
    Time.ticks++;
    Time.day = Time.ticks % 356;
    Time.ear = Math.floor(Time.ticks / 356);
    Time.season = ['winter', 'spring', 'summer', 'autumn'][Math.floor((Time.ticks % 356) / (356 / 4))];

    message("A new day.");

    Player.tick();
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
};

Time.getHTML = function () {
    var html = `
<div>
    <span> Ear: ${this.ear} </span>    
    <span> Day: ${this.day} </span>    
    <span> Season: ${this.season} </span>    
</div>
    `;

    return html;
};

