export default class FileIOStorage {
  async save(content) {
    const file = new Blob([content], { type: 'text/plain' })
    const data = new FormData()
    data.append('file', file)

    const response = await fetch(
      'https://file.io',
      {
        method: 'POST',
        body: data
      }
    )

    const json = await response.json()
    if (!json.success) return false

    return json.link
  }
}
