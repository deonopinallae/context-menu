export function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

export function generateRandomColor() {
  // Генерируем RGB-компоненты
  const r = random(0, 255);
  const g = random(0, 255);
  const b = random(0, 255);

  return `rgb(${r}, ${g}, ${b})`;
}