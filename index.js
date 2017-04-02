const actionHostname = (forcedHostname) => {

    const randomHostname = () => `browser-${Math.random().toString(36).substr(2, 6)}`;

    const getHostname = () => typeof window === 'undefined' || (typeof process !== 'undefined' && process.versions.electron)
        ? require('os').hostname() // node.js, electron main thread, electron renderer
        : randomHostname(); // browser

    const hostname = forcedHostname || getHostname();

    // middleware to assign hostname to meta
    return store => next => action => {
        const meta = Object.assign({ hostname }, action.meta);
        const actionWithMeta = Object.assign({}, action, { meta });
        return next(actionWithMeta);
    }
}

module.exports = actionHostname;
