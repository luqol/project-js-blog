'use strict';
function generateTitleLinks(){
  /* [done]remove contents of titleList */
  const titleList = document.querySelector('.titles');
  titleList.innerHTML = '';
  /* [done]for each article */
  const articleList = document.querySelectorAll('.post');
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
    document.querySelector('.titles a[href="#article-1"]').classList.add('active');
  }
  const titleClickHandler = function(event){
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
  };
  const links = document.querySelectorAll('.titles a');
  for (const link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
function generateTags(){
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
    /* [done] END LOOP: for each tag */
    }
    /* [done in loop]insert HTML of all the links into the tags wrapper */

  /* [done] END LOOP: for every article: */
  }
}
function tagClickHandler(event){
  /* [done]prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */

  /* make a new constant "tag" and extract tag from the "href" constant */

  /* find all tag links with class active */

  /* START LOOP: for each active tag link */

    /* remove class active */

  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */

  /* START LOOP: for each found tag link */

    /* add class active */

  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
}
function addClickListenersToTags(){
  /* find all links to tags */

  /* START LOOP: for each link */

    /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
}
{
  generateTitleLinks();
  generateTags();
  addClickListenersToTags();

}
