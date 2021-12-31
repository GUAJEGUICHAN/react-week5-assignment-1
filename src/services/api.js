class Cache {
  /**
  * ttl is in minutes
  */
  constructor({ obj = null, ttl = 3 }) {
    this.obj = obj || Object.create(null);
    this.timeouts = Object.create(null);
    this.ttl = ttl;
  }
  get (key) {
    return this.obj[key];
  }
  set (key, value) {
    this.deleteTimeout(key);
    this.timeouts[key] = setTimeout(() => this.delete(key), this.ttl * 60 * 1000);
    this.obj[key] = value;
  }
  delete (key) {
    this.deleteTimeout(key);
    delete this.timeouts[key];
  }
  deleteTimeout(key) {
    clearTimeout(this.timeouts[key]);
    delete this.obj[key];
  }
  deleteAll() {
    for (const k of Object.keys(this.obj)) {
      this.delete(k);
    }
  }
}

const apiCache = new Cache({ ttl = 1 });

/**
* Cached api
*/
async function fetchAPI(url, next) {
  return fetch(url).then(v => v.json());
}

function refreshAPI() {
  cache.deleteAll();
}

export async function fetchCategories() {
  return fetchAPI('https://eatgo-customer-api.ahastudio.com/categories');
}

export async function fetchRegions() {
  return fetchAPI('https://eatgo-customer-api.ahastudio.com/regions');
}

export async function fetchRestaurant(categoryId, regionId) {
  return fetchAPI('https://eatgo-customer-api.ahastudio.com/restaurants?region=${regionId}&category=${categoryId}`);
}
