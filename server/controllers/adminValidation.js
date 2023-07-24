export default function verifyAdmin(key) {
  const adminApiKey = `${process.env.adminApiKey}`;
  return key === adminApiKey;
}
