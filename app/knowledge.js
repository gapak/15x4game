

var resources = ['likes', 'design', 'money', 'ideas'];
var resources_rates = {'likes': 1000, 'design': 100, 'money': 10, 'ideas': 1};
var resources_base_limits = {'likes': 5000, 'design': 500, 'money': 50, 'ideas': 5};

var C2_resources = ['cultural_approval', 'cultural_concept', 'cultural_project', 'cultural_reform'];
var C2_resources_rates = {'cultural_approval': 1000, 'cultural_concept': 100, 'cultural_project': 10, 'cultural_reform': 1};

var space_resources = ['iron', 'oil', 'uranium', 'iridium'];

var skill_to_resource = {'writing': 'likes', 'drawing': 'design', 'programming': 'money', 'management': 'ideas'};

var culture_rate = 1;

var adjustment = 10 / 60 / 60;

var skills_departments = {
    "writing" : 'smm',
    "drawing" : 'design',
    "programming" : 'site',
    "management" : 'docs'
};


