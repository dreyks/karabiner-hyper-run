import { isMappingFinished } from './utils/validateMappings'
import resolveAppPath from './utils/resolveAppPath'

export default class JSONGenerator {
  static render(data, { pretty = null } = {}) {
    const json = {
      'title': 'Launch apps by hyper+letters.',
      'rules': data.filter(isMappingFinished).map(this.mapToRule)
    }

    return JSON.stringify(json, null, pretty)
  }

  static mapToRule = ({ keyCode, app }) => {
    const appPath = resolveAppPath(app)

    return {
      description: `hyper + ${keyCode} for ${appPath}`,
      manipulators: [
        {
          type: 'basic',
          from: {
            key_code: keyCode,
            modifiers: {
              mandatory: [
                'control',
                'command',
                'option',
                'shift'
              ]
            }
          },
          to: [
            {
              shell_command: `open '${appPath}'`
            }
          ]
        }
      ]
    }
  }
}
