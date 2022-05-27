const createFilmDetailsCommentTemplate = (comments) => comments
  .map((oneInstanceComment) => {
    const {id, author, comment, date, emotion} = oneInstanceComment;
    return `<li class="film-details__comment" comment-id="${id}">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
          </span>
          <div>
            <p class="film-details__comment-text">${comment}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${author}</span>
              <span class="film-details__comment-day">${date}</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>`;
  }).join('');

export{createFilmDetailsCommentTemplate};
