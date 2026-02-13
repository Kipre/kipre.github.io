// @ts-check

/**
  * @typedef {"data" | "ai" | "software" } Flavor 
*/

export const contentFactory = (/** @type {Flavor} */ flavor) => ({
  title: "Cyprien Neverov",
  aboutMe: {
    name: "Cyprien",
    lastname: "Neverov",
    address: "Montpellier Area, France",
    title: title(flavor),
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
      title: educationTitle(flavor),
      institution: "Ecole des Mines",
      city: "Alès, France",
      description:
        "Master's Degree in Engineering, specialized in Computer Science with a focus on Artificial Intelligence.",
    },
    {
      period: {
        from: "2015",
        to: "2017",
      },
      title: "CPGE (MPSI/MP)",
      institution: "Lycée La Merci",
      city: "Montpellier, France",
      description:
        "Two-year undergraduate intensive course in mathematics and physics.",
    },
  ],
  experience: [
    {
      period: {
        from: "06/2024",
        to: "now",
      },
      title: "Gap year",
      city: "Around the world",
      type: "gap",
      description:
        `Took a little more than a year off to travel, reconnect with friends and family and work on many personal projects.
The projects relevant in this context are:
<ul>
  <li>Built a fully custom parametric web-based 3D modeling pipeline that generates the architectural drawings of my future house (depends only on OpenIFC and Blender)</li>
  <li>Ported OpenCascade to the Zig build system and developed a simple JS-based, scripted CAD program for personal use (OCCT is the only dependency)</li>
  <li>Built a CNC machine</li>
</ul>
`,
    },
    {
      period: {
        from: "03/2021",
        to: "06/2024",
      },
      title: d3sTitle(flavor),
      company: "D3S",
      city: "Grenoble, France",
      type: "job",
      description: d3sDescription(flavor),
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
      language: "English",
      level: "Fluent",
    },
    {
      language: "French",
      level: "Native",
    },
    {
      language: "Russian",
      level: "Native",
    },
    {
      language: "Spanish",
      level: "C1",
    },
    {
      language: "Catalan",
      level: "C1",
    },
  ],
  skills: {
    primary: [
      "Python",
      "JavaScript/TypeScript",
      "HTML/CSS",
      "React",
      "Docker",
    ],
    secondary: [
      "Zig",
      "C/C++",
      "SQL",
      "MongoDB",
      "CI/CD",
      "Git",
    ],
  },
  interests: [
    {
      description: "Skateboarding",
    },
    {
      description: "Cycling",
    },
    {
      description: "Woodworking",
    },
    {
      description: "Design",
    },
    {
      description: "Electronics",
    },
    {
      description: "Cars",
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
function title(flavor) {
  if (flavor === "data")
    return "Data Scientist";
  return "Software Engineer";
}

/**
 * @param {Flavor} flavor
 */
function educationTitle(flavor) {
  if (flavor === "data")
    return "Data Scientist";
  if (flavor === "ai")
    return "AI Engineer";
  return "Software Engineer";
}

/**
 * @param {Flavor} flavor
 */
function d3sTitle(flavor) {
  if (flavor === "software")
    return "Full Stack Engineer";
  return "Data Scientist";
}

/**
 * @param {Flavor} flavor
 */
function d3sDescription(flavor) {
  const title = flavor === "software" ? "full stack developer" : `"full stack data scientist"`;


  return `Working as a ${title} at D3S, a small consulting company specializing in ML-enhanced large scale industrial manufacturing cost prediction.
My tasks included:
<ul>
  <li>Backend development in Python, implementing business requirements in a maintainable way</li>
  <li>Frontend development in JS & TS with React, delivering new features quickly while improving code quality</li>
  <li>Managing a team of 2-4 developers, for customer and internal projects</li>
  <li>Reviewing & merging contributions</li>
  <li>Taking software architecture decisions on assigned projects & assisting the tech lead</li>
  <li>CI/CD pipeline creation & maintenance</li>
  <li>Gitlab instance & CI workers maintenance</li>
</ul>`;
}
