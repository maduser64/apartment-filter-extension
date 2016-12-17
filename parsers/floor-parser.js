window.apartementFilter.parsers.floorsParser = (function() {
    return {
        regex: /קומה (ראשונה|שנייה|שניה|שלישית|רביעית|חמישית|[\d\.])/,
        group: 1,
        fieldName: 'floor',
        parse: window.apartementFilter.utils.parseHebrewNumber
    }
})();