var skills = ["writing", "drawing", "programming", "management"];

skills.getHTML = function() {
    var html = `<hr>
        <button class="collapsar btn btn-default" data-toggle="collapse" data-target="#skills_collapse">-</button>
        Skills:
        <div class="collapse in" id="skills_collapse">
            <div class="flex-container-row" id="skills">`;

    
    skills.forEach(function(skill) {
        html += `
        <div class="flex-element flex-container-column" id="${skill}">
            <span id="${skill}_indicator"> ${skill.capitalizeFirstLetter()}: ${Player[skill].toFixed(2)}/60</span>
            ${(Player.found_secrets.indexOf('self_study') !== -1) ? `<button class="btn btn-default" data-tooltip='${skill}' onclick="Player.selfStudy('${skill}')">Self-study</button>` : ''}
            ${(Player.found_secrets.indexOf('books') !== -1) ? `<button class="btn btn-default" data-tooltip='${skill}' onclick="Player.books('${skill}')">Books</button>` : ''}
            ${(Player.found_secrets.indexOf('work') !== -1) ? `<button class="btn btn-default" data-tooltip='${skill}' onclick="Player.work('${skill}')">Work</button>` : ''}
            ${(Player.found_secrets.indexOf('pet_project') !== -1) ? `<button class="btn btn-default" data-tooltip='${skill}' onclick="Player.petProject('${skill}')">Pet-project</button>` : ''}
        </div>`;
    });
    html += `</div></div>`;
    return html;
};


