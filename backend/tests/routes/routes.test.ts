describe('Geometry Calculations', () => {
  const calculateCircleArea = (radius: number) => Math.PI * radius * radius;

  test('Area of a circle with radius 5', () => {
    const area = calculateCircleArea(5);
    expect(area).toBeCloseTo(78.54, 2);
  });

  const calculateTriangleArea = (base: number, height: number) => 0.5 * base * height;

  test('Area of a triangle with base 10 and height 5', () => {
    const area = calculateTriangleArea(10, 5);
    expect(area).toBe(25);
  });
});
