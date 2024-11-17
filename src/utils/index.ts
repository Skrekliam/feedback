export const maskEmail = (email: string) => {
  const [username, domain] = email?.split("@");
  const maskedUsername =
    username.charAt(0) +
    "*".repeat(username.length - 2) +
    username.charAt(username.length - 1);
  return `${maskedUsername}@${domain}`;
};
