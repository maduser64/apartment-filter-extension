window.apartementFilter = window.apartementFilter || {};
window.apartementFilter.parsers = window.apartementFilter.parsers || {};
window.apartementFilter.parsers.priceParser = (function() {
    return {
        regex: /([\d,]{4,6})(([ ]?(שקל|ש"ח|₪))| )/,
        group: 1,
        fieldName: 'price',
        parse: window.apartementFilter.utils.parsePrice
    }
})();