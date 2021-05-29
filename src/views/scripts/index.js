/**
 * Calculates and sets the height of the git commit history side bar
 */
function bar() {
  const h = document.getElementById('tree').offsetHeight;
  document.getElementById('bar').setAttribute('style', `height: ${h}px`);
}

/**
 * Expands a given commit for more information
 * 
 * @param {object} e the click event
 */
function expandCommit(e) {
  // Close all open commits
  document
    .getElementsByClassName('expanded')
    .forEach(item => e.nextSibling !== item ? item.classList.remove('expanded') : null);

  e.parentElement.children[1].classList.toggle('expanded');
  bar();
}

bar();