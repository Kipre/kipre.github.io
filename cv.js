// @ts-check
import { contentFactory } from "./contents.js";

const params = new URLSearchParams(window.location.search);

const contents = contentFactory(params.get("flavor") || "software");

function periodRenderer({ from, to }) {
  const template = document.querySelector('#period');
  const clone = document.importNode(template.content, true);
  const [fromSpan, toSpan] = clone.children;
  fromSpan.innerText = from;
  toSpan.innerText = to;
  return clone;
}

const [mainTitle, subtitle] = document.querySelectorAll('.titles > *')
mainTitle.innerText = contents.aboutMe.name + " " + contents.aboutMe.lastname;
subtitle.innerText = contents.aboutMe.title;

const [address, mobile, mail, linksElement] = document.querySelectorAll('.coordinates > *')
address.innerText = contents.aboutMe.address;
mobile.innerText = contents.aboutMe.mobile;
mail.innerText = contents.aboutMe.email.replace('[at]', '@');

let links = ' ';
for (const [key, value] of Object.entries(contents.socialLinks)) {
  links += ` <a href='${value}'>${value}</a> |`;
}

linksElement.innerHTML = links.slice(0, links.length - 1);

generateSection("experience", contents.experience);
generateSection("education", contents.education);
generateSkillsSection(contents.skills);
generateSection("languages", contents.languages);
generateSection("interests", contents.interests);


function generateSkillsSection(skills) {
  const itemContainer = makeSection("skills");

  for (const level in skills) {
    const items = skills[level];
    const template = document.getElementById("skills");
    const line = document.createElement("div");
    line.classList.add("skills-list");
    itemContainer.appendChild(line);

    for (const skill of items) {
      const clone = document.importNode(template.content, true);
      const item = clone.firstElementChild;
      item.innerText = skill;
      line.appendChild(item);
    }
  }
  document.body.appendChild(itemContainer.parentElement);
}

function generateSection(section, content) {

  const itemContainer = makeSection(section);

  for (const cont of content) {
    if (cont.profile === "ignore")
      continue;
    const template = document.getElementById(section);
    const clone = document.importNode(template.content, true);
    const item = clone.firstElementChild;
    item.dataset.type = cont.type;

    for (const element of item.childNodes) {
      const key = element.className;
      if (key === 'period') {
        element.appendChild(periodRenderer(cont[key]));
      } else {
        element.innerHTML = cont[key];
      }
    }
    itemContainer.appendChild(item);
  }
  document.body.appendChild(itemContainer.parentElement);

}

function makeSection(name) {
  const template = document.querySelector('#section');
  const clone = document.importNode(template.content, true);
  const container = clone.firstElementChild;
  const title = container.firstElementChild;
  container.classList.add("section");
  container.classList.add(name);
  title.innerText = name[0].toUpperCase() + name.slice(1);
  const itemContainer = document.createElement("div");
  container.appendChild(itemContainer)
  return itemContainer;
}
