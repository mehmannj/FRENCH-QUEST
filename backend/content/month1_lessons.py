"""
Month 1 Complete Lesson Content for FrenchQuest
Absolute Beginner Foundation
"""
from datetime import datetime, timezone

MONTH_1_LESSONS = [
    # Week 1: Basics
    {
        "id": "m1w1d1",
        "month": 1,
        "week": 1,
        "day": 1,
        "title": "The French Alphabet",
        "title_fr": "L'alphabet français",
        "description": "Learn to recognize and pronounce all 26 letters of the French alphabet.",
        "skill_focus": ["pronunciation", "listening"],
        "vocabulary": [
            {"french": "A", "english": "A", "pronunciation": "ah", "audio_id": "alpha_a"},
            {"french": "B", "english": "B", "pronunciation": "bay", "audio_id": "alpha_b"},
            {"french": "C", "english": "C", "pronunciation": "say", "audio_id": "alpha_c"},
            {"french": "D", "english": "D", "pronunciation": "day", "audio_id": "alpha_d"},
            {"french": "E", "english": "E", "pronunciation": "euh", "audio_id": "alpha_e"},
            {"french": "F", "english": "F", "pronunciation": "eff", "audio_id": "alpha_f"},
            {"french": "G", "english": "G", "pronunciation": "zhay", "audio_id": "alpha_g"},
            {"french": "H", "english": "H", "pronunciation": "ahsh", "audio_id": "alpha_h"},
            {"french": "I", "english": "I", "pronunciation": "ee", "audio_id": "alpha_i"},
            {"french": "J", "english": "J", "pronunciation": "zhee", "audio_id": "alpha_j"},
            {"french": "K", "english": "K", "pronunciation": "kah", "audio_id": "alpha_k"},
            {"french": "L", "english": "L", "pronunciation": "ell", "audio_id": "alpha_l"},
            {"french": "M", "english": "M", "pronunciation": "emm", "audio_id": "alpha_m"},
            {"french": "N", "english": "N", "pronunciation": "enn", "audio_id": "alpha_n"},
            {"french": "O", "english": "O", "pronunciation": "oh", "audio_id": "alpha_o"},
            {"french": "P", "english": "P", "pronunciation": "pay", "audio_id": "alpha_p"},
            {"french": "Q", "english": "Q", "pronunciation": "koo", "audio_id": "alpha_q"},
            {"french": "R", "english": "R", "pronunciation": "air", "audio_id": "alpha_r"},
            {"french": "S", "english": "S", "pronunciation": "ess", "audio_id": "alpha_s"},
            {"french": "T", "english": "T", "pronunciation": "tay", "audio_id": "alpha_t"},
            {"french": "U", "english": "U", "pronunciation": "oo", "audio_id": "alpha_u"},
            {"french": "V", "english": "V", "pronunciation": "vay", "audio_id": "alpha_v"},
            {"french": "W", "english": "W", "pronunciation": "doo-bluh-vay", "audio_id": "alpha_w"},
            {"french": "X", "english": "X", "pronunciation": "eeks", "audio_id": "alpha_x"},
            {"french": "Y", "english": "Y", "pronunciation": "ee-grek", "audio_id": "alpha_y"},
            {"french": "Z", "english": "Z", "pronunciation": "zed", "audio_id": "alpha_z"},
        ],
        "grammar_points": [
            "French letters have unique sounds different from English",
            "The letter 'R' is pronounced in the back of the throat",
            "The letter 'H' is always silent in French",
            "The letter 'E' can have different sounds based on accents"
        ],
        "content": {
            "intro": "Welcome to your first French lesson! Today we'll learn the French alphabet - the foundation of all French reading and pronunciation.",
            "main_text": "The French alphabet has the same 26 letters as English, but they sound quite different! Pay special attention to vowels (A, E, I, O, U) and the unique French 'R' sound.",
            "tips": [
                "Practice saying each letter out loud",
                "Listen to the audio multiple times",
                "The French 'R' is guttural - made in the throat"
            ],
            "cultural_note": "French spelling is often more predictable than English once you learn the rules!"
        },
        "exercises": [
            {"type": "listen_repeat", "instructions": "Listen and repeat each letter"},
            {"type": "match", "instructions": "Match the letter to its sound"}
        ],
        "xp_reward": 20
    },
    {
        "id": "m1w1d2",
        "month": 1,
        "week": 1,
        "day": 2,
        "title": "Greetings & Polite Expressions",
        "title_fr": "Salutations et expressions polies",
        "description": "Learn essential greetings and polite expressions for everyday French conversations.",
        "skill_focus": ["speaking", "listening", "vocabulary"],
        "vocabulary": [
            {"french": "Bonjour", "english": "Hello / Good day", "pronunciation": "bohn-zhoor", "audio_id": "greet_bonjour", "usage": "Formal, used during daytime"},
            {"french": "Bonsoir", "english": "Good evening", "pronunciation": "bohn-swahr", "audio_id": "greet_bonsoir", "usage": "Used after 6pm"},
            {"french": "Salut", "english": "Hi / Bye", "pronunciation": "sah-loo", "audio_id": "greet_salut", "usage": "Informal, with friends"},
            {"french": "Au revoir", "english": "Goodbye", "pronunciation": "oh ruh-vwahr", "audio_id": "greet_aurevoir", "usage": "Standard goodbye"},
            {"french": "À bientôt", "english": "See you soon", "pronunciation": "ah bee-en-toh", "audio_id": "greet_abientot", "usage": "When you'll see them again soon"},
            {"french": "À demain", "english": "See you tomorrow", "pronunciation": "ah duh-man", "audio_id": "greet_ademain", "usage": "Specifically for tomorrow"},
            {"french": "Merci", "english": "Thank you", "pronunciation": "mehr-see", "audio_id": "greet_merci", "usage": "Universal thanks"},
            {"french": "Merci beaucoup", "english": "Thank you very much", "pronunciation": "mehr-see boh-koo", "audio_id": "greet_mercibeaucoup", "usage": "Extra gratitude"},
            {"french": "S'il vous plaît", "english": "Please (formal)", "pronunciation": "seel voo pleh", "audio_id": "greet_svp", "usage": "Formal/strangers"},
            {"french": "S'il te plaît", "english": "Please (informal)", "pronunciation": "seel tuh pleh", "audio_id": "greet_stp", "usage": "Friends/family"},
            {"french": "De rien", "english": "You're welcome", "pronunciation": "duh ree-en", "audio_id": "greet_derien", "usage": "Response to thank you"},
            {"french": "Excusez-moi", "english": "Excuse me", "pronunciation": "ex-koo-zay mwah", "audio_id": "greet_excusezmoi", "usage": "Getting attention, apologizing"},
            {"french": "Pardon", "english": "Pardon / Sorry", "pronunciation": "par-dohn", "audio_id": "greet_pardon", "usage": "Apologizing, didn't hear"}
        ],
        "grammar_points": [
            "Use 'vous' forms with strangers and elders (formal)",
            "Use 'tu' forms with friends, family, children (informal)",
            "Always greet with 'Bonjour' when entering a shop",
            "'Salut' can mean both hello AND goodbye informally"
        ],
        "content": {
            "intro": "Politeness is central to French culture. Using proper greetings shows respect and will be greatly appreciated by French speakers!",
            "main_text": "In France, it's considered rude not to greet people. When entering a shop, always say 'Bonjour!' When leaving, say 'Au revoir!' or 'Merci, au revoir!'",
            "tips": [
                "Say 'Bonjour' when entering any shop or restaurant",
                "Switch to 'Bonsoir' in the evening (after ~6pm)",
                "Add 'Madame' or 'Monsieur' for extra politeness"
            ],
            "cultural_note": "French people may seem cold if you don't greet them first - always initiate with 'Bonjour'!"
        },
        "dialogues": [
            {
                "title": "At a bakery",
                "lines": [
                    {"speaker": "You", "french": "Bonjour!", "english": "Hello!"},
                    {"speaker": "Baker", "french": "Bonjour! Qu'est-ce que vous désirez?", "english": "Hello! What would you like?"},
                    {"speaker": "You", "french": "Une baguette, s'il vous plaît.", "english": "A baguette, please."},
                    {"speaker": "Baker", "french": "Voilà! Un euro cinquante.", "english": "Here you go! One euro fifty."},
                    {"speaker": "You", "french": "Merci beaucoup! Au revoir!", "english": "Thank you very much! Goodbye!"},
                    {"speaker": "Baker", "french": "Au revoir, bonne journée!", "english": "Goodbye, have a nice day!"}
                ]
            }
        ],
        "xp_reward": 25
    },
    {
        "id": "m1w1d3",
        "month": 1,
        "week": 1,
        "day": 3,
        "title": "Numbers 1-20",
        "title_fr": "Les nombres 1-20",
        "description": "Master counting from 1 to 20 in French - essential for shopping, telling time, and daily life.",
        "skill_focus": ["speaking", "vocabulary", "listening"],
        "vocabulary": [
            {"french": "zéro", "english": "0", "pronunciation": "zay-roh", "audio_id": "num_0"},
            {"french": "un", "english": "1", "pronunciation": "uhn", "audio_id": "num_1"},
            {"french": "deux", "english": "2", "pronunciation": "duh", "audio_id": "num_2"},
            {"french": "trois", "english": "3", "pronunciation": "twah", "audio_id": "num_3"},
            {"french": "quatre", "english": "4", "pronunciation": "katr", "audio_id": "num_4"},
            {"french": "cinq", "english": "5", "pronunciation": "sank", "audio_id": "num_5"},
            {"french": "six", "english": "6", "pronunciation": "sees", "audio_id": "num_6"},
            {"french": "sept", "english": "7", "pronunciation": "set", "audio_id": "num_7"},
            {"french": "huit", "english": "8", "pronunciation": "weet", "audio_id": "num_8"},
            {"french": "neuf", "english": "9", "pronunciation": "nuhf", "audio_id": "num_9"},
            {"french": "dix", "english": "10", "pronunciation": "dees", "audio_id": "num_10"},
            {"french": "onze", "english": "11", "pronunciation": "onz", "audio_id": "num_11"},
            {"french": "douze", "english": "12", "pronunciation": "dooz", "audio_id": "num_12"},
            {"french": "treize", "english": "13", "pronunciation": "trehz", "audio_id": "num_13"},
            {"french": "quatorze", "english": "14", "pronunciation": "kah-torz", "audio_id": "num_14"},
            {"french": "quinze", "english": "15", "pronunciation": "kanz", "audio_id": "num_15"},
            {"french": "seize", "english": "16", "pronunciation": "sez", "audio_id": "num_16"},
            {"french": "dix-sept", "english": "17", "pronunciation": "dee-set", "audio_id": "num_17"},
            {"french": "dix-huit", "english": "18", "pronunciation": "deez-weet", "audio_id": "num_18"},
            {"french": "dix-neuf", "english": "19", "pronunciation": "deez-nuhf", "audio_id": "num_19"},
            {"french": "vingt", "english": "20", "pronunciation": "van", "audio_id": "num_20"}
        ],
        "grammar_points": [
            "Numbers 17-19 are compound: dix + number",
            "The 't' in 'vingt' is silent",
            "Practice linking: 'deux euros' sounds like 'deuz-euros'"
        ],
        "content": {
            "intro": "Numbers are essential for everyday French! You'll use them for shopping, telling time, giving your age, and much more.",
            "main_text": "French numbers 1-16 are unique words you need to memorize. From 17-19, they follow a pattern: dix-sept (10+7), dix-huit (10+8), dix-neuf (10+9).",
            "tips": [
                "Practice counting aloud every day",
                "Try counting objects around you in French",
                "Pay attention to liaison (linking) between numbers and nouns"
            ]
        },
        "xp_reward": 25
    },
    {
        "id": "m1w1d4",
        "month": 1,
        "week": 1,
        "day": 4,
        "title": "Days of the Week",
        "title_fr": "Les jours de la semaine",
        "description": "Learn the seven days of the week in French.",
        "skill_focus": ["vocabulary", "speaking"],
        "vocabulary": [
            {"french": "lundi", "english": "Monday", "pronunciation": "luhn-dee", "audio_id": "day_monday", "note": "From 'lune' (moon)"},
            {"french": "mardi", "english": "Tuesday", "pronunciation": "mar-dee", "audio_id": "day_tuesday", "note": "From Mars (god of war)"},
            {"french": "mercredi", "english": "Wednesday", "pronunciation": "mehr-kruh-dee", "audio_id": "day_wednesday", "note": "From Mercury"},
            {"french": "jeudi", "english": "Thursday", "pronunciation": "zhuh-dee", "audio_id": "day_thursday", "note": "From Jupiter"},
            {"french": "vendredi", "english": "Friday", "pronunciation": "vahn-druh-dee", "audio_id": "day_friday", "note": "From Venus"},
            {"french": "samedi", "english": "Saturday", "pronunciation": "sam-dee", "audio_id": "day_saturday", "note": "From Saturn"},
            {"french": "dimanche", "english": "Sunday", "pronunciation": "dee-mahnsh", "audio_id": "day_sunday", "note": "Day of the Lord"},
            {"french": "aujourd'hui", "english": "today", "pronunciation": "oh-zhoor-dwee", "audio_id": "day_today"},
            {"french": "demain", "english": "tomorrow", "pronunciation": "duh-man", "audio_id": "day_tomorrow"},
            {"french": "hier", "english": "yesterday", "pronunciation": "ee-air", "audio_id": "day_yesterday"},
            {"french": "la semaine", "english": "the week", "pronunciation": "lah suh-mehn", "audio_id": "day_week"},
            {"french": "le week-end", "english": "the weekend", "pronunciation": "luh week-end", "audio_id": "day_weekend"}
        ],
        "grammar_points": [
            "Days are NOT capitalized in French",
            "No article needed: 'lundi' = 'on Monday'",
            "Add 'le' for recurring: 'le lundi' = 'on Mondays'",
            "The week starts on Monday in France"
        ],
        "content": {
            "intro": "Knowing the days of the week is essential for making plans, appointments, and understanding schedules in French.",
            "main_text": "French days come from Roman gods and celestial bodies. Notice they all end in '-di' except Sunday (dimanche). In France, the week officially starts on Monday!",
            "tips": [
                "French days are NEVER capitalized",
                "Practice saying your weekly schedule in French",
                "Most French calendars start with Monday"
            ]
        },
        "xp_reward": 20
    },
    {
        "id": "m1w1d5",
        "month": 1,
        "week": 1,
        "day": 5,
        "title": "Months & Seasons",
        "title_fr": "Les mois et les saisons",
        "description": "Learn the twelve months and four seasons in French.",
        "skill_focus": ["vocabulary", "speaking"],
        "vocabulary": [
            {"french": "janvier", "english": "January", "pronunciation": "zhahn-vee-ay", "audio_id": "month_jan"},
            {"french": "février", "english": "February", "pronunciation": "fay-vree-ay", "audio_id": "month_feb"},
            {"french": "mars", "english": "March", "pronunciation": "mars", "audio_id": "month_mar"},
            {"french": "avril", "english": "April", "pronunciation": "ah-vreel", "audio_id": "month_apr"},
            {"french": "mai", "english": "May", "pronunciation": "may", "audio_id": "month_may"},
            {"french": "juin", "english": "June", "pronunciation": "zhwan", "audio_id": "month_jun"},
            {"french": "juillet", "english": "July", "pronunciation": "zhwee-yay", "audio_id": "month_jul"},
            {"french": "août", "english": "August", "pronunciation": "oot", "audio_id": "month_aug"},
            {"french": "septembre", "english": "September", "pronunciation": "sep-tahmbr", "audio_id": "month_sep"},
            {"french": "octobre", "english": "October", "pronunciation": "ok-tobr", "audio_id": "month_oct"},
            {"french": "novembre", "english": "November", "pronunciation": "noh-vahmbr", "audio_id": "month_nov"},
            {"french": "décembre", "english": "December", "pronunciation": "day-sahmbr", "audio_id": "month_dec"},
            {"french": "le printemps", "english": "spring", "pronunciation": "luh pran-tahn", "audio_id": "season_spring"},
            {"french": "l'été", "english": "summer", "pronunciation": "lay-tay", "audio_id": "season_summer"},
            {"french": "l'automne", "english": "autumn/fall", "pronunciation": "loh-ton", "audio_id": "season_autumn"},
            {"french": "l'hiver", "english": "winter", "pronunciation": "lee-vair", "audio_id": "season_winter"}
        ],
        "grammar_points": [
            "Months are NOT capitalized in French",
            "Use 'en' for months: 'en janvier' = 'in January'",
            "Use 'au' for spring: 'au printemps'",
            "Use 'en' for other seasons: 'en été', 'en automne', 'en hiver'"
        ],
        "content": {
            "intro": "Knowing months and seasons helps you talk about birthdays, holidays, weather, and travel plans!",
            "main_text": "French months are similar to English - they come from the same Latin roots. Like days, they're never capitalized in French.",
            "tips": [
                "Practice saying your birthday in French",
                "August (août) has a tricky pronunciation - the 'a' is silent!",
                "Many French people take vacation in August (les grandes vacances)"
            ],
            "cultural_note": "July 14th (le quatorze juillet) is France's National Day - Bastille Day!"
        },
        "xp_reward": 25
    },
    # Week 2: Colors & Basic Descriptions
    {
        "id": "m1w2d1",
        "month": 1,
        "week": 2,
        "day": 1,
        "title": "Colors",
        "title_fr": "Les couleurs",
        "description": "Learn to describe things using colors in French.",
        "skill_focus": ["vocabulary", "grammar"],
        "vocabulary": [
            {"french": "rouge", "english": "red", "pronunciation": "roozh", "audio_id": "color_red"},
            {"french": "bleu/bleue", "english": "blue", "pronunciation": "bluh", "audio_id": "color_blue"},
            {"french": "vert/verte", "english": "green", "pronunciation": "vehr/vehrt", "audio_id": "color_green"},
            {"french": "jaune", "english": "yellow", "pronunciation": "zhohn", "audio_id": "color_yellow"},
            {"french": "orange", "english": "orange", "pronunciation": "oh-rahnzh", "audio_id": "color_orange"},
            {"french": "violet/violette", "english": "purple", "pronunciation": "vee-oh-lay/vee-oh-let", "audio_id": "color_purple"},
            {"french": "rose", "english": "pink", "pronunciation": "rohz", "audio_id": "color_pink"},
            {"french": "noir/noire", "english": "black", "pronunciation": "nwahr", "audio_id": "color_black"},
            {"french": "blanc/blanche", "english": "white", "pronunciation": "blahn/blahnsh", "audio_id": "color_white"},
            {"french": "gris/grise", "english": "gray", "pronunciation": "gree/greez", "audio_id": "color_gray"},
            {"french": "marron", "english": "brown", "pronunciation": "mah-rohn", "audio_id": "color_brown"},
            {"french": "beige", "english": "beige", "pronunciation": "behzh", "audio_id": "color_beige"}
        ],
        "grammar_points": [
            "Colors are adjectives - they come AFTER the noun",
            "Most colors change form for feminine: vert → verte",
            "Colors ending in 'e' don't change: rouge, jaune, rose",
            "'Marron' and 'orange' NEVER change form"
        ],
        "content": {
            "intro": "Colors help you describe the world around you! In French, colors work as adjectives and follow specific rules.",
            "main_text": "Most French colors have masculine and feminine forms. The color goes AFTER the noun: 'une voiture rouge' (a red car). Some colors like 'marron' and 'orange' never change.",
            "examples": [
                {"french": "Le ciel est bleu.", "english": "The sky is blue."},
                {"french": "La rose est rouge.", "english": "The rose is red."},
                {"french": "J'ai une voiture noire.", "english": "I have a black car."},
                {"french": "Les feuilles sont vertes.", "english": "The leaves are green."}
            ]
        },
        "xp_reward": 25
    },
    {
        "id": "m1w2d2",
        "month": 1,
        "week": 2,
        "day": 2,
        "title": "Introducing Yourself",
        "title_fr": "Se présenter",
        "description": "Learn to introduce yourself and ask about others.",
        "skill_focus": ["speaking", "listening", "vocabulary"],
        "vocabulary": [
            {"french": "Je m'appelle...", "english": "My name is...", "pronunciation": "zhuh mah-pel", "audio_id": "intro_name"},
            {"french": "Comment tu t'appelles?", "english": "What's your name? (informal)", "pronunciation": "koh-mahn too tah-pel", "audio_id": "intro_askname_inf"},
            {"french": "Comment vous appelez-vous?", "english": "What's your name? (formal)", "pronunciation": "koh-mahn vooz ah-play voo", "audio_id": "intro_askname_for"},
            {"french": "J'ai ... ans", "english": "I am ... years old", "pronunciation": "zhay ... ahn", "audio_id": "intro_age"},
            {"french": "Quel âge as-tu?", "english": "How old are you? (informal)", "pronunciation": "kell ahzh ah too", "audio_id": "intro_askage_inf"},
            {"french": "J'habite à...", "english": "I live in...", "pronunciation": "zhah-beet ah", "audio_id": "intro_live"},
            {"french": "Je suis...", "english": "I am...", "pronunciation": "zhuh swee", "audio_id": "intro_iam"},
            {"french": "Je suis étudiant(e)", "english": "I am a student", "pronunciation": "zhuh swee ay-too-dee-ahn(t)", "audio_id": "intro_student"},
            {"french": "Enchanté(e)", "english": "Nice to meet you", "pronunciation": "ahn-shahn-tay", "audio_id": "intro_nice"},
            {"french": "Je viens de...", "english": "I come from...", "pronunciation": "zhuh vee-en duh", "audio_id": "intro_from"},
            {"french": "Je suis américain(e)", "english": "I am American", "pronunciation": "zhuh swee ah-may-ree-kan", "audio_id": "intro_american"},
            {"french": "Je parle anglais", "english": "I speak English", "pronunciation": "zhuh parl ahn-glay", "audio_id": "intro_speak"}
        ],
        "grammar_points": [
            "'Je m'appelle' literally means 'I call myself'",
            "Use 'J'ai' + number + 'ans' for age (I have X years)",
            "Add 'e' to adjectives for feminine forms",
            "Nationalities are NOT capitalized in French"
        ],
        "content": {
            "intro": "Being able to introduce yourself is one of the most important skills! Let's learn how to share basic information about yourself.",
            "main_text": "French introductions follow a pattern: name, age, where you're from, and what you do. Notice that French uses 'avoir' (to have) for age: 'J'ai 25 ans' = 'I have 25 years'.",
            "tips": [
                "Practice your introduction out loud every day",
                "Add 'e' to adjectives when describing yourself as female",
                "Nationalities are lowercase in French: 'américain' not 'Américain'"
            ]
        },
        "dialogues": [
            {
                "title": "Meeting someone new",
                "lines": [
                    {"speaker": "A", "french": "Bonjour! Je m'appelle Marie. Et toi?", "english": "Hello! My name is Marie. And you?"},
                    {"speaker": "B", "french": "Salut! Je m'appelle Thomas. Enchanté!", "english": "Hi! My name is Thomas. Nice to meet you!"},
                    {"speaker": "A", "french": "Enchanté! Tu as quel âge?", "english": "Nice to meet you! How old are you?"},
                    {"speaker": "B", "french": "J'ai vingt-deux ans. Et toi?", "english": "I'm 22 years old. And you?"},
                    {"speaker": "A", "french": "J'ai vingt ans. Tu habites où?", "english": "I'm 20. Where do you live?"},
                    {"speaker": "B", "french": "J'habite à Paris. Je suis étudiant.", "english": "I live in Paris. I'm a student."}
                ]
            }
        ],
        "xp_reward": 30
    },
    {
        "id": "m1w2d3",
        "month": 1,
        "week": 2,
        "day": 3,
        "title": "Basic Questions",
        "title_fr": "Les questions de base",
        "description": "Learn essential question words and how to ask simple questions.",
        "skill_focus": ["speaking", "grammar"],
        "vocabulary": [
            {"french": "Qui?", "english": "Who?", "pronunciation": "kee", "audio_id": "q_who"},
            {"french": "Quoi? / Que?", "english": "What?", "pronunciation": "kwah / kuh", "audio_id": "q_what"},
            {"french": "Où?", "english": "Where?", "pronunciation": "oo", "audio_id": "q_where"},
            {"french": "Quand?", "english": "When?", "pronunciation": "kahn", "audio_id": "q_when"},
            {"french": "Comment?", "english": "How?", "pronunciation": "koh-mahn", "audio_id": "q_how"},
            {"french": "Pourquoi?", "english": "Why?", "pronunciation": "poor-kwah", "audio_id": "q_why"},
            {"french": "Combien?", "english": "How much/many?", "pronunciation": "kohm-bee-en", "audio_id": "q_howmuch"},
            {"french": "Quel/Quelle?", "english": "Which/What?", "pronunciation": "kell", "audio_id": "q_which"},
            {"french": "Est-ce que...?", "english": "(turns statement into question)", "pronunciation": "ess-kuh", "audio_id": "q_estceque"},
            {"french": "Qu'est-ce que c'est?", "english": "What is this?", "pronunciation": "kess-kuh say", "audio_id": "q_whatisthis"},
            {"french": "Comment ça va?", "english": "How are you?", "pronunciation": "koh-mahn sah vah", "audio_id": "q_howareyou"},
            {"french": "Ça va?", "english": "How's it going? (informal)", "pronunciation": "sah vah", "audio_id": "q_cava"}
        ],
        "grammar_points": [
            "Raise your voice at the end to make a question",
            "Add 'Est-ce que' before a statement to make it a question",
            "Inversion is formal: 'Parlez-vous anglais?'",
            "'Quel' agrees with the noun: quel/quelle/quels/quelles"
        ],
        "content": {
            "intro": "Questions are essential for conversations! Learn these question words and you'll be able to ask about anything.",
            "main_text": "French has three ways to ask yes/no questions: raise intonation (Tu parles français?), use 'est-ce que' (Est-ce que tu parles français?), or inversion (Parles-tu français?).",
            "examples": [
                {"french": "Comment tu t'appelles?", "english": "What's your name?"},
                {"french": "Où habites-tu?", "english": "Where do you live?"},
                {"french": "Pourquoi tu apprends le français?", "english": "Why are you learning French?"},
                {"french": "Combien ça coûte?", "english": "How much does it cost?"}
            ]
        },
        "xp_reward": 25
    },
    {
        "id": "m1w2d4",
        "month": 1,
        "week": 2,
        "day": 4,
        "title": "Numbers 21-100",
        "title_fr": "Les nombres 21-100",
        "description": "Expand your number knowledge to count up to 100.",
        "skill_focus": ["vocabulary", "speaking"],
        "vocabulary": [
            {"french": "vingt et un", "english": "21", "pronunciation": "van-tay-uhn", "audio_id": "num_21"},
            {"french": "vingt-deux", "english": "22", "pronunciation": "van-duh", "audio_id": "num_22"},
            {"french": "trente", "english": "30", "pronunciation": "trahnt", "audio_id": "num_30"},
            {"french": "quarante", "english": "40", "pronunciation": "kah-rahnt", "audio_id": "num_40"},
            {"french": "cinquante", "english": "50", "pronunciation": "san-kahnt", "audio_id": "num_50"},
            {"french": "soixante", "english": "60", "pronunciation": "swah-sahnt", "audio_id": "num_60"},
            {"french": "soixante-dix", "english": "70", "pronunciation": "swah-sahnt-dees", "audio_id": "num_70"},
            {"french": "soixante et onze", "english": "71", "pronunciation": "swah-sahnt-ay-onz", "audio_id": "num_71"},
            {"french": "quatre-vingts", "english": "80", "pronunciation": "katr-van", "audio_id": "num_80"},
            {"french": "quatre-vingt-un", "english": "81", "pronunciation": "katr-van-uhn", "audio_id": "num_81"},
            {"french": "quatre-vingt-dix", "english": "90", "pronunciation": "katr-van-dees", "audio_id": "num_90"},
            {"french": "quatre-vingt-onze", "english": "91", "pronunciation": "katr-van-onz", "audio_id": "num_91"},
            {"french": "cent", "english": "100", "pronunciation": "sahn", "audio_id": "num_100"}
        ],
        "grammar_points": [
            "21, 31, 41, 51, 61 use 'et un' (no hyphen)",
            "70 = 60+10 (soixante-dix)",
            "80 = 4×20 (quatre-vingts) - note the 's'!",
            "90 = 4×20+10 (quatre-vingt-dix)",
            "81-99 drop the 's' from quatre-vingts"
        ],
        "content": {
            "intro": "French numbers get interesting after 60! The system uses base-20 counting for 70, 80, and 90.",
            "main_text": "70 is 'sixty-ten', 80 is 'four-twenties', and 90 is 'four-twenty-ten'. This comes from an old Celtic counting system. It takes practice, but you'll get used to it!",
            "tips": [
                "Practice counting by tens: 10, 20, 30...",
                "For 70s: 60 + teens (soixante-dix, soixante-onze...)",
                "For 90s: 80 + teens (quatre-vingt-dix, quatre-vingt-onze...)",
                "Belgium and Switzerland use 'septante' (70) and 'nonante' (90)"
            ]
        },
        "xp_reward": 30
    },
    {
        "id": "m1w2d5",
        "month": 1,
        "week": 2,
        "day": 5,
        "title": "Common Objects",
        "title_fr": "Les objets courants",
        "description": "Learn vocabulary for everyday objects around you.",
        "skill_focus": ["vocabulary"],
        "vocabulary": [
            {"french": "un livre", "english": "a book", "pronunciation": "uhn leevr", "gender": "m", "audio_id": "obj_book"},
            {"french": "un stylo", "english": "a pen", "pronunciation": "uhn stee-loh", "gender": "m", "audio_id": "obj_pen"},
            {"french": "un crayon", "english": "a pencil", "pronunciation": "uhn kray-ohn", "gender": "m", "audio_id": "obj_pencil"},
            {"french": "un cahier", "english": "a notebook", "pronunciation": "uhn kah-yay", "gender": "m", "audio_id": "obj_notebook"},
            {"french": "une table", "english": "a table", "pronunciation": "oon tahbl", "gender": "f", "audio_id": "obj_table"},
            {"french": "une chaise", "english": "a chair", "pronunciation": "oon shehz", "gender": "f", "audio_id": "obj_chair"},
            {"french": "une fenêtre", "english": "a window", "pronunciation": "oon fuh-nehtr", "gender": "f", "audio_id": "obj_window"},
            {"french": "une porte", "english": "a door", "pronunciation": "oon port", "gender": "f", "audio_id": "obj_door"},
            {"french": "un téléphone", "english": "a phone", "pronunciation": "uhn tay-lay-fon", "gender": "m", "audio_id": "obj_phone"},
            {"french": "un ordinateur", "english": "a computer", "pronunciation": "uhn or-dee-nah-tuhr", "gender": "m", "audio_id": "obj_computer"},
            {"french": "une clé", "english": "a key", "pronunciation": "oon clay", "gender": "f", "audio_id": "obj_key"},
            {"french": "un sac", "english": "a bag", "pronunciation": "uhn sahk", "gender": "m", "audio_id": "obj_bag"}
        ],
        "grammar_points": [
            "Every French noun has a gender (masculine or feminine)",
            "'Un' = a/an (masculine), 'Une' = a/an (feminine)",
            "Learn each noun WITH its article",
            "There's no logical rule for gender - memorize them!"
        ],
        "content": {
            "intro": "In French, every noun has a gender - it's either masculine or feminine. This affects the articles and adjectives you use with them.",
            "main_text": "Always learn new nouns with their articles (un/une). This will help you remember the gender. 'Un livre' (masculine), 'une table' (feminine). Eventually, it will become natural!",
            "tips": [
                "ALWAYS learn new words with un/une",
                "Words ending in -tion are usually feminine",
                "Words ending in -ment are usually masculine",
                "There are exceptions - when in doubt, look it up!"
            ]
        },
        "xp_reward": 25
    },
    # Week 3: Simple Sentences
    {
        "id": "m1w3d1",
        "month": 1,
        "week": 3,
        "day": 1,
        "title": "Subject Pronouns",
        "title_fr": "Les pronoms sujets",
        "description": "Learn the French subject pronouns - the foundation of sentence building.",
        "skill_focus": ["grammar", "vocabulary"],
        "vocabulary": [
            {"french": "je", "english": "I", "pronunciation": "zhuh", "audio_id": "pro_je"},
            {"french": "tu", "english": "you (informal)", "pronunciation": "too", "audio_id": "pro_tu"},
            {"french": "il", "english": "he/it", "pronunciation": "eel", "audio_id": "pro_il"},
            {"french": "elle", "english": "she/it", "pronunciation": "ell", "audio_id": "pro_elle"},
            {"french": "on", "english": "one/we (informal)", "pronunciation": "ohn", "audio_id": "pro_on"},
            {"french": "nous", "english": "we", "pronunciation": "noo", "audio_id": "pro_nous"},
            {"french": "vous", "english": "you (formal/plural)", "pronunciation": "voo", "audio_id": "pro_vous"},
            {"french": "ils", "english": "they (masculine/mixed)", "pronunciation": "eel", "audio_id": "pro_ils"},
            {"french": "elles", "english": "they (all feminine)", "pronunciation": "ell", "audio_id": "pro_elles"}
        ],
        "grammar_points": [
            "'Tu' is for friends, family, children, pets",
            "'Vous' is formal OR plural (like English 'you all')",
            "'On' is very common in spoken French (= we)",
            "'Ils' is used for mixed groups (even 1 male + 99 females!)"
        ],
        "content": {
            "intro": "Subject pronouns are the subjects of sentences - they tell us WHO is doing the action. French has more pronouns than English!",
            "main_text": "The biggest difference from English: French has formal (vous) and informal (tu) versions of 'you'. Use 'tu' with friends, 'vous' with strangers, elders, or in formal situations. When in doubt, use 'vous'!",
            "tips": [
                "Use 'vous' with anyone you'd call 'Mr.' or 'Ms.'",
                "'On' is extremely common in casual speech",
                "Don't be offended if someone 'vous-voies' you!"
            ],
            "cultural_note": "Switching from 'vous' to 'tu' (called 'tutoiement') is a significant step in French relationships!"
        },
        "xp_reward": 25
    },
    {
        "id": "m1w3d2",
        "month": 1,
        "week": 3,
        "day": 2,
        "title": "The Verb 'Être' (To Be)",
        "title_fr": "Le verbe 'être'",
        "description": "Master the most important French verb - être (to be).",
        "skill_focus": ["grammar", "speaking"],
        "vocabulary": [
            {"french": "je suis", "english": "I am", "pronunciation": "zhuh swee", "audio_id": "etre_je"},
            {"french": "tu es", "english": "you are (informal)", "pronunciation": "too ay", "audio_id": "etre_tu"},
            {"french": "il/elle/on est", "english": "he/she/one is", "pronunciation": "eel/ell/ohn ay", "audio_id": "etre_il"},
            {"french": "nous sommes", "english": "we are", "pronunciation": "noo som", "audio_id": "etre_nous"},
            {"french": "vous êtes", "english": "you are (formal/plural)", "pronunciation": "vooz ett", "audio_id": "etre_vous"},
            {"french": "ils/elles sont", "english": "they are", "pronunciation": "eel/ell sohn", "audio_id": "etre_ils"}
        ],
        "grammar_points": [
            "'Être' is irregular - memorize all forms",
            "Used for: identity, profession, nationality, descriptions",
            "Used with adjectives: 'Je suis fatigué' (I am tired)",
            "Forms the passé composé with some verbs"
        ],
        "content": {
            "intro": "'Être' is one of the most used verbs in French. You'll use it constantly to describe yourself and others!",
            "main_text": "Unlike English where 'to be' is just 'am/is/are', French 'être' has six different forms. Each pronoun has its unique form that must be memorized.",
            "examples": [
                {"french": "Je suis étudiant.", "english": "I am a student."},
                {"french": "Elle est française.", "english": "She is French."},
                {"french": "Nous sommes fatigués.", "english": "We are tired."},
                {"french": "Vous êtes très gentil.", "english": "You are very kind."},
                {"french": "Ils sont à Paris.", "english": "They are in Paris."}
            ],
            "tips": [
                "No article before professions: 'Je suis professeur' NOT 'Je suis un professeur'",
                "Adjectives must agree with the subject's gender",
                "Practice conjugating out loud daily"
            ]
        },
        "xp_reward": 30
    },
    {
        "id": "m1w3d3",
        "month": 1,
        "week": 3,
        "day": 3,
        "title": "The Verb 'Avoir' (To Have)",
        "title_fr": "Le verbe 'avoir'",
        "description": "Learn the essential verb 'avoir' - used for possession, age, and many expressions.",
        "skill_focus": ["grammar", "speaking"],
        "vocabulary": [
            {"french": "j'ai", "english": "I have", "pronunciation": "zhay", "audio_id": "avoir_je"},
            {"french": "tu as", "english": "you have (informal)", "pronunciation": "too ah", "audio_id": "avoir_tu"},
            {"french": "il/elle/on a", "english": "he/she/one has", "pronunciation": "eel/ell/ohn ah", "audio_id": "avoir_il"},
            {"french": "nous avons", "english": "we have", "pronunciation": "nooz ah-vohn", "audio_id": "avoir_nous"},
            {"french": "vous avez", "english": "you have (formal/plural)", "pronunciation": "vooz ah-vay", "audio_id": "avoir_vous"},
            {"french": "ils/elles ont", "english": "they have", "pronunciation": "eelz/ellz ohn", "audio_id": "avoir_ils"},
            {"french": "avoir faim", "english": "to be hungry", "pronunciation": "ah-vwahr fam", "audio_id": "avoir_faim"},
            {"french": "avoir soif", "english": "to be thirsty", "pronunciation": "ah-vwahr swahf", "audio_id": "avoir_soif"},
            {"french": "avoir chaud", "english": "to be hot", "pronunciation": "ah-vwahr shoh", "audio_id": "avoir_chaud"},
            {"french": "avoir froid", "english": "to be cold", "pronunciation": "ah-vwahr frwah", "audio_id": "avoir_froid"},
            {"french": "avoir peur", "english": "to be afraid", "pronunciation": "ah-vwahr puhr", "audio_id": "avoir_peur"},
            {"french": "avoir raison", "english": "to be right", "pronunciation": "ah-vwahr ray-zohn", "audio_id": "avoir_raison"},
            {"french": "avoir tort", "english": "to be wrong", "pronunciation": "ah-vwahr tor", "audio_id": "avoir_tort"}
        ],
        "grammar_points": [
            "'Avoir' is irregular - memorize all forms",
            "Used for age: 'J'ai 25 ans' (I am 25 years old)",
            "Many expressions use 'avoir' where English uses 'to be'",
            "'J'ai' has an apostrophe because 'je' + vowel"
        ],
        "content": {
            "intro": "'Avoir' means 'to have', but it's used in many expressions where English uses 'to be'. You'll use this verb constantly!",
            "main_text": "French uses 'avoir' for many sensations and states: hunger, thirst, heat, cold, fear. You're not 'being hungry', you 'have hunger'! Also used for age: 'J'ai 20 ans' = 'I have 20 years'.",
            "examples": [
                {"french": "J'ai un chat.", "english": "I have a cat."},
                {"french": "Tu as quel âge?", "english": "How old are you?"},
                {"french": "J'ai faim!", "english": "I'm hungry!"},
                {"french": "Elle a froid.", "english": "She's cold."},
                {"french": "Nous avons soif.", "english": "We're thirsty."},
                {"french": "Vous avez raison.", "english": "You're right."}
            ]
        },
        "xp_reward": 30
    },
    {
        "id": "m1w3d4",
        "month": 1,
        "week": 3,
        "day": 4,
        "title": "Articles (The, A, An)",
        "title_fr": "Les articles",
        "description": "Master French articles - definite, indefinite, and partitive.",
        "skill_focus": ["grammar"],
        "vocabulary": [
            {"french": "le", "english": "the (masculine singular)", "pronunciation": "luh", "audio_id": "art_le"},
            {"french": "la", "english": "the (feminine singular)", "pronunciation": "lah", "audio_id": "art_la"},
            {"french": "l'", "english": "the (before vowel)", "pronunciation": "l", "audio_id": "art_l"},
            {"french": "les", "english": "the (plural)", "pronunciation": "lay", "audio_id": "art_les"},
            {"french": "un", "english": "a/an (masculine)", "pronunciation": "uhn", "audio_id": "art_un"},
            {"french": "une", "english": "a/an (feminine)", "pronunciation": "oon", "audio_id": "art_une"},
            {"french": "des", "english": "some (plural)", "pronunciation": "day", "audio_id": "art_des"},
            {"french": "du", "english": "some (masculine)", "pronunciation": "doo", "audio_id": "art_du"},
            {"french": "de la", "english": "some (feminine)", "pronunciation": "duh lah", "audio_id": "art_dela"},
            {"french": "de l'", "english": "some (before vowel)", "pronunciation": "duh l", "audio_id": "art_del"}
        ],
        "grammar_points": [
            "Definite articles (le/la/les) = 'the' - specific",
            "Indefinite articles (un/une/des) = 'a/an/some'",
            "Partitive articles (du/de la/de l') = 'some' with uncountable",
            "Use 'l'' before vowels: l'ami, l'eau, l'hôtel"
        ],
        "content": {
            "intro": "French uses articles more than English! Almost every noun needs an article. Let's master them!",
            "main_text": "French has THREE types of articles: definite (the), indefinite (a/an/some), and partitive (some of). The partitive is used for things you can't count: du pain (some bread), de l'eau (some water).",
            "examples": [
                {"french": "Le chat est noir.", "english": "The cat is black."},
                {"french": "J'ai un chat.", "english": "I have a cat."},
                {"french": "Je veux du pain.", "english": "I want some bread."},
                {"french": "Les enfants jouent.", "english": "The children are playing."},
                {"french": "Elle boit de l'eau.", "english": "She drinks (some) water."}
            ]
        },
        "xp_reward": 30
    },
    {
        "id": "m1w3d5",
        "month": 1,
        "week": 3,
        "day": 5,
        "title": "Making Simple Sentences",
        "title_fr": "Construire des phrases simples",
        "description": "Put it all together - create your first French sentences!",
        "skill_focus": ["grammar", "speaking", "writing"],
        "vocabulary": [
            {"french": "C'est...", "english": "It's... / This is...", "pronunciation": "say", "audio_id": "sent_cest"},
            {"french": "Il y a...", "english": "There is... / There are...", "pronunciation": "eel ee ah", "audio_id": "sent_ilya"},
            {"french": "Voici...", "english": "Here is...", "pronunciation": "vwah-see", "audio_id": "sent_voici"},
            {"french": "Voilà...", "english": "There is... / There you go", "pronunciation": "vwah-lah", "audio_id": "sent_voila"},
            {"french": "aussi", "english": "also/too", "pronunciation": "oh-see", "audio_id": "sent_aussi"},
            {"french": "très", "english": "very", "pronunciation": "tray", "audio_id": "sent_tres"},
            {"french": "mais", "english": "but", "pronunciation": "may", "audio_id": "sent_mais"},
            {"french": "et", "english": "and", "pronunciation": "ay", "audio_id": "sent_et"},
            {"french": "ou", "english": "or", "pronunciation": "oo", "audio_id": "sent_ou"},
            {"french": "parce que", "english": "because", "pronunciation": "pars-kuh", "audio_id": "sent_parceque"}
        ],
        "grammar_points": [
            "Basic sentence: Subject + Verb + Object",
            "Adjectives usually come AFTER the noun",
            "Some short adjectives come before: petit, grand, beau, bon",
            "'Ne...pas' goes around the verb for negation"
        ],
        "content": {
            "intro": "Now let's combine everything you've learned to make real French sentences!",
            "main_text": "French sentence structure is similar to English: Subject + Verb + Object. 'Je mange une pomme' = 'I eat an apple'. The main difference is that most adjectives come AFTER the noun: 'une voiture rouge' (a red car).",
            "examples": [
                {"french": "Je suis étudiant.", "english": "I am a student."},
                {"french": "C'est une belle maison.", "english": "It's a beautiful house."},
                {"french": "Il y a un chat noir.", "english": "There is a black cat."},
                {"french": "J'aime le chocolat.", "english": "I like chocolate."},
                {"french": "Elle est très gentille.", "english": "She is very nice."},
                {"french": "Je parle français et anglais.", "english": "I speak French and English."}
            ],
            "tips": [
                "Practice making sentences with new vocabulary",
                "Start simple: subject + être/avoir + adjective/noun",
                "Gradually add connectors: et, mais, parce que"
            ]
        },
        "xp_reward": 35
    },
    # Week 4: Practice & Review
    {
        "id": "m1w4d1",
        "month": 1,
        "week": 4,
        "day": 1,
        "title": "Basic Adjectives",
        "title_fr": "Les adjectifs de base",
        "description": "Learn common adjectives to describe people and things.",
        "skill_focus": ["vocabulary", "grammar"],
        "vocabulary": [
            {"french": "grand/grande", "english": "big/tall", "pronunciation": "grahn/grahnd", "audio_id": "adj_grand"},
            {"french": "petit/petite", "english": "small/short", "pronunciation": "puh-tee/puh-teet", "audio_id": "adj_petit"},
            {"french": "beau/belle", "english": "beautiful/handsome", "pronunciation": "boh/bell", "audio_id": "adj_beau"},
            {"french": "bon/bonne", "english": "good", "pronunciation": "bohn/bon", "audio_id": "adj_bon"},
            {"french": "mauvais/mauvaise", "english": "bad", "pronunciation": "moh-vay/moh-vez", "audio_id": "adj_mauvais"},
            {"french": "nouveau/nouvelle", "english": "new", "pronunciation": "noo-voh/noo-vell", "audio_id": "adj_nouveau"},
            {"french": "vieux/vieille", "english": "old", "pronunciation": "vyuh/vyay", "audio_id": "adj_vieux"},
            {"french": "jeune", "english": "young", "pronunciation": "zhuhn", "audio_id": "adj_jeune"},
            {"french": "content/contente", "english": "happy/pleased", "pronunciation": "kohn-tahn/kohn-tahnt", "audio_id": "adj_content"},
            {"french": "triste", "english": "sad", "pronunciation": "treest", "audio_id": "adj_triste"},
            {"french": "fatigué/fatiguée", "english": "tired", "pronunciation": "fah-tee-gay", "audio_id": "adj_fatigue"},
            {"french": "gentil/gentille", "english": "nice/kind", "pronunciation": "zhahn-tee/zhahn-tee", "audio_id": "adj_gentil"},
            {"french": "intelligent/intelligente", "english": "intelligent", "pronunciation": "an-tel-ee-zhahn/an-tel-ee-zhahnt", "audio_id": "adj_intelligent"},
            {"french": "intéressant/intéressante", "english": "interesting", "pronunciation": "an-tay-ray-sahn/an-tay-ray-sahnt", "audio_id": "adj_interessant"}
        ],
        "grammar_points": [
            "Adjectives agree in gender and number with the noun",
            "Add -e for feminine (if not already ending in -e)",
            "Add -s for plural",
            "BANGS adjectives go BEFORE the noun: Beauty, Age, Number, Goodness, Size"
        ],
        "content": {
            "intro": "Adjectives bring your French to life! They let you describe everything around you.",
            "main_text": "Most adjectives add -e for feminine and -s for plural. Some adjectives (BANGS: Beauty, Age, Number, Goodness, Size) go before the noun: 'une belle femme', 'un petit chat'. Most others go after: 'un livre intéressant'.",
            "examples": [
                {"french": "C'est un grand homme.", "english": "He's a tall man."},
                {"french": "Elle a une petite maison.", "english": "She has a small house."},
                {"french": "C'est une femme intelligente.", "english": "She's an intelligent woman."},
                {"french": "Les vieilles églises sont belles.", "english": "Old churches are beautiful."}
            ]
        },
        "xp_reward": 30
    },
    {
        "id": "m1w4d2",
        "month": 1,
        "week": 4,
        "day": 2,
        "title": "Negation",
        "title_fr": "La négation",
        "description": "Learn to say 'no' and make negative sentences in French.",
        "skill_focus": ["grammar", "speaking"],
        "vocabulary": [
            {"french": "ne...pas", "english": "not", "pronunciation": "nuh...pah", "audio_id": "neg_pas"},
            {"french": "ne...jamais", "english": "never", "pronunciation": "nuh...zhah-may", "audio_id": "neg_jamais"},
            {"french": "ne...plus", "english": "no longer/no more", "pronunciation": "nuh...ploo", "audio_id": "neg_plus"},
            {"french": "ne...rien", "english": "nothing", "pronunciation": "nuh...ree-en", "audio_id": "neg_rien"},
            {"french": "ne...personne", "english": "no one", "pronunciation": "nuh...pair-son", "audio_id": "neg_personne"},
            {"french": "non", "english": "no", "pronunciation": "nohn", "audio_id": "neg_non"},
            {"french": "pas du tout", "english": "not at all", "pronunciation": "pah doo too", "audio_id": "neg_pasdutout"}
        ],
        "grammar_points": [
            "'Ne' goes before the verb, 'pas' goes after",
            "In spoken French, 'ne' is often dropped",
            "With avoir/être + infinitive: ne + avoir/être + pas + infinitive",
            "'De' replaces articles after negation: pas de pain (not pas du pain)"
        ],
        "content": {
            "intro": "Making sentences negative is easy in French - just sandwich the verb with 'ne...pas'!",
            "main_text": "To make a sentence negative, put 'ne' before the verb and 'pas' after: 'Je parle' → 'Je ne parle pas'. In casual speech, French people often drop the 'ne': 'Je parle pas'.",
            "examples": [
                {"french": "Je ne suis pas fatigué.", "english": "I'm not tired."},
                {"french": "Elle ne parle pas français.", "english": "She doesn't speak French."},
                {"french": "Je n'ai pas de voiture.", "english": "I don't have a car."},
                {"french": "Il ne mange jamais de viande.", "english": "He never eats meat."},
                {"french": "Je ne comprends rien.", "english": "I don't understand anything."}
            ],
            "tips": [
                "'Ne' becomes 'n'' before a vowel: je n'ai pas",
                "Replace un/une/des/du/de la with 'de' after negation",
                "In casual speech, you'll hear 'J'sais pas' (I don't know)"
            ]
        },
        "xp_reward": 30
    },
    {
        "id": "m1w4d3",
        "month": 1,
        "week": 4,
        "day": 3,
        "title": "Month 1 Review - Vocabulary",
        "title_fr": "Révision du mois 1 - Vocabulaire",
        "description": "Review and consolidate all the vocabulary from Month 1.",
        "skill_focus": ["vocabulary", "speaking", "listening"],
        "vocabulary": [],
        "grammar_points": [
            "Review: Alphabet & pronunciation",
            "Review: Greetings & polite expressions",
            "Review: Numbers 0-100",
            "Review: Days, months, seasons",
            "Review: Colors, common objects",
            "Review: Personal introductions"
        ],
        "content": {
            "intro": "Congratulations on completing most of Month 1! Let's review everything you've learned.",
            "main_text": "This lesson focuses on reviewing and reinforcing all vocabulary from the past 3 weeks. Practice makes perfect!",
            "review_categories": [
                "Greetings: Bonjour, Au revoir, Merci, S'il vous plaît...",
                "Numbers: 0-100 with special attention to 70-99",
                "Time: Days, months, seasons, today/tomorrow/yesterday",
                "Colors: Rouge, bleu, vert, jaune...",
                "Objects: Un livre, une table, un stylo...",
                "Introductions: Je m'appelle, J'ai X ans, J'habite à..."
            ]
        },
        "xp_reward": 40
    },
    {
        "id": "m1w4d4",
        "month": 1,
        "week": 4,
        "day": 4,
        "title": "Month 1 Review - Grammar",
        "title_fr": "Révision du mois 1 - Grammaire",
        "description": "Review all grammar concepts from Month 1.",
        "skill_focus": ["grammar", "writing"],
        "vocabulary": [],
        "grammar_points": [
            "Subject pronouns: je, tu, il, elle, on, nous, vous, ils, elles",
            "Être conjugation: suis, es, est, sommes, êtes, sont",
            "Avoir conjugation: ai, as, a, avons, avez, ont",
            "Articles: le/la/les, un/une/des, du/de la/de l'",
            "Adjective agreement: gender and number",
            "Negation: ne...pas, ne...jamais, ne...rien"
        ],
        "content": {
            "intro": "Grammar is the backbone of language. Let's make sure you've mastered Month 1's grammar!",
            "main_text": "Focus on the key grammar structures: être and avoir conjugations, article usage, adjective agreement, and negation.",
            "practice_exercises": [
                "Conjugate être and avoir with all pronouns",
                "Choose the correct article for each noun",
                "Make adjectives agree with their nouns",
                "Convert positive sentences to negative"
            ]
        },
        "xp_reward": 40
    },
    {
        "id": "m1w4d5",
        "month": 1,
        "week": 4,
        "day": 5,
        "title": "Month 1 Final Challenge",
        "title_fr": "Défi final du mois 1",
        "description": "Complete the Month 1 challenge to test all your skills!",
        "skill_focus": ["speaking", "listening", "reading", "writing"],
        "vocabulary": [],
        "grammar_points": [],
        "content": {
            "intro": "You've made it to the end of Month 1! Complete this final challenge to earn your Month 1 badge.",
            "main_text": "This challenge tests all four skills: listening, speaking, reading, and writing. You'll need at least 70% to pass.",
            "challenge_sections": [
                {"name": "Listening", "description": "Listen to audio clips and answer questions"},
                {"name": "Speaking", "description": "Record yourself introducing yourself in French"},
                {"name": "Reading", "description": "Read short passages and answer comprehension questions"},
                {"name": "Writing", "description": "Write a short paragraph about yourself"}
            ]
        },
        "is_assessment": True,
        "xp_reward": 100,
        "badge_reward": "month_1_complete"
    }
]

