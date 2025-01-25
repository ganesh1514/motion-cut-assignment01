document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const bucketList = document.getElementById('bucketList');
    const newItemInput = document.getElementById('newItem');
    const addBtn = document.getElementById('addBtn');
    const progressText = document.getElementById('progressText');
    const progressFill = document.getElementById('progressFill');

    // Initial Data
    let items = [
        { id: 1, text: "Visit Northern Lights in Iceland", completed: false, starred: true },
        { id: 2, text: "Learn to Play Piano", completed: false, starred: false },
        { id: 3, text: "Run a Marathon", completed: false, starred: false }
    ];

    // Create List Item
    const createListItem = (item) => {
        const li = document.createElement('li');
        li.className = 'list-item';
        li.dataset.id = item.id;
        li.innerHTML = `
            <div class="checkbox ${item.completed ? 'checked' : ''}">
                <i class="ri-check-line"></i>
            </div>
            <div class="item-content ${item.completed ? 'checked' : ''}">
                <span class="item-text">${item.text}</span>
            </div>
            <div class="item-actions">
                <button class="star-btn ${item.starred ? 'active' : ''}" title="Star">
                    <i class="ri-star-line"></i>
                </button>
                <button class="delete-btn" title="Delete">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
        `;
        return li;
    };

    // Update Progress
    const updateProgress = () => {
        const total = items.length;
        const completed = items.filter(item => item.completed).length;
        progressText.textContent = `${completed} of ${total} dreams achieved`;
        progressFill.style.width = total > 0 ? `${(completed / total) * 100}%` : '0%';
    };

    // Render Items
    const renderItems = () => {
        bucketList.innerHTML = '';
        items.forEach(item => {
            bucketList.appendChild(createListItem(item));
        });
        updateProgress();
    };

    // Add Item
    const addItem = (text) => {
        const newItem = {
            id: Date.now(),
            text: text,
            completed: false,
            starred: false
        };
        items.unshift(newItem);
        const listItem = createListItem(newItem);
        bucketList.insertBefore(listItem, bucketList.firstChild);
        updateProgress();
    };

    // Event Listeners
    addBtn.addEventListener('click', () => {
        const text = newItemInput.value.trim();
        if (text) {
            addItem(text);
            newItemInput.value = '';
        }
    });

    newItemInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && newItemInput.value.trim()) {
            addItem(newItemInput.value.trim());
            newItemInput.value = '';
        }
    });

    bucketList.addEventListener('click', (e) => {
        const listItem = e.target.closest('.list-item');
        if (!listItem) return;

        const id = parseInt(listItem.dataset.id);
        const itemIndex = items.findIndex(item => item.id === id);

        if (e.target.closest('.checkbox')) {
            items[itemIndex].completed = !items[itemIndex].completed;
            listItem.querySelector('.checkbox').classList.toggle('checked');
            listItem.querySelector('.item-content').classList.toggle('checked');
            updateProgress();
        }

        if (e.target.closest('.star-btn')) {
            items[itemIndex].starred = !items[itemIndex].starred;
            e.target.closest('.star-btn').classList.toggle('active');
        }

        if (e.target.closest('.delete-btn')) {
            listItem.style.animation = 'slideIn 0.3s reverse';
            setTimeout(() => {
                items = items.filter(item => item.id !== id);
                renderItems();
            }, 300);
        }
    });

    // Initial Render
    renderItems();
});