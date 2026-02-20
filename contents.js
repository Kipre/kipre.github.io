// @ts-check

/**
 * @typedef {"data" | "ai" | "software" } Flavor
 */

export const contentFactory = (
  /** @type {Flavor} */ flavor,
  language = "en",
) => ({
  title: "Cyprien Neverov",
  aboutMe: {
    name: "Cyprien",
    lastname: "Neverov",
    address:
      language === "en"
        ? "Montpellier Area, France"
        : language === "cat"
          ? "Perpinyà, Catalunya Nord"
          : "Région de Montpellier",
    title: title(flavor, language),
    mobile: "+33 6 44 72 07 41",
    email: "cyprien[at]kipr.cat",
    description:
      "I recently graduated from IMT Mines Ales as an Artificial Intelligence Engineer. I'm passionate about working with data and developing tools that are linked to machine learning. I also enjoy designing data-driven visualizations and user experiences on the web.",
  },
  education: [
    {
      period: {
        from: "2017",
        to: "2020",
      },
      title: educationTitle(flavor, language),
      institution: "Ecole des Mines",
      city: language === "cat" ? "Alès, França" : "Alès, France",
      description:
        language === "en"
          ? "Master's Degree in Engineering, specialized in Computer Science with a focus on Artificial Intelligence."
          : language === "cat"
            ? "Grau en Enginyeria amb especialització en informàtica i Intel·ligència Artificial"
            : "Diplôme d'Ingenieur généraliste avec une spécialisation en informatique et intelligence artificielle",
    },
    {
      period: {
        from: "2015",
        to: "2017",
      },
      title: "CPGE (MPSI/MP)",
      institution: "Lycée La Merci",
      city: language === "cat" ? "Montpellier, França" : "Montpellier, France",
      description:
        language === "en"
          ? "Two-year undergraduate intensive course in mathematics and physics."
          : language === "cat"
            ? "Dos anys de preparació intensiva per a l’accés a escoles d’enginyeria a França"
            : "Classes préparatoires aux grandes écoles avec spécialisation en mathématiques.",
    },
  ],
  experience: [
    {
      period: {
        from: "06/2024",
        to: language === "en" ? "now" : language === "cat" ? "present" : "présent",
      },
      title:
        language === "en"
          ? "Gap year"
          : language === "cat"
            ? "Període sabàtic"
            : "Période de césure",
      city:
        language === "en"
          ? "Around the world"
          : language === "cat"
            ? "A través del món"
            : "France",
      type: "gap",
      description:
        language === "en"
          ? `Took a little more than a year off to travel, reconnect with friends and family and work on many personal projects.
The projects relevant in this context are:
<ul>
  <li>Built a fully custom parametric web-based 3D modeling pipeline that generates the architectural drawings of my future house (depends only on OpenIFC and Blender)</li>
  <li>Ported OpenCascade to the Zig build system and developed a simple JS-based, scripted CAD program for personal use (OCCT is the only dependency)</li>
  <li>Built a CNC machine</li>
</ul>
`
          : language === "cat"
            ? `Un any i mig de període sabàtic dedicat a viatjar i desenvolupar projectes personals.
Entre els projectes relacionats amb la meva professió destaquen:
<ul>
  <li>Desenvolupar un paquet de programari que generi tots els plànols arquitectònics (2D i 3D) per a la meva futura casa (basat únicament en OpenIFC i Blender)</li>
  <li>Adaptar OpenCascade per utilitzar el sistema de compilació Zig per desenvolupar programari CAD amb scripts per als meus dissenys</li>
  <li>Dissenyar i construir una màquina CNC</li>
</ul>`
            : `Presque deux ans de césure pour voyager et travailler sur des projets personnels.
Les projets personnels pertinents par rapport à mon métier incluent:
<ul>
  <li>Construction d'une suite logicielle qui génère tous les plans architecturaux (2D et 3D) de ma future maison (ne dépend que d'OpenIFC et Blender)</li>
  <li>Adaptation de OpenCascade pour utiliser le build system de Zig afin de développer un logiciel de CAO scriptée pour mes conceptions</li>
  <li>Conception et construction d'une machine CNC</li>
</ul>
`,
    },
    {
      period: {
        from: "03/2021",
        to: "06/2024",
      },
      title: d3sTitle(flavor, language),
      company: "D3S",
      city: "Grenoble, France",
      type: "job",
      description: d3sDescription(flavor, language),
    },
    {
      profile: "ignore",
      period: {
        from: "03/2020",
        to: "07/2020",
      },
      title: "Final Year Internship",
      company: "Friedrich-Alexander-Universitat, Chair of Applied Analysis",
      city: "Erlangen, Germany",
      type: "internship",
      description:
        "Worked on data-driven modeling and system-identification out of data. Implemented state-of-the-art system identification models in Python. Deployed a POC service to identify dynamics from data with Flask.",
    },
    {
      profile: "ignore",
      period: {
        from: "05/2019",
        to: "08/2019",
      },
      title: "Research Internship",
      company: "ISCLab, Universidad de Chile",
      city: "Santiago, Chile",
      type: "internship",
      description:
        "Worked on generating obfuscation and minification rules using machine learning. Investigated methodologies for estimating the likelyhood of parts of code to be vulnerable to obfuscation. Wrote an article (see publications).",
    },
    {
      profile: "ignore",
      period: {
        from: "11/2018",
        to: "12/2018",
      },
      title: "Field Mission",
      company: "Les Herbiers",
      city: "Perpignan, France",
      type: "mission",
      description:
        "Audited the company for the security of the employees. Updated the internal company welcome booklet.",
    },
    {
      profile: "ignore",
      period: {
        from: "05/2018",
        to: "06/2018",
      },
      title: "Field Mission",
      company: "SMERGC - Grotte Chauvet",
      city: "Privas, France",
      type: "mission",
      description:
        "Studied the market for the creation of a specialized hotel for academics.",
    },
  ],
  languages: [
    {
      language: language === "en" ? "English" : language === "cat" ? "Anglès" : "Anglais",
      level: languageLevel(language, "fluent"),
    },
    ...(language !== "fr" ? [{
      language: language === "cat" ? "Francès" : "French", level: languageLevel(language, "native"),
    }] : []),
    {
      language: language === "en" ? "Russian" : language === "cat" ? "Rus" : "Russe",
      level: languageLevel(language, "fluent"),
    },
    {
      language: language === "en" ? "Spanish" : language === "cat" ? "Castellà" : "Espagnol",
      level: languageLevel(language, "spoken"),
    },
    {
      language: language === "cat" ? "Català" : "Catalan",
      level: languageLevel(language, "spoken"),
    },
  ],
  skills: {
    primary: ["Python", "JavaScript/TypeScript", "HTML/CSS", "React", "Docker"],
    secondary: ["Zig", "C/C++", "SQL", "MongoDB", "CI/CD", "Git"],
  },
  interests: [
    {
      description: language !== "fr" ? "Skateboarding" : "Skate",
    },
    {
      description:
        language === "en"
          ? "Cycling"
          : language === "cat"
            ? "Ciclisme"
            : "Cyclisme",
    },
    {
      description:
        language === "en"
          ? "Woodworking"
          : language === "cat"
            ? "Fusteria"
            : "Menuiserie",
    },
    {
      description: "Design",
    },
    {
      description:
        language === "en"
          ? "Electronics"
          : language === "cat"
            ? "Electrònica"
            : "Électronique",
    },
    {
      description:
        language === "en"
          ? "Cars"
          : language === "cat"
            ? "Mecànica"
            : "Mécanique",
    },
  ],
  blogposts: [
    {
      link: "https://kipre.github.io/projects/neural-highlighting/",
      title: "Neural Highlighting",
      date: "01/19/2021",
      description:
        "Implementing a syntax highlighting system only using neural networks.",
    },
    {
      link: "https://kipre.github.io/projects/binary-mnist/",
      title: "Binary MNIST",
      date: "09/18/2020",
      description:
        "Simplest ML problem solved with TFJS, a home-made dataset and visualized with D3.",
    },
    {
      link: "https://kipre.github.io/files/internship/reports/covid_time/",
      title: "SINDy: autonomous systems and explicit time-dependency",
      date: "07/15/2020",
      description:
        "Visualizing the differences between the identification of autonomous and time-dependent dynamics in COVID trajectories.",
    },
    {
      link: "https://kipre.github.io/files/internship/reports/non-linear/nonlinear.html",
      title: "SINDy: non-polynomial candidate functions",
      date: "07/03/2020",
      description:
        "Plotting the difference in fitting data with the SINDy algorithm with rational basis functions.",
    },
    {
      link: "https://kipre.github.io/files/internship/reports/data-driven-covid-modeling/data-driven-covid-modeling.html",
      title: "SINDy: data-driven COVID modeling",
      date: "06/11/2020",
      description:
        "Using system-identification algorithms to explore the dynamics in COVID-related data.",
    },
  ],
  publications: [
    {
      conference: "MOBILESoft 2020 Visions",
      link: "https://conf.researchr.org/details/mobilesoft-2020/mobilesoft-2020-vision/3/Vision-Alleviating-Android-Developer-Burden-on-Obfuscation",
      title: "Vision : Alleviating Android Developer Burden on Obfuscation.",
      description:
        "A study of the obfuscation/minification usage in the open-source Android developement apps. A crowd-sourcing technique based on ML is proposed to help developers write more effective obfuscation and minification rules.",
    },
    {
      conference: "LFA 2019",
      link: "https://hal.archives-ouvertes.fr/hal-02294372/",
      title:
        "Modélisation incertaine à partir de mesures non-reproductibles. Application à la comparaison de pression exercée par des matelas.",
      description:
        "Uncertain modeling of low-quality data from non-reproducible experiments. The goal is to allow uncertain hypothesis testing for unreliable data. The proposed techniques are applied to real-world clinical data of a comparison of two mattresses.",
    },
    {
      profile: "ignore",
      conference: "Final Year Internship, 2020",
      link: "https://github.com/Kipre/files/blob/master/internship/reports/memoire/rapport.pdf",
      title: "Data-driven COVID modeling.",
      description:
        "Report about my final internship at the chair of Applied Analysis at the Friedrich Alexander University in Erlangen under the supervision of Prof. Enrique Zuazua. We used system identification techniques in order to study the dynamics of COVID-related data.",
    },
  ],
  socialLinks: {
    LinkedIn: "linkedin.com/in/cyprien-n/",
    GitHub: "github.com/Kipre",
  },
  socialLinks1: {
    Instagram: "www.instagram.com/cyprienneverov/",
    Website: "https://kipre.github.io/",
  },
});

