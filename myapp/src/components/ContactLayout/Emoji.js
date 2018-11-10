// import { Popover } from 'antd';
import styles from './Emoji.less';
import { emojiList } from './EmojiConstants';

const emojis = emojiList["emoji"];
const emojiPath = '//base.worldfarm.com/assets/emoji/';


const Emoji = ({
  onTapEmoji,
}) => {

  const handleChange = (value) => {
    onTapEmoji && onTapEmoji(value);
  };

  const getEmojis = (data) => {
    return Object.keys(data).map(key =>
      <li key={key} className={styles["emoji-li"]} onClick={handleChange.bind(this, key)}>
        <img src={`${emojiPath}${data[key].file}`} alt={key} />
      </li>
    );
  };

  const renderList = getEmojis(emojis);

  return (
    <div className={styles["emoji-wrapper"]}>
      <ul>
        {renderList}
      </ul>
    </div>
  );
};

/**
* 通过正则替换掉文本消息中的emoji表情
* @param text：文本消息内容
*/
function buildEmoji (text) {
	var re = /\[([^\]\[]*)\]/g;
	var matches = text.match(re) || [];
	for (var j = 0, len = matches.length; j < len; ++j) {
		if(emojis[matches[j]]){
			text = text.replace(matches[j], `<img class="emoji" src=${emojiPath + emojis[matches[j]].file}  />`);
		}
  }
	return text;
}

export { Emoji, buildEmoji };