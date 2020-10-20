function createAndAppendCard(link, doc) {

    const result = doc.createElement('div');
    result.classList.add('card');
    if (link) {
        result.classList.add('clickable');
        result.setAttribute('onclick', `location.href='${link}';`);
    }
    return result;
}

function publication(contents, doc) {

    const result = createAndAppendCard(contents.link, doc);

    const titles = doc.createElement('div');
    titles.classList.add('titles');

    const mainTitle = doc.createElement('h3');
    mainTitle.innerText = contents.title;

    const conference = doc.createElement('h4');
    conference.innerText = contents.conference;

    const description = doc.createElement('p');
    description.innerText = contents.description;

    titles.appendChild(mainTitle);
    titles.appendChild(conference);
    result.appendChild(titles);
    result.appendChild(description);

    return result;
}

function aboutMe(content, doc) {
    const result = createAndAppendCard(content.link, doc);

    const description = doc.createElement('p');
    description.innerText = content.description;

    result.appendChild(description);

    return result;
}

function blogpost(contents, doc) {

    const result = createAndAppendCard(contents.link, doc);

    const titles = doc.createElement('div');
    titles.classList.add('titles');

    const mainTitle = doc.createElement('h3');
    mainTitle.innerText = contents.title;

    const date = doc.createElement('h5');
    date.innerText = contents.date;

    const description = doc.createElement('p');
    description.innerText = contents.description;

    titles.appendChild(mainTitle);
    titles.appendChild(date);
    result.appendChild(titles);
    result.appendChild(description);

    return result;
}

function addStylesheet(reference, doc) {

    const link = doc.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = reference;

    doc.head.appendChild(link);
}

function makeFooter(contents, doc) {
    const footer = doc.createElement('footer');

    let links = ' ';

    for (const [key,value] of Object.entries(contents.socialLinks)) {
        links += ` <a href='${value}'>${key}</a> |`;
    }

    footer.innerHTML = contents.title + links.slice(0, links.length - 1);

    doc.body.appendChild(doc.createElement('hr'));
    doc.body.appendChild(footer);
}

function main(contents) {
    // Create html new document
    const doc = document.implementation.createHTMLDocument(contents.title);

    // Create and bind stylesheet link
    addStylesheet('style.css', doc);
    addStylesheet('https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/light.min.css', doc);

    // Create main header
    const mainHeader = doc.createElement('h1')
    mainHeader.innerText = contents.title
    doc.body.appendChild(mainHeader);

    // Create horizontal line
    doc.body.appendChild(doc.createElement('hr'));

    // Create "About Me" section
    const aboutMeHeader = doc.createElement('h2')
    aboutMeHeader.innerText = 'About me'
    doc.body.appendChild(aboutMeHeader);
    doc.body.appendChild(aboutMe(contents.aboutMe, doc))

    // Create horizontal line
    doc.body.appendChild(doc.createElement('hr'));

    // Create blogposts section
    const blogpostsHeader = doc.createElement('h2')
    blogpostsHeader.innerText = 'Blogposts'
    doc.body.appendChild(blogpostsHeader);

    // Add blogposts
    for (blogpostContents of contents.blogposts) {
        doc.body.appendChild(blogpost(blogpostContents, doc));
    }

    // Create horizontal line
    doc.body.appendChild(doc.createElement('hr'));

    // Create publications section
    const publicationsHeader = doc.createElement('h2')
    publicationsHeader.innerText = 'Publications'
    doc.body.appendChild(publicationsHeader);

    // Add publications
    for (publicationContents of contents.publications) {
        doc.body.appendChild(publication(publicationContents, doc));
    }

    // Make footer
    makeFooter(contents, doc);

    console.log(doc.documentElement.outerHTML);

    document.write(doc.documentElement.outerHTML);

}

fetch("contents.json").then(res=>res.json()).then(json=>main(json));
