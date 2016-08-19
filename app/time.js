


function tick() {
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
}
