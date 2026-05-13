// One-shot patch: align kotorcarhire copy with LocalRent affiliate truth.
// Touches: featureCards, faqItems (kotor uses 0..8), testimonials.0.text,
// hero/trust badge labels, fleet.subtitle, footer.brandDesc.
// Run with:  node scripts/patch-affiliate-truth.mjs
import fs from 'node:fs';
import path from 'node:path';

const LOCALES_DIR = path.resolve('src/i18n/locales');

const COPY = {
  en: {
    featureCards: {
      fullInsurance: {
        title: 'Insurance Options',
        desc: 'Free Minimum (third-party) cover on every booking — Basic from €8/day, Full from €10/day, no-deposit Full Plus from €18/day.',
      },
      support: {
        title: '24/7 Booking Support',
        desc: 'Booking help around the clock for your bay-road drive into Kotor; roadside assistance is provided by the rental supplier.',
      },
      noHiddenFees: {
        title: 'No Credit Card Needed',
        desc: 'Every car on the platform is bookable without a credit card — pay by cash, debit card or crypto at the supplier.',
      },
      freeCancellation: {
        title: 'Free Cancellation',
        desc: 'On selected cars (around 46% of the fleet): refund of advance payment if you cancel more than 24 hours before pickup.',
      },
      crossBorder: {
        title: 'Cross-Border',
        desc: 'Paid cross-border permit at three tiers — neighbours, including Albania & Kosovo, or all-EU + Switzerland. Dubrovnik is 2 hours via Debeli Brijeg.',
      },
    },
    faqItems: {
      0: { q: 'What documents do I need?', a: 'A valid driving licence and passport or ID. Most cars accept cash, debit card or crypto for payment — a credit card is not required on any booking on the platform. International Driving Permit may be needed for non-EU licences depending on the supplier.' },
      1: { q: 'Can I drive to Croatia, Albania or Italy?', a: 'Yes — cross-border travel is sold as a paid permit at three tiers: (1) Croatia, Bosnia & Herzegovina and Serbia (no Green Card needed); (2) the same plus Albania and Kosovo (Green Card provided); (3) Albania, Kosovo, Croatia, Bosnia, Serbia, Macedonia, all EU countries and Switzerland (Green Card provided). The right tier for your trip is shown at checkout.' },
      2: { q: 'Is there a minimum age?', a: 'Age and required driving experience vary by vehicle. The lowest cars on the platform are available from 18+ years old with 1+ years driving experience.' },
      3: { q: "What's included in the price?", a: 'Every booking includes the free Minimum (third-party liability) cover with a typical €100 deposit, plus a free second driver and VAT. Insurance upgrades are paid extras: Basic from €8/day, Full from €10/day, and a no-deposit Full Plus from €18/day. Unlimited mileage is included on most cars (376 of around 380).' },
      5: { q: 'What is the cancellation policy?', a: 'Free cancellation is available on selected cars (around 176 of approximately 380, marked clearly in the search results). On those cars, the full advance payment is refunded if you cancel more than 24 hours before pickup; cancellations within 24 hours of pickup are non-refundable.' },
      6: { q: 'Is a deposit required?', a: 'Most cars hold a €100 deposit at pickup. 47 cars on the platform require no deposit at all, and a further 124 offer a no-deposit option as a paid service. Choosing the Full Plus insurance tier (from €18/day) also waives the deposit.' },
    },
    testimonials: {
      0: { text: 'Booked a compact for Tivat in two clicks, met by the supplier at arrivals, and on the bay road to Kotor in minutes. Drove down to Perast and out to Our Lady of the Rocks on our own schedule, no waiting around.' },
    },
    hero: { badges: { fullInsurance: 'Insurance Options' } },
    trust: { fullInsurance: 'Insurance Options' },
    fleet: { subtitle: 'Browse real-time availability and prices, free cancellation on selected cars, free Minimum cover with paid upgrades from €8/day, book directly.' },
    footer: { brandDesc: 'Tivat Airport pickup, in-town Kotor delivery, and hotel handovers across the Bay. Free Minimum cover with paid upgrades from €8/day, bay road expertise, and flat rates that stay flat all season.' },
  },

  de: {
    featureCards: {
      fullInsurance: {
        title: 'Versicherungsoptionen',
        desc: 'Kostenlose Mindestdeckung (Haftpflicht) bei jeder Buchung — Basic ab 8 €/Tag, Full ab 10 €/Tag, Full Plus ohne Kaution ab 18 €/Tag.',
      },
      support: {
        title: '24/7 Buchungssupport',
        desc: 'Buchungshilfe rund um die Uhr für die Fahrt entlang der Buchtstraße nach Kotor; der Pannendienst wird vom Vermieter gestellt.',
      },
      noHiddenFees: {
        title: 'Keine Kreditkarte erforderlich',
        desc: 'Jedes Auto auf der Plattform ist ohne Kreditkarte buchbar — Zahlung in bar, mit Debitkarte oder Krypto direkt beim Vermieter.',
      },
      freeCancellation: {
        title: 'Kostenlose Stornierung',
        desc: 'Bei ausgewählten Autos (rund 46 % der Flotte): Rückerstattung der Anzahlung bei Stornierung mehr als 24 Stunden vor Abholung.',
      },
      crossBorder: {
        title: 'Grenzüberquerung',
        desc: 'Kostenpflichtige Grenzgenehmigung in drei Stufen — Nachbarländer, inkl. Albanien & Kosovo oder ganz EU + Schweiz. Dubrovnik in 2 Std. über Debeli Brijeg.',
      },
    },
    faqItems: {
      0: { q: 'Welche Dokumente brauche ich?', a: 'Ein gültiger Führerschein und Reisepass oder Personalausweis. Die meisten Autos akzeptieren Bargeld, Debitkarte oder Krypto — eine Kreditkarte ist bei keiner Buchung auf der Plattform erforderlich. Für Nicht-EU-Führerscheine kann je nach Vermieter ein internationaler Führerschein nötig sein.' },
      1: { q: 'Kann ich nach Kroatien, Albanien oder Italien fahren?', a: 'Ja — die Grenzfahrt wird als kostenpflichtige Genehmigung in drei Stufen verkauft: (1) Kroatien, Bosnien & Herzegowina und Serbien (keine Grüne Karte nötig); (2) dasselbe plus Albanien und Kosovo (Grüne Karte enthalten); (3) Albanien, Kosovo, Kroatien, Bosnien, Serbien, Mazedonien, alle EU-Länder und die Schweiz (Grüne Karte enthalten). Die passende Stufe wird beim Checkout angezeigt.' },
      2: { q: 'Gibt es ein Mindestalter?', a: 'Alter und erforderliche Fahrpraxis variieren je nach Fahrzeug. Die niedrigsten Fahrzeuge auf der Plattform sind ab 18 Jahren mit 1 Jahr Fahrpraxis verfügbar.' },
      3: { q: 'Was ist im Preis enthalten?', a: 'Jede Buchung enthält die kostenlose Mindestdeckung (Haftpflicht) mit typischer 100-€-Kaution, einen kostenlosen zweiten Fahrer und MwSt. Versicherungs-Upgrades sind kostenpflichtige Extras: Basic ab 8 €/Tag, Full ab 10 €/Tag und Full Plus ohne Kaution ab 18 €/Tag. Unbegrenzte Kilometer sind bei den meisten Autos enthalten (376 von etwa 380).' },
      5: { q: 'Wie lautet die Stornierungsrichtlinie?', a: 'Kostenlose Stornierung ist bei ausgewählten Autos verfügbar (rund 176 von ca. 380, in der Suche klar markiert). Bei diesen Autos wird die gesamte Anzahlung erstattet, wenn Sie mehr als 24 Stunden vor Abholung stornieren; Stornierungen innerhalb von 24 Stunden vor Abholung sind nicht erstattungsfähig.' },
      6: { q: 'Ist eine Kaution erforderlich?', a: 'Die meisten Autos hinterlegen bei Abholung eine Kaution von 100 €. 47 Autos auf der Plattform verlangen gar keine Kaution, weitere 124 bieten die Kautionsfreiheit als kostenpflichtigen Service an. Auch die Wahl der Full-Plus-Versicherung (ab 18 €/Tag) erlässt die Kaution.' },
    },
    testimonials: {
      0: { text: 'In zwei Klicks ein Auto für Tivat gebucht, der Vermieter holte uns am Ankunftsbereich ab, und schon ging es über die Buchtstraße nach Kotor. Wir fuhren weiter nach Perast und zur Insel Our Lady of the Rocks — alles in unserem eigenen Tempo.' },
    },
    hero: { badges: { fullInsurance: 'Versicherungsoptionen' } },
    trust: { fullInsurance: 'Versicherungsoptionen' },
    fleet: { subtitle: 'Verfügbarkeit und Preise in Echtzeit ansehen, kostenlose Stornierung bei ausgewählten Autos, kostenlose Mindestdeckung mit Upgrades ab 8 €/Tag, direkt buchen.' },
    footer: { brandDesc: 'Abholung am Flughafen Tivat, Lieferung in die Altstadt von Kotor und Übergabe direkt am Hotel. Kostenlose Mindestdeckung mit Upgrades ab 8 €/Tag, Erfahrung auf den Buchtstraßen und Festpreise – die ganze Saison gleich.' },
  },

  fr: {
    featureCards: {
      fullInsurance: {
        title: "Options d'assurance",
        desc: "Couverture Minimum (responsabilité civile) gratuite à chaque réservation — Basic dès 8 €/jour, Full dès 10 €/jour, Full Plus sans caution dès 18 €/jour.",
      },
      support: {
        title: 'Assistance réservation 24/7',
        desc: "Assistance à la réservation à toute heure pour votre trajet sur la route de la baie vers Kotor ; l'assistance routière est assurée par le loueur.",
      },
      noHiddenFees: {
        title: 'Sans carte de crédit',
        desc: 'Chaque voiture de la plateforme est réservable sans carte de crédit — paiement en espèces, par carte de débit ou crypto chez le loueur.',
      },
      freeCancellation: {
        title: 'Annulation gratuite',
        desc: 'Sur certaines voitures (environ 46 % de la flotte) : remboursement de l’acompte si vous annulez plus de 24 heures avant la prise en charge.',
      },
      crossBorder: {
        title: 'Passage frontalier',
        desc: 'Permis frontalier payant en trois niveaux — voisins, incluant Albanie et Kosovo, ou toute l’UE + Suisse. Dubrovnik à 2 h via Debeli Brijeg.',
      },
    },
    faqItems: {
      0: { q: 'Quels documents dois-je présenter ?', a: 'Un permis de conduire valide et un passeport ou une pièce d’identité. La plupart des voitures acceptent les espèces, la carte de débit ou la crypto — aucune carte de crédit n’est exigée pour les réservations sur la plateforme. Un permis international peut être requis pour les permis hors UE selon le loueur.' },
      1: { q: 'Puis-je conduire en Croatie, en Albanie ou en Italie ?', a: 'Oui — le passage frontalier est vendu sous forme de permis payant en trois niveaux : (1) Croatie, Bosnie-Herzégovine et Serbie (Carte Verte non nécessaire) ; (2) mêmes pays plus Albanie et Kosovo (Carte Verte fournie) ; (3) Albanie, Kosovo, Croatie, Bosnie, Serbie, Macédoine, tous les pays de l’UE et la Suisse (Carte Verte fournie). Le bon niveau est affiché au paiement.' },
      2: { q: 'Y a-t-il un âge minimum ?', a: 'L’âge et l’expérience de conduite requis varient selon le véhicule. Les voitures les plus accessibles sur la plateforme sont disponibles dès 18 ans avec 1 an d’expérience de conduite.' },
      3: { q: 'Que comprend le prix ?', a: 'Chaque réservation inclut la couverture Minimum (responsabilité civile) gratuite avec une caution typique de 100 €, plus un deuxième conducteur gratuit et la TVA. Les upgrades d’assurance sont des extras payants : Basic dès 8 €/jour, Full dès 10 €/jour et Full Plus sans caution dès 18 €/jour. Le kilométrage illimité est inclus sur la plupart des voitures (376 sur environ 380).' },
      5: { q: "Quelle est la politique d'annulation ?", a: 'L’annulation gratuite est disponible sur certaines voitures (environ 176 sur ~380, clairement signalées dans les résultats). Sur ces voitures, l’acompte est intégralement remboursé en cas d’annulation plus de 24 heures avant la prise en charge ; les annulations dans les 24 heures précédant la prise en charge ne sont pas remboursables.' },
      6: { q: 'Une caution est-elle exigée ?', a: 'La plupart des voitures retiennent une caution de 100 € à la prise en charge. 47 voitures de la plateforme ne demandent aucune caution, et 124 autres proposent l’option sans caution comme service payant. Choisir l’assurance Full Plus (dès 18 €/jour) supprime également la caution.' },
    },
    testimonials: {
      0: { text: 'Réservation d’une compacte à Tivat en deux clics, accueil par le loueur à l’arrivée, puis route de la baie jusqu’à Kotor en quelques minutes. Nous avons poursuivi jusqu’à Perast et à l’île Notre-Dame du Rocher, à notre rythme.' },
    },
    hero: { badges: { fullInsurance: "Options d'assurance" } },
    trust: { fullInsurance: "Options d'assurance" },
    fleet: { subtitle: "Consultez la disponibilité et les prix en temps réel, annulation gratuite sur certaines voitures, couverture Minimum gratuite avec upgrades dès 8 €/jour, réservez directement." },
    footer: { brandDesc: "Prise en charge à l'aéroport de Tivat, livraison en ville à Kotor et remise des clés à l'hôtel partout dans la baie. Couverture Minimum gratuite avec upgrades dès 8 €/jour, connaissance des routes côtières et tarifs fixes toute la saison." },
  },

  it: {
    featureCards: {
      fullInsurance: {
        title: 'Opzioni assicurative',
        desc: 'Copertura Minima (responsabilità civile) gratuita su ogni prenotazione — Basic da 8 €/giorno, Full da 10 €/giorno, Full Plus senza cauzione da 18 €/giorno.',
      },
      support: {
        title: 'Assistenza prenotazioni 24/7',
        desc: 'Assistenza alla prenotazione 24 ore su 24 per il tragitto sulla strada della baia verso Cattaro; l’assistenza stradale è fornita dal noleggiatore.',
      },
      noHiddenFees: {
        title: 'Nessuna carta di credito',
        desc: 'Ogni auto sulla piattaforma è prenotabile senza carta di credito — pagamento in contanti, con carta di debito o crypto direttamente al noleggiatore.',
      },
      freeCancellation: {
        title: 'Cancellazione gratuita',
        desc: 'Su auto selezionate (circa il 46 % della flotta): rimborso dell’acconto se annulli più di 24 ore prima del ritiro.',
      },
      crossBorder: {
        title: 'Attraversamento di confine',
        desc: 'Permesso di confine a pagamento in tre livelli — paesi vicini, inclusi Albania e Kosovo, o tutta UE + Svizzera. Dubrovnik a 2 ore via Debeli Brijeg.',
      },
    },
    faqItems: {
      0: { q: 'Quali documenti servono?', a: 'Una patente di guida valida e un passaporto o documento d’identità. La maggior parte delle auto accetta contanti, carta di debito o crypto — nessuna carta di credito è richiesta per le prenotazioni sulla piattaforma. Per le patenti non UE può essere richiesta una patente internazionale a seconda del noleggiatore.' },
      1: { q: 'Posso guidare in Croazia, Albania o Italia?', a: 'Sì — l’attraversamento del confine è venduto come permesso a pagamento in tre livelli: (1) Croazia, Bosnia ed Erzegovina e Serbia (Carta Verde non necessaria); (2) gli stessi paesi più Albania e Kosovo (Carta Verde fornita); (3) Albania, Kosovo, Croazia, Bosnia, Serbia, Macedonia, tutti i paesi UE e la Svizzera (Carta Verde fornita). Il livello corretto viene mostrato al checkout.' },
      2: { q: 'C’è un’età minima?', a: 'Età ed esperienza di guida richieste variano in base al veicolo. Le auto più accessibili sulla piattaforma sono disponibili da 18 anni con 1 anno di esperienza di guida.' },
      3: { q: 'Cosa è incluso nel prezzo?', a: 'Ogni prenotazione include la copertura Minima (responsabilità civile) gratuita con una cauzione tipica di 100 €, più un secondo conducente gratuito e l’IVA. Gli upgrade assicurativi sono extra a pagamento: Basic da 8 €/giorno, Full da 10 €/giorno e Full Plus senza cauzione da 18 €/giorno. Il chilometraggio illimitato è incluso sulla maggior parte delle auto (376 su circa 380).' },
      5: { q: 'Qual è la politica di cancellazione?', a: 'La cancellazione gratuita è disponibile su auto selezionate (circa 176 su ~380, chiaramente indicate nei risultati). Su queste auto l’acconto viene rimborsato per intero se annulli più di 24 ore prima del ritiro; le cancellazioni entro 24 ore dal ritiro non sono rimborsabili.' },
      6: { q: 'È richiesta una cauzione?', a: 'La maggior parte delle auto trattiene una cauzione di 100 € al ritiro. 47 auto sulla piattaforma non richiedono alcuna cauzione, altre 124 offrono l’opzione senza cauzione come servizio a pagamento. Scegliendo l’assicurazione Full Plus (da 18 €/giorno) si elimina anche la cauzione.' },
    },
    testimonials: {
      0: { text: 'Prenotata una compatta per Tivat in due clic, il noleggiatore ci ha accolti agli arrivi e in pochi minuti eravamo sulla strada della baia verso Cattaro. Abbiamo proseguito fino a Perast e all’isola della Madonna dello Scarpello, secondo i nostri tempi.' },
    },
    hero: { badges: { fullInsurance: 'Opzioni assicurative' } },
    trust: { fullInsurance: 'Opzioni assicurative' },
    fleet: { subtitle: 'Consulta disponibilità e prezzi in tempo reale, cancellazione gratuita su auto selezionate, copertura Minima gratuita con upgrade da 8 €/giorno, prenota direttamente.' },
    footer: { brandDesc: "Ritiro all'aeroporto di Tivat, consegna in città a Cattaro e riconsegna direttamente in hotel in tutta la Boka. Copertura Minima gratuita con upgrade da 8 €/giorno, conoscenza delle strade della baia e tariffe fisse tutta la stagione." },
  },

  me: {
    featureCards: {
      fullInsurance: {
        title: 'Opcije osiguranja',
        desc: 'Besplatno Minimalno (osiguranje od odgovornosti) pokriće za svaku rezervaciju — Basic od 8 €/dan, Full od 10 €/dan, Full Plus bez depozita od 18 €/dan.',
      },
      support: {
        title: 'Podrška za rezervacije 24/7',
        desc: 'Pomoć pri rezervaciji u svako doba dana za vožnju obalnim putem do Kotora; pomoć na putu pruža iznajmljivač.',
      },
      noHiddenFees: {
        title: 'Bez kreditne kartice',
        desc: 'Svaki automobil na platformi može se rezervisati bez kreditne kartice — plaćanje gotovinom, debitnom karticom ili kriptovalutom kod iznajmljivača.',
      },
      freeCancellation: {
        title: 'Besplatno otkazivanje',
        desc: 'Na odabranim automobilima (oko 46 % flote): povrat avansa ukoliko otkažete više od 24 sata prije preuzimanja.',
      },
      crossBorder: {
        title: 'Prelazak granice',
        desc: 'Plaćena dozvola za prelazak granice u tri nivoa — susjedne zemlje, uključujući Albaniju i Kosovo, ili cijela EU + Švajcarska. Dubrovnik je 2 sata preko Debelog Brijega.',
      },
    },
    faqItems: {
      0: { q: 'Koja dokumenta su potrebna?', a: 'Važeća vozačka dozvola i pasoš ili lična karta. Većina automobila prihvata gotovinu, debitnu karticu ili kriptovalutu — kreditna kartica nije potrebna ni za jednu rezervaciju na platformi. Za vozačke dozvole van EU može biti potrebna međunarodna vozačka dozvola, zavisno od iznajmljivača.' },
      1: { q: 'Mogu li voziti u Hrvatsku, Albaniju ili Italiju?', a: 'Da — prelazak granice se naplaćuje kao dozvola u tri nivoa: (1) Hrvatska, Bosna i Hercegovina i Srbija (zelena karta nije potrebna); (2) iste zemlje plus Albanija i Kosovo (zelena karta uključena); (3) Albanija, Kosovo, Hrvatska, Bosna, Srbija, Makedonija, sve zemlje EU i Švajcarska (zelena karta uključena). Odgovarajući nivo se prikazuje pri plaćanju.' },
      2: { q: 'Postoji li minimalna starost?', a: 'Starost i potrebno iskustvo u vožnji zavise od vozila. Najpristupačniji automobili na platformi dostupni su od 18 godina sa najmanje 1 godinom iskustva u vožnji.' },
      3: { q: 'Šta je uključeno u cijenu?', a: 'Svaka rezervacija uključuje besplatno Minimalno osiguranje (od odgovornosti) sa tipičnim depozitom od 100 €, plus besplatnog drugog vozača i PDV. Nadogradnje osiguranja su dodatne usluge koje se plaćaju: Basic od 8 €/dan, Full od 10 €/dan i Full Plus bez depozita od 18 €/dan. Neograničena kilometraža je uključena na većini automobila (376 od oko 380).' },
      5: { q: 'Kakva je politika otkazivanja?', a: 'Besplatno otkazivanje je dostupno na odabranim automobilima (oko 176 od približno 380, jasno označeni u rezultatima pretrage). Na tim automobilima se cijeli iznos avansa vraća ako otkažete više od 24 sata prije preuzimanja; otkazivanja u roku od 24 sata prije preuzimanja nisu povratljiva.' },
      6: { q: 'Da li je potreban depozit?', a: 'Većina automobila zadržava depozit od 100 € pri preuzimanju. 47 automobila na platformi uopšte ne traže depozit, a još 124 nude opciju bez depozita kao plaćenu uslugu. Izborom Full Plus osiguranja (od 18 €/dan) takođe se uklanja depozit.' },
    },
    testimonials: {
      0: { text: 'Rezervisali smo kompaktni automobil za Tivat u dva klika, iznajmljivač nas je dočekao u dolascima, i za nekoliko minuta smo bili na obalnom putu ka Kotoru. Nastavili smo do Perasta i Gospe od Škrpjela, sve u sopstvenom tempu.' },
    },
    hero: { badges: { fullInsurance: 'Opcije osiguranja' } },
    trust: { fullInsurance: 'Opcije osiguranja' },
    fleet: { subtitle: 'Pregledajte dostupnost i cijene u realnom vremenu, besplatno otkazivanje na odabranim automobilima, besplatno Minimalno pokriće sa nadogradnjama od 8 €/dan, rezervišite direktno.' },
    footer: { brandDesc: 'Preuzimanje na Aerodromu Tivat, dostava u sam Kotor i predaja ključeva na hotelu duž cijele Boke. Besplatno Minimalno pokriće sa nadogradnjama od 8 €/dan, iskustvo na zavojitim putevima Boke i fiksne cijene cijelu sezonu.' },
  },

  ru: {
    featureCards: {
      fullInsurance: {
        title: 'Варианты страхования',
        desc: 'Бесплатное минимальное покрытие (ОСАГО) при каждом бронировании — Basic от 8 €/день, Full от 10 €/день, Full Plus без депозита от 18 €/день.',
      },
      support: {
        title: 'Поддержка бронирования 24/7',
        desc: 'Помощь с бронированием круглосуточно для поездки по дороге вдоль залива в Котор; помощь на дороге предоставляется арендодателем.',
      },
      noHiddenFees: {
        title: 'Без кредитной карты',
        desc: 'Любой автомобиль на платформе можно забронировать без кредитной карты — оплата наличными, дебетовой картой или криптовалютой у арендодателя.',
      },
      freeCancellation: {
        title: 'Бесплатная отмена',
        desc: 'На выбранных автомобилях (около 46 % автопарка): возврат предоплаты при отмене более чем за 24 часа до получения.',
      },
      crossBorder: {
        title: 'Пересечение границы',
        desc: 'Платное разрешение на пересечение границы в трёх уровнях — соседние страны, включая Албанию и Косово, или весь ЕС + Швейцария. Дубровник в 2 часах через Дебели Бриег.',
      },
    },
    faqItems: {
      0: { q: 'Какие документы нужны?', a: 'Действительные водительские права и паспорт или удостоверение личности. Большинство автомобилей принимают наличные, дебетовую карту или криптовалюту — кредитная карта не требуется ни для одного бронирования на платформе. Для водительских прав не из ЕС может потребоваться международное водительское удостоверение, в зависимости от арендодателя.' },
      1: { q: 'Можно ли поехать в Хорватию, Албанию или Италию?', a: 'Да — пересечение границы продаётся как платное разрешение в трёх уровнях: (1) Хорватия, Босния и Герцеговина и Сербия (Зелёная карта не нужна); (2) те же плюс Албания и Косово (Зелёная карта предоставляется); (3) Албания, Косово, Хорватия, Босния, Сербия, Македония, все страны ЕС и Швейцария (Зелёная карта предоставляется). Подходящий уровень показывается при оформлении.' },
      2: { q: 'Есть ли минимальный возраст?', a: 'Возраст и требуемый стаж вождения зависят от автомобиля. Самые доступные автомобили на платформе доступны с 18 лет при стаже от 1 года.' },
      3: { q: 'Что включено в стоимость?', a: 'Каждое бронирование включает бесплатное Минимальное покрытие (ОСАГО) с типовым депозитом 100 €, бесплатного второго водителя и НДС. Расширенные пакеты страхования — платные дополнительные услуги: Basic от 8 €/день, Full от 10 €/день и Full Plus без депозита от 18 €/день. Безлимитный пробег включён на большинстве автомобилей (376 из примерно 380).' },
      5: { q: 'Какова политика отмены?', a: 'Бесплатная отмена доступна на выбранных автомобилях (около 176 из приблизительно 380, чётко отмечены в результатах поиска). На этих автомобилях полная сумма предоплаты возвращается при отмене более чем за 24 часа до получения; отмены менее чем за 24 часа до получения не возвращаются.' },
      6: { q: 'Требуется ли депозит?', a: 'Большинство автомобилей удерживают депозит 100 € при получении. 47 автомобилей на платформе вообще не требуют депозит, ещё 124 предлагают опцию без депозита как платную услугу. Выбор страхования Full Plus (от 18 €/день) также отменяет депозит.' },
    },
    testimonials: {
      0: { text: 'Забронировали компактный автомобиль на Тиват в два клика, арендодатель встретил нас в зоне прилёта, и через несколько минут мы уже ехали по дороге залива в Котор. Продолжили путь до Пераста и острова Госпа од Шкрпьела — в собственном ритме.' },
    },
    hero: { badges: { fullInsurance: 'Варианты страхования' } },
    trust: { fullInsurance: 'Варианты страхования' },
    fleet: { subtitle: 'Смотрите наличие и цены в реальном времени, бесплатная отмена на выбранных автомобилях, бесплатное Минимальное покрытие с улучшениями от 8 €/день, бронируйте напрямую.' },
    footer: { brandDesc: 'Встреча в аэропорту Тиват, доставка по самому Котору и передача ключей в отеле по всей Боке Которской. Бесплатное Минимальное покрытие с улучшениями от 8 €/день, знание прибрежных дорог и фиксированные тарифы весь сезон.' },
  },
};

function setDeep(obj, dotKey, value) {
  const parts = dotKey.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (typeof cur[parts[i]] !== 'object' || cur[parts[i]] === null) cur[parts[i]] = {};
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = value;
}

function mergeDeep(target, source) {
  for (const k of Object.keys(source)) {
    const sv = source[k];
    if (sv && typeof sv === 'object' && !Array.isArray(sv)) {
      if (!target[k] || typeof target[k] !== 'object') target[k] = {};
      mergeDeep(target[k], sv);
    } else {
      target[k] = sv;
    }
  }
}

for (const [lang, patch] of Object.entries(COPY)) {
  const file = path.join(LOCALES_DIR, `${lang}.json`);
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));
  mergeDeep(json, patch);
  fs.writeFileSync(file, JSON.stringify(json, null, 2) + '\n', 'utf8');
  console.log(`patched ${lang}.json`);
}
console.log('done.');
