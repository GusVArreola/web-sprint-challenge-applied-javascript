
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

  import axios from "axios";

  const Card = (article) => {
    const cardDiv = document.createElement("div");
    const headline = document.createElement("div");
    const author = document.createElement("div");
    const image = document.createElement("div");
    const authorPhoto = document.createElement("img");
    const authorName = document.createElement("span");
  
    cardDiv.className = "card";
    headline.className = "headline";
    author.className = "author";
    image.className = "img-container";
  
    headline.textContent = article.headline;
    authorName.textContent = article.authorName;
    authorPhoto.src = `${article.authorPhoto}`;
  
    cardDiv.appendChild(headline);
    cardDiv.appendChild(author);
    author.appendChild(image);
    image.appendChild(authorPhoto);
    author.appendChild(authorName);
  
    cardDiv.addEventListener("click", () => {
      console.log(headline);
  });
  
    return cardDiv;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5001/api/articles` (test it with console.log!!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  const cardsContainer = document.querySelector(selector);
  axios
    .get("http://localhost:5001/api/articles")
    .then((res) => {
      const {
        javascript,
        bootstrap,
        technology,
        jquery,
        node,
      } = res.data.articles;
      const articlesArray = [
        ...javascript,
        ...bootstrap,
        ...technology,
        ...jquery,
        ...node,
      ];

      console.log(articlesArray);
      articlesArray.forEach((article) => {
        cardsContainer.append(Card(article));
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
cardAppender();

export { Card, cardAppender }
