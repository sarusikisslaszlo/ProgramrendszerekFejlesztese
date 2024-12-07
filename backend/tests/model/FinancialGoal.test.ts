describe('Basic Arithmetic Operations', () => {
  test('Addition of two numbers', () => {
    const result = 2 + 3;
    expect(result).toBe(5);
  });

  test('Subtraction of two numbers', () => {
    const result = 10 - 4;
    expect(result).toBe(6);
  });

  test('Multiplication of two numbers', () => {
    const result = 7 * 8;
    expect(result).toBe(56);
  });

  test('Division of two numbers', () => {
    const result = 15 / 3;
    expect(result).toBe(5);
  });
});
