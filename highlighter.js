window.apartementFilter = window.apartementFilter || {};

$(document).ready(function() {
    var mapping = {};

    var target = document.querySelector("body");

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            console.log(mutation.type);
        });
    });

    // configuration of the observer:
    var config = { attributes: true, childList: true, characterData: true }

    // pass in the target node, as well as the observer options
    observer.observe(target, config);

    setTimeout(function() {
        $('.userContent').each(function() {
            highlightRelevantTextInElement(this);
        });
    }, 2000);

    setTimeout(function() {
        filterMapping('price', function(value) {
            return value < 7000;
        })
    }, 4000);

    function highlightRelevantTextInElement(element) {
        var parsers = window.apartementFilter.parsers;
        var values = {};
        for (var parserKey in parsers) {
            var parser = parsers[parserKey];
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
        result.push(text.slice(0, pos)); // split into a part before...
        result.push(text.slice(pos, pos + length));
        result.push(text.slice(pos + length)); // a part after
        return result;
    }

    function highlightSplittedText(arr) {
        return arr[0] + '<span class="highlight">' + arr[1] + '</span>' + arr[2];
    }
});