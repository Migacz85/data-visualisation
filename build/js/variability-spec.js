/* eslint no-undef: 0  */
describe('Progress bar', () => {
  beforeEach(() => { loader = 0; });

  it('Should inform me that is loaded when all charts are printed', () => {
    expect(progress(6)).toBe('loaded');
  });
  it('Should inform me that is not loaded when charts are still drawing', () => {
    expect(progress(3)).toBe('loading');
  });

  it('UX test: Should tell me how much data is loaded', () => {
    // There are 6 charts on the page so this is the reason why 6 is equal to 100%
    progress(0);
    expect(document.getElementById('progress').innerHTML).toBe('Loading data: 0%');

    progress(6);
    expect(document.getElementById('progress').innerHTML).toBe('Loading data: 100%');

    progress(3);
    expect(document.getElementById('progress').innerHTML).toBe('Loading data: 50%');
  });
});

describe('Loader (UX test)', () => {
  beforeEach(() => { loader = 0; });

  it('Should hide all elements on site before everything is loaded', () => {
    progress(1); // Page is loaded
    expect(document.getElementById('wrapper').style.display).toBe('none');
  });

  it('Should show all elements when everything is loaded', () => {
    progress(6); // Page is loaded
    expect(document.getElementById('wrapper').style.display).toBe('block');
  });

  it('Should disappear after loading', () => {
    progress(6); // Page is loaded
    expect(document.getElementById('loader').style.display).toBe('none');
  });

  it('Should appear when page is loading', () => {
    progress(1); // Page is loaded
    expect(document.getElementById('loader').style.display).toBe('block');
  });
});