export const validateUser = (user: any) => {
  if (!user.email.includes("@")) throw new Error("Invalid email");
};
