////////////////////////////////////////
// HELPERS THAT EXTENDS JS CAPABILITIES

/**
 * Format HTML string into HTML element and appends it to parent HTML element.
 * returns the formatted element itself
*/
function placeLast(HTMLstring: string, parentEl: HTMLElement) {

    parentEl.insertAdjacentHTML('beforeend',HTMLstring);

    return parentEl.lastElementChild as HTMLElement;
}

function getElementPropertyValue(element: HTMLElement, property: string) : any {
    return element.ownerDocument.defaultView.getComputedStyle(element).getPropertyValue(property);
}

/**
 * Assign multiple CSS style properties to HTML element via object declaration type.
 * Param 'clear' resets element style entirely.
*/
function assignStyle(element: HTMLElement, style: Object, clear: boolean = false) {
    
    if (clear) element.style.cssText = '';

    Object.assign(element.style, style);

    element.offsetHeight; // force event loop to stop, assign properties and render object with modifications
}

/**
 * Returns final HTML element position relative to document.
*/
function getElementGlobalPosition(element: HTMLElement): Vec2 {
    let pos = element.getBoundingClientRect();

    return {
        x: pos.x,
        y: pos.y
    }
}

/**
 * Returns HTML element size after all transforms.
*/
function getElementRenderSize(element: HTMLElement): Size {
    let size = element.getBoundingClientRect();

    return {
        width: size.width,
        height: size.height
    }
}

function getElementParentsSince(element: HTMLElement, ancestor: HTMLElement = null) {
    let parents: HTMLElement[] = [];

    while (element.parentElement && element.parentElement != ancestor) {

        parents.push(element.parentElement);
        element = element.parentElement;
    }

    return parents;
}

function getCommonAncestor(el1: HTMLElement, el2: HTMLElement): HTMLElement {
    let el1Parents = getElementParentsSince(el1);
    let el2Parents = getElementParentsSince(el2);

    for (const parent of el1Parents) {
        if (el2Parents.includes(parent)) {
            return parent;
        }    
    }

    return null;
}

/**
 * Returns transform string representing combination of transforms needed to replicate the exact final transform state of element, relative to target (it's difficult to explain).
 * Robust to scale transforms only (because of its commutative property)
*/
function getCommonFinalTransform(element,target) {
    let transform = '';

    getElementParentsSince(element,getCommonAncestor(element,target)).forEach(parent => {
        
        let parentTransform = getElementPropertyValue(parent,'transform');
        if (parentTransform != 'none') transform += parentTransform;
    });

    return transform;
}

////////////////////

//////////////////////////////
// HELPERS THAT EXTENDS ELEMENT MANIPOLATION ON BGA ENVIROMENT
// TODO: move everything inside game class, "this" is needed sometimes. also these methods make sense only inside the Game context

// TODO: convert optional params in tisaac style config object


// place element inside target element (if append, otherwise on temp oversurface used for moving elements) at absolute cordinates (x,y) relative to parent element top-left corner
// throws warn if target or surface are absolutely positioned, as element positioning would be thus affected.
function placeElement (element: HTMLElement, target: HTMLElement, surface: HTMLElement = null) {
    surface = surface || $('game_play_area');

    let surfacePos = surface.getBoundingClientRect();
    let targetPos = target.getBoundingClientRect();

    /* if (getElementPropertyValue(surface,'position') == 'absolute' || (append && getElementPropertyValue(target,'position') == 'absolute')) {
        console.warn("Target or surface element is absolutely positioned, element position might be affected");
    } */

    log('moving element', element);
    log('to target', target, targetPos);
    log('on moving surface', surface, surfacePos);

    element.style.position = 'absolute';

    if (element.parentElement != surface) {
        surface.append(element);
    }

    assignStyle(element, {
        left: (targetPos.left - surfacePos.left) + 'px',
        top: (targetPos.top - surfacePos.top) + 'px',
    });
}

function slideElement (element: HTMLElement, target: HTMLElement, duration: number = 0, delay: number = 0, append: boolean = false, surface: HTMLElement = null) {

    surface = surface || $('game_play_area');

    if (element.parentElement != surface) this.placeElement(element,element);

    /* if (this.instantaneousMode) {
        duration = 0;
        delay = 0;
    } */

    element.style.transition = `all ${duration}ms ${delay}ms ease-in-out`;
    element.offsetHeight; // force render

    placeElement(element,target,surface);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            element.style.transition = '';

            if (append) {

                target.append(element);

                assignStyle(element, {}, true);
            }

            resolve(element);
        }, duration+delay);
    });
}


// test variables

let a = $('a');
let b = $('b');
let c = $('c');

let animConfig: SlideAnimationConfig = {
    duration: 10000,
    delay: 0,
    pos: {x:0, y:0},
    append: true,
    beforeSibling: null,
    phantomIn: true,
    phantomOut: true,
    slideSurface: 'default',
    className: 'moving',
    adaptScale: true
}