var prevDom = null;
var elements = ['DIV', 'P'];
document.addEventListener('mousemove', function(e) {
    var element = e.srcElement;
    if (elements.indexOf(element.nodeName) === -1)
        return;

    if (prevDom != null)
        $(prevDom).removeClass('highlight');

    $(element).addClass('highlight');
    prevDom = element;
});

var regexes = [
    /([\d,]{3,6})(([ ]?(שקל|ש"ח|₪))| )/,
    /(ארבעה|שני|שתי|שלושה|שלוש|ארבעה|ארבע|חמישה|חמש|[\d\.]{1,4}) חדרים/,
    /קומה (ראשונה|שנייה|שניה|שלישית|רביעית|חמישית|[\d\.])/
];

$(document).ready(function() {
    $('.userContent').each(function() {
        highlightRelevantTextInElement(this);
    });

    function highlightRelevantTextInElement(element) {
        for (var i = 0; i < regexes.length; i++) {
            var regex = regexes[i];

            var arr = splitTextForRegex($(element).html(), regex);
            if (!arr)
                continue;

            var html = highlightSplittedText(arr);
            $(element).html(html);
        }
    }

    function splitTextForRegex(text, regex) {
        pos = text.search(regex);
        if (pos === -1)
            return null;

        result = [];
        var length = text.match(regex)[0].length;
        result.push(text.substr(0, pos)); // split into a part before...
        result.push(text.substr(pos, length));
        result.push(text.substr(pos + length)); // a part after
        return result;
    }

    function highlightSplittedText(arr) {
        return arr[0] + '<span class="highlight">' + arr[1] + '</span>' + arr[2];
    }
});