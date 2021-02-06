// Папка для релиза
let project_folder = require('path').basename(__dirname)
// Папка с исходниками
let source_folder = '#src'

let fs = require('fs')

// Пути вывода файлов
let path = {
	// Пути вывода файлов для dist
	build: {
		html: project_folder + '/',
		css_library: project_folder + '/css/library',
		css: project_folder + '/css/',
		js_library: project_folder + '/js/library',
		js: project_folder + '/js/',
		img: project_folder + '/img/',
		fonts: project_folder + '/fonts/'
	},
	src: {
		// Пути используемых файлов #src
		html: [source_folder + '/*.html', '!' + source_folder + '/_*.html'],
		css_library: source_folder + '/css/library/**/*.{min.css,css}',
		css: source_folder + '/scss/style.scss',
		js_library: source_folder + '/js/library/**/*.{min.js,js}',
		js: source_folder + '/js/script.js',
		img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
		fonts: source_folder + '/fonts/*.ttf',
	},
	watch: {
		// Пути к файлом которые постояно обрабатываются слушателем событий
		html: source_folder + '/**/*.html',
		css: source_folder + '/scss/**/*.scss',
		js: source_folder + '/js/**/*.js',
		img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
	},
	// Удаление папки при каждом запуске gulp
	clean: './' + project_folder + '/'
}

let { src, dest } = require('gulp'),
	gulp = require('gulp'),
	browsersync = require('browser-sync').create(),
	fileinclude = require('gulp-file-include'),
	del = require('del'),
	scss = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	group_media = require('gulp-group-css-media-queries'),
	clean_css = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify-es').default,
	ttf2woff = require('gulp-ttf2woff'),
	ttf2woff2 = require('gulp-ttf2woff2'),
	fonter = require('gulp-fonter')

function browserSync(params) {
	browsersync.init({
		server: {
			baseDir: './' + project_folder + '/'
		},
		port: 3000,
		notify: false
	})
}

function html() {
	return src(path.src.html)
		.pipe(fileinclude())
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream())
}

function cssLibrary() {
	return src(path.src.css_library)
		.pipe(dest(path.build.css_library))
		.pipe(browsersync.stream())
}

function css() {
	return src(path.src.css)
		.pipe(
			scss({
				outputStyle: 'expanded'
			})
		)
		.pipe(
			group_media()
		)
		.pipe(
			autoprefixer({
				overrideBrowserslist: ['last 5 version'],
				cascade: true
			})
		)
		.pipe(dest(path.build.css))
		.pipe(clean_css())
		.pipe(
			rename({
				extname: '.min.css'
			})
		)
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
}

function jsLibrary() {
	return src(path.src.js_library)
		.pipe(dest(path.build.js_library))
		.pipe(browsersync.stream())
}

function js() {
	return src(path.src.js)
		.pipe(fileinclude())
		.pipe(dest(path.build.js))
		.pipe(
			uglify()
		)
		.pipe(
			rename({
				extname: '.min.js'
			})
		)
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream())
}

function images() {
	return src(path.src.img)
		.pipe(dest(path.build.img))
		.pipe(browsersync.stream())
}

function fonts() {
	src(path.src.fonts)
		.pipe(ttf2woff())
		.pipe(dest(path.build.fonts))
	return src(path.src.fonts)
		.pipe(ttf2woff2())
		.pipe(dest(path.build.fonts))
}

gulp.task('otf2ttf', function () {
	return src([source_folder + '/fonts/*.otf'])
		.pipe(fonter({
			formats: ['ttf']
		}))
		.pipe(dest(source_folder + '/fonts/'))
})

function cb() {}

function watchFiles(params) {
	gulp.watch([path.watch.html], html)
	gulp.watch([path.watch.css], css)
	gulp.watch([path.watch.js], js)
	gulp.watch([path.watch.img], images)
}

function clean(params) {
	return del(path.clean)
}

let build = gulp.series(clean, gulp.parallel(html, cssLibrary, css, jsLibrary, js, images, fonts))
let watch = gulp.parallel(build, watchFiles, browserSync)

exports.html = html
exports.cssLibrary = cssLibrary
exports.css = css
exports.jsLibrary = jsLibrary
exports.js = js
exports.images = images
exports.fonts = fonts
exports.build = build
exports.watch = watch
exports.default = watch