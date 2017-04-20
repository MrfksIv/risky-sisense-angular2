import { ChurnAvoidancePage } from './app.po';

describe('churn-avoidance App', function() {
  let page: ChurnAvoidancePage;

  beforeEach(() => {
    page = new ChurnAvoidancePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('rz works!');
  });
});
