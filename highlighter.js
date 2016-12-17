var prevDom = null;
var elements = ['DIV', 'P'];

window.apartementFilter = window.apartementFilter || {};

// document.addEventListener('mousemove', function(e) {
//     var element = e.srcElement;
//     if (elements.indexOf(element.nodeName) === -1)
//         return;

//     if (prevDom != null)
//         $(prevDom).removeClass('highlight');

//     $(element).addClass('highlight');
//     prevDom = element;
// });


$(document).ready(function() {
    var mapping = {};
    setTimeout(function() {
        $('.userContent').each(function() {
            highlightRelevantTextInElement(this);
        });
    }, 2000);

    setTimeout(function() {
        filterMapping('price', function(value) {
            return value < 3300;
        })
    }, 4000);

    function highlightRelevantTextInElement(element) {
        var parsers = window.apartementFilter.parsers;
        var values = {};
        for (var parserKey in parsers) {
            var parser = parsers[parserKey];
            console.log(parserKey + " - " + JSON.stringify(parser));
            var text = $(element).html();
            var splittedRegex = splitTextForRegex(text, parser.regex, parser.group);
            if (splittedRegex == null)
                continue;

            var value = splittedRegex[1];
            values[parser.fieldName] = parser.parse(value);
            $(element).html(highlightSplittedText(splittedRegex));
        }

        if (Object.keys(values).length == 0)
            hideFaceboolPost($(element));
        else
            mapping[$(element).attr('id')] = values;
    }

    function hideFaceboolPost(element) {
        $(element).parent().parent().parent().hide(600);
    }

    function filterMapping(key, predicate) {
        $('.userContent').each(function() {
            var value = mapping[$(this).attr('id')];
            if (!value) {
                hideFaceboolPost(this);
                return;
            }

            if (!predicate(value[key]))
                hideFaceboolPost(this);
        });
    }

    function splitTextForRegex(text, regex, group) {
        pos = text.search(regex);
        if (pos === -1)
            return null;

        result = [];

        var match = text.match(regex);
        var matchValue;
        if (match.length <= group) {
            console.warn("Missing group key");
            matchValue = match[0];
        } else
            matchValue = match[group];
        var length = matchValue.length;
        result.push(text.substr(0, pos)); // split into a part before...
        result.push(text.substr(pos, length));
        result.push(text.substr(pos + length)); // a part after
        return result;
    }

    function highlightSplittedText(arr) {
        return arr[0] + '<span class="highlight">' + arr[1] + '</span>' + arr[2];
    }
});