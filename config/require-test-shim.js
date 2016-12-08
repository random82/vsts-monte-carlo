var tests = [];
for (var file in window.__karma__.files) {
    if (/karma-test-shim\.js$/.test(file)) {
        tests.push(file);
    }
}

define('TFS/WorkItemTracking/RestClient', function(){
    return{
        
    }
});

requirejs.config({
    baseUrl: '../scripts',

    deps: tests,

    callback: window.__karma__.start
});
