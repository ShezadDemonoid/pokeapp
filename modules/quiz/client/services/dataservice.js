
 
/*
 * IIFE to keep code safe and outside the global namespace
 */
(function(){
 'use strict';
    /*
     * Declaring a factory service as part of the existing quizFacts Module.
     */
    angular
        .module("quiz")
        .factory("DataService", DataService);

    /*
     * Actual definition of the function used for this factory
     */
    function DataService(){
        /*
         * dataObj is used to simulate getting the data from a backend server
         * The object will hold data which will then be returned to the other
         * factory declared in js/factory/quiz.js which has this factory
         * as a dependency
         */

        var dataObj = {
            quizsData: quizsData,
            quizQuestions: quizQuestions,
            correctAnswers: correctAnswers
        };

        // returning the dataObj to anything that uses this factory as a 
        // dependency
        return dataObj;
    }

    /*
     * all of the below variables are simulating data that would typically be 
     * retrieved using an HTTP call to an API endpoint.
     *
     * For simplicity sake this data is hardcoded into the app as this tutorial
     * is about building the angular app, not the backend.
     *
     * The correctAnswers variable would be retrieved when the user has 
     * finished the quiz and would be used to mark the users answers against 
     * the correct answers
     *
     * the quizQuestions is an array of objects, each containing data 
     * pertaining to a single question. This includes:
     *                          - The type of question: image or text
     *                          - Text of the question (aka the actual question)
     *                          - A set of 4 possible answers, either text or 
     *                              images as indicated above
     *                          - a selected flag which will be used to know if
     *                              the user has selected 
     *                          an answer yet.
     *                          - Whether the user got the question correct or 
     *                              not
     *
     * The final quizData variable hold the information that will be 
     * displayed in the list view when the app loads. This includes the name 
     * and an image of each quiz as well as other information such as the 
     * location and the size of the quizs
     *
     */

    var correctAnswers = [1, 2, 1, 3, 0, 2, 1, 0, 0, 2];

    var quizQuestions  = [
        {
            type: "text",
            text: "Which Pokémon can use its black ink to draw pictures or issue warnings?",
            possibilities: [
                {
                    answer: "Starmie"
                },
                {
                    answer: "Horsea"
                },
                {
                    answer: "Bellsprout"
                },
                {
                    answer: "Charizard"
                }
            ],
            selected: null,
            correct: null
        },
        {
            type: "text",
            text: "Squirtle can eventually become which Pokémon?",
            possibilities: [
                {
                    answer: "Electabuzz"
                },
                {
                    answer: "Magmar"
                },
                {
                    answer: "Blastoise"
                },
                {
                    answer: "Pikachu"
                }
            ],
            selected: null,
            correct: null
        },
        {
            type: "text",
            text: "Rock tunnel and power plant are closest to which of the following??",
            possibilities: [
                {
                    answer: "Celadon City"
                },
                {
                    answer: "Cerulean City"
                },
                {
                    answer: "Cinnabar Island"
                },
                {
                    answer: "Lavender Town"
                }
            ],
            selected: null,
            correct: null
        },
        {
            type: "image",
            text: "Which Pokémon seems to always have a headache?",
            possibilities: [
                {
                    answer: "modules/quiz/client/css/003.png"
                },
                {
                    answer: "modules/quiz/client/css/115.png"
                },
                {
                    answer: "modules/quiz/client/css/145.png"
                },
                {
                    answer: "modules/quiz/client/css/054.png"
                }
            ],
            selected: null,
            correct: null
        },
        {
            type: "text",
            text: "Which Pokémon's English name sounds like a creature from the Indian Ocean?'",
            possibilities: [
                {
                    answer: "Dewgong"
                },
                {
                    answer: "Rhydon"
                },
                {
                    answer: "Gengar"
                },
                {
                    answer: "Mew"
                }
            ],
            selected: null,
            correct: null
        },
        {
            type: "text",
            text: "Which Pokémon can be used to beat Lorelei?",
            possibilities: [
                {
                    answer: "ice or water"
                },
                {
                    answer: "psychic or ghost"
                },
                {
                    answer: "grass or electric "
                },
                {
                    answer: "fire or rock"
                }
            ],
            selected: null,
            correct: null
        },
        {
            type: "text",
            text: "What is Professor Oak's Japanese name?",
            possibilities: [
                {
                    answer: "Okita"
                },
                {
                    answer: "Okido"
                },
                {
                    answer: "Arigato"
                },
                {
                    answer: "Hiroshi"
                }
            ],
            selected: null,
            correct: null
        },
        {
            type: "text",
            text: "Who stole Misty's bike?",
            possibilities: [
                {
                    answer: "Ash"
                },
                {
                    answer: "Gary"
                },
                {
                    answer: "Jessie"
                },
                {
                    answer: "Tracey"
                }
            ],
            selected: null,
            correct: null
        },
        {
            type: "text",
            text: "Which of the following are Pokémon games?",
            possibilities: [
                {
                    answer: "gold and silver"
                },
                {
                    answer: "orange and pewter"
                },
                {
                    answer: "white and purple"
                },
                {
                    answer: "black and orange"
                }
            ],
            selected: null,
            correct: null
        },
        {
            type: "text",
            text: "Which of the following Pokémon can be found in Red?",
            possibilities: [
                {
                    answer: "Weepinbell and Magmar"
                },
                {
                    answer: "Sandslash and Vulpix"
                },
                {
                    answer: "Arcanine and Scyther"
                },
                {
                    answer: "Persian and Pinsir"
                }
            ],
            selected: null,
            correct: null
        }
    ];

    var quizsData = [
        {
            name: "Celadon City",
            image_url: "modules/quiz/client/pics/Celadon.png",
            height: "n/a",
            weight: "n/a",
            type:"n/a",
            description: "Celadon City (タマムシシティ Tamamushi Shiti) is a city in central Kanto. Erika is the Gym Leader here. Eusine also resides in Celadon City. Places of interest include the Rocket Game Corner, the Celadon Department Store, and the Celadon hotel. It is one of the biggest cities in the region, second only to Saffron City in the east. The city has 92 inhabitants, making it the most populated city in the Kanto region, surpassing Saffron City. The city has two entrances, one from the east via Route 7, and one west via Route 16. "
			
        },
        {
            name: "Cerulean City",
            image_url: "modules/quiz/client/pics/Cerulean.png",
            description: "Cerulean City (ハナダシティ Hanada Shiti) is a city in the Kanto region. It has a few notable locations such as the bike shop and the Cerulean Gym. It is the third major city of the Pokémon Red and Blue and FireRed and LeafGreen series. It is also the location of the third gym/second gym battle. Its Gym leader is Misty. It is located between four different routes: Routes 24, 5, 4 and 9. Its motto is: Cerulean City: A mysterious, blue aura surrounds it in Japanese it is Hanada is the color of Aqua mysteries.Rock tunnel and power plant are closest to this city "
        },
        {
            name: "Cinnabar Island",
            image_url: "modules/quiz/client/pics/Cinnabar.png",
            description: "Cinnabar Island (グレンタウン Guren Town) is an island in Kanto. The Pokémon Mansion is located here. Blaine is the resident Gym Leader here in Generation I and Generation III. The Pokémon Lab is also located here. In Gen. II, a volcano erupted leaving only the Pokémon Center and forcing Blaine to move his gym to the Seafoam Islands. The coast on the East side is famous for the Missingno Glitch."
        },
        {
            name: "Lavender Town",
            image_url: "modules/quiz/client/pics/LavenderTown.png",
            description: "Lavender Town (シオンタウン Shion Taun) is a town in Kanto. Memorial sights are held in the Pokémon Tower and the House of Memories/Soul House. It is located north of Route 10."
        },

        {
            name: "Professor Oak",
            image_url: "modules/quiz/client/pics/oak.jpg",
            description: "Samuel Oak(オーキド ユキナリ博士 Dr. Yukinari Okido)is a Pokémon researcher who was once a competitive Trainer, and is generally considered the best in his field."
        },

        {
            name: "Misty",
            image_url: "modules/quiz/client/pics/misty.jpg",
            description: "Misty(カスミ Kasumi)is a character whose first appearance was in the very first episode of the anime series, Pokémon - I Choose You!. In the episode, she first meets Ash after fishing him out of the water when he was trying to get away from a flock of Spearow. Ash then takes Misty's bike from her in order to escape the Spearow, which is then wrecked by Pikachu's Thunder Shock. Misty then tracks down Ash and follows him around on his adventures until he can pay her back, although she eventually forgets about the bike and becomes one of Ash's closest friends in the process. However, at the end of their journey through the Johto Region, Misty's bike has been fully repaired, and she departs to return home to Cerulean City. "
        },

        {
            name: "Ash Ketchum",
            image_url: "modules/quiz/client/pics/ash.png",
            description: "Ash Ketchum(サトシ Satoshi) is the main protagonist of the Pokémon anime series who has always dreamed of becoming a Pokémon Master. As soon as he was ten years old, he rushed to Professor Oak's Laboratory to get his first Pokémon. He is the first human character to be introduced in the series. Originally wanting to choose Squirtle, Ash ended up receiving the Pokémon Pikachu, as he was late, and left on his journey. He has been through all of the regions."
        },
        {
            name: "Gary Oak",
            image_url: "modules/quiz/client/pics/gary.png",
            description: "Gary Oak(オーキド・シゲル Shigeru Ōkido) s Professor Oak's grandson and Ash Ketchum's rival in the first few seasons. His starter Pokémon was a Squirtle that later evolved into a Blastoise."
        },
        {
            name: "Jessie",
            image_url: "modules/quiz/client/pics/Jessie.png",
            description: "essica (also known as Jessie in Japanese as ムサシ Musashi) is a member of Team Rocket. She tends to be a drama queen and has a diabolical temperament. She works with James and Meowth. Their main goal is to steal Pokémon, preferably Ash Ketchum's Pikachu. She and James have rivalry with Butch and Cassidy. Jessie's name is sometimes misspelled as Jesse, as her name comes from the infamous outlaw Jesse James."
        },
        {
            name: "Tracey Sketchit",
            image_url: "modules/quiz/client/pics/tracey.jpg",
            description: "Tracey Sketchit is a Pokémon watcher who takes Brock's place during the time he spends with Professor Ivy. After Ash's Orange League adventures, he works as Professor Oak's assistant."
        },
        {
            name: "Pokémon games",
            image_url: "modules/quiz/client/pics/game.jpg",
            description: "The Pokémon games are all video games in the Pokémon franchise. All games in the standard style are considered the base, definitive canon for the Pokémon series. All other parts of Pokémon canon, including but not limited to the Pokémon anime, Pokémon manga, Pokémon Trading Card Game, and the Pokémon Trading Figure Game, are derived from the Pokémon world and concepts set forth in the games. There are currently 66 games known. Some examples are :Pokémon Red, Green, and Blue,  Pokémon Yellow: Special Pikachu Edition, Pokémon Gold and Silver,Pokémon Crystal, Pokémon Ruby and Sapphire"
        },
        {
            name: "Pokémon types",
            image_url: "modules/quiz/client/pics/type.png",
            description: "all Pokémon creatures and their moves are assigned certain types. Each type has several strengths and weaknesses in both attack and defense. In battle, you should use Pokémon and moves that have a type advantage over your opponent; doing so will cause much more damage than normal.A single-type advantage (for instance a Water attack against a Ground-type Pokémon) will net you double normal damage. The advantages also 'stack up', so a double-type advantage (for instance a Water attack against a Ground/Rock-type Pokémon) will net you quadruple damage. In both these cases you will see the message  'It's super effective!' in-game after the attack. eg: a grass or electric pokemon can be used to beat Lorelei"
        },
    ];

})();
