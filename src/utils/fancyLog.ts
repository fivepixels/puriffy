export interface LogInfo {
  type?: string;
  description?: string;
  content?: string;
  hasError?: boolean;
}

export function fancyLog(logInfo: LogInfo) {
  const logType = logInfo.type ? `[[${logInfo.type}]]` : "";
  const logDescriptoin = logInfo.description ? ` | ${logInfo.description}` : "";
  const logContent = logInfo.content ? ` ➜ ${logInfo.content}` : "";

  console.info(`${logType}${logDescriptoin}`);

  if (logInfo.hasError) {
    console.error(logContent);
    return;
  }

  console.info(logContent);

  return;
}
