// script.js
document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  const createNoteBtn = document.getElementById('createNoteBtn');
  let currentZIndex = 1;

  createNoteBtn.addEventListener('click', createNote);

  function createNote() {
    const note = document.createElement('div');
    note.className = 'note';
    note.style.left = '10px';
    note.style.top = '10px';
    note.style.backgroundColor = getRandomColor();
    note.style.zIndex = currentZIndex++;
    note.addEventListener('mousedown', () => {
      note.style.zIndex = currentZIndex++;
    });

    const noteTopControls = document.createElement('div');
    noteTopControls.className = 'note-top-controls';

    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.className = 'color-picker';
    colorPicker.addEventListener('input', (e) => {
      note.style.backgroundColor = e.target.value;
    });
    noteTopControls.appendChild(colorPicker);

    const textColorPicker = document.createElement('input');
    textColorPicker.type = 'color';
    textColorPicker.className = 'text-color-picker';
    textColorPicker.addEventListener('input', (e) => {
      const textarea = note.querySelector('textarea');
      textarea.style.color = e.target.value;
    });
    noteTopControls.appendChild(textColorPicker);

    const textareaColorPicker = document.createElement('input');
    textareaColorPicker.type = 'color';
    textareaColorPicker.className = 'textarea-color-picker';
    textareaColorPicker.addEventListener('input', (e) => {
      const textarea = note.querySelector('textarea');
      textarea.style.backgroundColor = e.target.value;
    });
    noteTopControls.appendChild(textareaColorPicker);

    const bulletBtn = document.createElement('button');
    bulletBtn.textContent = '•';
    bulletBtn.className = 'bullet-btn';
    bulletBtn.addEventListener('click', () => {
      const textarea = note.querySelector('textarea');
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      const text = textarea.value;
      const bulletText = '\u2022 ';
      textarea.value = text.substring(0, startPos) + bulletText + text.substring(endPos);
      textarea.selectionStart = startPos + bulletText.length;
      textarea.selectionEnd = startPos + bulletText.length;
      textarea.focus();
    });
    noteTopControls.appendChild(bulletBtn);

    const numberBtn = document.createElement('button');
    numberBtn.textContent = '1.';
    numberBtn.className = 'number-btn';
    let currentNumber = 1;
    numberBtn.addEventListener('click', () => {
      const textarea = note.querySelector('textarea');
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      const text = textarea.value;
      const numberText = `${currentNumber}. `;
      textarea.value = text.substring(0, startPos) + numberText + text.substring(endPos);
      textarea.selectionStart = startPos + numberText.length;
      textarea.selectionEnd = startPos + numberText.length;
      textarea.focus();
      currentNumber++;
    });
    noteTopControls.appendChild(numberBtn);

    note.appendChild(noteTopControls);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'X';
    deleteBtn.addEventListener('click', () => board.removeChild(note));
    note.appendChild(deleteBtn);

    const textarea = document.createElement('textarea');
    textarea.className = 'note-textarea';
    textarea.placeholder = 'Type here...';
    note.appendChild(textarea);

    note.addEventListener('mousedown', (e) => startDrag(e, note));

    board.appendChild(note);
  }

  function startDrag(e, note) {
    if (e.target.className === 'delete-btn' || e.target.className === 'color-picker' || e.target.className === 'text-color-picker' || e.target.className === 'textarea-color-picker' || e.target.className === 'note-title' || e.target.tagName === 'TEXTAREA' || e.target.className === 'bullet-btn' || e.target.className === 'number-btn') {
      return;
    }
    const offsetX = e.clientX - note.offsetLeft;
    const offsetY = e.clientY - note.offsetTop;

    function drag(e) {
      note.style.left = `${e.clientX - offsetX}px`;
      note.style.top = `${e.clientY - offsetY}px`;
    }

    function stopDrag() {
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', stopDrag);
    }

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
  }

  function getRandomColor() {
    const colors = ['#FFEB3B', '#8BC34A', '#03A9F4', '#E91E63', '#FF5722'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
});














  