function bar() {
  const h = document.getElementById('tree').offsetHeight;
  document.getElementById('bar').setAttribute('style', `height: ${h}px`);
}

function expandCommit(e) {
  // Close all open commits
  document
    .getElementsByClassName('expanded')
    .forEach(item => e.nextSibling !== item ? item.classList.remove('expanded') : null);

  e.parentElement.children[1].classList.toggle('expanded');
  bar();
}

bar();