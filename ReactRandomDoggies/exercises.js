// ms: number of milliseconds
// returns a Promise that is resolved after ms milliseconds
function delay(ms) {
    return setTimeout(() => {
        return new Promise({
            resolve("resolved");
        });
    }, ms);
}

// el: element node object
// moves the element to the right by 100px over a duration of 1 second
function animateRight(el) {
    el.style.position = 'absolute';
    timer = 0;

    let interval = setInterval(() => {
        timer += 100;
        let position = el.getBoundingClientRect().x;
        el.style.left = position + 10 + 'px';
        if (timer === 1000) {
            clearInterval(interval);
        }
    }, 100);
}

// xs: array
// returns: a new array, with unique items

function isEquals(elm1, elm2) {
    if (typeof elm1 !== typeof elm2) {
        return false;
    }
    if (typeof elm1 !== 'object') {
        return elm1 == elm2;
    }

    for (let key in elm1) {
        if (!elm2[key]) {
            return false;
        }
        if (!isEquals(elm1[key], elm2[key])) {
            return false;
        }
    }

    return true;
}
function removeDuplicates(xs) {
    let mapRepated = {};
    let newArray = [];
    for (let item of xs) {
        if (typeof item === 'object') {
            let isRepated = false;
            for (subItem of newArray) {
                if (isEquals(item, subItem)) {
                    isRepated = true;
                    break;
                }
            }
            if (!isRepated) {
                newArray.push(item);
            }
        } else if (!mapRepated[item]) {
            mapRepated[item] = 1;
            newArray.push(item);
        }
    }
    return newArray;
}
