var gulp = require('gulp');
var ts = require("gulp-typescript");

var tsProject = ts.createProject("tsconfig.json");

var paths = {
    scripts: [ "src/**/*.ts" ],
    dist: "dist"
}

gulp.task('scripts', function(){    
    let tsResult = tsProject.src()
    .pipe(tsProject());

    tsResult.js.pipe(gulp.dest(paths.dist));
    tsResult.pipe(gulp.dest(paths.dist));
});

gulp.task('watch', function(){
    gulp.watch(paths.scripts, ['scripts']);
});

gulp.task("default", gulp.series("scripts", "watch"), () => {
    console.log('gulp out');
});

