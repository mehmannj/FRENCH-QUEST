"""
Month 2: Building Core Basics
Articles, Noun Gender, Family, Food, Simple Sentences
"""

MONTH_2_LESSONS = [
    {
        "id": "m2w1d1", "month": 2, "week": 1, "day": 1,
        "title": "Articles & Noun Gender", "title_fr": "Les articles et le genre des noms",
        "description": "Learn definite and indefinite articles and understand noun gender in French.",
        "skill_focus": ["grammar", "vocabulary"],
        "vocabulary": [
            {"french": "le", "english": "the (masculine)", "pronunciation": "luh"},
            {"french": "la", "english": "the (feminine)", "pronunciation": "lah"},
            {"french": "les", "english": "the (plural)", "pronunciation": "lay"},
            {"french": "un", "english": "a (masculine)", "pronunciation": "uhn"},
            {"french": "une", "english": "a (feminine)", "pronunciation": "oon"},
            {"french": "des", "english": "some (plural)", "pronunciation": "day"},
            {"french": "le livre", "english": "the book", "pronunciation": "luh leevr"},
            {"french": "la table", "english": "the table", "pronunciation": "lah tahbl"},
            {"french": "les enfants", "english": "the children", "pronunciation": "lay zahn-fahn"},
        ],
        "grammar_points": [
            "Every French noun has a gender: masculine (le) or feminine (la)",
            "Plural nouns use 'les' regardless of gender",
            "Indefinite articles: un (masc), une (fem), des (plural)",
            "You must memorize the gender with each noun"
        ],
        "content": {
            "intro": "One of the biggest differences between French and English is that every noun has a gender!",
            "main_text": "In French, nouns are either masculine or feminine. 'Le' and 'un' go with masculine nouns, 'la' and 'une' go with feminine nouns. For plural, always use 'les' or 'des'.",
            "tips": ["Learn each noun with its article", "Words ending in -tion are usually feminine", "Words ending in -ment are usually masculine"]
        },
        "exercises": [
            {"type": "match", "instructions": "Match the article to the noun"},
            {"type": "fill_blank", "instructions": "Fill in the correct article"}
        ],
        "xp_reward": 25
    },
    {
        "id": "m2w1d2", "month": 2, "week": 1, "day": 2,
        "title": "Family Members", "title_fr": "Les membres de la famille",
        "description": "Learn vocabulary for family members and possessive adjectives.",
        "skill_focus": ["vocabulary", "speaking"],
        "vocabulary": [
            {"french": "la mère", "english": "mother", "pronunciation": "lah mehr"},
            {"french": "le père", "english": "father", "pronunciation": "luh pehr"},
            {"french": "la soeur", "english": "sister", "pronunciation": "lah suhr"},
            {"french": "le frère", "english": "brother", "pronunciation": "luh frehr"},
            {"french": "les parents", "english": "parents", "pronunciation": "lay pah-rahn"},
            {"french": "le fils", "english": "son", "pronunciation": "luh fees"},
            {"french": "la fille", "english": "daughter", "pronunciation": "lah fee"},
            {"french": "les grands-parents", "english": "grandparents", "pronunciation": "lay grahn-pah-rahn"},
            {"french": "mon", "english": "my (masc)", "pronunciation": "mohn"},
            {"french": "ma", "english": "my (fem)", "pronunciation": "mah"},
        ],
        "grammar_points": [
            "Possessives agree with the noun, not the speaker",
            "mon frère (my brother), ma soeur (my sister)",
            "mes parents (my parents) - plural possessive"
        ],
        "content": {
            "intro": "Family is very important in French culture. Let's learn how to talk about yours!",
            "main_text": "To introduce your family, use possessive adjectives: mon (my-masc), ma (my-fem), mes (my-plural). Example: 'Mon père s'appelle Pierre.'",
            "tips": ["Practice introducing your family in French", "Use 'mon' before feminine nouns starting with a vowel"]
        },
        "exercises": [
            {"type": "listen_repeat", "instructions": "Listen and repeat family vocabulary"},
            {"type": "translate", "instructions": "Translate family descriptions"}
        ],
        "xp_reward": 25
    },
    {
        "id": "m2w2d1", "month": 2, "week": 2, "day": 1,
        "title": "Être & Avoir - Essential Verbs", "title_fr": "Être et Avoir - Verbes essentiels",
        "description": "Master the two most important French verbs: être (to be) and avoir (to have).",
        "skill_focus": ["grammar", "speaking"],
        "vocabulary": [
            {"french": "je suis", "english": "I am", "pronunciation": "zhuh swee"},
            {"french": "tu es", "english": "you are (informal)", "pronunciation": "too eh"},
            {"french": "il/elle est", "english": "he/she is", "pronunciation": "eel/el eh"},
            {"french": "nous sommes", "english": "we are", "pronunciation": "noo som"},
            {"french": "vous êtes", "english": "you are (formal/plural)", "pronunciation": "voo zet"},
            {"french": "ils/elles sont", "english": "they are", "pronunciation": "eel/el sohn"},
            {"french": "j'ai", "english": "I have", "pronunciation": "zhay"},
            {"french": "tu as", "english": "you have", "pronunciation": "too ah"},
            {"french": "il/elle a", "english": "he/she has", "pronunciation": "eel/el ah"},
            {"french": "nous avons", "english": "we have", "pronunciation": "noo zah-vohn"},
            {"french": "vous avez", "english": "you have (formal)", "pronunciation": "voo zah-vay"},
            {"french": "ils/elles ont", "english": "they have", "pronunciation": "eel/el ohn"},
        ],
        "grammar_points": [
            "Être (to be) and avoir (to have) are irregular verbs",
            "Age uses avoir: J'ai 20 ans (I am 20 years old)",
            "Descriptions use être: Je suis grand (I am tall)",
            "Many French expressions use avoir where English uses 'to be'"
        ],
        "content": {
            "intro": "Être and avoir are the two most used verbs in French. You'll use them in almost every sentence!",
            "main_text": "These verbs are irregular - they don't follow normal conjugation patterns. You need to memorize each form. A key difference: French uses 'avoir' (to have) for age, hunger, thirst, and temperature.",
            "tips": ["Memorize both conjugation tables", "'J'ai faim' = I am hungry (literally: I have hunger)"]
        },
        "exercises": [
            {"type": "conjugation", "instructions": "Conjugate être and avoir"},
            {"type": "fill_blank", "instructions": "Choose être or avoir for each sentence"}
        ],
        "xp_reward": 30
    },
    {
        "id": "m2w3d1", "month": 2, "week": 3, "day": 1,
        "title": "Food & Drinks", "title_fr": "La nourriture et les boissons",
        "description": "Learn essential food and drink vocabulary for restaurants and daily life.",
        "skill_focus": ["vocabulary", "speaking"],
        "vocabulary": [
            {"french": "le pain", "english": "bread", "pronunciation": "luh pahn"},
            {"french": "le fromage", "english": "cheese", "pronunciation": "luh froh-mahzh"},
            {"french": "le café", "english": "coffee", "pronunciation": "luh kah-fay"},
            {"french": "le thé", "english": "tea", "pronunciation": "luh tay"},
            {"french": "l'eau", "english": "water", "pronunciation": "loh"},
            {"french": "le vin", "english": "wine", "pronunciation": "luh vahn"},
            {"french": "la viande", "english": "meat", "pronunciation": "lah vee-ahnd"},
            {"french": "le poisson", "english": "fish", "pronunciation": "luh pwah-sohn"},
            {"french": "les légumes", "english": "vegetables", "pronunciation": "lay lay-goom"},
            {"french": "les fruits", "english": "fruits", "pronunciation": "lay frwee"},
            {"french": "le dessert", "english": "dessert", "pronunciation": "luh deh-sehr"},
            {"french": "le croissant", "english": "croissant", "pronunciation": "luh kwah-sahn"},
        ],
        "grammar_points": [
            "Use 'Je voudrais...' (I would like) to order politely",
            "Partitive articles: du (masc), de la (fem), des (plural)",
            "'Je prends...' (I'll have) is common when ordering"
        ],
        "content": {
            "intro": "French cuisine is world-famous! Let's learn vocabulary you'll need at restaurants, cafés, and markets.",
            "main_text": "When ordering food in French, be polite: 'Je voudrais un café, s'il vous plaît.' For quantities, use partitive articles: 'du pain' (some bread), 'de la viande' (some meat).",
            "cultural_note": "In France, meals are an important social event. Lunch can last 1-2 hours!"
        },
        "exercises": [
            {"type": "match", "instructions": "Match French food words to English"},
            {"type": "roleplay", "instructions": "Practice ordering at a restaurant"}
        ],
        "xp_reward": 25
    },
    {
        "id": "m2w4d1", "month": 2, "week": 4, "day": 1,
        "title": "Simple Questions", "title_fr": "Les questions simples",
        "description": "Learn to ask and answer basic questions in French.",
        "skill_focus": ["speaking", "grammar"],
        "vocabulary": [
            {"french": "Qui?", "english": "Who?", "pronunciation": "kee"},
            {"french": "Quoi?", "english": "What?", "pronunciation": "kwah"},
            {"french": "Où?", "english": "Where?", "pronunciation": "oo"},
            {"french": "Quand?", "english": "When?", "pronunciation": "kahn"},
            {"french": "Pourquoi?", "english": "Why?", "pronunciation": "poor-kwah"},
            {"french": "Comment?", "english": "How?", "pronunciation": "koh-mahn"},
            {"french": "Combien?", "english": "How much/many?", "pronunciation": "kohm-bee-ehn"},
            {"french": "Est-ce que", "english": "question marker", "pronunciation": "es-kuh"},
        ],
        "grammar_points": [
            "Three ways to ask questions: intonation, est-ce que, inversion",
            "'Est-ce que tu parles français?' = 'Do you speak French?'",
            "Rising intonation: 'Tu parles français?' (informal)"
        ],
        "content": {
            "intro": "Asking questions is essential for any conversation. Let's master French question words!",
            "main_text": "French has three ways to form questions. The simplest is raising your voice at the end. More formal is 'est-ce que' before a statement. Most formal is inversion: 'Parlez-vous français?'"
        },
        "exercises": [
            {"type": "translate", "instructions": "Translate questions to French"},
            {"type": "fill_blank", "instructions": "Complete with the right question word"}
        ],
        "xp_reward": 25
    },
    {
        "id": "m2_assessment", "month": 2, "week": 4, "day": 5,
        "title": "Month 2 Assessment", "title_fr": "Évaluation du Mois 2",
        "description": "Test your knowledge of articles, family, être/avoir, food, and questions.",
        "skill_focus": ["grammar", "vocabulary", "speaking", "listening"],
        "vocabulary": [],
        "grammar_points": [],
        "content": {
            "intro": "Time to test everything you learned in Month 2!",
            "main_text": "This assessment covers articles, family vocabulary, être & avoir conjugation, food vocabulary, and question formation.",
            "sections": [
                {"name": "Grammar", "description": "Articles, conjugation, and sentence structure"},
                {"name": "Vocabulary", "description": "Family, food, and question words"},
                {"name": "Speaking", "description": "Introduce your family and order food"},
                {"name": "Listening", "description": "Understand simple questions and answers"}
            ]
        },
        "is_assessment": True,
        "xp_reward": 100,
        "badge_reward": "month_2_complete"
    }
]

