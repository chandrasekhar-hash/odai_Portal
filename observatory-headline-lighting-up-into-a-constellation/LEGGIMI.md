# Il titolo dell'osservatorio che si accende di stelle a costellazione allo scroll

Si apre la prima schermata di Kestrel, l'app inventata di un osservatorio sul crinale: in alto il marchio con la cupola, «Tonight», «Sky atlas», «Archive» e la pillola di vetro «Open the app»; al centro l'etichetta «Kestrel Ridge Observatory», il titolo «See the sky the way it was» con le lettere ancora spente e una riga che racconta. Dietro c'è un cielo notturno che sembra una fotografia: si sviluppa piano all'arrivo, con migliaia di stelle di colori diversi (azzurre, bianche, gialle, arancioni), le più luminose con l'alone morbido di un obiettivo e un lieve scintillio più forte vicino all'orizzonte, la Via Lattea in diagonale come una nube calda al centro e fredda ai bordi, attraversata dalle polveri scure e da qualche chiarore rosato, il cielo che schiarisce verso l'orizzonte e la grana che si muove. In alto a destra un anello tratteggiato segna la stella polare. Scorrendo, una linea di costellazione parte dalla lettera accesa più vicina e arriva sulla lettera nuova, che si accende come una stella: un lampo di luce, una stellina a quattro punte che si apre con un rimbalzo, e poi si assesta. Lettera dopo lettera il titolo diventa una costellazione disegnata. Intanto tutto il cielo ruota attorno alla polare e le stelle più luminose lasciano le scie di una lunga esposizione, che si allungano con lo scroll. Alla fine sale dal basso, con una molla e appena inclinata, una card di vetro smerigliato: «Visible tonight», Saturno disegnato con l'anello, l'ora che rotola da 20:00 a 23:40, altezza, magnitudine e seeing, e accanto la curva del pianeta nel cielo della notte che si disegna fino al segno delle 23:40; un riflesso passa sul vetro e la luce dentro la card segue il puntatore.

## Come si usa

Apri index.html in un browser. Le librerie arrivano da jsDelivr: in produzione puoi scaricarle e servirle dal tuo dominio.

## Come funziona

- **Un palco fermo e lungo da scorrere.** La sezione è alta 380vh e dentro c'è un palco sticky alto 100vh (100lvh dove c'è): tutto succede lì, guidato dalla frazione di pagina scorsa, smorzata a ogni fotogramma perché segua lo scroll con un filo di ritardo. Lenis rende lo scorrimento morbido.
- **Il cielo fotografato su canvas.** Le stelle stanno in coordinate polari attorno alla polare (raggio e angolo), con luminosità quasi tutte deboli e poche forti, e un colore preso da cinque temperature. Ognuna si disegna con uno sprite già pronto, nucleo netto e alone morbido. La Via Lattea è una tela piccola dipinta con centinaia di macchie sfumate lungo una fascia curva, con le polveri tolte a filamenti, e si disegna grande: lo stiramento la ammorbidisce come un obiettivo.
- **La rotazione e le scie.** A ogni fotogramma il cielo ruota attorno alla polare di un angolo fatto dallo scroll più una deriva lenta nel tempo: alle stelle si somma l'angolo, alla Via Lattea basta una rotazione del contesto. Le stelle più luminose disegnano un arco dietro di sé, lungo quanto la rotazione dello scroll, in quattro tratti che sfumano: la lunga esposizione.
- **Le lettere diventano stelle.** Il titolo è diviso in lettere. Per ogni lettera si sceglie un punto dentro il suo disegno e la lettera accesa più vicina fra quelle prima: così la costellazione cresce come un albero e non come una riga. Lo scroll porta prima la linea dal punto vecchio al nuovo, poi accende la lettera: colore, alone in text-shadow, la stellina con un back.out e un lampo che si spegne in 1,5 secondi.
- **La card di vetro.** Quando lo scroll passa il 70% parte una timeline GSAP: la card sale con back.out e una lieve rotazione in prospettiva, le righe arrivano sfalsate, l'ora rotola, la curva si disegna con stroke-dashoffset, il segno delle 23:40 si apre e un riflesso attraversa il vetro. Tornando su la timeline va all'indietro più veloce. Se serve, il titolo sale quanto basta per non finire sotto la card.

## Valori da cambiare

- `RIDE` (script.js, di partenza 1): Quanto scroll serve per tutta la sequenza: 2 è il doppio.
- `TURN` (script.js, di partenza 26): Di quanti gradi ruota il cielo attorno alla polare in tutto lo scroll.
- `DRIFT` (script.js, di partenza 0.12): Gradi al secondo che il cielo ruota da solo.
- `STARS` (script.js, di partenza 1): Quante stelle ci sono.
- `MILKY` (script.js, di partenza 1): Quanto è luminosa la Via Lattea.
- `TRAILS` (script.js, di partenza 0.6): Quanto si vedono le scie delle stelle (0 = niente).
- `TWINKLE` (script.js, di partenza 1): Quanto scintillano le stelle luminose.
- `GLOW` (script.js, di partenza 1): Quanto brilla una lettera accesa.
- `LINE` (script.js, di partenza 0.6): Quanto si vede la linea della costellazione.
- `CARD_AT` (script.js, di partenza 0.7): A che punto dello scroll sale la card.
- `POLE_X` (script.js, di partenza 0.8): Dove sta la stella polare, in frazione della larghezza.
- `POLE_Y` (script.js, di partenza 0.15): Dove sta la stella polare, in frazione dell'altezza.

## Trappole

