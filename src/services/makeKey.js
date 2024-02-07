export function flavorToKey(flavor) {
  const words = flavor.split(" ");

  words[0] = words[0].toLowerCase();

  const key = words.join("");
  return key;
}
