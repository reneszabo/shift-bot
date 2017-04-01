import { ShiftBotPage } from './app.po';

describe('shift-bot App', () => {
  let page: ShiftBotPage;

  beforeEach(() => {
    page = new ShiftBotPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
