// include gulp
var gulp = require('gulp');
// include plug-ins
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var eslint = require('gulp-eslint');

// ESLint task
gulp.task('lint', function () {
    return gulp.src(['./test/*.js'])
        // eslint() attaches the lint output to the eslint property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failOnError last.
        .pipe(eslint.failOnError());
});

//Istanbul task
gulp.task('istanbul', ['lint'], function () {
  return gulp.src(['*.js'])
  // Covering files
  .pipe(istanbul())
  // Force `require` to return covered files
  .pipe(istanbul.hookRequire());
});

//Mocha task
gulp.task('mocha',['istanbul'], function () {
    return gulp.src('./test/*.js', {read: false})
    // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha())
    // Creating the reports after tests ran
    .pipe(istanbul.writeReports())
    // Enforce a coverage of at least 70%
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 }}));

});

//test someone testcase file. 
function testcase(file){
	if(file!="*" && file.indexOf("_tests")<0){
		file=file+"_tests";
	}
	return gulp.src('./test/'+file+'.js', {read: false})
    .pipe(mocha())
    // Creating the reports after tests ran
    .pipe(istanbul.writeReports())
    // Enforce a coverage of at least 70%
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 30 }}));
}

//test api test cases
gulp.task('page',['istanbul'], function () {
	return testcase('page');
});

// Default task
gulp.task('default',['mocha'], function () {
	//do nothing
});

gulp.doneCallback = function (err) {
	process.exit(err ? 1 : 0);
};
