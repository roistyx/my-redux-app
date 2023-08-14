const handleHighlight = (phrases) => {
  const contents = document.getElementsByClassName("grid-container");

  let content;

  // You should loop through each of the "contents"
  for (let i = 0; i < contents.length; i++) {
    content = contents[i];

    // Clear previous highlights
    let newText = content.innerHTML.replace(
      /<span class="highlight">([^<]+)<\/span>/g,
      "$1"
    );

    // Iterate over each phrase and highlight its occurrences
    phrases.forEach((phrase) => {
      const re = new RegExp(`(${phrase})`, "gi");
      newText = newText.replace(re, '<span class="highlight">$1</span>');
      return (content.innerHTML = newText);
    });
  }
};

export default handleHighlight;
