var options = {
    enabled: true,
    rotoballer: true,
    baseballreference: true,
    cbs: true,
    espn: true,
    toolbar: false
};

function getOptions(func) {
    chrome.storage.sync.get(options, function (data) {
        if (data !== undefined) {
            options = data;
        }
        func(options);
    });
}

function setOptions(func) {
    chrome.storage.sync.set(options, function () {
        func();
    });
}