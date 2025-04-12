function getCookie(name) {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}

function setCookie(name, value, days) {
  var d = new Date;
  d.setTime(d.getTime() + 24*60*60*1000*days);
  document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}

document.addEventListener("DOMContentLoaded", function() {
  // Skip cookie notice as we're going to bundle it separately
  function cookie() {
    // Skip cookie notice if gdprCookieNotice is not defined
    if (typeof gdprCookieNotice === 'function' && !getCookie('vortaGdprAccepted')) {
      try {
        gdprCookieNotice({
          locale: 'en', //This is the default value
          timeout: 500, //Time until the cookie bar appears
          expiration: 30, //This is the default value, in days
          domain: 'https://quirky-hypatia-4de574.netlify.app/', //If you run the same cookie notice on all subdomains, define the main domain starting with a .
          implicit: true, //Accept cookies on page scroll automatically
          statement: '', //Link to your cookie statement page
          performance: ['JSESSIONID'], //Cookies in the performance category.
          analytics: ['ga'], //Cookies in the analytics category.
          marketing: ['SSID'] //Cookies in the marketing category.
        });
      } catch (e) {
        console.log('Cookie notice initialization skipped');
      }
    }
  }

  // Try to initialize cookie notice if available
  try {
    cookie();
  } catch (e) {
    console.log('Cookie functionality skipped');
  }

  // Language switcher functionality
  // Function to get URL parameters
  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  // Check URL parameter first, then localStorage, default to 'en'
  const urlLang = getUrlParameter('lang');
  let currentLang;

  if (urlLang && (urlLang === 'en' || urlLang === 'bs')) {
    // If URL has valid language parameter, use it and update localStorage
    currentLang = urlLang;
    localStorage.setItem('language', currentLang);
  } else {
    // Otherwise fall back to localStorage or default
    currentLang = localStorage.getItem('language') || 'en';
  }

  // Set the initial language
  document.documentElement.lang = currentLang;

  // Apply translations based on stored language
  setTimeout(function() {
    // Set initial active state
    updateActiveLanguage(currentLang);

    // Apply translations
    applyTranslations(currentLang);

    // Add event listeners to language switcher buttons
    document.querySelectorAll('.lang-switch').forEach(btn => {
      // Set href with language parameter
      const btnLang = btn.getAttribute('data-lang');
      const currentUrl = window.location.href;
      const baseUrl = currentUrl.split('?')[0]; // Remove any existing query parameters
      btn.setAttribute('href', baseUrl + '?lang=' + btnLang);

      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const lang = this.getAttribute('data-lang');

        // Store language preference
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;

        // Update active language visual indicator
        updateActiveLanguage(lang);

        // Apply translations
        applyTranslations(lang);

        // Update URL without reloading the page
        const newUrl = baseUrl + '?lang=' + lang;
        window.history.pushState({ path: newUrl }, '', newUrl);
      });
    });
  }, 100); // Small delay to ensure DOM is fully loaded
});

