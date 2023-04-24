function bfs(root, cb) {
  if (!root) return;

  const queue = [root];
  while (queue.length) {
    const curNode = queue.shift();
    cb(curNode);
    if (curNode.left) queue.push(curNode.left);
    if (curNode.right) queue.push(curNode.right);
  }
}
