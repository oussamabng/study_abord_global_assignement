export const log = (
  message: string,
  level: "info" | "error" = "info"
): void => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level.toUpperCase()}]: ${message}`);
};
