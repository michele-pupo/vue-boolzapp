/*
 - Milestone 1
   Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) 
   e dall’interlocutore (bianco) assegnando due classi CSS diverse
   Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, 
   visualizzare nome e immagine di ogni contatto
 - Milestone 2
   Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, 
   visualizzare tutti i messaggi relativi al contatto attivo all’interno 
   del pannello della conversazione
   Click sul contatto mostra la conversazione del contatto cliccato
 - Milestone 3
   Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e 
   digitando “enter” il testo viene aggiunto al thread sopra, come messaggio verde
   Risposta dall’interlocutore: ad ogni inserimento di un messaggio, 
   l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.
 - Milestone 4
   Ricerca utenti: scrivendo qualcosa nell’input a sinistra, 
   vengono visualizzati solo i contatti il cui nome contiene le lettere inserite 
   (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)
 - Milestone 5 - (bonus)
   Cancella messaggio: cliccando sul messaggio appare un menu a tendina 
   che permette di cancellare il messaggio selezionato
*/

const { createApp } = Vue;

const { DateTime } = luxon;

createApp({
    data() {
        return {

        keyFiltered : '',
        activeContact: null,
        themeBackground: 'theme-light-chat', //thema sfondo chat principale
        theme: 'theme-light', //thema sfondo utenti
        themeMessageSent: 'theme-light-message-sent', //thema sfondo messaggio inviato
        themeMessageReply: 'theme-light-message-reply', //thema sfondo messaggio ricevuto
        themeText: 'theme-text-light', //thema testo
        themeActive: 'theme-light-active', //thema classe active utente
        themeAnother: 'theme-light-another', //thema sfondo utente
        themeLabel:'theme-light-label', //thema sfondo label
        themeNotifications:'theme-light-notifications', //thema sfondo notifications
        themeBgBell:'theme-light-bg-bell', //thema sfondo campana notifiche
        themeTextBell:'theme-light-text-bell', //thema testo campana notifiche
        themeBorder:'theme-light-border', //thema bordo desto utenti
        themeBorderTop:'theme-light-border-top', //thema bordo superiore utenti
        themeContainerBig:'theme-light-container-big', //thema sfondo container principale

          contacts: [
            {
                name: 'Michele',
                avatar: 'img/avatar_1.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: 'img/avatar_2.jpg',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: 'img/avatar_3.jpg',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro B.',
                avatar: 'img/avatar_4.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro L.',
                avatar: 'img/avatar_5.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Claudia',
                avatar: 'img/avatar_6.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao Claudia, hai novità?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Federico',
                avatar: 'img/avatar_7.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Fai gli auguri a Martina che è il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Davide',
                avatar: 'img/avatar_8.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'OK!!',
                        status: 'received'
                    }
                ],
            }
        ],
    }
    },
    methods: {

        // funzione per gestire il contatto cliccato
        clickSingleChat(index) {
            const filteredContacts = this.searchChat();
            const originalIndex = this.contacts.indexOf(filteredContacts[index]);
            this.activeContact = originalIndex;
        },
        
        // funzione per inserire un nuovo messaggio
        sendMessage(event) {
            if (event.key === 'Enter') {
                const messageInput = event.target.value.trim();
                if (messageInput !== '') {

                    // reimposta il valore del campo di input a una stringa vuota dopo l'invio del messaggio
                    event.target.value = '';

                    // salviamo l'indice del contatto attivo al momento dell'invio
                    const activeContactIndex = this.activeContact;

                    // orario corrente utilizzando Luxon 
                    const currentTime = DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss');

                    // aggiungiamo il messaggio in chat insieme all'orario corrente 
                    this.contacts[activeContactIndex].messages.push({
                        message: messageInput,
                        status: 'sent',
                        date: currentTime
                    });
        
                    // definiamo una lista di frasi casuali
                    const randomResponses = [
                        "Che la forza sia con te!",
                        "Francamente, me ne infischio.",
                        "Il mio nome è Bond, James Bond",
                        "Potrebbe andar peggio! Potrebbe... piovere!",
                        "Mi piace l'odore del napalm al mattino",
                        "Io ne ho viste cose che voi umani non potreste immaginarvi",
                        "Metti la cera, togli la cera",
                        "Strade? Dove stiamo andando non c'è bisogno di strade!",
                        "Se io posso cambiare, e se voi potete cambiare, allora, tutto il mondo può cambiare!",
                        "Sei solo chiacchiere e distintivo!",
                        "Mamma diceva sempre: la vita è come a una scatola di cioccolatini, non sai mai quello che ti capita",
                        "Non può piovere per sempre",
                        "Chi dorme non piglia tempo, chi ha tempo non aspetti pesce",
                        "“Prima regola del Fight Club: non parlate mai del Fight Club. Seconda regola del Fight Club: non dovete parlare mai del Fight Club",
                        "Al mio segnale scatenate l'Inferno",
                        "O muori da eroe o vivi tanto a lungo da diventare il cattivo",
                        "Un milione di dollari non è fico. Sai cos'è fico? Un miliardo di dollari",
                        "Non è colpa tua… sono io",
                    ];
        
                    // selezioniamo casualmente una frase dalla lista
                    const randomIndex = Math.floor(Math.random() * randomResponses.length);
                    const randomResponse = randomResponses[randomIndex];

                    // calcola la lunghezza del messaggio di risposta
                    const responseLength = randomResponse.length;

                    // calcola un ritardo basato sulla lunghezza del messaggio
                    const timeout = responseLength * 50; // Ad esempio, 50 millisecondi per carattere

                    // aggiungiamo la risposta casuale dopo il ritardo calcolato
                    setTimeout(() => {
                        const currentTime = DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss');
                        this.contacts[activeContactIndex].messages.push({
                            message: randomResponse,
                            status: 'received',
                            date: currentTime
                        });

                        // dopo aver aggiunto la risposta casuale, sposta la chat attiva in cima alla lista dei contatti
                        if (this.activeContact !== null) {
                            const contact = this.contacts.splice(this.activeContact, 1)[0];
                            // con il metodo "unshit" portiamo l'elemnto dell'array contatti come primo
                            this.contacts.unshift(contact);
                            this.activeContact = 0; 
                        }

                        // esegue lo sroll verso il basso in automatico fino all'ultimo messaggio
                        this.$nextTick(() => {
                            const container = document.getElementById('main-chat');
                            container.scrollTop = container.scrollHeight;
                        });
                    }, timeout);
                }
            }
        },

        // funzione per formattare data e ora usando Luxon
        formatMessageDate(dateTime) {
            if (!dateTime) return '';
            const luxonDateTime = DateTime.fromFormat(dateTime, 'dd/MM/yyyy HH:mm:ss');
            const now = DateTime.now();
            const diffInHours = now.diff(luxonDateTime, 'hours').hours;
            // se l'ultimo messaggio inviato o ricevuto è nelle ultime 24 ore, mostra solo ora e minuto
            if (diffInHours < 24) {
                return luxonDateTime.toFormat('HH:mm');
            } else {
                return luxonDateTime.toFormat('dd LLL yyyy HH:mm');
            }
        },
        
        // funzione per inserire la data corretta dell'ultimo accesso che si aggiorna con il "luxonDateTime"
        formatLastMessageDateTime(dateTime) {
            if (!dateTime) return '';
            const luxonDateTime = DateTime.fromFormat(dateTime, 'dd/MM/yyyy HH:mm:ss');
            return luxonDateTime.toFormat('dd LLL yyyy HH:mm'); // Formato leggibile della data
        },

        // funzione per inserire la data corretta dell'ultimo accesso in base alla chat slezionata che si aggiorna con il "luxonDateTime"
        getLastMessageDateTime(messages) {
            if (!messages || messages.length === 0) return '';
            const lastMessage = messages[messages.length - 1];
            const luxonDateTime = DateTime.fromFormat(lastMessage.date, 'dd/MM/yyyy HH:mm:ss');
            return luxonDateTime.toFormat('dd LLL yyyy HH:mm'); // Formato leggibile della data
        },

        // funzione che ci restitutisce gli elementi filtrati nei contatti
        searchChat() {
            if(this.keyFiltered !== '') {
                return this.contacts.filter((contact) => contact.name.toLowerCase().includes(this.keyFiltered.toLowerCase()));
            } else {
                return this.contacts;
            }
        },

        // funzione per eliminare il messaggio
        deleteMessage(messageIndex) {
            // rimuove il messaggio dalla lista dei messaggi
            this.contacts[this.activeContact].messages.splice(messageIndex, 1);
        },

        // funzione per eliminare l'intera chat (contatto e messaggi)
        deleteChat() {
            if (this.activeContact !== null) {
                this.contacts.splice(this.activeContact, 1);
                this.activeContact = null; // Deseleziona il contatto attivo
            }
        },

        // funzione per calcolare la data e l'ora dell'ultimo messaggio inviato
        lastMessageDate(contact) {
            const lastMessage = contact.messages[contact.messages.length - 1];
            return DateTime.fromFormat(lastMessage.date, 'dd/MM/yyyy HH:mm:ss');
        },

        // funzione che richiama le varie funzioni di cambio thema
        handleChangeTheme() {
            this.changeThemeBackground();
            this.changeTheme();
            this.changeThemeSent();
            this.changeThemeReply();
            this.changeThemeText();
            this.changeThemeActive();
            this.changethemeAnother();
            this.changeThemeLabel(); 
            this.changeThemeNotifications();
            this.changeThemeBgBell();
            this.changeThemeTextBell();
            this.changeThemeBorder();
            this.changeThemeBorderTop();
            this.changeThemeContainerBig();
          },

        // metodo per cambiare il thema sfondo chat principale
        changeThemeBackground() {
            // verifichiamo il tema corrente e lo cambiamo in base ad esso
            if (this.themeBackground === 'theme-light-chat') {
                this.themeBackground = 'theme-dark-chat'; 
            } else {
                this.themeBackground = 'theme-light-chat';
            }
        },

        // metodo per cambiare il thema sfondo utenti
        changeTheme() {
            // verifichiamo il tema corrente e lo cambiamo in base ad esso
            if (this.theme === 'theme-light') {
                this.theme = 'theme-dark'; 
            } else {
                this.theme = 'theme-light';
            }
        },

        // metodo per cambiare il thema sfondo messaggio inviato
        changeThemeSent(){
            // verifichiamo il tema corrente e lo cambiamo in base ad esso
            if (this.themeMessageSent === 'theme-light-message-sent') {
                this.themeMessageSent = 'theme-dark-message-sent'; 
            } else {
                this.themeMessageSent = 'theme-light-message-sent';
            }
        },

        // metodo per cambiare il thema sfondo messaggio ricevuto
        changeThemeReply(){
            // verifichiamo il tema corrente e lo cambiamo in base ad esso
            if (this.themeMessageReply === 'theme-light-message-reply') {
                this.themeMessageReply = 'theme-dark-message-reply'; 
            } else {
                this.themeMessageReply = 'theme-light-message-reply';
            }
        },

        // metodo per cambiare il thema testo
        changeThemeText(){
            // verifichiamo il tema corrente e lo cambiamo in base ad esso
            if (this.themeText === 'theme-text-light') {
                this.themeText = 'theme-text-dark'; 
            } else {
                this.themeText = 'theme-text-light';
            }
        },
        
        // metodo per cambiare il thema classe active utente
        changeThemeActive(){
            // verifichiamo il tema corrente e lo cambiamo in base ad esso
            if (this.themeActive === 'theme-light-active') {
                this.themeActive = 'theme-dark-dark'; 
            } else {
                this.themeActive = 'theme-light-active';
            }
        },

        // metodo per cambiare il thema sfondo notifications
        changethemeAnother(){
            // verifichiamo il tema corrente e lo cambiamo in base ad esso
            if (this.themeAnother === 'theme-light-another') {
                this.themeAnother = 'theme-dark-another'; 
            } else {
                this.themeAnother = 'theme-light-another';
            }
        },
        
        // metodo per cambiare il thema sfondo label
        changeThemeLabel(){
            // verifichiamo il tema corrente e lo cambiamo in base ad esso
            if (this.themeLabel === 'theme-light-label') {
                this.themeLabel = 'theme-dark-label'; 
            } else {
                this.themeLabel = 'theme-light-label';
            }
        },

        // metodo per cambiare il thema sfondo notifications
        changeThemeNotifications(){
            // verifichiamo il tema corrente e lo cambiamo in base ad esso
            if (this.themeNotifications === 'theme-light-notifications') {
                this.themeNotifications = 'theme-dark-notifications'; 
            } else {
                this.themeNotifications = 'theme-light-notifications';
            }
        },

        // metodo per cambiare il thema sfondo campana notifiche
        changeThemeBgBell(){
            // verifichiamo il tema corrente e lo cambiamo in base ad esso
            if (this.themeBgBell === 'theme-light-bg-bell') {
                this.themeBgBell = 'theme-dark-bg-bell'; 
            } else {
                this.themeBgBell = 'theme-light-bg-bell';
            }
        },

        // metodo per cambiare il thema testo campana notifiche
        changeThemeTextBell(){
            // verifichiamo il tema corrente e lo cambiamo in base ad esso
            if (this.themeTextBell === 'theme-light-text-bell') {
                this.themeTextBell = 'theme-dark-text-bell'; 
            } else {
                this.themeTextBell = 'theme-light-text-bell';
            }
        },

        // metodo per cambiare il thema bordo desto utenti
        changeThemeBorder(){
            // verifichiamo il tema corrente e lo cambiamo in base ad esso
            if (this.themeBorder === 'theme-light-border') {
                this.themeBorder = 'theme-dark-border'; 
            } else {
                this.themeBorder = 'theme-light-border';
            }
        },

        // metodo per cambiare il thema bordo superiore utenti
        changeThemeBorderTop(){
            // verifichiamo il tema corrente e lo cambiamo in base ad esso
            if (this.themeBorderTop === 'theme-light-border-top') {
                this.themeBorderTop = 'theme-dark-border-top'; 
            } else {
                this.themeBorderTop = 'theme-light-border-top';
            }
        },

        // metodo per cambiare il thema sfondo container principale
        changeThemeContainerBig(){
            // verifichiamo il tema corrente e lo cambiamo in base ad esso
            if (this.themeContainerBig === 'theme-light-container-big') {
                this.themeContainerBig = 'theme-dark-container-big'; 
            } else {
                this.themeContainerBig = 'theme-light-container-big';
            }
        }
    },

    // usando la funzione per calcolare la data e l'ora dell'ultimo messaggio inviato, usiamo il metodo "sort" come criterio di riordinamento
    mounted() {
        this.contacts.sort((a, b) => {
            const lastMessageDateA = this.lastMessageDate(a);
            const lastMessageDateB = this.lastMessageDate(b);
            return lastMessageDateB - lastMessageDateA;
        });
    }
}).mount('#app');
