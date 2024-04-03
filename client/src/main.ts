console.log('running main');

function main() {
	document.getElementById('chatbox-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const chatTextInput = document.getElementById('chatbox-text') as HTMLInputElement;
    const pNode = document.createElement('p');
    pNode.innerHTML = chatTextInput.value;
    document.getElementById('chatbox')?.appendChild(pNode);
    chatTextInput.value = '';
  });
}

main();
