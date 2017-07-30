import { isMappingFinished } from '../utils/validateMappings'

export default class JSONGenerator {
  static render(data, { pretty = null } = {}) {
    const json = {
      'title': 'Launch apps by hyper+letters.',
      'rules': data.filter(isMappingFinished).map(this.mapToRule)
    }

    return JSON.stringify(json, null, pretty)
  }

  static mapToRule = ({ keyCode, app }) => (
    {
      description: `hyper + ${keyCode} for ${app}`,
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
              shell_command: `open '/Applications/${app}.app'`
            }
          ]
        }
      ]
    }
  )
}
