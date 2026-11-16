# Cucumber + Puppeteer UI-testid — Sauce Demo

Kolm BDD-stsenaariumi [Sauce Demo](https://www.saucedemo.com/) veebipoes, kirjutatud
Cucumberi (Gherkin) ja Puppeteeriga. Testid katavad sisselogimise/väljalogimise,
ostukorvi haldamise ning tellimuse vormistamise koos vormivalideerimisega.

| Väli | Väärtus |
|---|---|
| Rakendus | Sauce Demo / Swag Labs — <https://www.saucedemo.com/> |
| Testiraamistik | Cucumber 13.3.0 (Gherkin, BDD) |
| Brauseriautomaatika | Puppeteer 25.17.0 + Chrome 157 (headless) |
| Testide arv | 3 stsenaariumi, 27 Gherkini sammu |
| Seis | 3/3 passed, 33/33 Cucumberi sammu |
| Aruanne | [docs/TESTIARUANNE.md](docs/TESTIARUANNE.md) |

## Kiirkäivitus

Nõuded: Node.js 22, 24 või ≥ 26 ning npm.

```bash
npm ci
npx puppeteer browsers install chrome   # kui .cache/puppeteer on tühi
npm test
```

Testid käivituvad päris veebilehe vastu, seega on vajalik võrguühendus.
Tulemused kirjutatakse `reports/` ja `artifacts/screenshots/` kaustadesse.

## Käsud

| Käsk | Mida teeb |
|---|---|
| `npm test` | Käivitab kõik kolm stsenaariumi ja loob HTML/JSON/JUnit aruanded. |
| `npm run test:smoke` | Käivitab ainult `@smoke`-märgisega testid (login + cart). |
| `npm run test:parallel` | Käivitab stsenaariumid kahe Cucumberi tööga. |
| `npm run test:dry` | Kontrollib Gherkini sammude vastavust ilma brauserit käivitamata. |
| `HEADLESS=false npm test` | Käivitab brauseri nähtavas režiimis (debugimine). |

## Projektistruktuur

```text
cucumber-puppeteer-saucedemo/
├── cucumber.js                  # Cucumberi profiil ja formaadid
├── .puppeteerrc.cjs             # Chrome'i cache projekti sees
├── features/
│   ├── login.feature            # T1: sisselogimine ja väljalogimine
│   ├── cart.feature             # T2: ostukorv
│   ├── checkout.feature         # T3: tellimuse vormistamine
│   ├── step_definitions/        # Gherkini sammude teostus
│   └── support/                 # World, hookid, brauseri elutsükkel
├── src/
│   ├── config.js                # Keskkonna seadistus
│   ├── data/products.js         # Toodete nimed -> data-test ID-d
│   ├── pages/                   # Page Objectid (BasePage + 4 lehte)
│   └── support/browser.js       # Puppeteeri käivitamine ja kontekstid
├── reports/                     # cucumber-report.html/.json/.xml
├── artifacts/screenshots/       # iga stsenaariumi lõppseisund
└── docs/
    ├── TESTIARUANNE.md          # testiaruanne
    └── images/                  # aruande pildid
```

## Teststsenaariumid

| ID | Feature | Stsenaarium | Eesmärk |
|---|---|---|---|
| T1 | [login.feature](features/login.feature) | Successful login and logout with a standard user | Kontrollida autentimist ja sessiooni lõpetamist. |
| T2 | [cart.feature](features/cart.feature) | Add two products to the cart and remove one | Kontrollida ostukorvi lisamist, loendurit, sisu ja eemaldamist. |
| T3 | [checkout.feature](features/checkout.feature) | Complete checkout with valid customer details | Kontrollida vormivalideerimist ja tellimuse täielikku läbimist. |

Stsenaariumide täpsed sammud ja oodatavad tulemused on
[testiaruandes](docs/TESTIARUANNE.md#5-teststsenaariumid).

## Aruanded ja tõendid

- [Cucumberi HTML-aruanne](reports/cucumber-report.html) — sisaldab manustatud screenshotte.
- [JSON-aruanne](reports/cucumber-report.json) — masinloetav.
- [JUnit-aruanne](reports/cucumber-report.xml) — CI-tööriistadele.
- `artifacts/screenshots/` — iga stsenaariumi lõppseisundi PNG.

## Seadistus

Kõik väärtused on valikulised ja nende vaikeväärtused sobivad kohalikuks käivitamiseks.

| Muutuja | Vaikeväärtus | Tähendus |
|---|---|---|
| `BASE_URL` | `https://www.saucedemo.com` | Testitava rakenduse baas-URL. |
| `HEADLESS` | `true` | `false` käivitab brauseri nähtavalt. |
| `SLOW_MO` | `0` | Aeglustab Puppeteeri tegevusi (ms), kasulik debugimisel. |
| `VIEWPORT_WIDTH` / `VIEWPORT_HEIGHT` | `1440` / `900` | Brauseri vaateava. |
| `PUPPETEER_TIMEOUT` | `30000` | Elementide ooteaeg (ms). |
| `PUPPETEER_NAVIGATION_TIMEOUT` | `45000` | Navigeerimise ooteaeg (ms). |
| `HYDRATION_DELAY` | `300` | Reacti hüdratsiooni ooteaeg enne sisselogimist (ms). |
| `CUCUMBER_PARALLEL` | `1` | Cucumberi tööde arv. |
| `SAUCE_PASSWORD` | `secret_sauce` | Demo-kontode parool. |

## Märkused

- **Päris veebileht.** Testid ei kasuta mocke. Sauce Demo on avalik demo-pood,
  mille kataloog, hinnad ja DOM võivad aeg-ajalt muutuda. Selektorid eelistavad
  `data-test` atribuute, mis on automatiseerimiseks stabiilsemad kui CSS-klassid.
- **Chrome'i cache.** `.puppeteerrc.cjs` hoiab Puppeteeri tõmmatud Chrome'i
  projektikaustas (`.cache/puppeteer`, ~409 MB) ega kirjuta kasutaja kodukataloogi.
  Värskes kloonis tuleb Chrome eraldi alla tõmmata (vt kiirkäivitust).
- **Isolatsioon.** Iga stsenaarium saab värske brauserikonteksti, seega küpsised
  ja `localStorage` ei kandu testide vahel üle.
- **Screenshotid.** `After`-hook teeb iga stsenaariumi lõpus screenshoti, salvestab
  selle `artifacts/screenshots/` kausta ja manustab Cucumberi HTML-aruandesse.
- **Hüdratsioon.** Sauce Demo on Reacti rakendus. Liiga varajane klikk enne
  hüdratsiooni ei käivita sisselogimise handlerit; `LoginPage` ootab seetõttu
  lühikese `HYDRATION_DELAY` ning sisestab tekstid väikese viivitusega.

## Dokumentatsioon

- [Testiaruanne](docs/TESTIARUANNE.md) — testitav projekt, stsenaariumid, tulemused,
  leitud probleemid ning väljakutsed ja lahendused.
- [Cucumberi 10-minuti juhend](https://cucumber.io/docs/guides/10-minute-tutorial/)
- [Puppeteeri dokumentatsioon](https://pptr.dev/)
