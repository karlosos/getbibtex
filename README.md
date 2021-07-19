# URL to BibTex

Get BibTex entry for a website. Data is scrapped from website headers.

## Why proxy server (cors-anywhere)?

Frontend application cannot make requests to other domains, because of [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy). That's why there's need of proxy server that adds CORDS headers to the proxied request. You can read more about [Cross-Origin Resource Sharing here](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

I've used [cors-anywhere](https://github.com/Rob--W/cors-anywhere), because of it's simplicity and easy of deployment to Heroku.

## Development

1. Install dependencies with `npm install`.
1. Run frontend application with `npm run start`.
1. Clone [cors-anywhere](https://github.com/Rob--W/cors-anywhere) app with `git clone https://github.com/Rob--W/cors-anywhere`.
1. Install cors-anywhere dependencies with `npm install`.
1. Run cors-anywhere server with `node server.js`.
1. Access application under `localhost:3000`.

## Deploy

Add environmental variable (project secrets on Github):

```
REACT_APP_BACKEND_URL='https://cors-url-to-bibtex.herokuapp.com/'
```

### Proxy server - cors-anywhere

Deployment of cors-anywhere is described [here](https://github.com/Rob--W/cors-anywhere) and [here](https://devcenter.heroku.com/articles/getting-started-with-nodejs?singlepage=true). 

In summary: 

* [install heroku-cli](https://devcenter.heroku.com/articles/getting-started-with-nodejs?singlepage=true)
* login to heroku with `heroku login`
* create the app with `heroku create` or `heroku git:remote -a cors-url-to-bibtex`
* push to heroku with `git push heroku`
* open app with `heroku open`


