const {src, dest, parallel, series, watch} = require("gulp");

// let projectFolder = require("path").basename(__dirname);

let srcFolder = 'src';
let distFolder = 'dist';

let path = {
    src: {
        html: [
            `${srcFolder}/*.html`,
            `!${srcFolder}/_*.html`
        ],
        css: [
            `${srcFolder}/styles/sass/*.{scss, sass}`,
            `!${srcFolder}/styles/sass/_*.{scss, sass}`
        ],
        js: [
            `${srcFolder}/js-scripts/modals.js`,
            `${srcFolder}/js-scripts/app.js`,
            `${srcFolder}/js-scripts/animations.js`,
        ],
        img: `${srcFolder}/images/src/**/*.{jpg,jpeg,gif,ico,png,webp}`,
        fonts: `${srcFolder}/fonts/**/*.{eot,otf,ttf,woff,woff2}`,
        libs: `${srcFolder}/libs/**/*`
    },

    build: {
        html: `${distFolder}/`,
        css: `${distFolder}/css/`,
        js: `${distFolder}/js/`,
        img: `${distFolder}/images/dist/`,
        fonts: `${distFolder}/fonts/`,
        libs: `${distFolder}/libs/`
    },

    watch: {
        html: `${srcFolder}/**/*.html`,
        css: `${srcFolder}/styles/sass/**/*.{scss, sass}`,
        js: `${srcFolder}/js-scripts/**/*.js`,
        img: `${srcFolder}/images/src/**/*`,
        libs: `${srcFolder}/libs/**/*`
    },
    clean: [
        `${distFolder}/`,
        `${srcFolder}/js/`,
        `${srcFolder}/css/`,
    ],
    imagesClean: [
        `${srcFolder}/images/dist/`,
        `${distFolder}/images/**/*`,
    ],
    fontsClean: [
        `${distFolder}/fonts/**/*`,
    ]
};

const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const del = require('del');
const fileInclude = require("gulp-file-include");
const groupMedia = require("gulp-group-css-media-queries");
const  babel = require('gulp-babel');
const fonter = require('gulp-fonter');


function fnBrowserSync() {
    browserSync.init({
        server: {
            baseDir: `${distFolder}/`
        },
        port: 3000,
        notify: false,
        online: true
    })
}

function html() {
    return src(path.src.html)
        .pipe(fileInclude())
        .pipe(dest(path.build.html))
        .pipe(browserSync.stream())
}

function css() {
    return src(path.src.css)
        .pipe(sass({
            outputStyle: "expanded"
        }))
        .pipe(concat('main.css'))
        .pipe(autoprefixer({
            cascade: false,
            grid: true,
        }))
        .pipe(dest(`${srcFolder}/css/`))
        .pipe(dest(path.build.css))
        .pipe(rename({
            suffix: ".min",
        }))
        .pipe(dest(`${srcFolder}/css/`))
        .pipe(dest(path.build.css))
        .pipe(browserSync.stream())
}

function buildCSS() {
    return src(path.src.css)
        .pipe(sass({
            outputStyle: "expanded"
        }))
        // .pipe(
        //     groupMedia()
        // )
        .pipe(concat('main.css'))
        .pipe(autoprefixer({
            cascade: false,
            grid: true,
        }))
        .pipe(dest(`${srcFolder}/css/`))
        .pipe(dest(path.build.css))
        .pipe(cleanCSS({
            level: {
                1: {
                    specialComments: 0,
                },
            },
            //format: 'beautify', // 'keep-breaks'
        }))
        .pipe(rename({
            suffix: ".min",
        }))
        .pipe(dest(`${srcFolder}/css/`))
        .pipe(dest(path.build.css))
        .pipe(browserSync.stream())
}

function js() {
    return src(path.src.js)
        .pipe(concat('main.js'))
        .pipe(dest(`${srcFolder}/js`))
        .pipe(dest(path.build.js))
        .pipe(
            rename({
                suffix: ".min"
            })
        )
        .pipe(dest(`${srcFolder}/js`))
        .pipe(dest(path.build.js))
        .pipe(browserSync.stream())
}

function buildJS() {
    return src(path.src.js)
        .pipe(concat('main.js'))
        .pipe(dest(`${srcFolder}/js`))
        .pipe(dest(path.build.js))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(
            uglify()
        )
        .pipe(
            rename({
                suffix: ".min"
            })
        )
        .pipe(dest(`${srcFolder}/js`))
        .pipe(dest(path.build.js))
        .pipe(browserSync.stream())
}

function images() {
    return src(path.src.img)
        .pipe(newer(`${srcFolder}/images/dist/`))
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5,
            svgoPlugins: [
                {removeViewBox: false},
                {cleanupIDs: false},
                {removeUselessDefs: false},
                {convertPathData: false },
                {mergePaths: false },
                {removeXMLProcInst: false },
                {minifyStyles: false},
                {removeUselessStrokeAndFill: false },
                {removeHiddenElements: false}
            ],
        }))
        .pipe(dest(`${srcFolder}/images/dist/`))
        .pipe(dest(path.build.img))
        .pipe(browserSync.stream())
}

function fonts() {
    return src(path.src.fonts)
        .pipe(fonter(
            {
            formats: ['woff', 'ttf', 'eot']
        }))
        .pipe(dest(path.build.fonts))
}

function copyFonts() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
}

function copyLibs() {
    return src(path.src.libs)
        .pipe(dest(path.build.libs))
}

function copyImg() {
    return src(`${srcFolder}/images/src/**/*`)
        .pipe(newer(`${srcFolder}/images/dist/`))
        .pipe(dest(`${srcFolder}/images/dist/`))
        .pipe(dest(path.build.img))
        .pipe(browserSync.stream())
}

function copySvg() {
    return src(`${srcFolder}/images/src/**/*`)
        .pipe(newer(`${srcFolder}/images/dist/*`))
        .pipe(dest(`${srcFolder}/images/dist/`))
        .pipe(dest(path.build.img))
        .pipe(browserSync.stream())
}

function copyVideo() {
    return src(`${srcFolder}/videos/**/*`)
        .pipe(dest(`dist/videos/`))
        .pipe(browserSync.stream())
}

function watchFiles() {
    watch([path.watch.html], html);
    watch([path.watch.css], css);
    watch([path.watch.js], js);
    watch([path.watch.libs], copyLibs);
    watch([path.watch.img], copyImg);
    watch([`${srcFolder}/videos/**/*`], copyVideo);
}


function clean() {
    return del(path.clean);
}
function cleanImages() {
    return del(path.imagesClean);
}
function cleanFonts() {
    return del(path.fontsClean);
}


const building = series( clean, cleanImages, cleanFonts, parallel( buildCSS, buildJS, images, copyFonts, copyLibs, copySvg, copyVideo, html ));
const watching =  parallel( series( clean, cleanFonts, cleanImages, parallel(css, js, html,  copyLibs, copyFonts, copyImg, copyVideo )) , watchFiles, fnBrowserSync);
const fontsBuild = series( cleanFonts, fonts );
const imagesBuild = series( cleanImages, images, copySvg );

exports.build = building;
exports.watch = watching;
exports.imgbuild = imagesBuild;
exports.fontsbuild = fontsBuild;
exports.fontscopy = copyFonts;
exports.svgcopy = copySvg;
exports.default = building;


































