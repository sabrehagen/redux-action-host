const hostname = require('os').hostname();

const actionHostname = store => next => action => {
    const meta = Object.assign({}, action.meta, { hostname });
    const actionWithMeta = Object.assign({}, action, { meta });
    return next(actionWithMeta);
}

module.exports = actionHostname;
