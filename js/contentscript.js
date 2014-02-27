var options;
var observerConfig = {
    childList: true,
    characterData: true,
    subtree: true
};

$(document).ready(function () {
    getOptions(function (opt) {
        options = opt;
        if (options.toolbar) {
            chrome.extension.sendRequest("showPageAction");
        }
        if (options.enabled) {
            addSites();
        }
    });
});

function addSites() {
    if (options.espn && document.URL.indexOf("espn") != -1) {
        addESPNLinks();
        addESPNEvents();
    } else if (options.cbs && document.URL.indexOf("cbssports") != -1) {
        addCBSLinks();
        addCBSEvents();
    }
}

function addESPNLinks() {
    $('.RotoBallerLink').remove();
    $('.playertablePlayerName').children(':first-child').each(function () {
        $(this).parent().append(getLinks($(this).text()));
    });
}

function addESPNEvents() {
    var target = document.querySelector('.playerTableContainerDiv');

    var observerESPN = new MutationObserver(function (mutations) {
        observerESPN.disconnect();
        if (mutations.length > 0) {
            addESPNLinks();
        }
        observerESPN.observe(target, observerConfig);
    });
    observerESPN.observe(target, observerConfig);
}

function addCBSLinks() {
    $('.RotoBallerLink').remove();
    $('a.playerLink').each(function () {
        if ($(this).parent().is('td')) {
            var splitIndex = $(this).text().indexOf(', ');
            var originalName = $(this).text();
            $(this).parent().append(getLinks(originalName.substring(splitIndex + 2, originalName.length) + ' ' +
                originalName.substring(0, splitIndex)));
        }
    });
}

function addCBSEvents() {
    var target = document.querySelector('#pageContainer');

    var observerCBS = new MutationObserver(function (mutations) {
        observerCBS.disconnect();
        if (mutations.length > 0) {
            addCBSLinks();
        }
        observerCBS.observe(target, observerConfig);
    });
    observerCBS.observe(target, observerConfig);
}

function getLinks(playerName) {
    var returnString = '';
    returnString += getLinkHTML(playerName, 'http://www.rotoballer.com/fantasy-baseball-mlb-player-news/', 'http://www.rotoballer.com/wp-content/uploads/2014/01/rotoballer-baseball-logo-black-transparent-vector.png');
    return returnString;
}

function getLinkHTML(playerName, playerProfileLink, favIconLink) {
    var urlName = playerName.split(' ').join('+');
    return '<a class="RotoBallerLink" href="' + playerProfileLink + urlName +
        '" target="_blank"><img src="' + favIconLink + '" height="14" width="14" border="0"' +
        ' style="margin:-2px 6px -2px 6px" title="' + playerName + '" /></a>';
}
