import { useEffect, useContext } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ColorModeContext } from './utils/ToggleColorMode';
import { fetchToken } from './utils';
import { genreOrCategory, searchMovie, selectGenreOrCategory } from './features/currentGenreCategory';

const UseAlan = () => {
    const { setMode } = useContext(ColorModeContext)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        alanBtn({
            key: 'c1c02a556793aec13c8853df04cb78482e956eca572e1d8b807a3e2338fdd0dc/stage',
            host: 'v1.alan.app',
            onCommand: ({command, mode, genres, genreOrCategory, query }) => {
            

              if (command === 'chooseGenre') {
                const foundGenre = genres.find((g) => g.name.toLowerCase() === genreOrCategory.toLowerCase());
                if (foundGenre) {
                    console.log("Genre found", foundGenre)
                    navigate('/')
                    dispatch(selectGenreOrCategory(foundGenre.id));
                }else {
                    const category = genreOrCategory.startsWith('top')?
                    'top_rated': genreOrCategory;
                    console.log("Category Found", foundGenre)
                    navigate('/');
                    dispatch(selectGenreOrCategory(category))
                }
              }

              else if (command === 'changeMode') {
                if (mode === 'light') {
                    setMode('light');
                } else {
                    setMode('dark');
                }
              } 
              
              else if(command === 'login') {
                fetchToken();
              } 
              
              else if (command === 'logout') {
                localStorage.clear();
                window.location.href = '/';
              }

              else if (command === 'search') {
                dispatch(searchMovie(query))
              }
            }
        });
      }, [navigate,dispatch,setMode]);


  return null;
};

export default UseAlan



/**
 * 

Alan AI Scripts

intent(['What does this app do?', 'What can i do?', 'What is this app about?'], p =>
          p.play('This is Moviegrid app, where you can find the movies you love')
      );

intent("Switch to dark mode", (p) => {
    p.play({ command: 'changeMode', mode: 'dark' });
    p.play('Dark mode activated. Enjoy!');
});

intent("Switch to light mode", (p) => {
    p.play({ command: 'changeMode', mode: 'light' });
    p.play('Light mode activated. Bright and shiny!');
});


intent(["Log in", "Login"], (p) => {
    p.play('Loggin you in');
    p.play({command: 'login'});
})

intent(["Log out", "Logout"], (p) => {
    p.play('Loggin you out');
    p.play({command: 'logout'});
})


const genres = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 15,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentry"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantacy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    },
    
]


const stringifiedGenres = genres.map(({name}) => name.toLowerCase()).join("|");



intent(`got to $(GENRE ${stringifiedGenres}|top rated|popular|upcoming)`, (p) => {
    p.play(`Going to ${p.GENRE.value} category`);
    p.play({command: 'chooseGenre', genreOrCategory: p.GENRE.value, genres})
})


intent('Search for $(QUERY* (.*))', (p) => {
    p.play(`Searching for ${p.QUERY.value}`);
    p.play({command: 'search', query: p.QUERY.value});
})






 * 
 */