import {randomData} from '../fish/util.js';
import {ID, AUTHOR, COMMENT, WATCHING_DATE} from '../fish/data.js';

const localComment = {
  comment: 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
  emotion: 'smile'
};

const EMOTION = ['smile', 'sleeping', 'puke', 'angry'];

const getComment = () => ({
  id: randomData(ID),
  author: randomData(AUTHOR),
  comment: randomData(COMMENT),
  date: randomData(WATCHING_DATE),
  emotion: randomData(EMOTION)
});

export {localComment, EMOTION, getComment};
