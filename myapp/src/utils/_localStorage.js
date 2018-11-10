export function set (options) {

  for(let p in options) {
    localStorage.setItem(p, options[p])
  }
}

export function get (params) {
  return localStorage.getItem(params)
}
