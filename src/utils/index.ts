/*
 * Don't use this method for 'Letter Spacing', 'Box Shadow/Drop shadow' and 'Small Borders'. Use px directly for them.
 * Method to convert px to rem to allow proper scaling of elements
 */
export const rem = (px: number | string) => {
  return typeof px === 'number'
    ? `${px / 16}rem`
    : `${parseInt(px.split('px')[0]) / 16}rem`
}

/*
 * a wrapper created to handle api calling instead of rewriting the code multiple times
 */
export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
}

// wrapper function GET
async function get(url: string) {
  const requestOptions = {
    method: 'GET',
  }
  return fetch(url, requestOptions).then(handleResponse)
}

// wrapper function POST
async function post(url: string, body?: BodyInit) {
  const requestOptions = {
    method: 'POST',
    headers: { accept: '*/*', 'Content-Type': 'application/json' },
    body,
  }
  return fetch(url, requestOptions).then(handleResponse)
}

// wrapper function PUT
async function put(url: string, body?: BodyInit) {
  const requestOptions = {
    method: 'PUT',
    headers: { accept: '*/*', 'Content-Type': 'application/json' },
    body,
  }
  return fetch(url, requestOptions).then(handleResponse)
}

// prefixed with underscored because delete is a reserved word in javascript
// wrapper function DELETE
async function _delete(url: string) {
  const requestOptions = {
    method: 'DELETE',
  }
  return fetch(url, requestOptions).then(handleResponse)
}

// helper function
async function handleResponse(response: Response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text)

    if (!response.ok) {
      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}

export function getOffset(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

// exporting constants to index to a single file in utils
export * from './constants'

export * from './graph'
