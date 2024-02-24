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

                    // aggiungiamo la risposta casuale dopo un secondo
                    setTimeout(() => {
                        const currentTime = DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss');
                        this.contacts[activeContactIndex].messages.push({
                            message: randomResponse,
                            status: 'received',
                            date: currentTime
                        });

                        // esegue lo sroll verso il basso in automatico fino all'ultimo messaggio
                        this.$nextTick(() => {
                            const container = document.getElementById('main-chat');
                            container.scrollTop = container.scrollHeight;
                        });
                    }, 1000);

                    event.target.value = '';
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
    }
}).mount('#app');
