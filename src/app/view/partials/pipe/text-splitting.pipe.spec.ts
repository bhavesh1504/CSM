import { TextSplittingPipe } from './text-splitting.pipe';

describe('TextSplittingPipe', () => {
  it('create an instance', () => {
    const pipe = new TextSplittingPipe();
    expect(pipe).toBeTruthy();
  });
});
