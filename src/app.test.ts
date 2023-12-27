import { Application } from 'express';
import App from './app';

jest.mock('./app');

describe('App class', () => {
  let app: jest.Mocked<App>;

  beforeEach(() => {
    app = new (<new () => App>App)() as jest.Mocked<App>;
  });

  it('app is defined', () => {
    expect(app).toBeDefined();
  });
});
