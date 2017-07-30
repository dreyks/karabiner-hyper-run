export const isMappingFinished = ({ keyCode, app }) => keyCode && app
export const isMappingStarted = ({ keyCode, app }) => keyCode || app

export default (mappings) => {
  const started = mappings.filter(isMappingStarted)
  return started.length && started.every(isMappingFinished)
}
