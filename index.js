/*
 * gulp-string-thing
 * https://github.com/SteveThorpeTM/gulp-string-thing.git
 *
 * Copyright (c) 2017 Steve Thorpe
 * Licensed under the MIT license.
 */

var eventStream = require('event-stream');
var gutil = require('gulp-util');

var stream = function(method){
    return eventStream.map(function (file, callback) {
        try {
            file.contents = new Buffer( method( String(file.contents) ));
        } catch (err) {
            return callback(new gutil.PluginError('gulp-string-thing', err));
        }
        callback(null, file);
    });
};

module.exports = {
    replace: function(search, replace) {
		if (typeof search == "string"){
	        return stream(function(fileText) {
	          return fileText.replace(new RegExp(search, 'g'), replace);
	        });
		}else if (typeof search == "object"){
	        return stream(function(fileText) {
	            for (var target in search){
	                fileText = fileText.replace(target, search[target]);
	            }
	            return fileText;
	        });
		}
    }
};

module.exports._stream = stream;
