// Get modal elements
const modal = document.getElementById('myModal');
const openModalBtn = document.getElementById('addListBtn');
const closeModalBtn = document.getElementsByClassName('close')[0];
const createListBtn = document.getElementById('createListBtn');

createListBtn.addEventListener('click', () => 
{
    const title = document.getElementById('listTitle').value;
    const note = document.getElementById('listNote').value;

    if (title.trim() !== '' && note.trim() !== '') 
        {
            // Create a new div for the list
            const listDiv = document.createElement('div');
            listDiv.className = 'list-item';

            // Add title and note elements
            listDiv.innerHTML = `<h3>${title}</h3><p>${note}</p>`;

            // Append the new list to the container
            document.getElementById('listContainer').appendChild(listDiv);

            // Clear input fields
            document.getElementById('listTitle').value = '';
                    document.getElementById('listNote').value = '';
            
            // Log the values to the console (for testing purposes)
            console.log(`Title: ${title}, Note: ${note}`);

            // Close the modal
            modal.style.display = 'none';
        } else 
        {
            alert("Please fill out both the title and note fields.");
        }
});

// Open the modal
openModalBtn.onclick = function() {
    modal.style.display = 'block';
}

// Close the modal
closeModalBtn.onclick = function() {
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
