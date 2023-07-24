export default function verifyUser(key) {
  const userApiKey = `${process.env.userApiKey}`;
  const adminApiKey = `${process.env.adminApiKey}`;
  return key === userApiKey || key === adminApiKey;
}
