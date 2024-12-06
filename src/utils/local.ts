export const setLoginInfo = (user: { name: string; email: string; token: string }): void => {
  localStorage.setItem("USERNAME", user.name);
  localStorage.setItem("USEREMAIL", user.email);
  localStorage.setItem("USERTOKEN", user.token);
};

export const clearLoginInfo = (): void => {
  localStorage.clear();
};

export const provideUserInfo = (): { name: string; email: string; token: string } | null => {
  const token = localStorage.getItem("USERTOKEN");
  if (!token) return null;

  return {
    name: localStorage.getItem("USERNAME") || "",
    email: localStorage.getItem("USEREMAIL") || "",
    token,
  };
};

export const formatDate = (dateString: string, includeT: boolean = false): string => {
  const dateObject = new Date(dateString);

  // Extract date components
  const day = String(dateObject.getDate()).padStart(2, "0");
  const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const year = dateObject.getFullYear();
  let hours = dateObject.getHours();
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");

  if (includeT) return `${year}-${month}-${day}T${hours}:${minutes}`;

  const ampm = hours >= 12 ? "PM" : "AM";
  // Convert to 12-hour format
  hours %= 12; // Use %= operator as recommended
  hours = hours || 12; // 0 should be displayed as 12

  return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
};

export const generateRandomPassword = (
  length: number = 6,
  includeSpecialChar: boolean = true
): string => {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let allChars = uppercaseChars + lowercaseChars + numberChars;
  if (includeSpecialChar) allChars += specialChars;

  let password = "";
  for (let i = 0; i < length; i += 1) { // Avoid '++' operator
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  return password;
};;

// Example usage
generateRandomPassword(6, false);
