export default (appOrPath) => {
  if (appOrPath.startsWith('/') || appOrPath.startsWith('~')) {
    return appOrPath
  } else {
    return `/Applications/${appOrPath}.app`
  }
}
