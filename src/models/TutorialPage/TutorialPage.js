import { Box, Button, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";
import "./TutorialPage.css";

const TutorialPage = ({ midis }) => {
  const [notes, setNotes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (midis && midis.length > 0) {
      setNotes(midis[0]?.notes);
      console.log("Midi: " + JSON.stringify(midis[0]?.notes));
      setIsLoading(false);
    }
  }, [midis]);

  const noteWidth = 3 * 16;
  const timeUnit = 300;
  const maxWidth = 400;

  const getNoteYPosition = (midiNote) => {
    return (midiNote - 21) * 16 + midiNote - 21;
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div>
          <div id="pianoRoll">
            {notes.map((note, index) => {
              const startY = note.time * timeUnit; // Horizontal position based on time
              const width = note.duration * timeUnit; // Width of the note block based on duration
              const startX = getNoteYPosition(note.midi); // Vertical position based on MIDI note

              return (
                <div
                  key={index}
                  className="note-block"
                  style={{
                    position: "absolute",
                    left: `${startX}px`,
                    top: `${startY}px`,
                    width: `${noteWidth}px`,
                    height: `${width}px`,
                    backgroundColor: "#75cbd9",
                    borderRadius: "2rem",
                  }}
                ></div>
              );
            })}
          </div>

          <div id="piano">
            {/* Piano keys representation */}
            <div className="key white" data-note="21"></div>
            <div className="key black" data-note="22"></div>
            <div className="key white" data-note="23"></div>
            <div className="key black" data-note="24"></div>
            <div className="key white" data-note="25"></div>
            <div className="key white" data-note="26"></div>
            <div className="key black" data-note="27"></div>
            <div className="key white" data-note="28"></div>
            <div className="key black" data-note="29"></div>
            <div className="key white" data-note="30"></div>
            <div className="key black" data-note="31"></div>
            <div className="key white" data-note="32"></div>
            <div className="key white" data-note="33"></div>
            <div className="key black" data-note="34"></div>
            <div className="key white" data-note="35"></div>
            <div className="key black" data-note="36"></div>
            <div className="key white" data-note="37"></div>
            <div className="key white" data-note="38"></div>
            <div className="key black" data-note="39"></div>
            <div className="key white" data-note="40"></div>
            <div className="key black" data-note="41"></div>
            <div className="key white" data-note="42"></div>
            <div className="key black" data-note="43"></div>
            <div className="key white" data-note="44"></div>
            <div className="key white" data-note="45"></div>
            <div className="key black" data-note="46"></div>
            <div className="key white" data-note="47"></div>
            <div className="key black" data-note="48"></div>
            <div className="key white" data-note="49"></div>
            <div className="key white" data-note="50"></div>
            <div className="key black" data-note="51"></div>
            <div className="key white" data-note="52"></div>
            <div className="key black" data-note="53"></div>
            <div className="key white" data-note="54"></div>
            <div className="key black" data-note="55"></div>
            <div className="key white" data-note="56"></div>
            <div className="key white" data-note="57"></div>
            <div className="key black" data-note="58"></div>
            <div className="key white" data-note="59"></div>
            <div className="key black" data-note="60"></div>
            <div className="key white" data-note="61"></div>
            <div className="key white" data-note="62"></div>
            <div className="key black" data-note="63"></div>
            <div className="key white" data-note="64"></div>
            <div className="key black" data-note="65"></div>
            <div className="key white" data-note="66"></div>
            <div className="key black" data-note="67"></div>
            <div className="key white" data-note="68"></div>
            <div className="key white" data-note="69"></div>
            <div className="key black" data-note="70"></div>
            <div className="key white" data-note="71"></div>
            <div className="key black" data-note="72"></div>
            <div className="key white" data-note="73"></div>
            <div className="key white" data-note="74"></div>
            <div className="key black" data-note="75"></div>
            <div className="key white" data-note="76"></div>
            <div className="key black" data-note="77"></div>
            <div className="key white" data-note="78"></div>
            <div className="key black" data-note="79"></div>
            <div className="key white" data-note="80"></div>
            <div className="key white" data-note="81"></div>
            <div className="key black" data-note="82"></div>
            <div className="key white" data-note="83"></div>
            <div className="key black" data-note="84"></div>
            <div className="key white" data-note="85"></div>
            <div className="key black" data-note="86"></div>
            <div className="key white" data-note="87"></div>
            <div className="key white" data-note="88"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorialPage;
