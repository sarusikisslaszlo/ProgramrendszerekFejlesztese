describe('Algebraic Equations', () => {
  const solveLinearEquation = (a: number, b: number) => -b / a;

  test('Solve 2x + 4 = 0', () => {
    const x = solveLinearEquation(2, 4);
    expect(x).toBe(-2);
  });

  const quadraticEquation = (a: number, b: number, c: number) => {
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) return null;
    const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    return [root1, root2];
  };

  test('Solve x^2 - 4x - 5 = 0', () => {
    const roots = quadraticEquation(1, -4, -5);
    expect(roots).toEqual([5, -1]);
  });
});