// Update active language in UI
function updateActiveLanguage(lang) {
  document.querySelectorAll('.lang-switch').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Apply translations to the page
function applyTranslations(lang) {
  // Function to swap images based on language
  function swapImages(language) {
    // Images that need to be swapped between languages
    const images = [
      {
        selector: 'object.illustration[data-image-swap="processor"]',
        en: 'images/vorta_processor_v3.svg',
        bs: 'images/vorta_processor_v3_bs.svg'
      },
      {
        selector: 'object[data-image-swap="slide1"]',
        en: 'images/vorta_slide_1.svg',
        bs: 'images/vorta_slide_1_bs.svg'
      },
      {
        selector: 'object[data-image-swap="slide3"]',
        en: 'images/vorta_slide_3.svg',
        bs: 'images/vorta_slide_3_bs.svg'
      }
    ];

    // Process each image
    images.forEach(img => {
      const elements = document.querySelectorAll(img.selector);
      if (elements && elements.length > 0) {
        elements.forEach(el => {
          // Update the data attribute to point to the language-specific image
          el.setAttribute('data', language === 'bs' ? img.bs : img.en);
        });
      }
    });
  }

  // Swap images for the current language
  swapImages(lang);

  const translations = {
    'en': {
      // Header
      'schedule_meeting': 'Schedule a Meeting',
      'the_fastest_way': 'the fastest way to digitize your company',

      // Enter Vorta section
      'enter_vorta': 'Enter Vorta',
      'vorta_description': 'Vorta is a cloud software service aimed towards small to medium B2B companies, looking to get help with organization, quality of service, and to digitize their supply chain processes. We help you manage your supply chain and reverse logistic with a very straightforward and easy to understand solution, removing tiresome tasks from your company and thus, helping your organization manage logistical challenges, with ease.',
      'innovation_simplicity': 'Innovation and simplicity are our main strengths. We assess your organization and provide consultancy services to bring you a simple & innovative solution that can be fully implemented in under two months. All of this is done with complete transparency and customer inclusion.',

      // Three steps section
      'three_steps': 'Three steps to Vorta',
      'we_start_vision': 'We start with the vision',
      'managing_expectations': 'Managing expectations is something we take very seriously at Vorta. We work hard to give you a vision of the end goal, right from the start.',
      'before_commitment': 'Before you make any kind of commitment you will be given a chance to try out your solution first! See your products move through the supply chain from the moment of order to the moment of delivery to the customer. We offer all of this, risk-free.',
      'vorta_not_silver': 'Please keep in mind that Vorta is not a silver bullet, and although it will match a lot of business processes, it may not fit your organization.',
      'upfront_honest': 'If this is the case, we will be upfront and honest about it.',

      // Onboarding section
      'onboarding_easy': 'Onboarding made easy',
      'keep_things_simple': 'We here at Vorta have always made our primary goal to keep things simple. Our software is easy to use and maintain, and thus, two months is the maximum duration of our onboarding process.',
      'together_onboard': 'Together with you we onboard your data and provide remote training courses for you and your whole team.',
      'we_ask_for': 'We ask for',
      'data': 'Data',
      'data_description': 'We need data describing your products, product dimensions, spare parts, customers, prices, transports, etc.',
      'team_commitment': 'Team commitment',
      'team_description': "We will organize the onboarding process with you. The team's training and onboarding duties are necessary for our success",
      'we_give_back': 'We give back',
      'consultancy': 'Consultancy',
      'consultancy_description': 'We take a look at your current business and evaluate our potential impact, advising the best ways to improve your organization.',
      'training': 'Training',
      'training_description': 'We provide training and references for your team to get set up, as fast as possible. We work hard to share our methodologies with your team.',
      'clear_set_goals': 'From the start, you will be provided with a clear set of goals that we will meet in each stage of our collaboration. Allowing us all to transparently measure our progress, aimed toward fast implementation.',

      // Ready section
      'ready_what_now': 'Ready! So, what now?',
      'operational_solution': 'By now you have a completely operational solution, saving your organization time and money, with a much-simplified workflow.',
      'best_of_all': 'Best of all is that the smooth operation of your supply chain workflow is now our responsibility, freeing up your time to do what you truly love doing. We will continue to improve our solution and provide continuous consultancy services in the future.',
      'continuous_updates': 'Continuous updates',
      'updates_description': 'We are passionate about our product and we will continue to make it better and better, with regular updates and new features.',
      'support': 'Support',
      'support_description': 'Avoid surprises by having a dedicated team on your side. We offer a wide range of support options to suit your operational needs.',
      'services': 'Services',
      'services_description': 'We have an exciting roadmap ahead of us, we plan to bring new innovations to our product and make your future problems our own.',

      // Let's talk section
      'lets_talk': 'Let\'s talk',
      'flexible_pricing': 'Vorta is offering flexible pricing models, tailored to meet the requirements of each client. Our priority is ensuring our software serves you effectively, and we are committed to customizing our pricing to fit your specific needs.',
      'schedule_meeting_now': 'Schedule a Meeting Now',
      'contact_directly': 'or contact us directly at',

      // Clients section
      'our_clients': 'Our Clients',
      'clients_description': "Vorta has played a pivotal role in our clients' growth journeys, with each client having been with us for over two years, showcasing our enduring partnerships and the sustained value we bring.",

      // Footer
      'learn_more': 'LEARN MORE',
      'about_us': 'About Us',
      'contact': 'Contact',
      'company_info': 'Vorta is the product name and property of Vorta doo. with Registered Office and Business address at Envera Sehovica 34, Sarajevo, Bosnia and Herzegovina',

      // About page
      'we_the_vorta': 'We the Vorta',
      'about_p1': 'Vorta was founded back in 2016. We started as a small startup with four people, and we are continually growing as an efficient team that is combining expertise in supply chain management and software building. Our goal is to introduce simplicity through innovation in everything that we do. We feel privileged to be given an opportunity to bring something new to the stale and dull world of business applications, that rarely focus on building a great product.',
      'about_p2': 'We are big believers of keeping things simple. We found that every move we made towards simplicity has always paid off. These payoffs may not be evident at first, but in time, we realized that simpler things reduce number of errors and push innovation forward. Innovation is the real strength of Vorta, as we offer solutions that are unique and save a lot of time. In years to come, we plan to continue making big bets on simplicity, clarity, and honesty. This stands for our products and our company.',
      'about_p3': "Treating people right is fundamental to how we do business. We treat our customers as we'd want to be treated - with honesty and clarity in all of our interactions. If we cannot solve your problems, we will be straightforward and upfront about it. You will never meet our sales team only, you will meet consultants and engineers that built Vorta. We will analyze your business, provide consultancy services and solutions, only if and when, there is additional value to be added. We want customers that are happy with our product and without a shadow of a doubt know the value that Vorta brings to them. We know we have a great product and we want it to have a positive impact on the industry and the world around us. In return, we will continue making it better and better.",
      'about_p4': "If you're just browsing, enjoy your stay. If you'd like to become a customer, we'd love to meet you. Either way, thanks for visiting Vorta, and have a great day!"
    },
    'bs': {
      // Header
      'schedule_meeting': 'Zakažite sastanak',
      'the_fastest_way': 'najbrži način za digitalizaciju Vaše kompanije',

      // Enter Vorta section
      'enter_vorta': 'Upoznajte Vortu',
      'vorta_description': 'Vorta je usluga cloud softvera namijenjena malim i srednjim B2B kompanijama, koje traže pomoć s organizacijom, kvalitetom usluge i digitalizacijom procesa lanca snabdijevanja. Pomažemo Vam da upravljate svojim lancem snabdijevanja i povratnom logistikom putem jednostavnog i lako razumljivog rješenja, uklanjajući zamorne zadatke iz Vaše kompanije i tako pomažući Vašoj organizaciji da s lakoćom upravlja logističkim izazovima.',
      'innovation_simplicity': 'Inovacija i jednostavnost su naše glavne snage. Procjenjujemo Vašu organizaciju i pružamo konsultantske usluge kako bismo Vam donijeli jednostavno i inovativno rješenje koje se može u potpunosti implementirati za manje od dva mjeseca. Sve ovo se radi uz potpunu transparentnost i uključivanje klijenta.',

      // Three steps section
      'three_steps': 'Tri koraka do Vorte',
      'we_start_vision': 'Počinjemo s vizijom',
      'managing_expectations': 'Upravljanje očekivanjima je nešto što u Vorti shvatamo vrlo ozbiljno. Naporno radimo da Vam od samog početka damo viziju krajnjeg cilja.',
      'before_commitment': 'Prije nego što se odlučite na bilo kakvu obavezu, bit će Vam pružena prilika da prvo isprobate svoje rješenje! Pogledajte kako se Vaši proizvodi kreću kroz lanac snabdijevanja od trenutka narudžbe do trenutka isporuke kupcu. Sve ovo nudimo bez rizika.',
      'vorta_not_silver': 'Imajte na umu da Vorta nije čarobno rješenje, i iako će odgovarati mnogim poslovnim procesima, možda neće odgovarati Vašoj organizaciji.',
      'upfront_honest': 'Ako je to slučaj, bit ćemo iskreni i otvoreni o tome.',

      // Onboarding section
      'onboarding_easy': 'Jednostavno uvođenje',
      'keep_things_simple': 'Mi u Vorti smo uvijek imali glavni cilj održati stvari jednostavnim. Naš softver je lak za korištenje i održavanje, i stoga je dva mjeseca maksimalno trajanje našeg procesa uvođenja za velike kompanije. Implementacija za manje kompanije traje sedmicu do dvije.',
      'together_onboard': 'Zajedno s Vama unosimo Vaše podatke i pružamo daljinske obuke za Vas i cijeli Vaš tim.',
      'we_ask_for': 'Mi tražimo',
      'data': 'Podatke',
      'data_description': 'Trebamo podatke koji opisuju Vaše proizvode, dimenzije proizvoda, rezervne dijelove, kupce, cijene, transport, itd.',
      'team_commitment': 'Posvećenost tima',
      'team_description': 'Organizirat ćemo proces uvođenja s Vama. Obuka tima i zadaci uvođenja su neophodni za naš uspjeh.',
      'we_give_back': 'Mi Vam pružamo',
      'consultancy': 'Konsultacije',
      'consultancy_description': 'Razmatramo Vaše trenutno poslovanje i procjenjujemo naš potencijalni utjecaj, savjetujući najbolje načine za poboljšanje Vaše organizacije.',
      'training': 'Obuku',
      'training_description': 'Pružamo obuku i reference za vaš tim kako bi se što brže uspostavio. Naporno radimo da podijelimo naše metodologije s Vašim timom.',
      'clear_set_goals': 'Od samog početka, dobit ćete jasan skup ciljeva koje ćemo ispuniti u svakoj fazi naše saradnje. To nam svima omogućava transparentno mjerenje našeg napretka, usmjerenog ka brzoj implementaciji.',

      // Ready section
      'ready_what_now': 'Spremni! Šta sada?',
      'operational_solution': 'Sada imate potpuno operativno rješenje koje štedi vrijeme i novac Vašoj organizaciji, s mnogo pojednostavljenim radnim tokom.',
      'best_of_all': 'Najbolje od svega je što je nesmetano funkcionisanje Vašeg lanca snabdijevanja sada naša odgovornost, oslobađajući Vaše vrijeme da radite ono što zaista volite. Nastavit ćemo poboljšavati naše rješenje i pružati kontinuirane konsultantske usluge u budućnosti.',
      'continuous_updates': 'Kontinuirana ažuriranja',
      'updates_description': 'Strastveni smo prema našem proizvodu i nastavit ćemo ga činiti sve boljim i boljim, s redovnim ažuriranjima i novim funkcijama.',
      'support': 'Podrška',
      'support_description': 'Izbjegnite iznenađenja imajući posvećen tim na svojoj strani. Nudimo širok spektar opcija podrške koje odgovaraju Vašim operativnim potrebama.',
      'services': 'Usluge',
      'services_description': 'Pred nama je uzbudljiva mapa puta, planiramo donijeti nove inovacije našem proizvodu i učiniti Vaše buduće probleme našim.',

      // Let's talk section
      'lets_talk': 'Razgovarajmo',
      'flexible_pricing': 'Vorta nudi fleksibilne modele cijene, prilagođene da zadovolje zahtjeve svakog klijenta. Naš prioritet je osigurati da naš softver Vam efektivno služi, i posvećeni smo prilagođavanju naših cijena Vašim specifičnim potrebama.',
      'schedule_meeting_now': 'Zakažite sastanak odmah',
      'contact_directly': 'ili nas direktno kontaktirajte na',

      // Clients section
      'our_clients': 'Naši klijenti',
      'clients_description': 'Vorta je igrala ključnu ulogu u rastu naših klijenata, a svaki klijent je s nama više od dvije godine, što pokazuje naša trajna partnerstva i održivu vrijednost koju donosimo.',

      // Footer
      'learn_more': 'SAZNAJTE VIŠE',
      'about_us': 'O nama',
      'contact': 'Kontakt',
      'company_info': 'Vorta je naziv proizvoda i vlasništvo firme Vorta doo. sa registrovanim sjedištem i poslovnom adresom na Envera Šehovića 34, Sarajevo, Bosna i Hercegovina',

      // About page
      'we_the_vorta': 'O Nama',
      'about_p1': 'Vorta je osnovana 2016. godine. Počeli smo kao mali startup sa četiri osobe, i kontinuirano rastemo kao efikasan tim koji kombinuje stručnost u upravljanju lancem snabdjevanja i izgradnji softvera. Naš cilj je uvesti jednostavnost kroz inovacije u sve što radimo. Osjećamo se privilegiranima što nam je pružena prilika da donesemo nešto novo u ustajali i dosadni svijet poslovnih aplikacija, koje se rijetko fokusiraju na izgradnju sjajnog proizvoda.',
      'about_p2': 'Mi vjerujemo u jednostavnost. Otkrili smo da se svaki potez koji smo napravili prema jednostavnosti uvijek isplatio. Ove prednosti možda nisu odmah bile očigledne, ali s vremenom smo shvatili da jednostavnije stvari smanjuju broj grešaka i guraju inovacije naprijed. Inovacija je prava snaga Vorte, jer nudimo rješenja koja su jedinstvena i štede puno vremena. U godinama koje dolaze, planiramo nastaviti velike uloge na jednostavnost, jasnoću i iskrenost. Ovo vrijedi za naše proizvode i našu kompaniju.',
      'about_p3': 'Pravilno postupanje s ljudima je osnova našeg poslovanja. Tretiramo naše kupce onako kako bismo mi željeli biti tretirani - s iskrenošću i jasnoćom u svim našim interakcijama. Ako ne možemo riješiti Vaše probleme, bit ćemo izravni i iskreni o tome. Nikada nećete sresti samo naš prodajni tim, sresti ćete konsultante i inženjere koji su izgradili Vortu. Analizirat ćemo Vaše poslovanje, pružiti konsultantske usluge i rješenja, samo ako i kada postoji dodatna vrijednost koja se može dodati. Želimo kupce koji su zadovoljni našim proizvodom i bez ikakve sumnje znaju vrijednost koju im Vorta donosi. Znamo da imamo sjajan proizvod i želimo da ima pozitivan uticaj na industriju i svijet oko nas. Zauzvrat, nastavit ćemo ga činiti sve boljim i boljim.',
      'about_p4': 'Ako samo razgledate, uživajte. Ako želite postati kupac, voljeli bismo Vas upoznati. U svakom slučaju, hvala što ste posjetili Vortu i želimo Vam lijep dan!'
    }
  };

  const elements = document.querySelectorAll('[data-translate]');

  elements.forEach(el => {
    const key = el.getAttribute('data-translate');
    if (translations[lang] && translations[lang][key]) {
      if (el.tagName === 'INPUT' && (el.type === 'button' || el.type === 'submit')) {
        el.value = translations[lang][key];
      } else {
        el.innerHTML = translations[lang][key];
      }
    }
  });
}

document.addEventListener("click", function(element) {
  if (element.target.classList.contains('js-cookie-accepted')) {
    setCookie('vortaGdprAccepted', true, 30)
  }
});
