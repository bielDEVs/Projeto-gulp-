const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');

// Caminhos para os arquivos
const paths = {
    styles: {
        src: 'src/sass/**/*.scss',
        dest: 'dist/css'
    },
    images: {
        src: 'images/**/*',
        dest: 'dist/images'
    },
    scripts: {
        src: 'src/js/**/*.js',
        dest: 'dist/js'
    }
};

// Tarefa para compilar SASS
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest(paths.styles.dest));
}

// Tarefa para comprimir imagens
function images() {
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));
}

// Tarefa para comprimir JavaScript
function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest));
}

// Função watch para monitorar mudanças nos arquivos
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.scripts.src, scripts);
}

// Definindo tarefas
exports.styles = styles;
exports.images = images;
exports.scripts = scripts;
exports.watch = watch;

// Tarefa default
exports.default = gulp.series(styles, images, scripts, watch);
