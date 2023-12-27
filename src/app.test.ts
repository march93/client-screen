import App from './app';

jest.mock('./app');

describe('App class', () => {
  let app: App;

  beforeEach(() => {
    app = new App();
  });

  it('app is defined', () => {
    expect(app).toBeDefined();
  });
});
