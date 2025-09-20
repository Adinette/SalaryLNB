export const removeWhitespace = (value: string): string => {
  return value.replace(/\s+/g, "");
};

export const formatPhoneWithSpaces = (value: string): string => {
  console.log("Exemple : 2290123456789 → 229 01 23 45 67 89");
  return value.replace(
    /^(\d{3})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/,
    "$1 $2 $3 $4 $5 $6"
  );
};
