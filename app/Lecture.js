

function Lecture(lecturer_name, name, text, url, cost) {
    this.lecturer_name = lecturer_name;
    this.name = name;
    this.text = text;
    this.url = url;
    this.cost = cost;
    this.patience = (420 - Player.volunteers_memory) * 0.1 + Lecture.hype + Player.knowledge + Civilization.happiness + Player.enthusiasm;
    this.is_performed = 0;

    this.getCost = function () {
        var cost = {};
        for (var key in this.cost) {
            cost[key] = this.cost[key] * (1 + Lecture.accepted_lectures_counter);
        }
        return cost;
    }
}

Lecture.hype = 0;
Lecture.accepted_lectures_counter = 0;

Lecture.generateLecture = function(old_lecturer) {
    var new_lecture = null;
    var lecturer_name = "";
    if (old_lecturer) {
        lecturer_name = old_lecturer;
    } 
    else {
        if (lectures.classic.length != 0 && rand(0, 1) == 1) { // classic lectures hook
            new_lecture = lectures.classic[Math.floor(Math.random() * lectures.classic.length)];
            new_lecture.cost = Lecture.generate_offered_lecture_cost();
            return new_lecture;
        }

        var first_name = ['Екатерина', 'Оксана', 'Александр', 'Максим', 'Евгений', 'Григорий', 'Николай'];
        var second_name = ['Хомяк', 'Морж', 'Рак', 'Бро', 'Зло', 'Добро', 'Сыч', 'Попович', 'Черепущак', 'Кот'];
        lecturer_name = first_name[Math.floor(Math.random() * first_name.length)] + " " + 
                            second_name[Math.floor(Math.random() * second_name.length)];
    }


    var noun = ["Гарри Поттер", "15х4", "Биологическое оружие", "Космическая станция", "Атомные реакторы", "Садоводство", "Дзен", "Зомби", "Наркотики", "ГМО", "Хофштадтер", "Проституция", "Торговля людьми", "Рыбалка"];
    var second_noun = ["методы", "фунции", "генератор", "оружие", "открытие", "создание", "искусство", "принципы", "основы", "попытка", "метафизика", "последствия", "проявление", "последствия", "причины"];
    var adjective = ["рационального", "социального", "случайного", "массового", "наименьшего", "сознательного", "принципиального", "нормального", "культурного", "медленного", "качественного", "Кантовского", "философского"];
    var supplement = ["мышления", "менеджмента", "значения", "поражения", "котика", "существования", "управления", "генератора", "употребления", "обьяснения", "познания", "принципа", "императива"];

    var name = noun[Math.floor(Math.random() * noun.length)] + " как " + 
            second_noun[Math.floor(Math.random() * second_noun.length)] + " " + 
            adjective[Math.floor(Math.random() * adjective.length)] + " " + 
            supplement[Math.floor(Math.random() * supplement.length)];

            //message(name + ". " + lecturer_name);
    var cost = Lecture.generate_offered_lecture_cost();

    new_lecture = new Lecture (lecturer_name, name, " ", "https://15x4.org/lecture/random/", cost);
    //if (!old_lecturer) lectures.offered.push(new_lecture);

    return new_lecture;
 };

 Lecture.accept_lecture = function(lecture_id) {

    if (Player.withdrawArray(lectures.offered[lecture_id].getCost())) {
        Player.action_points++;
        lectures.db.push(lectures.offered[lecture_id]);
        lectures.offered.splice(lecture_id, 1);
        console.log("Lecture has accepted");
        Lecture.accepted_lectures_counter++;

    }
 };

Lecture.skip_lecture = function(lecture_id) {
    if (Player.action_points < 1) {
        message("Not enough action points.");
        return false;
    }
    else {
        Player.action_points--;
        var lecture = lectures.offered[lecture_id];
        var name = lecture.lecturer_name;
        lectures.offered[lecture_id] = Lecture.generateLecture(name);
    }
};

Lecture.addTime = function(lecture_id) {
    if (Player.action_points < 1) {
        message("Not enough action points.");
        return false;
    }
    else {
        Player.action_points--;
        lectures.offered[lecture_id].patience += (420 - Player.volunteers_memory) * 0.1 + Lecture.hype + Player.knowledge + Civilization.happiness + Player.enthusiasm;
    }
};

Lecture.generate_offered_lecture_cost = function () {
    var random_resource = '';
    var random_resource_cost = 0;
    var offered_lecture_cost = {};

    if (Player.volunteers < 30 || rand(0, 4) == 3) {
        random_resource = 'culture';
        random_resource_cost = culture_rate * 10;
    }
    else {
        random_resource = resources[Math.floor(Math.random() * resources.length)];
        random_resource_cost = resources_rates[random_resource];
    }

    offered_lecture_cost[random_resource] = random_resource_cost;
 // console.log(offered_lecture_cost);
    return offered_lecture_cost;
    
 };

 Lecture.tick = function () {
    lectures.offered.forEach(function (lecture, id) {
        if (lectures.offered[id].patience > 1) lectures.offered[id].patience--;
        else {
            message("Lecturer has disappointed and gone");
            lectures.offered.splice(id, 1);
        }
    });

    if (Lecture.hype > 0) {
        if (rand(0, 100) < Lecture.hype * 0.1) {
            lectures.offered.push(Lecture.generateLecture());
            message("New lecturer had come");
            Player.revealSecret('offered_lecture');
        }

        if (Lecture.hype > 60) {
            Lecture.hype--;
        }
        else {
            Lecture.hype -= (Lecture.hype / 60);
            Lecture.hype = Lecture.hype.toFixed(2) - 0.01;
        }
    }
 };

 Lecture.getHTML = function() {

    var html = `<hr>
        <div>Offered lectures. Hype:  
            <span id = "hype"></span>
        </div>
        <button class="collapsar btn btn-default" data-toggle="collapse" data-target="#offered_lecture_collapse"></button>
        <button id="new_lecture" class = "cheat btn btn-default" onclick="Lecture.generateLecture();">Generate new lecture</button>
        <div id = "offered_lecture_collapse">
            <div class="container collapse in" id = "offered_lectures_container">`;



        lectures.offered.forEach(function (lecture, id, arr) {
            goals.achieve('hype');

            var real_cost = lecture.getCost();

            for (var name in real_cost) break;

            var cost = real_cost[name];
            var timer = (lecture.patience < 60) ? ` (leave after ${lecture.patience.toFixed(0)}) ` : '';

                html += `
                <div class="offered_lecture_element">
                    <button class="btn btn-default" onclick = "Lecture.accept_lecture(${id});">Accept</button>
                    ${(Player.found_secrets.indexOf('add_time') !== -1) ? `<button class="btn btn-default" onclick = "Lecture.addTime(${id});">Add time</button>` : ''}
                    ${(Player.found_secrets.indexOf('change_theme') !== -1) ? `<button class="btn btn-default" onclick = "Lecture.skip_lecture(${id});">Change Theme</button>` : ''}
                    <span class="offered_lecture_name">
                        ${lecture.lecturer_name}. ${lecture.name} (need ${cost} ${name})
                        ${timer}
                    </span>
                </div>`;

        });

        html += `</div></div>`;
        return html;
 };