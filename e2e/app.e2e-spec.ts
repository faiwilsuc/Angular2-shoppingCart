import { EcowareAngular2Page } from './app.po';

describe('ecoware-angular2 App', function() {
  let page: EcowareAngular2Page;

  beforeEach(() => {
    page = new EcowareAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
