

function Lecture(lecturer_name, name, text, url, cost) {
	this.lecturer_name = lecturer_name;
    this.name = name;
    this.text = text;
    this.url = url;
	this.cost = cost;
    this.patience = (420 - Player.volunteers_memory) * 0.1 + Lecture.hype + Player.knowledge + Civilization.happiness + Player.enthusiasm;
    this.is_performed = 0;
}

	Lecture.hype = 0;
	Lecture.accepted_lectures_counter = 0;

 Lecture.generateLecture = function(old_lecturer) {
 	var lecturer_name = "";
 	if (old_lecturer) {
 		lecturer_name = old_lecturer;
 	} 
 	else {
	 	var first_name = ['Екатерина', 'Оксана', 'Александр', 'Максим', 'Евгений', 'Григорий', 'Николай'];
	 	var second_name = ['Хомяк', 'Морж', 'Рак', 'Бро', 'Зло', 'Добро', 'Сыч', 'Попович'];
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

 	var new_lecture = new Lecture (lecturer_name, name, " ", "https://15x4.org/lecture/random/", cost);
 	if (!old_lecturer) lectures.offered.push(new_lecture);

 	return new_lecture;
 };

 Lecture.accept_lecture = function(lecture_id) {
 	if (Player.action_points < 1 ) {
        message("Not enough action points.");
        return false;
	}

 	if (Player.withdrawArray(lectures.offered[lecture_id].cost)) {
	    Player.action_points--;
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
 	var random_resource = resources[Math.floor(Math.random() * resources.length)];
 	var random_resource_cost = resources_rates[random_resource] * (1 + Lecture.accepted_lectures_counter);
 	var offered_lecture_cost = {};

 	offered_lecture_cost[random_resource] = random_resource_cost;
 //	console.log(offered_lecture_cost);
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
 			Lecture.generateLecture();
 			message("New lecturer had come");
 			Player.revealSecret('offered_lecture');
 		}
 		Lecture.hype--;
 	}
 };

 Lecture.getHTML = function() {

 	var html = `<hr>
    <div>Offered lectures. Hype:  
    	<span id = "hype"></span>
    </div>
    <button class="collapsar" data-toggle="collapse" data-target="#offered_lecture_collapse">-</button>
    <button id="new_lecture" class = "cheat" onclick="Lecture.generateLecture();">Generate new lecture</button>
    <div id = "offered_lecture_collapse">
    	<div class="container collapse in" id = "offered_lectures_container">`;



    lectures.offered.forEach(function (lecture, id, arr) {
        for (var name in lecture.cost) break;
            var cost = lecture.cost[name];

		var timer = (lecture.patience < 60) ? ` (leave after ${lecture.patience.toFixed(0)}) ` : '';

        html += `
        <div class="offered_lecture_element">
        	<button onclick = "Lecture.accept_lecture(${id});">Accept</button>
       		${(Player.found_secrets.indexOf('add_time') !== -1) ? `<button onclick = "Lecture.addTime(${id});">Add time</button>` : ''}
       		${(Player.found_secrets.indexOf('change_theme') !== -1) ? `<button onclick = "Lecture.skip_lecture(${id});">Change Theme</button>` : ''}
        	<span class="offered_lecture_name">
        		${lecture.lecturer_name}. ${lecture.name} (need ${cost} ${name})
        		${timer}
        	</span>
        </div>`;

    });

    html += `</div></div>`;
    return html;
 };