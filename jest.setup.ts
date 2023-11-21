import { cleanup } from '@testing-library/react';

jest.useFakeTimers();

afterEach(() => {
  cleanup;
});
