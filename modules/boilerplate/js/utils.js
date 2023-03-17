////////////////////////////////////////
// HELPERS THAT EXTENDS JS CAPABILITIES
// format HTML string into element and append it as last child of parentEl. returns the formatted element itself
function placeLast(HTMLstring, parentEl) {
    parentEl.insertAdjacentHTML('beforeend', HTMLstring);
    return parentEl.lastElementChild;
}
function getElementPropertyValue(element, property) {
    return element.ownerDocument.defaultView.getComputedStyle(element).getPropertyValue(property);
}
function assignStyle(element, style) {
    Object.assign(element.style, style);
}
////////////////////
//////////////////////////////
// HELPERS THAT EXTENDS ELEMENT MANIPOLATION ON BGA ENVIROMENT
// place element inside target element (if append, otherwise on temp oversurface used for moving elements) at absolute cordinates (x,y) relative to parent element top-left corner
// throws warn if target or surface are absolutely positioned, as element positioning would be thus affected.
function placeElement(element, target, append, surface) {
    if (append === void 0) { append = false; }
    if (surface === void 0) { surface = null; }
    surface = surface || $('game_play_area');
    var surfacePos = surface.getBoundingClientRect();
    var targetPos = target.getBoundingClientRect();
    if (getElementPropertyValue(surface, 'position') == 'absolute' || (append && getElementPropertyValue(target, 'position') == 'absolute')) {
        console.warn("Target or surface element is absolutely positioned, element position might be affected");
    }
    log('moving element', element);
    log('to target', target, targetPos);
    log('on moving surface', surface, surfacePos);
    if (append) {
        target.append(element);
        assignStyle(element, {
            left: '0px',
            top: '0px'
        });
    }
    else {
        if (element.parentElement != surface) {
            surface.append(element);
        }
        assignStyle(element, {
            left: (targetPos.left - surfacePos.left) + 'px',
            top: (targetPos.top - surfacePos.top) + 'px'
        });
    }
    element.offsetHeight; // force render
}
function slideElement(element, target, duration, delay, append, surface) {
    if (duration === void 0) { duration = 0; }
    if (delay === void 0) { delay = 0; }
    if (append === void 0) { append = false; }
    if (surface === void 0) { surface = null; }
    surface = surface || $('game_play_area');
    if (element.parentElement != surface)
        this.placeElement(element, element);
    /* if (this.instantaneousMode) {
        duration = 0;
        delay = 0;
    } */
    element.style.transition = "all ".concat(duration, "ms ").concat(delay, "ms ease-in-out");
    element.offsetHeight; // force render
    placeElement(element, target, append, surface);
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            element.style.transition = '';
            resolve(element);
        }, duration + delay);
    });
}
var a = $('a');
var b = $('b');
