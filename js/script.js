'use strict';
{
    /* document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links)
}) */
    function generateTitleLinks(){
        console.log('generateTitleLinks');

        /* remove contents of titleList */
        const titleList = document.querySelector('.titles');
        titleList.innerHTML = '';

        /* for each article */
            const articleList = document.querySelectorAll('.post');
            for (const article of articleList){
                /* get the article id */
                const articleId = article.getAttribute('id');
                /* find the title elemet  and save the title from the title element*/
                const articleTitle = article.querySelector('.post-title').innerHTML;
                /* create HTML of the link */
                const linkHTML = '<li><a href="#'+ articleId +'"><span>' + articleTitle + '</span></a></li>';
                /* insert link into titleList */
                titleList.insertAdjacentHTML( 'beforeend', linkHTML);
            }
        const links = document.querySelectorAll('.titles a');
        for (const link of links){
             link.addEventListener('click', titleClickHandler);
             }    
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
    }

    

    generateTitleLinks();

}

