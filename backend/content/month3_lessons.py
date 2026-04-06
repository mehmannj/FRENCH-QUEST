"""
Month 3: Sentence Construction
Present tense, adjectives, negation, time expressions
"""

MONTH_3_LESSONS = [
    {
        "id": "m3w1d1", "month": 3, "week": 1, "day": 1,
        "title": "Present Tense - Regular Verbs", "title_fr": "Le présent - Verbes réguliers",
        "description": "Learn to conjugate regular -er, -ir, and -re verbs in the present tense.",
        "skill_focus": ["grammar", "speaking"],
        "vocabulary": [
            {"french": "parler", "english": "to speak", "pronunciation": "par-lay"},
            {"french": "manger", "english": "to eat", "pronunciation": "mahn-zhay"},
            {"french": "travailler", "english": "to work", "pronunciation": "trah-vah-yay"},
            {"french": "finir", "english": "to finish", "pronunciation": "fee-neer"},
            {"french": "choisir", "english": "to choose", "pronunciation": "shwah-zeer"},
            {"french": "attendre", "english": "to wait", "pronunciation": "ah-tahndr"},
            {"french": "vendre", "english": "to sell", "pronunciation": "vahndr"},
            {"french": "je parle", "english": "I speak", "pronunciation": "zhuh parl"},
            {"french": "tu parles", "english": "you speak", "pronunciation": "too parl"},
            {"french": "nous parlons", "english": "we speak", "pronunciation": "noo par-lohn"},
        ],
        "grammar_points": [
            "-ER verbs: drop -er, add -e, -es, -e, -ons, -ez, -ent",
            "-IR verbs: drop -ir, add -is, -is, -it, -issons, -issez, -issent",
            "-RE verbs: drop -re, add -s, -s, -, -ons, -ez, -ent",
            "About 90% of French verbs are -ER verbs"
        ],
        "content": {
            "intro": "The present tense is the most used tense in French. Master these patterns and you can form thousands of sentences!",
            "main_text": "French regular verbs fall into three groups based on their ending: -er (most common), -ir, and -re. Each group follows a predictable pattern.",
            "tips": ["Focus on -ER verbs first - they're the most common", "The 'ils/elles' endings are often silent"]
        },
        "exercises": [
            {"type": "conjugation", "instructions": "Conjugate the given verbs"},
            {"type": "fill_blank", "instructions": "Complete sentences with correct verb forms"}
        ],
        "xp_reward": 30
    },
    {
        "id": "m3w1d2", "month": 3, "week": 1, "day": 2,
        "title": "Common Irregular Verbs", "title_fr": "Verbes irréguliers courants",
        "description": "Master the most common irregular verbs: aller, faire, venir, prendre.",
        "skill_focus": ["grammar", "vocabulary"],
        "vocabulary": [
            {"french": "aller", "english": "to go", "pronunciation": "ah-lay"},
            {"french": "je vais", "english": "I go", "pronunciation": "zhuh vay"},
            {"french": "faire", "english": "to do/make", "pronunciation": "fehr"},
            {"french": "je fais", "english": "I do/make", "pronunciation": "zhuh fay"},
            {"french": "venir", "english": "to come", "pronunciation": "vuh-neer"},
            {"french": "je viens", "english": "I come", "pronunciation": "zhuh vee-ehn"},
            {"french": "prendre", "english": "to take", "pronunciation": "prahndr"},
            {"french": "je prends", "english": "I take", "pronunciation": "zhuh prahn"},
            {"french": "pouvoir", "english": "to be able to", "pronunciation": "poo-vwahr"},
            {"french": "vouloir", "english": "to want", "pronunciation": "voo-lwahr"},
        ],
        "grammar_points": [
            "Aller: vais, vas, va, allons, allez, vont",
            "Faire: fais, fais, fait, faisons, faites, font",
            "'Aller + infinitive' = near future (je vais manger = I'm going to eat)"
        ],
        "content": {
            "intro": "Some of the most useful French verbs are irregular. Let's learn the most important ones!",
            "main_text": "Irregular verbs don't follow the standard patterns, but they're used so frequently that you'll memorize them quickly with practice."
        },
        "exercises": [
            {"type": "conjugation", "instructions": "Conjugate irregular verbs"},
            {"type": "translate", "instructions": "Translate sentences using irregular verbs"}
        ],
        "xp_reward": 30
    },
    {
        "id": "m3w2d1", "month": 3, "week": 2, "day": 1,
        "title": "Adjectives & Descriptions", "title_fr": "Les adjectifs et les descriptions",
        "description": "Learn how to describe people, places, and things using French adjectives.",
        "skill_focus": ["vocabulary", "grammar"],
        "vocabulary": [
            {"french": "grand(e)", "english": "tall/big", "pronunciation": "grahn(d)"},
            {"french": "petit(e)", "english": "small/short", "pronunciation": "puh-tee(t)"},
            {"french": "beau/belle", "english": "beautiful", "pronunciation": "boh/bel"},
            {"french": "nouveau/nouvelle", "english": "new", "pronunciation": "noo-voh/noo-vel"},
            {"french": "bon(ne)", "english": "good", "pronunciation": "bohn/bon"},
            {"french": "mauvais(e)", "english": "bad", "pronunciation": "moh-vay(z)"},
            {"french": "jeune", "english": "young", "pronunciation": "zhuhn"},
            {"french": "vieux/vieille", "english": "old", "pronunciation": "vyuh/vyay"},
            {"french": "content(e)", "english": "happy", "pronunciation": "kohn-tahn(t)"},
            {"french": "triste", "english": "sad", "pronunciation": "treest"},
        ],
        "grammar_points": [
            "Most adjectives come AFTER the noun in French",
            "BANGS adjectives come before: Beauty, Age, Number, Goodness, Size",
            "Adjectives agree in gender and number with the noun",
            "Feminine: usually add -e. Plural: usually add -s"
        ],
        "content": {
            "intro": "Adjectives make your French more expressive and interesting. Let's learn the rules!",
            "main_text": "Unlike English, most French adjectives come after the noun: 'une maison grande' (a big house). But some common ones (BANGS) go before: 'une belle maison' (a beautiful house)."
        },
        "exercises": [
            {"type": "fill_blank", "instructions": "Place the adjective correctly"},
            {"type": "match", "instructions": "Match masculine and feminine forms"}
        ],
        "xp_reward": 25
    },
    {
        "id": "m3w3d1", "month": 3, "week": 3, "day": 1,
        "title": "Negation & Negative Sentences", "title_fr": "La négation",
        "description": "Learn to form negative sentences with ne...pas and other negative structures.",
        "skill_focus": ["grammar", "speaking"],
        "vocabulary": [
            {"french": "ne...pas", "english": "not", "pronunciation": "nuh...pah"},
            {"french": "ne...jamais", "english": "never", "pronunciation": "nuh...zhah-may"},
            {"french": "ne...rien", "english": "nothing", "pronunciation": "nuh...ree-ehn"},
            {"french": "ne...plus", "english": "no longer", "pronunciation": "nuh...ploo"},
            {"french": "ne...personne", "english": "nobody", "pronunciation": "nuh...pair-son"},
        ],
        "grammar_points": [
            "Negation wraps around the verb: ne + verb + pas",
            "Je ne parle pas = I don't speak",
            "In spoken French, 'ne' is often dropped: 'Je parle pas'",
            "With avoir/être: Je n'ai pas, Je ne suis pas"
        ],
        "content": {
            "intro": "Saying 'no' is just as important as saying 'yes'! French negation has a unique sandwich structure.",
            "main_text": "To make a sentence negative, put 'ne' before the verb and 'pas' after it. Example: 'Je parle français' → 'Je ne parle pas français'."
        },
        "exercises": [
            {"type": "transform", "instructions": "Make these sentences negative"},
            {"type": "translate", "instructions": "Translate negative sentences"}
        ],
        "xp_reward": 25
    },
    {
        "id": "m3w4d1", "month": 3, "week": 4, "day": 1,
        "title": "Time Expressions & Daily Routine", "title_fr": "Les expressions de temps et la routine quotidienne",
        "description": "Talk about your daily routine using time expressions.",
        "skill_focus": ["vocabulary", "speaking"],
        "vocabulary": [
            {"french": "le matin", "english": "in the morning", "pronunciation": "luh mah-tahn"},
            {"french": "l'après-midi", "english": "in the afternoon", "pronunciation": "lah-preh-mee-dee"},
            {"french": "le soir", "english": "in the evening", "pronunciation": "luh swahr"},
            {"french": "toujours", "english": "always", "pronunciation": "too-zhoor"},
            {"french": "souvent", "english": "often", "pronunciation": "soo-vahn"},
            {"french": "parfois", "english": "sometimes", "pronunciation": "par-fwah"},
            {"french": "se réveiller", "english": "to wake up", "pronunciation": "suh ray-vay-yay"},
            {"french": "se coucher", "english": "to go to bed", "pronunciation": "suh koo-shay"},
            {"french": "se lever", "english": "to get up", "pronunciation": "suh luh-vay"},
        ],
        "grammar_points": [
            "Reflexive verbs use se: se lever, se coucher",
            "Je me lève = I get up (me = myself)",
            "Time: Il est huit heures = It is 8 o'clock"
        ],
        "content": {
            "intro": "Let's learn to talk about your daily routine - one of the most practical French skills!",
            "main_text": "Daily routine uses reflexive verbs (things you do to yourself) and time expressions. 'Le matin, je me lève à sept heures.' (In the morning, I get up at 7 o'clock.)"
        },
        "exercises": [
            {"type": "listen_repeat", "instructions": "Describe a daily routine"},
            {"type": "translate", "instructions": "Translate daily routine sentences"}
        ],
        "xp_reward": 25
    },
    {
        "id": "m3_assessment", "month": 3, "week": 4, "day": 5,
        "title": "Month 3 Assessment", "title_fr": "Évaluation du Mois 3",
        "description": "Test your knowledge of verb conjugation, adjectives, negation, and daily routines.",
        "skill_focus": ["grammar", "vocabulary", "speaking", "listening"],
        "vocabulary": [], "grammar_points": [],
        "content": {
            "intro": "Time to test everything from Month 3!",
            "main_text": "This assessment covers present tense conjugation, adjective agreement, negation, and time expressions.",
            "sections": [
                {"name": "Grammar", "description": "Conjugation, negation, adjective placement"},
                {"name": "Vocabulary", "description": "Verbs, adjectives, time expressions"},
                {"name": "Speaking", "description": "Describe your daily routine"},
                {"name": "Writing", "description": "Write about your typical day"}
            ]
        },
        "is_assessment": True, "xp_reward": 100, "badge_reward": "month_3_complete"
    }
]

