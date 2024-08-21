// import noLogo from '../assets/logo_not_found.png'

// const randomHash = () => Math.random().toString(36).slice(2)

export default class ApiClient {
  constructor() {
    this.storage = {
      baseUrl: new URL('https://aviasales-test-api.kata.academy/'),
      //   baseUrl: new URL('https://front-test.dev.aviasales.ru/'),
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

    /*
    interface Ticket {
        // Цена в рублях
        price: number
        // Код авиакомпании (iata)
        carrier: string
        // Массив перелётов.
        // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
        segments: [
          {
            // Код города (iata)
            origin: string
            // Код города (iata)
            destination: string
            // Дата и время вылета туда
            date: string
            // Массив кодов (iata) городов с пересадками
            stops: string[]
            // Общее время перелёта в минутах
            duration: number
          },
          {
            // Код города (iata)
            origin: string
            // Код города (iata)
            destination: string
            // Дата и время вылета обратно
            date: string
            // Массив кодов (iata) городов с пересадками
            stops: string[]
            // Общее время перелёта в минутах
            duration: number
          }
        ]
      }
    */

    // console.log('serverResponseBody', serverResponseBody)

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

      const optimality = 2 * price + (1 + numTransfersTo) * durationTo + (1 + numTransfersFrom) * durationFrom
      const totalDuration = durationTo + durationFrom
      return {
        // key: randomHash(),
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

    // console.log('extendedTickets', extendedTickets)

    // {tickets: [], stop: false}

    return { stop: serverResponseBody.stop, tickets: extendedTickets }
  }
}
