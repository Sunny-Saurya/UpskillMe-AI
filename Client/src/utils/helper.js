export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const getInitials = (title) => {
  if(!title) return "";
  const words = title.split(" ");
  let initials = "";
  for (let i = 0; i < words.length; i++) {
    if (words[i] && words[i].length > 0) {
      initials += words[i][0].toUpperCase();
    }
  }
  return initials.toUpperCase();
} 