export default class ApiClient {
  constructor() {
    this.storage = {
      baseUrl: new URL('https://aviasales-test-api.kata.academy/'),
      optionsGet: {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      },
    }
  }

  async getSearchId() {
    const { baseUrl, optionsGet } = this.storage
    const targetUrl = new URL('/search', baseUrl)

    const serverResponse = await fetch(targetUrl, optionsGet)

    if (!serverResponse.ok) {
      throw new Error(`Request to get Id failed, received ${serverResponse.status}`)
    }
    const serverResponseBody = await serverResponse.json()
    return serverResponseBody.searchId
  }

  async getTickets(searchId) {
    const { baseUrl, optionsGet } = this.storage
    const targetUrl = new URL('/tickets', baseUrl)
    const searchParams = new URLSearchParams({ searchId })
    targetUrl.search = searchParams

    const serverResponse = await fetch(targetUrl, optionsGet)

    if (!serverResponse.ok) {
      throw new Error(`Server failure, received ${serverResponse.status}`)
    }
    const serverResponseBody = await serverResponse.json()
    const { tickets } = serverResponseBody

    const extendedTickets = tickets.map((ticket) => {
      const {
        price,
        carrier,
        segments: [pathTo, pathFrom],
      } = ticket
      const { duration: durationTo } = pathTo
      const numTransfersTo = pathTo.stops.length
      const { duration: durationFrom } = pathFrom
      const numTransfersFrom = pathFrom.stops.length

      const optimality =
        2 * Math.round(price / 1000) +
        (1 + numTransfersTo) * Math.round(durationTo / 60) +
        (1 + numTransfersFrom) * Math.round(durationFrom / 60)
      const totalDuration = durationTo + durationFrom

      return {
        key: JSON.stringify(ticket),
        price,
        carrier,
        optimality,
        totalDuration,
        segments: [
          { ...pathTo, stops: [...pathTo.stops] },
          { ...pathFrom, stops: [...pathFrom.stops] },
        ],
      }
    })

    return { stop: serverResponseBody.stop, tickets: extendedTickets }
  }
}
