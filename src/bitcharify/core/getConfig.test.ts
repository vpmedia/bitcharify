import { expect, test, describe } from 'vitest';
import { getConfig } from './getConfig.js';
import { CHARS_ALPHANUMERIC } from './const.js';

describe('getConfig', () => {
  test('returns default configuration with correct structure', () => {
    const config = getConfig();

    expect(config).toStrictEqual({
      resolution: 1,
      width: 512,
      height: 512,
      padding: 4,
      chars: CHARS_ALPHANUMERIC,
    });
  });

  test('returns consistent configuration object', () => {
    const config1 = getConfig();
    const config2 = getConfig();

    expect(config1).toStrictEqual(config2);
    expect(config1).not.toBe(config2); // be different objects
  });

  test('returns expected default values', () => {
    const config = getConfig();

    expect(config.resolution).toBe(1);
    expect(config.width).toBe(512);
    expect(config.height).toBe(512);
    expect(config.padding).toBe(4);
    expect(config.chars).toBe(CHARS_ALPHANUMERIC);
  });
});
