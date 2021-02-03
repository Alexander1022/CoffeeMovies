const api = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1";
const searchAPI = "https://api.themoviedb.org/3/search/movie?&api_key=8528808cf2ffa8587662520180f87ca4&query=";
const imgAPI = "https://image.tmdb.org/t/p/w1280";

const main = document.querySelector('main');
const form = document.querySelector('form');
const search = document.getElementById("search");

main_page(api);
getDate();

function getDate()
{
    var today = new Date();
    var day = String(today.getDate()).padStart(2, '0');
    var month = String(today.getMonth() + 1).padStart(2, '0'); 
    var year = today.getFullYear();

    today = year + '-' + month + '-' + day;
    
    return today;
}

async function main_page()
{
    const info_from_api = await fetch(api);
    const da = await info_from_api.json(); 

    showMe(da.results);
}

async function Info(url)
{
    const info_from_api = await fetch(url);
    const da = await info_from_api.json(); 

    showMe(da.results);
}

function showMe(content)
{
    main.innerHTML = "";

    content.forEach(movie => {
        const { poster_path, title, vote_average, overview, vote_count, release_date } = movie;
        
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        movieElement.innerHTML = 
        `
       <img
            src = "${imgAPI + poster_path}"
            alt = "${title}"
        />
        <div class="movie-info">
            <h1>
                ${title}
            </h1>
            <span>
                Rating: ${vote_average} / ${vote_count}
            </span>

            <p>
                Date of release: ${release_date}
                ${getTheDate(release_date)}
            </p>
        </div>

        <div class="info">
            <h3>About "${title}":</h3>
            ${overview}
        </div>
        `;

        main.appendChild(movieElement);
    });
}

function getTheDate(release_date)
{
    if(release_date > getDate())
    {
        return "(Coming soon)";
    }
    else
    {
        return ""
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    console.log("You searched for " + searchTerm);

    if (searchTerm) 
    {
        Info(searchAPI + searchTerm);

        search.value = "";
    }
});