/**
 * @param {Flavor} flavor
 */
function title(flavor, language) {
  if (flavor === "data") return "Data Scientist";
  return language === "en"
    ? "Software Engineer"
    : language === "cat"
      ? "Enginyer de software"
      : "Ingénieur Logiciel";
}

/**
 * @param {Flavor} flavor
 */
function educationTitle(flavor, language) {
  if (flavor === "data") return "Data Scientist";
  if (flavor === "ai")
    return language === "en" ? "AI Engineer" : "Ingénieur IA";
  return language === "en"
    ? "Software Engineer"
    : language === "cat"
      ? "Grau en Enginyeria Informàtica"
      : "Diplôme d'Ingénieur";
}

/**
 * @param {Flavor} flavor
 */
function d3sTitle(flavor, language) {
  if (flavor === "software")
    return language === "en"
      ? "Full Stack Engineer"
      : language === "cat"
        ? "Enginyer full stack"
        : "Ingénieur Full Stack";
  return "Data Scientist";
}

/**
 * @param {Flavor} flavor
 */
function d3sDescription(flavor, language) {
  let title =
    flavor === "software"
      ? "full stack developer"
      : `"full stack data scientist"`;

  if (language === "en")
    return `Working as a ${title} at D3S, a small consulting company specializing in ML-enhanced large scale industrial manufacturing cost prediction.
My tasks included:
<ul>
  <li>Backend development in Python, implementing business requirements in a maintainable way</li>
  <li>Frontend development in JS & TS with React, delivering new features quickly while improving code quality</li>
  <li>Managing a team of 2-4 developers, for customer and internal projects</li>
  <li>Reviewing & merging contributions</li>
  <li>Taking software architecture decisions on assigned projects & assisting the tech lead</li>
  <li>CI/CD pipeline creation & maintenance</li>
  <li>GitLab instance & CI workers maintenance</li>
</ul>`;

  if (language === "cat")
    return `Enginyer de programari full stack a D3S, empresa de consultoria especialitzada en la predicció de costos de fabricació industrial mitjançant tècniques de ML.

Les meves tasques incloïen:
<ul>
  <li>Desenvolupament backend en Python, implementant els requisits de negoci de manera mantenible</li>
  <li>Desenvolupament frontend en JS i TS amb React, oferint noves funcions ràpidament i millorant la qualitat del codi</li>
  <li>Gestió d’un equip de 2 a 4 desenvolupadors, per a projectes de clients i interns</li>
  <li>Revisió i fusió de contribucions</li>
  <li>Presa de decisions arquitectòniques en els projectes assignats i donar suport al responsable tècnic</li>
  <li>Creació i manteniment de pipelines de CI/CD</li>
  <li>Manteniment d'instàncies de GitLab i runners de CI</li>
</ul>`;

  title =
    flavor === "software"
      ? "Développeur full stack"
      : `"Data scientist full stack"`;

  return `${title} chez D3S, une petite société de conseil spécialisée en prédiction de coûts de production à grande échelle pour les gros industriels français.
Mes tâches principales incluaient:
<ul>
  <li>Développement backend en Python, avec mise en production d'applications utilisées par des centaines d'utilisateurs</li>
  <li>Développement frontend avec TypeScript et React, intégration rapide de nouvelles fonctionnalités avec un accent sur la maintenabilité</li>
  <li>Gestion d'une équipe de 2-4 développeurs, sur des projets clients et internes</li>
  <li>Revue et intégration des contributions de l'équipe</li>
  <li>Veille technique et architecturale avec le CTO</li>
  <li>Developpement et maintenance des pipelines CI/CD</li>
  <li>Déploiement et maintenance de l'instance locale GitLab</li>
</ul>`;
}

function languageLevel(language, level) {
  if (language === "en") {
    switch (level) {
      case "native":
        return "Native";
      case "fluent":
        return "Fluent";
      case "spoken":
        return "C1";
    }
  }

  if (language === "cat") {
    switch (level) {
      case "native":
        return "nadiu";
      case "fluent":
        return "professional";
      case "spoken":
        return "conversacional";
    }
  }

  switch (level) {
    case "native":
      return "Natif";
    case "fluent":
      return "Courant";
    case "spoken":
      return "C1";
  }
}

export const labelFactory = (flavor, language) =>
  language === "en"
    ? {
      experience: "Experience",
      education: "Education",
      skills: "Skills",
      languages: "Languages",
      interests: "Interests",
    }
    : language === "cat"
      ? {
        experience: "Experiència professional",
        education: "Educació",
        skills: "Tecnologies",
        languages: "Idiomes",
        interests: "Interessos",
      }
      : {
        experience: "Expérience",
        education: "Études",
        skills: "Technologies",
        languages: "Langues",
        interests: "Intérêts",
      };
