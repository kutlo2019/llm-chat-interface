// llava is only model capable of vision
const MODELS = ['llava', 'gemma:2b']

const llmURL = 'https://148ftvxv-11434.uks1.devtunnels.ms/api/chat'

const fetchResponse = async (messages: any) => {
  const requestBody = {
    model: MODELS[0],
    stream: false,
    messages: messages
  }

  const response = await fetch(llmURL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
  return response.json()
}

export { fetchResponse }
