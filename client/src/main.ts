console.log('hello world');

const onFormSubmit = (e: SubmitEvent) => {
	e.preventDefault();
  
  const submitted = (e.target as HTMLFormElement)?.elements[0].value;
	console.log('sending text: ', submitted);
  const pNode = document.createElement('p');
  pNode.innerHTML = submitted;
  document.getElementById('chatbox')?.appendChild(pNode);
}

function main() {
	document.getElementById('chatbox-form')?.addEventListener('submit', onFormSubmit);
}

main();