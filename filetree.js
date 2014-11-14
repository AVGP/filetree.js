var FileTree = function(tree) {
  var self = this;

  function getPathNode(path) {
    var pathParts = [];
    if(path !== '/') {
      var pathParts = path.split('/');
      pathParts.shift();
    }

    var currentNode = tree['/'];
    for(var i=0; i<pathParts.length;i++) {
      if(!currentNode[pathParts[i]]) {
        throw(new Error('No such file or directory "' + pathParts[i] + '"'));
      }
      currentNode = currentNode[pathParts[i]];
    }
    return currentNode;
  }

  self.list = function(path) {
    var currentNode = getPathNode(path);

    var entries = [];
    for(var entry in currentNode) {
      if(!currentNode.hasOwnProperty(entry)) continue;
      entries.push(entry);
    }

    return entries;
  };

  self.read = function(path) {
    var node = getPathNode(path);
    return node;
  };
  
  self.write = function(path, content) {
      var pathParts = path.split('/'),
          file = pathParts.pop(),
          node = getPathNode(pathParts.join('/'));
      console.log(node);
      node[file] = content;
      return true;
  }
  
}
