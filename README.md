![vscode-portfolio banner](./docs/animation.gif)

<div align="center">

[![Code style: standardjs](https://img.shields.io/badge/code%20style-standardjs-F3DF49.svg)](https://standardjs.com/)
[![Build and Deploy](https://github.com/karlosos/url_to_bibtex/actions/workflows/main.yml/badge.svg)](https://github.com/karlosos/url_to_bibtex/actions/workflows/main.yml)
</div>

***

<h4 align="center">BibTex entry generator from URL</h4>


<p align="center">
  <a href="#about">About</a> •
  <a href="#what-i-have-learned">What I Have Learned</a> •
  <a href="#development">Development</a> •
  <a href="#deployment">Deployment</a>
</p>

<p align="center">
<table>
<tbody>
<td align="center">
<img width="2000" height="0"><br>
Website: <b><a href="https://karlosos.github.io/url_to_bibtex/">karlosos.github.io/url_to_bibtex 🌐</a></b><br>
</td>
</tbody>
</table>
</p>

## About

Get BibTex entry for a website. Data is scrapped from website headers. The project was inspired by [Wikipedia BibTeX Generator](https://irl.github.io/bibwiki/) which works only for Wikipedia links.

## What I Have Learned

This project was more goal oriented rather than education oriented. I've mostly polished my knowledge in CORS/same origin policy areas.

## Development

1. Install dependencies with `npm install`.
1. Run frontend application with `npm run start`.
1. Clone [cors-anywhere](https://github.com/Rob--W/cors-anywhere) app with `git clone https://github.com/Rob--W/cors-anywhere`.
1. Install cors-anywhere dependencies with `npm install`.
1. Run cors-anywhere server with `node server.js`.
1. Access application under `localhost:3000`.

### Why proxy server (cors-anywhere)?

Frontend application cannot make requests to other domains, because of [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy). That's why there's need of proxy server that adds CORDS headers to the proxied request. You can read more about [Cross-Origin Resource Sharing here](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

I've used [cors-anywhere](https://github.com/Rob--W/cors-anywhere), because of it's simplicity and easy of deployment to Heroku.


## Deployment

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


