var tree = {
  '/': {
    'index.html': '<html><body><h1>Hi!</h1></body></html>',
    'README.md': 'Test readme.',
    'assets': {
      'app.js': '// app.js content',
      'app.css': '/* app.css content */'
    }
  }
};

var fs = new FileTree(tree);

var arrayContains = function(arrayA, arrayB) {
  for(var b=0; b<arrayB.length; b++) {
    if(arrayA.indexOf(arrayB[b]) === -1) {
      return false;
    }
  }
  
  return arrayA.length == arrayB.length;
}

QUnit.test("listing the root folder", function( assert ) {
  var actualFiles   = fs.list('/'),
      expectedFiles = ['index.html', 'README.md', 'assets'];
  assert.ok(arrayContains(actualFiles, expectedFiles) == true);
});

QUnit.test("listing a sub folder", function( assert ) {
  var actualFiles   = fs.list('/assets'),
      expectedFiles = ['app.css', 'app.js'];
  assert.ok(arrayContains(actualFiles, expectedFiles) == true, actualFiles.toString());
});

QUnit.test("reading a file", function( assert ) {
  assert.ok(fs.read('/assets/app.js') == '// app.js content');
});

QUnit.test("writing a file", function( assert ) {
  fs.write('/assets/test.txt', 'test')

  var actualFiles   = fs.list('/assets'),
      expectedFiles = ['app.css', 'app.js', 'test.txt'];

  assert.ok(fs.read('/assets/test.txt') == 'test', "Read written file: Passed!" );
  assert.ok(arrayContains(actualFiles, expectedFiles) == true, "List directory again: Passed!" );
});
