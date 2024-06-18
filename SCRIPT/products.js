const removeButtons = document.querySelectorAll('.remove-btn');

    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = button.closest('tr');
            row.remove();
        });
    });

const addItemButton = document.getElementById('addItem');
    

addItemButton.addEventListener('click', function() {
    const tableBody = document.querySelector('tbody');
    

    const newRow = document.createElement('tr');
    

    newRow.innerHTML = `
        <td></td>
        <td><input type="text" class="form-control" placeholder="Name"></td>
        <td><input type="text" class="form-control" placeholder="Description"></td>
        <td><input type="image" class="form-control" placeholder="Image URL"></td>
        <td><input type="number" class="form-control" placeholder="Quantity" value="1"></td>
        <td><input type="number" class="form-control" placeholder="Price"></td>
        <td><button class="btn btn-danger btn-sm remove-btn">Remove</button></td>
        `;
    
    tableBody.appendChild(newRow);

    newRow.querySelector('.remove-btn').addEventListener('click', function() {
        newRow.remove();
        });

updateRowIDs();
});
    

function updateRowIDs() {
    const rows = document.querySelectorAll('table tbody tr');
    rows.forEach((row, index) => {
        row.firstElementChild.textContent = index + 1;
    });
}
    