window.apartementFilter.parsers.roomsParser = (function() {
    return {
        regex: /(ארבעה|שני|שתי|שלושה|שלוש|ארבעה|ארבע|חמישה|חמש|[\d\.]{1,4}) חדרים/,
        group: 1,
        fieldName: 'rooms',
        parse: window.apartementFilter.utils.parseHebrewNumber
    }
})();