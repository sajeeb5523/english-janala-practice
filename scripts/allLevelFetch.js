// fetch
const allLevelFetch = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(data => displayLevelShow(data.data));

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
        showLevel.appendChild(createDiv);
    }
}

allLevelFetch();