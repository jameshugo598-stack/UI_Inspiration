const templates = [
    { name: 'Fourth Landing', file: 'fourth.html' },
    { name: 'More Landing', file: 'more.html' },
    { name: 'More v2 Landing', file: 'more2.html' },
    { name: 'Nice Landing', file: 'nice.html' },
    { name: 'Premium Landing', file: 'prem.html' }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('template-grid');
    const modal = document.getElementById('preview-modal');
    const iframe = document.getElementById('preview-frame');
    const closeBtn = document.querySelector('.close');

    templates.forEach(template => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-preview">
                <iframe src="${template.file}"></iframe>
            </div>
            <div class="card-content">
                <div class="card-title">${template.name}</div>
                <div class="card-actions">
                    <button class="btn btn-primary preview-btn" data-file="${template.file}">Preview</button>
                    <button class="btn btn-outline copy-btn" data-file="${template.file}">Copy HTML</button>
                    <a href="${template.file}" download class="btn btn-outline">Download</a>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    // Preview Logic
    document.querySelectorAll('.preview-btn').forEach(btn => {
        btn.onclick = () => {
            iframe.src = btn.getAttribute('data-file');
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        };
    });

    closeBtn.onclick = () => {
        modal.style.display = 'none';
        iframe.src = '';
        document.body.style.overflow = 'auto';
    };

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            iframe.src = '';
            document.body.style.overflow = 'auto';
        }
    };

    // Copy Logic
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.onclick = async () => {
            const fileName = btn.getAttribute('data-file');
            try {
                const response = await fetch(fileName);
                const text = await response.text();
                await navigator.clipboard.writeText(text);
                
                const originalText = btn.innerText;
                btn.innerText = 'Copied!';
                btn.classList.add('btn-primary');
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.classList.remove('btn-primary');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        };
    });
});
