const templates = [
    { name: 'Aurum Landing', file: 'aurum.html', desc: 'Luxury jewellery & e-commerce' },
    { name: 'Spark Labs', file: 'spark-labs.html', desc: 'AI Creative power station' },
    { name: 'Royal Plaza', file: 'royal-plaza.html', desc: 'High-end resort experience' },
    { name: 'Hotel Kosta', file: 'hotel-kosta.html', desc: 'Classical boutique hotel' },
    { name: 'Neural Mind', file: 'neural-mind.html', desc: 'Next-gen AI synthesis' },
    { name: 'Miller Tischler', file: 'miller-tischler.html', desc: 'Architectural precision' },
    { name: 'Arthur', file: 'arthur-portfolio.html', desc: 'Bold creative portfolio' },
    { name: 'More Landing', file: 'more.html', desc: 'Sleek dark mode creative layout' },
    { name: 'More v2 Landing', file: 'more2.html', desc: 'Minimalist product showcase' },
    { name: 'Nice Landing', file: 'nice.html', desc: 'Clean agency & portfolio' },
    { name: 'Premium Landing', file: 'prem.html', desc: 'Tech & SaaS focused' }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('template-grid');
    const modal = document.getElementById('preview-modal');
    const iframe = document.getElementById('preview-frame');
    const closeBtn = document.querySelector('.close');

    templates.forEach(template => {
        const card = document.createElement('div');
        card.className = 'group bg-zinc-900/50 border border-white/5 rounded-2xl p-3 hover:border-indigo-500/30 transition-all hover:bg-zinc-900 duration-500';
        card.innerHTML = `
            <div class="aspect-[16/10] bg-black rounded-xl mb-4 overflow-hidden relative">
                <iframe src="${template.file}" class="w-[200%] h-[200%] scale-50 origin-top-left border-none pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity"></iframe>
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div class="px-2 pb-2">
                <h3 class="text-lg font-bold mb-1">${template.name}</h3>
                <p class="text-xs text-zinc-500 mb-6 font-light">${template.desc}</p>
                <div class="flex items-center gap-2">
                    <button class="flex-1 bg-white text-black py-2 rounded-lg text-xs font-bold hover:bg-indigo-400 transition-colors preview-btn" data-file="${template.file}">Preview View</button>
                    <button class="w-10 h-8 flex items-center justify-center border border-white/10 rounded-lg hover:bg-white/5 transition-colors copy-btn" data-file="${template.file}">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-zinc-400"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                    </button>
                    <a href="${template.file}" download class="w-10 h-8 flex items-center justify-center border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-zinc-400"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                    </a>
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

    const closeModal = () => {
        modal.style.display = 'none';
        iframe.src = '';
        document.body.style.overflow = 'auto';
    };

    closeBtn.onclick = closeModal;

    window.onclick = (event) => {
        if (event.target == modal) {
            closeModal();
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

                const originalHTML = btn.innerHTML;
                btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-emerald-400"><polyline points="20 6 9 17 4 12"/></svg>';
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        };
    });
});
