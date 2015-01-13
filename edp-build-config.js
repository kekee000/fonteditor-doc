var path = require( 'path' );

exports.input = __dirname;
exports.output = path.resolve(__dirname, './release');


exports.getProcessors = function () {


    return [
        new LessCompiler( {
            files: [
                'css/main.less'
            ],
            compileOptions: {
                relativeUrls: false
            }
        }),
        new ModuleCompiler( {
            files: [
                'src/main.js'
            ],
            configFile: './module.conf'
        }),

        new JsCompressor({
            files: [
                'src/main.js'
            ]
        }),

        // 清除冗余文件，比如`less`
        new OutputCleaner({
            files: [
                'src/*/**'
            ]
        })
    ];
};

exports.exclude = [
    ".svn",
    "*.conf",
    "*.sh",
    "*.bat",
    "*.md",
    "demo",
    "agent/*",
    "mock",
    "test/*",
    "edp-*",
    "output",
    "dep",
    ".DS_Store",
    ".gitignore",
    "package.json"
];

exports.injectProcessor = function ( processors ) {
    for ( var key in processors ) {
        global[ key ] = processors[ key ];
    }
};

