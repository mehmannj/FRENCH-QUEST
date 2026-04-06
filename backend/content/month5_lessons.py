"""
Month 5: Intermediate Development
Past tense, complex sentences, opinions, paragraph reading
"""

MONTH_5_LESSONS = [
    {
        "id": "m5w1d1", "month": 5, "week": 1, "day": 1,
        "title": "Passé Composé with Avoir", "title_fr": "Le passé composé avec avoir",
        "description": "Learn to talk about past events using the passé composé with avoir.",
        "skill_focus": ["grammar", "speaking"],
        "vocabulary": [
            {"french": "j'ai mangé", "english": "I ate", "pronunciation": "zhay mahn-zhay"},
            {"french": "j'ai parlé", "english": "I spoke", "pronunciation": "zhay par-lay"},
            {"french": "j'ai travaillé", "english": "I worked", "pronunciation": "zhay trah-vah-yay"},
            {"french": "j'ai fini", "english": "I finished", "pronunciation": "zhay fee-nee"},
            {"french": "j'ai pris", "english": "I took", "pronunciation": "zhay pree"},
            {"french": "j'ai fait", "english": "I did/made", "pronunciation": "zhay fay"},
            {"french": "j'ai vu", "english": "I saw", "pronunciation": "zhay voo"},
            {"french": "j'ai bu", "english": "I drank", "pronunciation": "zhay boo"},
            {"french": "hier", "english": "yesterday", "pronunciation": "ee-ehr"},
            {"french": "la semaine dernière", "english": "last week", "pronunciation": "lah suh-men dehr-nyehr"},
        ],
        "grammar_points": [
            "Passé composé = avoir/être + past participle",
            "Most verbs use avoir as the helper verb",
            "Regular past participles: -er→-é, -ir→-i, -re→-u",
            "Many common verbs have irregular past participles"
        ],
        "content": {
            "intro": "The passé composé is the main past tense you'll use in conversation. Let's master it!",
            "main_text": "To form the passé composé: subject + avoir (conjugated) + past participle. Example: 'J'ai mangé' (I ate). Regular -ER verbs: drop -er, add -é. J'ai parlé, tu as parlé, il a parlé..."
        },
        "exercises": [
            {"type": "conjugation", "instructions": "Form the passé composé"},
            {"type": "translate", "instructions": "Translate past tense sentences"}
        ],
        "xp_reward": 30
    },
    {
        "id": "m5w2d1", "month": 5, "week": 2, "day": 1,
        "title": "Passé Composé with Être", "title_fr": "Le passé composé avec être",
        "description": "Learn verbs that use être in the passé composé (DR MRS VANDERTRAMP).",
        "skill_focus": ["grammar"],
        "vocabulary": [
            {"french": "je suis allé(e)", "english": "I went", "pronunciation": "zhuh swee ah-lay"},
            {"french": "je suis venu(e)", "english": "I came", "pronunciation": "zhuh swee vuh-noo"},
            {"french": "je suis parti(e)", "english": "I left", "pronunciation": "zhuh swee par-tee"},
            {"french": "je suis arrivé(e)", "english": "I arrived", "pronunciation": "zhuh swee ah-ree-vay"},
            {"french": "je suis né(e)", "english": "I was born", "pronunciation": "zhuh swee nay"},
            {"french": "je suis tombé(e)", "english": "I fell", "pronunciation": "zhuh swee tohm-bay"},
            {"french": "je suis resté(e)", "english": "I stayed", "pronunciation": "zhuh swee res-tay"},
            {"french": "je suis mort(e)", "english": "I died", "pronunciation": "zhuh swee mor(t)"},
        ],
        "grammar_points": [
            "DR MRS VANDERTRAMP verbs use être as helper",
            "Past participle agrees with subject in gender and number",
            "All reflexive verbs also use être",
            "Elle est allée (she went) - add -e for feminine"
        ],
        "content": {
            "intro": "Some verbs use être instead of avoir in the passé composé. Learn the famous DR MRS VANDERTRAMP!",
            "main_text": "These verbs describe movement or state changes. The mnemonic DR MRS VANDERTRAMP helps: Devenir, Revenir, Monter, Rester, Sortir, Venir, Aller, Naître, Descendre, Entrer, Retourner, Tomber, Rentrer, Arriver, Mourir, Partir."
        },
        "exercises": [
            {"type": "fill_blank", "instructions": "Choose avoir or être"},
            {"type": "conjugation", "instructions": "Conjugate with être, matching gender"}
        ],
        "xp_reward": 30
    },
    {
        "id": "m5w3d1", "month": 5, "week": 3, "day": 1,
        "title": "Expressing Opinions", "title_fr": "Exprimer ses opinions",
        "description": "Learn to express your opinions, agree, and disagree in French.",
        "skill_focus": ["speaking", "vocabulary"],
        "vocabulary": [
            {"french": "je pense que", "english": "I think that", "pronunciation": "zhuh pahns kuh"},
            {"french": "je crois que", "english": "I believe that", "pronunciation": "zhuh krwah kuh"},
            {"french": "à mon avis", "english": "in my opinion", "pronunciation": "ah mohn ah-vee"},
            {"french": "je suis d'accord", "english": "I agree", "pronunciation": "zhuh swee dah-kor"},
            {"french": "je ne suis pas d'accord", "english": "I disagree", "pronunciation": "zhuh nuh swee pah dah-kor"},
            {"french": "c'est vrai", "english": "that's true", "pronunciation": "say vray"},
            {"french": "peut-être", "english": "maybe/perhaps", "pronunciation": "puh-tehr"},
            {"french": "absolument", "english": "absolutely", "pronunciation": "ab-soh-loo-mahn"},
        ],
        "grammar_points": [
            "'Je pense que...' is followed by indicative mood",
            "Use 'parce que' (because) to give reasons",
            "'Selon moi' (according to me) is another way to state opinions"
        ],
        "content": {
            "intro": "Being able to express your opinions makes conversations much more interesting!",
            "main_text": "French has many ways to express opinions. Start with 'Je pense que...' (I think that...) or 'À mon avis...' (In my opinion...). To agree: 'Je suis d'accord.' To disagree politely: 'Je ne suis pas d'accord, mais...'"
        },
        "exercises": [
            {"type": "translate", "instructions": "Express opinions in French"},
            {"type": "roleplay", "instructions": "Have a debate about a topic"}
        ],
        "xp_reward": 25
    },
    {
        "id": "m5w4d1", "month": 5, "week": 4, "day": 1,
        "title": "Email & Letter Writing", "title_fr": "Écrire des emails et des lettres",
        "description": "Learn formal and informal writing structures for emails and letters.",
        "skill_focus": ["writing", "vocabulary"],
        "vocabulary": [
            {"french": "Cher/Chère", "english": "Dear (masc/fem)", "pronunciation": "shehr"},
            {"french": "Cordialement", "english": "Best regards", "pronunciation": "kor-dee-al-mahn"},
            {"french": "Amicalement", "english": "Friendly regards", "pronunciation": "ah-mee-kal-mahn"},
            {"french": "Veuillez agréer", "english": "Yours sincerely (very formal)", "pronunciation": "vuh-yay ah-gray-ay"},
            {"french": "Je vous écris pour", "english": "I am writing to you to", "pronunciation": "zhuh voo ay-kree poor"},
            {"french": "En réponse à", "english": "In response to", "pronunciation": "ahn ray-pohns ah"},
        ],
        "grammar_points": [
            "Formal emails: use 'vous', proper salutations",
            "Informal: use 'tu', casual closings like 'Bisous' or 'À bientôt'",
            "Structure: Greeting → Purpose → Details → Closing"
        ],
        "content": {
            "intro": "Writing emails and letters in French follows specific conventions. Let's learn them!",
            "main_text": "French formal writing is more elaborate than English. Always start with a proper greeting and end with an appropriate closing formula. The level of formality depends on your relationship with the recipient."
        },
        "exercises": [
            {"type": "writing", "instructions": "Write a short formal email"},
            {"type": "fill_blank", "instructions": "Complete email templates"}
        ],
        "xp_reward": 25
    },
    {
        "id": "m5_assessment", "month": 5, "week": 4, "day": 5,
        "title": "Month 5 Assessment", "title_fr": "Évaluation du Mois 5",
        "description": "Test your past tense, opinions, and writing skills.",
        "skill_focus": ["grammar", "writing", "speaking", "listening"],
        "vocabulary": [], "grammar_points": [],
        "content": {
            "intro": "You're past the halfway mark! Let's see what you've learned.",
            "main_text": "This assessment covers passé composé, opinion expressions, and formal/informal writing.",
            "sections": [
                {"name": "Grammar", "description": "Passé composé with avoir and être"},
                {"name": "Speaking", "description": "Talk about past events and give opinions"},
                {"name": "Writing", "description": "Write a short email in French"},
                {"name": "Reading", "description": "Read and understand a personal letter"}
            ]
        },
        "is_assessment": True, "xp_reward": 100, "badge_reward": "month_5_complete"
    }
]

