export async function getRandomWords(n) {
  const response = await fetch(`/api?num-of-words=${n}`);
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
