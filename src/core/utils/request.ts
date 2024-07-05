export async function fetchSubscriptionCharges(urlText: string, page: string = '0') {
  const url = new URL(urlText)

  // Set query parameters
  url.searchParams.append('orderBy', 'createdAt')
  url.searchParams.append('page', page)
  // url.searchParams.append('take', '10')
  // url.searchParams.append('membershipOrgId', '439db5bd-e607-4689-ad1d-6614a21927da')
  // url.searchParams.append('membershipUserId', '6e4c0f36-d849-4a09-b92f-4688ca0e3079')
  // url.searchParams.append('currencyCode', 'USD')
  // url.searchParams.append('status', 'inProgress')

  try {
    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    return data
  } catch (error) {
    throw error
  }
}
