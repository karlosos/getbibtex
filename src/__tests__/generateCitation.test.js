import { firstWordsFromTitle, createCiteKey, upperLettersInBibTex, domainFromUrl, bibtexFromEntryData } from '../generateCitation'
import moment from 'moment'

it('generate first two words from title', () => {
  let title = 'The mechanism of love'
  expect(firstWordsFromTitle(title)).toEqual('MechanismLove')

  title = 'The mechanism'
  expect(firstWordsFromTitle(title)).toEqual('Mechanism')

  title = 'The'
  expect(firstWordsFromTitle(title)).toEqual('')
})

it('create citekey from correct website', () => {
  const entryData = {
    title: 'Deadly floods hit central China, killing 16 and forcing thousands to flee homes',
    author: 'Vincent Ni',
    url: 'https://www.theguardian.com/world/2021/jul/20/heavy-flooding-hits-central-china-affecting-tens-of-millions',
    website: 'theguardian.com'
  }

  expect(createCiteKey(entryData)).toEqual('theguardianDeadlyFloods')
})

it('create citekey from incorrect website', () => {
  const entryData = {
    title: 'Deadly floods hit central China, killing 16 and forcing thousands to flee homes',
    author: 'Vincent Ni',
    url: 'https://www.theguardian.com/world/2021/jul/20/heavy-flooding-hits-central-china-affecting-tens-of-millions',
    website: 'http:://www.theguardian.com'
  }

  expect(createCiteKey(entryData)).toEqual('DeadlyFloods')
})

it('create citekey from empty website', () => {
  const entryData = {
    title: 'Deadly floods hit central China, killing 16 and forcing thousands to flee homes',
    author: 'Vincent Ni',
    url: 'https://www.theguardian.com/world/2021/jul/20/heavy-flooding-hits-central-china-affecting-tens-of-millions',
    website: ''
  }

  expect(createCiteKey(entryData)).toEqual('DeadlyFloods')
})

it('upper letters replace', () => {
  const title = 'Deadly Flood hit central China'
  expect(upperLettersInBibTex(title)).toEqual('{D}eadly {F}lood hit central {C}hina')
})

it('domain from url', () => {
  let url = 'https://www.theguardian.com/world/2021/jul/20/heavy-flooding-hits-central-china-affecting-tens-of-millions'
  expect(domainFromUrl(url)).toEqual('theguardian.com')
  url = 'www.theguardian.co.uk/world/2021/jul/20/heavy-flooding-hits-central-china-affecting-tens-of-millions'
  expect(domainFromUrl(url)).toEqual('theguardian.co.uk')
})

it('bibtex from entry data', () => {
  const entryData = {
    title: 'Deadly floods hit central China, killing 16 and forcing thousands to flee homes',
    author: 'Vincent Ni',
    url: 'https://www.theguardian.com/world/2021/jul/20/heavy-flooding-hits-central-china-affecting-tens-of-millions',
    website: 'theguardian.com'
  }

  const currentDate = moment().format('DD-MMM-YYYY')
  const expectedBibtex = `@misc{theguardianDeadlyFloods,
\tauthor = {Vincent Ni},
\ttitle = {{D}eadly floods hit central {C}hina, killing 16 and forcing thousands to flee homes --- theguardian.com},
\thowpublished = {\\url{https://www.theguardian.com/world/2021/jul/20/heavy-flooding-hits-central-china-affecting-tens-of-millions}},
\tyear = {},
\tnote = {[Accessed ${currentDate}]},
}`
  expect(bibtexFromEntryData(entryData)).toEqual(expectedBibtex)
})
