export const toTitle = (toolId) =>
  toolId
    ? toolId
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "Unknown Tool";

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export const truncate = (str, n) =>
  str?.length > n ? str.slice(0, n) + "..." : str;
