window.apartementFilter = window.apartementFilter || {};
window.apartementFilter.utils = (function() {

    function parseHebrewNumber(text) {
        var number = parseFloat(text);
        if (number)
            return number;

        switch (text) {
            case 'חמישי':
            case 'חמש':
            case 'חמישה':
            case 'חמישית':
            case '5':
                return 5;
            case 'ארבע':
            case 'ארבעה':
            case 'רביעי':
            case 'רביעית':
            case '4':
                return 4;
            case "שלושה":
            case "שלשה":
            case "שלוש":
            case 'שלישית':
            case 'שלישי':
            case "3":
                return 3;
            case "שניים":
            case "שני":
            case "שתי":
            case "שתיים":
            case 'שניה':
            case 'שנייה':
            case "2":
                return 2;
            case "אחד":
            case "אחת":
            case 'ראשון':
            case 'ראשונה':
            case "1":
                return 1
            default:
                return null;
        }
    }

    function parsePrice(text) {
        return parseInt(text.replace(/[, ]/, ''));
    }

    return {
        parsePrice: parsePrice,
        parseHebrewNumber: parseHebrewNumber
    }
})();