# Quiz data for Month 1 lessons
MONTH_1_QUIZZES = {
    "m1w1d1": [
        {"question": "How do you pronounce 'E' in French?", "options": ["ee", "euh", "ay", "oh"], "correct_answer": 1, "explanation": "In French, 'E' is pronounced 'euh'", "skill_type": "pronunciation"},
        {"question": "What sound does the French 'R' make?", "options": ["Like English R", "Silent", "In the throat", "Like 'L'"], "correct_answer": 2, "explanation": "The French 'R' is guttural, produced in the throat", "skill_type": "pronunciation"},
        {"question": "The letter 'H' in French is:", "options": ["Always pronounced", "Sometimes silent", "Always silent", "Like English"], "correct_answer": 2, "explanation": "'H' is always silent in French", "skill_type": "pronunciation"}
    ],
    "m1w1d2": [
        {"question": "What does 'Bonjour' mean?", "options": ["Goodbye", "Hello/Good day", "Thank you", "Please"], "correct_answer": 1, "explanation": "'Bonjour' means 'Hello' or 'Good day'", "skill_type": "vocabulary"},
        {"question": "Which greeting is informal?", "options": ["Bonjour", "Bonsoir", "Salut", "Au revoir"], "correct_answer": 2, "explanation": "'Salut' is the informal way to say hi", "skill_type": "vocabulary"},
        {"question": "When do you use 'Bonsoir'?", "options": ["Morning", "Afternoon", "Evening", "Anytime"], "correct_answer": 2, "explanation": "'Bonsoir' is used in the evening", "skill_type": "vocabulary"},
        {"question": "'S'il vous plaît' is:", "options": ["Formal please", "Informal please", "Thank you", "Goodbye"], "correct_answer": 0, "explanation": "'S'il vous plaît' is the formal way to say please", "skill_type": "vocabulary"}
    ],
    "m1w1d3": [
        {"question": "What is 'sept' in English?", "options": ["6", "7", "8", "9"], "correct_answer": 1, "explanation": "'Sept' means 7", "skill_type": "vocabulary"},
        {"question": "How do you say 17 in French?", "options": ["dix-sept", "seize", "dix-huit", "quinze"], "correct_answer": 0, "explanation": "17 is 'dix-sept' (10+7)", "skill_type": "vocabulary"},
        {"question": "What is 'quinze'?", "options": ["14", "15", "16", "17"], "correct_answer": 1, "explanation": "'Quinze' means 15", "skill_type": "vocabulary"}
    ],
    "m1w2d2": [
        {"question": "How do you say 'My name is' in French?", "options": ["J'ai", "Je suis", "Je m'appelle", "J'habite"], "correct_answer": 2, "explanation": "'Je m'appelle' means 'My name is'", "skill_type": "vocabulary"},
        {"question": "To say your age, you use:", "options": ["Je suis", "J'ai", "Je fais", "Je vais"], "correct_answer": 1, "explanation": "French uses 'avoir' for age: 'J'ai 20 ans'", "skill_type": "grammar"},
        {"question": "'Enchanté' means:", "options": ["Goodbye", "Thank you", "Nice to meet you", "How are you?"], "correct_answer": 2, "explanation": "'Enchanté(e)' means 'Nice to meet you'", "skill_type": "vocabulary"}
    ],
    "m1w3d2": [
        {"question": "What is 'nous sommes'?", "options": ["We have", "We are", "You are", "They are"], "correct_answer": 1, "explanation": "'Nous sommes' = we are", "skill_type": "grammar"},
        {"question": "'Je suis' means:", "options": ["I have", "I am", "I go", "I do"], "correct_answer": 1, "explanation": "'Je suis' = I am", "skill_type": "grammar"},
        {"question": "'Vous êtes' is used for:", "options": ["Informal only", "Formal or plural", "Only strangers", "Only friends"], "correct_answer": 1, "explanation": "'Vous êtes' is formal singular OR any plural 'you'", "skill_type": "grammar"}
    ],
    "m1w3d3": [
        {"question": "'J'ai faim' means:", "options": ["I am cold", "I am tired", "I am hungry", "I am thirsty"], "correct_answer": 2, "explanation": "'J'ai faim' = I am hungry (literally: I have hunger)", "skill_type": "vocabulary"},
        {"question": "How do you say 'I have' in French?", "options": ["Je suis", "J'ai", "J'aime", "Je vais"], "correct_answer": 1, "explanation": "'J'ai' = I have", "skill_type": "grammar"},
        {"question": "'Elle a soif' means:", "options": ["She is cold", "She is hungry", "She is thirsty", "She is tired"], "correct_answer": 2, "explanation": "'Elle a soif' = She is thirsty", "skill_type": "vocabulary"}
    ]
}

def get_lesson_timestamp():
    return datetime.now(timezone.utc).isoformat()
