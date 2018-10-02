/* eslint no-unused-vars: 0 */
// This function shows loading bar when data is loading.
function progress(loading) {
  document.getElementById('progress').innerHTML = `Loading data: ${(loading / 6 * 100).toFixed(0)}%`;
  document.getElementById('progress').style.width = `${(loading / 6) * 100}%`;
  if (loading === 6 || loading === 0) {
    document.getElementById('progress-bar').style.display = 'none';
    document.getElementById('wrapper').style.display = 'block';
    document.getElementById('loader').style.display = 'none';
    document.getElementById('footer').style.display = 'block';
    return 'loaded';
  }
  document.getElementById('progress-bar').style.display = 'block';
  document.getElementById('wrapper').style.display = 'none';
  document.getElementById('loader').style.display = 'block';
  document.getElementById('footer').style.display = 'none';

  return 'loading';
}
