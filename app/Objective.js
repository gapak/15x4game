
function Objective(name, label, text, requires, cost) {
    this.name = name;
    this.label = label;
    this.text = text;
    this.requires = requires;
    this.cost = cost;
    this.reached = 0;

    this.is_reached = is_reached;
}