- Una tela grande quanto il cielo che ruota, a doppia densità, costa milioni di pixel: le stelle si disegnano dal vivo con uno sprite (restano nette a ogni densità), e solo la Via Lattea, che è morbida, sta in una tela piccola ingrandita.
- Le polveri della Via Lattea fatte con macchie tonde sembrano buchi: vanno tolte a filamenti lunghi, tante macchie piccole in fila lungo una curva che serpeggia.
- Se le lettere cambiano peso mentre si accendono, il titolo si allarga e le linee della costellazione non cadono più sulle lettere: l'accensione cambia solo colore, alone e una scala che non sposta le vicine.
- Una transizione CSS sul transform della pillola rincorre quello che scrive GSAP all'arrivo e la lascia fuori posto: la pressione va sullo span interno.

---

# The observatory headline that lights up into a constellation of stars on scroll

The first screen of Kestrel opens, the made-up app of an observatory on a ridge: at the top the mark with the dome, ‘Tonight’, ‘Sky atlas’, ‘Archive’ and the glass ‘Open the app’ pill; in the middle the ‘Kestrel Ridge Observatory’ label, the headline ‘See the sky the way it was’ with its letters still dark, and a line telling the story. Behind is a night sky that looks like a photograph: it develops slowly on arrival, with thousands of stars of different colours (blue, white, yellow, orange), the brightest with the soft bloom of a lens and a faint twinkle that grows near the horizon, the Milky Way across the diagonal like a cloud, warm in the middle and cool at the edges, crossed by dark dust and a few pinkish glows, the sky getting lighter towards the horizon and a moving grain. Top right, a dashed ring marks the pole star. Scrolling, a constellation line leaves the nearest lit letter and reaches the new one, which lights up like a star: a flash of light, a small four-pointed star opening with a bounce, then settling. Letter after letter the headline becomes a drawn constellation. Meanwhile the whole sky turns around Polaris and the brightest stars leave the trails of a long exposure, which grow longer with the scroll. At the end a frosted glass card rises from the bottom on a spring, slightly tilted: ‘Visible tonight’, Saturn drawn with its ring, the time rolling from 20:00 to 23:40, altitude, magnitude and seeing, and beside them the planet's curve across the night sky drawing itself up to the 23:40 mark; a reflection slides over the glass and the light inside the card follows the pointer.

## How to use it

Open index.html in a browser. Libraries load from jsDelivr: in production you can download them and serve them from your own domain.

## How it works

- **A still stage and a long scroll.** The section is 380vh tall and holds a sticky stage 100vh tall (100lvh where available): everything happens there, driven by the share of the page scrolled, damped every frame so it follows the scroll with a slight delay. Lenis makes the scrolling smooth.
- **The sky photographed on a canvas.** The stars live in polar coordinates around Polaris (radius and angle), with mostly faint brightness and a few strong ones, and a colour taken from five temperatures. Each is drawn with a ready-made sprite, a sharp core and a soft bloom. The Milky Way is a small canvas painted with hundreds of soft blobs along a curved band, with the dust cut out in filaments, and it is drawn large: the stretch softens it like a lens.
- **The rotation and the trails.** Every frame the sky turns around Polaris by an angle made of the scroll plus a slow drift over time: the stars add the angle, the Milky Way only needs a rotation of the context. The brightest stars draw an arc behind them, as long as the scroll's rotation, in four fading strokes: the long exposure.
- **The letters become stars.** The headline is split into letters. Each letter gets a point inside its shape and the nearest lit letter among those before it: so the constellation grows like a tree, not a line. The scroll first carries the line from the old point to the new one, then lights the letter: colour, a text-shadow glow, the small star with a back.out and a flash that fades in 1.5 seconds.
- **The glass card.** When the scroll passes 70% a GSAP timeline starts: the card rises with back.out and a slight perspective tilt, the lines arrive staggered, the time rolls, the curve draws itself with stroke-dashoffset, the 23:40 mark opens and a reflection crosses the glass. Scrolling back the timeline reverses, faster. If needed, the headline rises just enough not to sit under the card.

## Values to change

- `RIDE` (script.js, default 1): How much scroll the whole sequence takes: 2 is twice as long.
- `TURN` (script.js, default 26): How many degrees the sky turns around Polaris over the whole scroll.
- `DRIFT` (script.js, default 0.12): Degrees per second the sky turns on its own.
- `STARS` (script.js, default 1): How many stars there are.
- `MILKY` (script.js, default 1): How bright the Milky Way is.
- `TRAILS` (script.js, default 0.6): How visible the star trails are (0 = none).
- `TWINKLE` (script.js, default 1): How much the bright stars twinkle.
- `GLOW` (script.js, default 1): How much a lit letter glows.
- `LINE` (script.js, default 0.6): How visible the constellation line is.
- `CARD_AT` (script.js, default 0.7): At what share of the scroll the card rises.
- `POLE_X` (script.js, default 0.8): Where Polaris sits, as a share of the width.
- `POLE_Y` (script.js, default 0.15): Where Polaris sits, as a share of the height.

## Pitfalls

- A canvas as large as the rotating sky, at double density, costs millions of pixels: the stars are drawn live with a sprite (they stay sharp at any density), and only the Milky Way, which is soft, lives in a small canvas drawn large.
- Milky Way dust made with round blobs looks like holes: it has to be cut in long filaments, many small blobs in a row along a winding curve.
- If the letters change weight as they light up, the headline widens and the constellation lines no longer land on the letters: lighting up only changes colour, glow and a scale that does not push the neighbours.
- A CSS transition on the pill's transform chases what GSAP writes on arrival and leaves it out of place: the press goes on the inner span.

Animorio, 2026