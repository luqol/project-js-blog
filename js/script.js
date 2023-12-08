'use strict';
function generateTitleLinks(customSelector = ''){
  /* [done]remove contents of titleList */
  const titleList = document.querySelector('.titles');
  titleList.innerHTML = '';
  /* [done]for each article */
  const articleList = document.querySelectorAll('.post'+customSelector);

  for (const article of articleList){
    /* [done]get the article id */
    const articleId = article.getAttribute('id');
    /* [done]find the title elemet  and save the title from the title element*/
    const articleTitle = article.querySelector('.post-title').innerHTML;
    /* [done]create HTML of the link */
    const linkHTML = '<li><a href="#'+ articleId +'"><span>' + articleTitle + '</span></a></li>';
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
function generateTags(){
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = [];
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
      linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      /* add generated code to html variable */
      tagList.insertAdjacentHTML('beforeend', linkHTML);
      /* [NEW] check if this link is NOT already in allTags */
      if(allTags.indexOf(linkHTML) == -1){
        /* [NEW] add generated code to allTags array */
        allTags.push(linkHTML);
      }
    /* [done] END LOOP: for each tag */
    }
    /* [done in loop]insert HTML of all the links into the tags wrapper */

  /* [done] END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags.list');

  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = allTags.join(' ');
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
  const tagList = document.querySelectorAll('a[href="' + href + '"]')
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
  const links = document.querySelectorAll('.post-tags .list a');
  /* [done]START LOOP: for each link */
  for(const link of links){
    /* [done] add tagClickHandler as event listener for that link */
    link.addEventListener('click',tagClickHandler);
  /* [done] END LOOP: for each link */
  }
}
function generateAuthors(){
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
    linkHTML = '<a href="#author-' + dataAutor + '">by '+ dataAutor + '</a>';
    /* [done in loop]insert HTML of all the links into the authors wrapper */
    author.insertAdjacentHTML('beforeend', linkHTML);
  /* [done] END LOOP: for every article: */
  }
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
  const links = document.querySelectorAll('.post-author a');
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
