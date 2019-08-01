var app = new Vue({
  el: '#root',

  computed: {
    noteArray: function() {
      let octaves = Array(9).fill(0).map((e,i) => i + 1); // [1 .. 9]

      let noteArray = [];

      for (let oct of octaves) {
        for (let note of this.notes) {
          noteArray.push({
            note: note+oct,
            freq: this.noteToFreq(note+oct)
          });
        }
      }

      // start from A1, and filter to every four semitones, and create object array
      return noteArray.splice(9).filter((e,i) => i%4 == 0);

    },

    sortedTable: function() {
      let sortedSavedNotes = Object.keys(this.table).sort();
      let sortedTable = {};
      for (let note of sortedSavedNotes){
        sortedTable[note] = this.table[note];
      }
      return sortedTable;
    }
  },

  methods: {
    dbToAmp(dbfs) {
      let currentGain = Math.pow(10, -1 * Math.abs(dbfs)/20);
      return Math.min(currentGain, this.maxGain);
    },

    noteToFreq: function(note) {
      const cFreq = 220 * Math.pow(2, 3/12);
      let noteInAnOctave = note.slice(0, -1);
      let octave = parseInt(note.slice(-1));
      let noteIndex = this.notes.indexOf(noteInAnOctave);
      let myFreq = cFreq * Math.pow(2, noteIndex / 12) * Math.pow(2, octave - 4);
      return Math.round(100*myFreq)/100;
    },

    playTone: function(){
      tone(this.selectedNote.freq, this.dbToAmp(this.loudness));
    },

    playReference: function() {
      tone(this.refFreq, this.dbToAmp(this.refLoudness))
    },

    addToTable: function() {

     // https://vuejs.org/v2/api/#Vue-set

     Vue.set(this.table, this.selectedNote.note, {
       freq: this.selectedNote.freq,
       loudness: this.loudness
     });

     /*
     this.table[this.selectedNote.note] = {
        freq: this.selectedNote.freq,
        loudness: this.loudness
      };
      */

    }
  },

  data: {

    notes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    minLoudness: -70,
    maxLoudness: -3,
    loudnessStepSize: 0.1,
    maxGain: 0.71, // maximum allowable gain

    refFreq: 880,
    refLoudness: -14,

    selectedNote: {note: 'A1', freq: 55},
    loudness: -70,

    table: {}

  }

});
