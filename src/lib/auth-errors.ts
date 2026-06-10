export function getAuthErrorMessage(
  errorCode: string | null | undefined,
): string | null {
  switch (errorCode) {
    case "unauthorized":
      return "Нямаш достъп до admin панела.";
    case "otp_expired":
    case "access_denied":
    case "auth":
      return "Влизането не успя. Опитай отново с email и парола.";
    default:
      return errorCode ? `Грешка при влизане: ${errorCode}` : null;
  }
}

export function parseAuthHashErrors(hash: string): {
  error: string | null;
  errorCode: string | null;
} {
  if (!hash.startsWith("#")) return { error: null, errorCode: null };

  const params = new URLSearchParams(hash.slice(1));
  return {
    error: params.get("error"),
    errorCode: params.get("error_code"),
  };
}
