// const loader = function (whenDone = () => ({}), ..scripts) {
//     scripts.reduceRight((script, next) => {
//         let elm = document.createElement('script');
//         elm.onLoad = function () {
//             console.log(`loaded ${script}`);
//             next();
//         };

//         return () => elm.src = script;
//     }, whenDone);
// }

// loader(() => VSS.whenDone(), 'dist/foo', 'dist/bar', 'dist/baz');

