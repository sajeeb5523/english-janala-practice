// fetch
const allLevelFetch = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(data => displayLevelShow(data.data));

}

const loadWordsByLevel = (id) => {
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
        .then(res => res.json())
        .then(data => displayWordShowByLevel(data));
}

const playSound = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
}

const loadWordDetails = (wordId) => {
    fetch(`https://openapi.programming-hero.com/api/word/${wordId}`)
        .then(res => res.json())
        .then(data => displayWordDetails(data))
}

const displayWordDetails = (data) => {
    const modal = document.getElementById('word_details');
    const detailsContainer = document.getElementById('details_container');
    const word = data.data;

    detailsContainer.innerHTML = `
        <div class="space-y-6 text-left">
            <div class="flex items-center gap-2">
                <h2 class="text-3xl font-extrabold text-gray-900">${word.word}</h2>
                <div class="text-2xl font-bold text-gray-900 flex items-center gap-1">
                    <span>(</span>
                    <button onclick="playSound('${word.word}')" class="text-gray-700 hover:text-black focus:outline-none flex items-center">
                        <i class="fa-solid fa-microphone-lines"></i>
                    </button>
                    <span>:${word.pronunciation})</span>
                </div>
            </div>

            <div class="space-y-2">
                <h4 class="text-xl font-bold text-gray-800">Meaning</h4>
                <p class="text-lg">${word.meaning}</p>
            </div>

            <div class="space-y-2">
                <h4 class="text-xl font-bold text-gray-800">Example</h4>
                <p class="text-lg font-normal">${word.sentence}</p>
            </div>
        
            <div class="space-y-3">
                <h4 class="text-xl font-bold text-gray-800">সমার্থক শব্দ গুলো</h4>
                <div class="flex flex-wrap gap-3">
                    ${word.synonyms && word.synonyms.length > 0 ?
            word.synonyms.map(syn => `
                        <span class="px-4 py-2 rounded-sm bg-[#EBF5FF] text-gray-800 border border-[#D1E7FF] font-medium text-base shadow-sm">
                            ${syn}
                        </span>
                    `).join('') : `<span class="text-red-500">null</span>`}
                </div>
            </div>
        </div>
    `;

    modal.showModal();
}
// display show
const displayLevelShow = (allLevel) => {

    const showLevel = document.getElementById('level_show');

    for (const level of allLevel) {

        const createDiv = document.createElement('div');
        createDiv.innerHTML = `
            <button
                class="btn btn-sm md:btn-md btn-outline btn-primary font-semibold text-sm group hover:text-white">
                <img class="w-5 h-5 gap-2 transition-all duration-200 group-hover:brightness-0 group-hover:invert"
                    src="assets/fa-book-open.png" alt=""> Lesson -${level.level_no}
            </button>
        `
        createDiv.querySelector('button').addEventListener('click', () => loadWordsByLevel(level.level_no));
        showLevel.appendChild(createDiv);
    }
}

const displayWordShowByLevel = (words) => {
    const learnContainer = document.getElementById('word_show_container');

    learnContainer.innerHTML = '';

    if (words.data.length == 0) {
        learnContainer.innerHTML = `
         <div class="py-20 space-y-4 rounded-2xl bg-[#F8F8F8] flex flex-col items-center justify-center">
            <img src="assets/alert-error.png" alt="" class="mx-auto">
            <h2 class="text-sm text-slate-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h2>
            <h1 class="font-bold text-2xl">নেক্সট Lesson এ যান</h1>
        </div>        
        `
        return;
    }

    const gridDiv = document.createElement('div')
    gridDiv.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'

    words.data.forEach(word => {
        const wordCard = document.createElement('div')
        wordCard.className = 'p-10 rounded-2xl bg-white border border-gray-200 h-full flex flex-col'
        wordCard.innerHTML = `
            <div class="space-y-8 mb-10">
                <div>
                    <h3 class="text-3xl font-bold text-gray-800">${word.word}</h3>
                </div>
                <div>
                    <p class="text-2xl font-semibold">Meaning / Pronunciation </p>
                </div>
                <div>
                    <p class="text-2xl">"${word.meaning} / ${word.pronunciation}"</p>
                </div>
            </div>   

            <div class="mt-auto"> 
                <div class="justify-between flex">
                    <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF20]">
                        <i class="fas fa-info-circle"></i>
                    </button>
                    <button onclick="playSound('${word.word}')" class="btn bg-[#1A91FF20]">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
            </div>                
        `
        gridDiv.appendChild(wordCard)
    })

    learnContainer.appendChild(gridDiv)
}

allLevelFetch();