MONTH_3_QUIZZES = {
    "m3w1d1": [
        {"question": "What are the -ER verb endings for 'je'?", "options": ["-e", "-es", "-ons", "-ez"], "correct_answer": 0, "explanation": "Je parle - the -ER ending for 'je' is -e", "skill_type": "grammar"},
        {"question": "'Nous parlons' means:", "options": ["I speak", "You speak", "We speak", "They speak"], "correct_answer": 2, "explanation": "'Nous parlons' = we speak", "skill_type": "grammar"},
    ],
    "m3w1d2": [
        {"question": "'Je vais' means:", "options": ["I come", "I go", "I do", "I take"], "correct_answer": 1, "explanation": "'Je vais' = I go (aller)", "skill_type": "grammar"},
        {"question": "'Aller + infinitive' expresses:", "options": ["Past", "Near future", "Condition", "Command"], "correct_answer": 1, "explanation": "'Je vais manger' = I'm going to eat", "skill_type": "grammar"},
    ],
    "m3w2d1": [
        {"question": "Where do MOST French adjectives go?", "options": ["Before the noun", "After the noun", "Either position", "Nowhere specific"], "correct_answer": 1, "explanation": "Most French adjectives come after the noun", "skill_type": "grammar"},
        {"question": "The feminine of 'grand' is:", "options": ["grands", "grande", "grandi", "grander"], "correct_answer": 1, "explanation": "Add -e for feminine: grand → grande", "skill_type": "grammar"},
    ],
    "m3w3d1": [
        {"question": "How do you say 'I don't speak' in French?", "options": ["Je parle pas", "Je ne parle pas", "Je pas parle", "Ne je parle pas"], "correct_answer": 1, "explanation": "Ne + verb + pas: Je ne parle pas", "skill_type": "grammar"},
        {"question": "'Ne...jamais' means:", "options": ["Not", "Nothing", "Never", "No one"], "correct_answer": 2, "explanation": "'Ne...jamais' = never", "skill_type": "grammar"},
    ],
    "m3w4d1": [
        {"question": "'Je me lève' means:", "options": ["I sleep", "I get up", "I eat", "I go"], "correct_answer": 1, "explanation": "'Se lever' = to get up; 'Je me lève' = I get up", "skill_type": "vocabulary"},
    ],
}
