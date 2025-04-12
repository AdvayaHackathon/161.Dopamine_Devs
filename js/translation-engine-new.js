// Translation Engine with Cultural Context
class CulturalTranslationEngine {
    constructor() {
        this.languages = {
            'en': 'English',
            'hi': 'हिंदी',
            'ta': 'தமிழ்',
            'bn': 'বাংলা',
            'te': 'తెలుగు',
            'mr': 'मराठी',
            'gu': 'ગુજરાતી',
            'kn': 'ಕನ್ನಡ',
            'ml': 'മലയാളം',
            'pa': 'ਪੰਜਾਬੀ'
        };

        this.currentLanguage = 'en';
        this.isFormal = true;
        this.translations = {
            'Wishing you a sparkling Diwali!': {
                'en': { formal: 'Wishing you a sparkling Diwali!', informal: 'Happy Diwali!' },
                'hi': { formal: 'आपको दीपावली की शुभकामनाएं!', informal: 'दीपावली मुबारक!' },
                'ta': { formal: 'உங்களுக்கு ஒளிமிக்க தீபாவளி நல்வாழ்த்துக்கள்!', informal: 'தீபாவளி வாழ்த்துக்கள்!' },
                'bn': { formal: 'আপনাকে দীপাবলির শুভেচ্ছা!', informal: 'শুভ দীপাবলি!' },
                'te': { formal: 'మీకు మెరుస్తున్న దీపావళి శుభాకాంక్షలు!', informal: 'దీపావళి శుభాకాంక్షలు!' },
                'mr': { formal: 'तुम्हाला चमकदार दिवाळीच्या शुभेच्छा!', informal: 'दिवाळीच्या हार्दिक शुभेच्छा!' },
                'gu': { formal: 'તમને ચમકતી દિવાળીની શુભકામનાઓ!', informal: 'દિવાળી મુબારક!' },
                'kn': { formal: 'ನಿಮಗೆ ಹೊಳೆಯುವ ದೀಪಾವಳಿಯ ಶುಭಾಶಯಗಳು!', informal: 'ದೀಪಾವಳಿ ಹಬ್ಬದ ಶುಭಾಶಯಗಳು!' },
                'ml': { formal: 'നിങ്ങൾക്ക് തിളങ്ങുന്ന ദീപാവലിയുടെ ആശംസകൾ!', informal: 'ദീപാവലി ആശംസകൾ!' },
                'pa': { formal: 'ਤੁਹਾਨੂੰ ਚਮਕਦਾਰ ਦੀਵਾਲੀ ਦੀਆਂ ਸ਼ੁਭਕਾਮਨਾਵਾਂ!', informal: 'ਦੀਵਾਲੀ ਮੁਬਾਰਕ!' }
            },
            'Let\'s play with colors!': {
                'en': { formal: 'Let us celebrate with colors!', informal: 'Let\'s play with colors!' },
                'hi': { formal: 'आइए रंगों के साथ उत्सव मनाएं!', informal: 'रंगों से खेलते हैं!' },
                'ta': { formal: 'வண்ணங்களுடன் கொண்டாடுவோம்!', informal: 'வண்ணங்களுடன் விளையாடுவோம்!' },
                'bn': { formal: 'রঙের সাথে উদযাপন করি!', informal: 'রঙ নিয়ে খেলি!' },
                'te': { formal: 'రంగులతో జరుపుకుందాం!', informal: 'రంగులతో ఆడుకుందాం!' },
                'mr': { formal: 'रंगांसह साजरा करूया!', informal: 'रंगांसह खेळूया!' },
                'gu': { formal: 'રંગો સાથે ઉજવણી કરીએ!', informal: 'રંગો સાથે રમીએ!' },
                'kn': { formal: 'ಬಣ್ಣಗಳೊಂದಿಗೆ ಆಚರಿಸೋಣ!', informal: 'ಬಣ್ಣಗಳೊಂದಿಗೆ ಆಡೋಣ!' },
                'ml': { formal: 'നിറങ്ങളോടെ ആഘോഷിക്കാം!', informal: 'നിറങ്ങളോടെ കളിക്കാം!' },
                'pa': { formal: 'ਰੰਗਾਂ ਨਾਲ ਮਨਾਈਏ!', informal: 'ਰੰਗਾਂ ਨਾਲ ਖੇਡੀਏ!' }
            }
        };
    }

    // Set the current language
    setLanguage(lang) {
        if (this.languages[lang]) {
            this.currentLanguage = lang;
            document.documentElement.lang = lang;
            this.updateGreetings();
        }
    }

    // Set formality level
    setFormality(isFormal) {
        this.isFormal = isFormal;
        this.updateGreetings();
    }

    // Update greetings immediately
    updateGreetings() {
        const diwaliGreeting = document.getElementById('diwali-greeting');
        const holiGreeting = document.getElementById('holi-greeting');
        
        if (diwaliGreeting) {
            diwaliGreeting.textContent = this.translate('Wishing you a sparkling Diwali!');
        }
        if (holiGreeting) {
            holiGreeting.textContent = this.translate('Let\'s play with colors!');
        }
    }

    // Translate with cultural context
    translate(text) {
        if (this.translations[text] && this.translations[text][this.currentLanguage]) {
            return this.translations[text][this.currentLanguage][this.isFormal ? 'formal' : 'informal'];
        }
        return text;
    }

    // Initialize the translation system
    init() {
        // Add language selector to the page
        this.createLanguageSelector();
        
        // Add formality toggle
        this.createFormalityToggle();
        
        // Update greetings
        this.updateGreetings();
    }

    // Create language selector UI
    createLanguageSelector() {
        const selector = document.createElement('div');
        selector.className = 'language-selector fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 z-50';
        selector.innerHTML = `
            <div class="flex flex-col space-y-2">
                <label class="text-sm font-medium text-gray-700">Select Language:</label>
                <select id="language-select" class="border rounded-md p-2">
                    ${Object.entries(this.languages)
                        .map(([code, name]) => 
                            `<option value="${code}" ${code === this.currentLanguage ? 'selected' : ''}>
                                ${name}
                            </option>`
                        )
                        .join('')}
                </select>
            </div>
        `;

        document.body.appendChild(selector);

        // Add event listener
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                this.setLanguage(e.target.value);
            });
        }
    }

    // Create formality toggle
    createFormalityToggle() {
        const toggle = document.createElement('div');
        toggle.className = 'formality-toggle fixed bottom-4 right-48 bg-white rounded-lg shadow-lg p-4 z-50';
        toggle.innerHTML = `
            <div class="flex flex-col space-y-2">
                <label class="text-sm font-medium text-gray-700">Formality Level:</label>
                <select id="formality-select" class="border rounded-md p-2">
                    <option value="formal" ${this.isFormal ? 'selected' : ''}>Formal</option>
                    <option value="informal" ${!this.isFormal ? 'selected' : ''}>Informal</option>
                </select>
            </div>
        `;

        document.body.appendChild(toggle);

        // Add event listener
        const formalitySelect = document.getElementById('formality-select');
        if (formalitySelect) {
            formalitySelect.addEventListener('change', (e) => {
                this.setFormality(e.target.value === 'formal');
            });
        }
    }
}

// Initialize the translation engine
document.addEventListener('DOMContentLoaded', () => {
    window.translationEngine = new CulturalTranslationEngine();
    window.translationEngine.init();
}); 