const limiter = (array, limit) => {
    if(!Array.isArray(array)) {
        return [];
    }

    return array.slice(0, limit);
}

module.exports = limiter;