MONTH_5_QUIZZES = {
    "m5w1d1": [
        {"question": "The passé composé of 'manger' (je) is:", "options": ["je mange", "j'ai mangé", "je mangeais", "j'ai manger"], "correct_answer": 1, "explanation": "J'ai mangé - avoir + past participle (-é)", "skill_type": "grammar"},
        {"question": "Regular -IR past participle ending is:", "options": ["-é", "-i", "-u", "-s"], "correct_answer": 1, "explanation": "-IR verbs: finir → fini", "skill_type": "grammar"},
    ],
    "m5w2d1": [
        {"question": "Which verb uses être in passé composé?", "options": ["manger", "parler", "aller", "faire"], "correct_answer": 2, "explanation": "'Aller' uses être: je suis allé(e)", "skill_type": "grammar"},
        {"question": "'Elle est partie' has feminine agreement because:", "options": ["The verb is feminine", "The subject is feminine", "It's always -ie", "No reason"], "correct_answer": 1, "explanation": "With être, past participle agrees with subject gender", "skill_type": "grammar"},
    ],
    "m5w3d1": [
        {"question": "'Je suis d'accord' means:", "options": ["I disagree", "I agree", "I don't know", "I don't care"], "correct_answer": 1, "explanation": "'Je suis d'accord' = I agree", "skill_type": "vocabulary"},
        {"question": "'À mon avis' means:", "options": ["I agree", "I think", "In my opinion", "According to you"], "correct_answer": 2, "explanation": "'À mon avis' = In my opinion", "skill_type": "vocabulary"},
    ],
    "m5w4d1": [
        {"question": "'Cordialement' is used as:", "options": ["A greeting", "A closing (Best regards)", "An apology", "A question"], "correct_answer": 1, "explanation": "'Cordialement' = Best regards / Kind regards", "skill_type": "vocabulary"},
    ],
}
