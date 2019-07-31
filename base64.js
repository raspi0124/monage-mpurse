function encodeBase64(bytes) {
  const table = [];
  for (let i = 65; i < 91; i++) table.push(String.fromCharCode(i))
  for (let i = 97; i < 123; i++) table.push(String.fromCharCode(i))
  for (let i = 0; i < 10; i++) table.push(i.toString(10))
  table.push("+");
  table.push("/");

  let base64 = "";
  let i = 0;
  const len = bytes.byteLength;
  for (i = 0; i < len; i += 3) {
    if (len === i + 1) { // last 1 byte
      const a = (bytes[i] & 0xfc) >> 2;
      const b = ((bytes[i] & 0x03) << 4);
      base64 += table[a];
      base64 += table[b];
      base64 += "==";
    } else if (len === i + 2) { // last 2 bytes
      const a = (bytes[i] & 0xfc) >> 2;
      const b = ((bytes[i] & 0x03) << 4) | ((bytes[i + 1] & 0xf0) >> 4);
      const c = ((bytes[i + 1] & 0x0f) << 2);
      base64 += table[a];
      base64 += table[b];
      base64 += table[c];
      base64 += "=";
    } else {
      const a = (bytes[i] & 0xfc) >> 2;
      const b = ((bytes[i] & 0x03) << 4) | ((bytes[i + 1] & 0xf0) >> 4);
      const c = ((bytes[i + 1] & 0x0f) << 2) | ((bytes[i + 2] & 0xc0) >> 6);
      const d = bytes[i + 2] & 0x3f;
      base64 += table[a];
      base64 += table[b];
      base64 += table[c];
      base64 += table[d];
    }
  }
  return base64;
}