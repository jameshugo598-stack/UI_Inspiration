const templates = [
    { name: 'Aurum', file: 'aurum.html', desc: 'Luxury jewellery & e-commerce' },
    { name: 'Spark Labs', file: 'spark-labs.html', desc: 'AI Creative power station' },
    { name: 'Royal Plaza', file: 'royal-plaza.html', desc: 'High-end resort experience' },
    { name: 'Hotel Kosta', file: 'hotel-kosta.html', desc: 'Classical boutique hotel' },
    { name: 'Neural Mind', file: 'neural-mind.html', desc: 'Next-gen AI synthesis' },
    { name: 'Miller Tischler', file: 'miller-tischler.html', desc: 'Architectural precision' },
    { name: 'Arthur Portfolio', file: 'arthur-portfolio.html', desc: 'Bold creative portfolio' },
    { name: 'Nightfall Creative', file: 'nightfall-creative.html', desc: 'Sleek dark mode creative layout' },
    { name: 'Minimalist Showcase', file: 'minimalist-showcase.html', desc: 'Minimalist product showcase' },
    { name: 'Agency Folio', file: 'agency-folio.html', desc: 'Clean agency & portfolio' },
    { name: 'SaaS Launch', file: 'saas-launch.html', desc: 'Tech & SaaS focused' }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('template-grid');
    const modal = document.getElementById('preview-modal');
    const iframe = document.getElementById('preview-frame');
    const closeBtn = document.querySelector('.close');
    const closeMacBtn = document.getElementById('close-modal-btn');
    const modalTitle = document.getElementById('preview-title');
    const overlay = document.getElementById('modal-overlay');

    templates.forEach(template => {
        const card = document.createElement('div');
        card.className = 'group bg-zinc-900/50 border border-white/5 rounded-2xl p-4 hover:border-emerald-500/40 transition-all hover:bg-zinc-800/60 duration-500 cursor-pointer hover:shadow-[0_8px_32px_rgba(16,185,129,0.15)]';
        card.innerHTML = `
            <div class="aspect-[16/10] bg-black rounded-xl mb-5 overflow-hidden relative border border-white/5">
                <iframe src="${template.file}" class="w-[200%] h-[200%] scale-[0.5] origin-top-left border-none pointer-events-none opacity-70 group-hover:opacity-100 transition-all duration-500" style="filter: contrast(1.1) brightness(1.15);"></iframe>
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity"></div>
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div class="w-12 h-12 rounded-full bg-emerald-500 text-black flex items-center justify-center scale-90 group-hover:scale-100 transition-transform shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    </div>
                </div>
            </div>
            <div class="px-1">
                <div class="flex items-center justify-between mb-1">
                    <h3 class="text-lg font-bold tracking-tight">${template.name}</h3>
                    <span class="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase">Free</span>
                </div>
                <p class="text-xs text-zinc-500 mb-5 font-light">${template.desc}</p>
                <button class="w-full bg-white text-black py-2.5 rounded-lg text-xs font-bold hover:bg-emerald-400 transition-all duration-300 preview-btn" data-file="${template.file}" data-name="${template.name}">Preview</button>
            </div>
        `;

        card.onclick = (e) => {
            if (!e.target.closest('button')) {
                openModal(template.file, template.name);
            }
        };

        grid.appendChild(card);
    });

    const openModal = (file, name) => {
        iframe.src = file;
        modalTitle.innerText = `preview_${name.toLowerCase().replace(/\s/g, '_')}.sh`;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        iframe.src = '';
        document.body.style.overflow = 'auto';
    };

    document.querySelectorAll('.preview-btn').forEach(btn => {
        btn.onclick = (e) => {
            e.stopPropagation();
            openModal(btn.getAttribute('data-file'), btn.getAttribute('data-name'));
        };
    });

    closeBtn.onclick = closeModal;
    closeMacBtn.onclick = closeModal;
    overlay.onclick = closeModal;
});
