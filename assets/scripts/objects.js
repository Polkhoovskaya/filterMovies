const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const movies = [];

const addMovieHandler = () => {
    const title = document.getElementById('title').value;
    const extraName = document.getElementById('extra-name').value;
    const extraValue = document.getElementById('extra-value').value;

    if(extraName.trim() === '' || extraValue.trim() ==='') {
        return;
    }

    const newMovie = { 
        info: {
            set title(val) {
                if (val.trim() === '') {
                    this._title = 'DEFAULT';
                    return;
                } else {
                    this._title = val
                }
            },
            get title() {
                return this._title;
            },
            [extraName] : extraValue
        },

        id: Math.random(),
        getFormattedTitle : function() {
           return this.info.title.toUpperCase();
        }
    };

    newMovie.info.title = title;

    movies.push(newMovie);
    showMovies();
}

const searchMovieHandler = () => {
    const filterText = document.getElementById('filter-title').value.toLowerCase();
    showMovies(filterText);
}

const showMovies = (filter = '') => {
    const showList = document.getElementById('movie-list');

    if (movies.length === 0) {
        showList.classList.remove('visible');
        return;
    } else {
        showList.classList.add('visible');
    }

    showList.innerHTML = '';

    // findMovies = () => {
    //     let moviesList = [];
    //     movies.forEach((movie) => {
    //         const title = movie.info.title;
    //         console.log(title);
    //         if (title.includes(filter)) {
    //             moviesList.push(movie);
    //         } 
    //     });
    //     return moviesList;
    // }
    // const filteredMovies = !filter ? movies : findMovies();


    const filteredMovies = !filter ? movies : movies.filter(movie => movie.info.title.toLowerCase().includes(filter));

    filteredMovies.forEach((movie) => { 
        const movieEl = document.createElement('li');
        const { info } =  movie;
        let { getFormattedTitle } = movie;
        // getFormattedTitle = getFormattedTitle.bind(movie);
        let text = getFormattedTitle.call(movie) + ' - ';
        for(const key in info) {
            if (key !== 'title' && key !== '_title') {
                text = text + key + ' : ' + info[key];
            }
        }
        movieEl.textContent = text;
        showList.append(movieEl);
    })    
}

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);