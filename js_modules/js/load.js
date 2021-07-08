const registry = {}

function loadSingleScript(url, callback) {
    if (registry[url]) {
        return;
    } else {
        const element = document.createElement("script");
        element.type = "text/javascript";
        element.src = url;
        if (callback) {
            element.onload = callback;
        }
        registry[url] = true;
        document.body.appendChild(element);
    }
}

function loadManyScripts(urls, callback) {
    const loadedScripts = {};
    urls.forEach(url => {
        loadSingleScript(url, () => {
            loadedScripts[url] = true;
            const allLoaded = urls.every((urlToCheck) => loadedScripts[urlToCheck]);
            if (allLoaded) {
                callback();
            }
        });
    });
}

function loadScript(param, callback) {
    if (Array.isArray(param)) {
        loadManyScripts(param, callback);
    } else if (typeof param == 'string') {
        loadSingleScript(param, callback);
    } else {
        param();
        if (callback) {
            callback();
        }
    }
}