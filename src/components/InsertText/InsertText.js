import React from 'react';
import './InsertText.css';
import Typography from '../Typography';

function InsertText({ article, phrases }) {
  const emphasizeTerms = (text, phrases) => {
    let modifiedText = text;

    phrases.forEach(([phrase, boldness]) => {
      const regex = new RegExp(`(${phrase})`, 'gi');
      modifiedText = modifiedText.replace(
        regex,
        `<span class="boldness-${boldness}">$1</span>`
      );
    });

    return modifiedText;
  };

  const formatText = text => {
    return text.replace(/\n/g, '<br />');
  };

  const emphasizedArticle = emphasizeTerms(article, phrases);
  const formattedArticle = formatText(emphasizedArticle);

  return (
    // <div
    //   className="article-container"
    //   dangerouslySetInnerHTML={{ __html: '<strong>Test Bold Text</strong>' }}
    //   />

    <Typography>
      <div
        className="article-container"
        dangerouslySetInnerHTML={{
          __html: formattedArticle
        }}
      />
    </Typography>
  );
}

export default InsertText;
