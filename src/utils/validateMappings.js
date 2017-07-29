export const isMappingFinished = ({ hotkey, app }) => hotkey && app
export const isMappingStarted = ({ hotkey, app }) => hotkey || app

export default (mappings) => {
  const started = mappings.filter(isMappingStarted)
  return started.length && started.every(isMappingFinished)
}