MONTH_2_QUIZZES = {
    "m2w1d1": [
        {"question": "Which article goes with masculine nouns?", "options": ["la", "le", "les", "des"], "correct_answer": 1, "explanation": "'Le' is the definite article for masculine nouns", "skill_type": "grammar"},
        {"question": "'Une' is used for:", "options": ["Masculine singular", "Feminine singular", "Plural", "All nouns"], "correct_answer": 1, "explanation": "'Une' is the indefinite article for feminine singular", "skill_type": "grammar"},
        {"question": "What is the plural definite article?", "options": ["le", "la", "les", "des"], "correct_answer": 2, "explanation": "'Les' is used for all plural nouns regardless of gender", "skill_type": "grammar"},
    ],
    "m2w1d2": [
        {"question": "How do you say 'mother' in French?", "options": ["le père", "la mère", "la soeur", "le frère"], "correct_answer": 1, "explanation": "'La mère' means mother", "skill_type": "vocabulary"},
        {"question": "'Mon frère' means:", "options": ["My sister", "My father", "My brother", "My mother"], "correct_answer": 2, "explanation": "'Mon frère' = my brother", "skill_type": "vocabulary"},
        {"question": "The possessive 'ma' is used with:", "options": ["Masculine nouns", "Feminine nouns", "Plural nouns", "All nouns"], "correct_answer": 1, "explanation": "'Ma' is used with feminine singular nouns", "skill_type": "grammar"},
    ],
    "m2w2d1": [
        {"question": "'Je suis' means:", "options": ["I have", "I am", "I go", "I do"], "correct_answer": 1, "explanation": "'Je suis' = I am (être)", "skill_type": "grammar"},
        {"question": "To say your age in French, you use:", "options": ["être", "avoir", "aller", "faire"], "correct_answer": 1, "explanation": "French uses 'avoir' for age: J'ai 20 ans", "skill_type": "grammar"},
        {"question": "'Nous avons' means:", "options": ["We are", "We have", "They have", "You have"], "correct_answer": 1, "explanation": "'Nous avons' = we have", "skill_type": "grammar"},
        {"question": "'Vous êtes' is:", "options": ["You are (formal/plural)", "You have", "We are", "They are"], "correct_answer": 0, "explanation": "'Vous êtes' = you are (formal or plural)", "skill_type": "grammar"},
    ],
    "m2w3d1": [
        {"question": "How do you say 'bread' in French?", "options": ["le fromage", "le pain", "le vin", "le café"], "correct_answer": 1, "explanation": "'Le pain' means bread", "skill_type": "vocabulary"},
        {"question": "'Je voudrais' means:", "options": ["I need", "I would like", "I have", "I want"], "correct_answer": 1, "explanation": "'Je voudrais' = I would like (polite)", "skill_type": "vocabulary"},
    ],
    "m2w4d1": [
        {"question": "'Où?' means:", "options": ["Who?", "What?", "Where?", "When?"], "correct_answer": 2, "explanation": "'Où' = Where", "skill_type": "vocabulary"},
        {"question": "'Est-ce que' is used to:", "options": ["Make a statement", "Form a question", "Give a command", "Express emotion"], "correct_answer": 1, "explanation": "'Est-ce que' turns a statement into a question", "skill_type": "grammar"},
    ],
}
