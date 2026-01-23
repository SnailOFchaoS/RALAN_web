export const APP_VERSION = "1.0.1";
export const BUILD_DATE = "2026-01-23";

export const logVersion = () => {
  if (typeof window !== "undefined") {
    console.log(
      `%c RALAN v${APP_VERSION} %c ${BUILD_DATE} `,
      "background: #1A2344; color: #fff; padding: 2px 8px; border-radius: 4px 0 0 4px;",
      "background: #D91722; color: #fff; padding: 2px 8px; border-radius: 0 4px 4px 0;"
    );
  }
};
