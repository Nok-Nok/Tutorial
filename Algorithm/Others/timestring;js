function timeCorrect(timestring) {
  // Account for null and empty
  if (!timestring) return timestring;
  let [h, m, s] = timestring.split(':');
  // Account for empty string
  if (!h || !m || !s) return null;
  h = Number(h);
  m = Number(m);
  s = Number(s);
  // Account for not number
  if (isNaN(h) || isNaN(m) || isNaN(s)) return null;
  h = (Number(h) + Math.floor((m * 60 + s) / 3600)) % 24;
  m = (Number(m) + Math.floor(s / 60)) % 60;
  s = Number(s) % 60;
  return [
    h < 10 ? '0' + h : h,
    m < 10 ? '0' + m : m,
    s < 10 ? '0' + s : s,
  ].join(':');
}

console.log(timeCorrect('24:59:60'));
