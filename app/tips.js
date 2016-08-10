/**
 * Created by Стас on 09.08.2016.
 */
var showingTooltip;

document.onmouseover = function(e) {
    if (!showingTooltip) {
        var target = e.target;
        var tooltip = target.getAttribute('data-tooltip');
        if (!tooltip) return;
        var tooltipElem = document.createElement('div');
        tooltipElem.className = 'skills_tip';
        tooltipElem.innerHTML = "U will get " + Player.countQuantity(tooltip,target.innerText).toFixed(2) + " skill points";
        document.body.appendChild(tooltipElem);
        var coords = target.getBoundingClientRect();

        var left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
        if (left < 0) left = 0;

        var top = coords.top - tooltipElem.offsetHeight - 5;
        if (top < 0) {
            top = coords.top + target.offsetHeight + 5;
        }

        tooltipElem.style.left = left + 'px';
        tooltipElem.style.top = top + 'px';
        showingTooltip = tooltipElem;
    }
};

document.onmouseout = function(e) {
 if (showingTooltip) {
 document.body.removeChild(showingTooltip);
 showingTooltip = null;
 }
};