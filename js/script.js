'use strict';
const opts = {
  tagSizes:{
    count: 5,
    classPrefix: 'tag-size-',
  },
};
const select = {
  all: {
    articles: '.post',
    linksTo: {
      tags: 'a[href^="#tag-"]',
      authors: 'a[href^="#author-"]',
    },
  },
  article: {
    tags: '.post-tags .list',
    author: '.post-author',
  },
  listOf: {
    titles: '.titles',
    tags: '.tags.list',
    authors: '.authors.list',
  },
};
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tagCloudLink').innerHTML),
  authorSidebar: Handlebars.compile(document.querySelector('#template-authorSidebar').innerHTML)
};
function generateTitleLinks(customSelector = ''){
  /* [done]remove contents of titleList */
  const titleList = document.querySelector(select.listOf.titles);
  titleList.innerHTML = '';
  /* [done]for each article */
  const articleList = document.querySelectorAll('.post'+customSelector);

  for (const article of articleList){
    /* [done]get the article id */
    const articleId = article.getAttribute('id');
    /* [done]find the title elemet  and save the title from the title element*/
    const articleTitle = article.querySelector('.post-title').innerHTML;
    /* [done]create HTML of the link */
    //const linkHTML = '<li><a href="#'+ articleId +'"><span>' + articleTitle + '</span></a></li>';
    /*[template] */
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    /* [done]insert link into titleList */
    titleList.insertAdjacentHTML( 'beforeend', linkHTML);
    /* [inprogress]add class .active to active article */
    // document.querySelector('.titles a[href="#article-1"]').classList.add('active');
  }
  const links = document.querySelectorAll('.titles a');
  for (const link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
function titleClickHandler (event){
  event.preventDefault();
  const clickedElement = this;

  console.log('Link was clicked');
  //console.log(event);

  /* [Done]remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(const activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* [Done] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* [Done] remove class 'active' from all articles */
  const activeArtiles = document.querySelectorAll('.posts .post');

  for(const activeArticle of activeArtiles){
    activeArticle.classList.remove('active');
  }
  /* [Done] get 'href' attribute from the clicked link */
  const id = clickedElement.getAttribute('href');
  /* [Done] find the correct article using the selector (value of 'href' attribute) */
  const activeArticle = document.querySelector(id);
  /* [Done] add class 'active' to the correct article */
  activeArticle.classList.add('active');
}
function calculateTagsParams(tags){
  let params = {
    max: '',
    min: ''
  };
  for(const tag in tags){
    params.max = Math.max(params.max, tags[tag]);
    if(params.min == ''){
      params.min = tags[tag];
    }
    params.min = Math.min(params.min, tags[tag]);
  }
  return params;
}
function calculateTagClass(count, params){

  const classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * (opts.tagSizes.count-1) + 1 );

  return opts.tagSizes.classPrefix+classNumber ;
}
function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /*[done] find all articles */
  const articleList = document.querySelectorAll('.post');
  /* [done] START LOOP: for every article: */
  for( const article of articleList){
    /* [done]find tags wrapper */
    const tagList = article.querySelector('.post-tags .list');
    /* [done] make html variable with empty string  */
    let linkHTML ='';
    /* [done] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* [done] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* [done] START LOOP: for each tag */
    for( const tag of articleTagsArray){
      /* [done] generate HTML of the link */
      //linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      /*[template] */
      const linkHTMLData = {id: tag, title: tag};
      linkHTML = templates.tagLink(linkHTMLData);
      /* add generated code to html variable */
      tagList.insertAdjacentHTML('beforeend', linkHTML);
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    /* [done] END LOOP: for each tag */
    }
    /* [done in loop]insert HTML of all the links into the tags wrapper */

  /* [done] END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags.list');

  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  //let allTagsHTML = '';
  /*New object for data */
  let allTagsData = {tags: []};

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    //allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '"> ' + tag+ ' </a></li>';
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  //tagList.innerHTML = allTagsHTML;
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}
function tagClickHandler(event){
  /* [done]prevent default action for this event */
  event.preventDefault();
  /* [done] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* [done] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* [done] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-','');
  /* [done] find all tag links with class active */
  const links = document.querySelectorAll('a.active[href^="#tag-"]');
  /* [done] START LOOP: for each active tag link */
  for(const link of links){
    /* [done] remove class active */
    link.classList.remove('active');
  /* [done] END LOOP: for each active tag link */
  }
  /* [done] find all tag links with "href" attribute equal to the "href" constant */
  const tagList = document.querySelectorAll('a[href="' + href + '"]');
  /* [done] START LOOP: for each found tag link */
  for(const link of tagList){
    /* [done] add class active */
    link.classList.add('active');
  /* [done]END LOOP: for each found tag link */
  }
  /* [done] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}
function addClickListenersToTags(){
  /* [done]find all links to tags */
  const links = document.querySelectorAll('.list '+ select.all.linksTo.tags);
  /* [done]START LOOP: for each link */
  for(const link of links){
    /* [done] add tagClickHandler as event listener for that link */
    link.addEventListener('click',tagClickHandler);
  /* [done] END LOOP: for each link */
  }
}
function generateAuthors(){
  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors ={};
  /*[done] find all articles */
  const articleList = document.querySelectorAll('.post');
  /* [done] START LOOP: for every article: */
  for(const article of articleList){
    /* [done]find author wrapper */
    const author = article.querySelector('.post .post-author');
    /* [done] make html variable with empty string  */
    let linkHTML = '';
    /* [done] get authors from data-author attribute */
    const dataAutor = article.getAttribute('data-author');
    /* [done] generate HTML of the link */
    //linkHTML = '<a href="#author-' + dataAutor + '">by '+ dataAutor + '</a>';
    const linkHTMLData = {id: dataAutor, title: dataAutor};
    linkHTML = templates.authorLink(linkHTMLData);
    /* [done in loop]insert HTML of all the links into the authors wrapper */
    author.insertAdjacentHTML('beforeend', linkHTML);
    /* [NEW] check if this link is NOT already in allAuthors */
    if(!allAuthors[dataAutor]) {
      /* [NEW] add tag to allAuthors object */
      allAuthors[dataAutor] = 1;
    } else {
      allAuthors[dataAutor]++;
    }
    /* [done] END LOOP: for every article: */
  }
  /* [NEW] find list of authors in right column */
  const authorsList = document.querySelector('.authors.list');

  /* [NEW] create variable for all links HTML code */
  //let allAuthorsHTML = '';
  let allAuthrsData = {authors:[] };

  /* [NEW] START LOOP: for each authors in allAuthors: */
  for(let author in allAuthors){
    /* [NEW] generate code of a link and add it to allAuthorsHTML */
    //allAuthorsHTML += '<li><a href="#author-' + author + '"> ' + author + '</a><span> ('+ allAuthors[author] +')</span></li> ';
    allAuthrsData.authors.push({
      cAuthor: author,
      number: allAuthors[author]
    });
  }
  /* [NEW] END LOOP: for each tag in allAuthors: */

  /*[NEW] add HTML from allTagsHTML to authorsList */
  //authorsList.innerHTML = allAuthorsHTML;
  authorsList.innerHTML = templates.authorSidebar(allAuthrsData);

}
function authorClickHandler(event){
  /* [done]prevent default action for this event */
  event.preventDefault();
  /* [done] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* [done] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* [done] make a new constant "author" and extract tag from the "href" constant */
  const author = href.replace('#author-','');
  /* [done] find all author links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"');
  /* [done] START LOOP: for each active author link */
  for(const activeAuthor of activeAuthors){
    /* [done] remove class active */
    activeAuthor.classList.remove('active');
  /* [done] END LOOP: for each active author link */
  }
  /* [done] find all authors links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* [done] START LOOP: for each found author link */
  for(const link of authorLinks){
    /* [done] add class active */
    link.classList.add('active');
  /* [done]END LOOP: for each found tag link */
  }
  /* [done] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}
function addClickListenerstoAuthors(){
  /* [done]find all links to authors */
  const links = document.querySelectorAll(select.all.linksTo.authors);
  /* [done]START LOOP: for each link */
  for(const link of links){
    /* [done] add tagClickHandler as event listener for that link */
    link.addEventListener('click',authorClickHandler);
  /* [done] END LOOP: for each link */
  }
}

{
  generateTitleLinks();
  generateTags();
  addClickListenersToTags();
  generateAuthors();
  addClickListenerstoAuthors();

}
