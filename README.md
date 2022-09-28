![vscode-portfolio banner](./docs/animation.gif)

<div align="center">

[![Build and Deploy](https://github.com/karlosos/url_to_bibtex/actions/workflows/main.yml/badge.svg)](https://github.com/karlosos/url_to_bibtex/actions/workflows/main.yml)
[![NextJS](https://img.shields.io/badge/code-NextJS-blueviolet.svg?style=flat-square&logo=react&color=a8dcec&logoColor=white)](/#)
[![Typescript](https://img.shields.io/badge/language-typescript-blueviolet.svg?style=flat-square&logo=typescript&color=a8dcec&logoColor=white)](/#)
[![GeistUI](https://img.shields.io/badge/styling-geist--ui-blueviolet.svg?style=flat-square&logo=&color=a8dcec&logoColor=white)](/#)
[![Prettier](https://img.shields.io/badge/formatting-prettier-blueviolet.svg?style=flat-square&logo=prettier&color=a8dcec&logoColor=white)](/#)
[![Vercel](https://img.shields.io/badge/deployed_on-vercel-blueviolet.svg?style=flat-square&logo=vercel&color=a8dcec&logoColor=white)](/#)
</div>

***

<h4 align="center">BibTeX entry generator from URL</h4>


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
Website: <b><a href="https://url-to-bibtex.vercel.app/">url-to-bibtex.vercel.app 🌐</a></b><br>
<img width="2000" height="0">
</td>
</tbody>
</table>
</p>

## About

Get BibTeX entry for a website. Data is scrapped from website headers. The project was inspired by [Wikipedia BibTeX Generator](https://irl.github.io/bibwiki/) which works only for Wikipedia links.

## What I Have Learned

This project was more goal oriented rather than education oriented. I've mostly polished my knowledge in CORS/same origin policy areas (which is no longer in this project as I've moved backend to NextJS).

## Development

1. Install dependencies with `npm install`.
1. Run frontend application with `npm run dev`.
1. Access application under `localhost:3000`.

## Deployment

Add environmental variable (project secrets on vercel):

```
MONGO_URI=
```
