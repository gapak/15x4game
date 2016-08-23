
function Objective(name, label, text, requires, cost, init_code) {
    this.name = name;
    this.label = label;
    this.text = text;
    this.requires = requires;
    this.cost = cost;
    this.init_code = init_code;

    this.reached = 0;
    this.is_reached = is_reached;
}