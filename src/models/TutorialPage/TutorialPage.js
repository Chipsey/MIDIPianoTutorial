import { Box, Button, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useRef, useState } from "react";
import "./TutorialPage.css";
import { BLACK_INDEXES, NOTES } from "../../config/const";
import Wad from "web-audio-daw";

const TutorialPage = ({ midis }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [leftNotes, setLeftNotes] = useState(null);
  const [rightNotes, setRightNotes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fps, setFps] = useState(50);
  const [totalDistance, setTotalDistance] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentRightNoteIndex, setCurrentRightNoteIndex] = useState(-1);
  const [currentLeftNoteIndex, setCurrentLeftNoteIndex] = useState(-1);
  const noteWidth = screenWidth / 57;
  const timeUnit = 300;
  const [currentTime, setCurrentTime] = useState(0);
  const activeNotes = useRef(new Map());

  const playNote = (note, duration, time) => {
    try {
      // Stop all notes if the time mismatch occurs
      if (currentTime !== time) {
        activeNotes.current.forEach((noteInstance) => noteInstance.stop());
        activeNotes.current.clear();
      }

      setCurrentTime(time);

      const noteInstance = new Wad({ source: "triangle" });
      noteInstance.play({
        pitch: note,
        label: note,
        env: { hold: duration > 0 ? duration : 0.5 },
      });

      activeNotes.current.set(note, noteInstance);
    } catch (error) {
      console.error("Error playing note:", error.message);
    }
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = 1000 / fps;
    const distancePerTick = (timeUnit * interval) / 1000;

    const intervalId = setInterval(() => {
      setTotalDistance((prevDistance) => prevDistance + distancePerTick);
    }, interval);

    return () => clearInterval(intervalId);
  }, [isPlaying, timeUnit, fps]);

  const togglePlaying = () => {
    setIsPlaying(!isPlaying);
  };

  const stop = () => {
    setIsPlaying(false);
    setTotalDistance(0);
    setCurrentLeftNoteIndex(-1);
    setCurrentRightNoteIndex(-1);
  };

  useEffect(() => {
    if (midis && midis.length > 0) {
      setIsLoading(true);
      setRightNotes(midis[1]?.notes);
      if (midis.length > 1) {
        setLeftNotes(midis[2]?.notes);
      }
      setIsLoading(false);
    }

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [midis]);

  const getNoteYPosition = (midiNote) => {
    const isBlackKey = BLACK_INDEXES.includes(midiNote);
    return (
      (midiNote -
        12 -
        BLACK_INDEXES.filter((index) => index < midiNote).length) *
        noteWidth -
      (isBlackKey ? noteWidth / 3 : 0)
    );
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div>
          <button onClick={togglePlaying}>Start</button>
          <button onClick={stop}>Stop</button>
          <section id="pianoRoll">
            <div style={{ height: "150vh" }}></div>
            {leftNotes?.length > 0 &&
              leftNotes.map((note, index) => {
                const startY = note.time * timeUnit + 1000;
                const height = note.duration * timeUnit;
                const startX = getNoteYPosition(note.midi);
                if (
                  startY - totalDistance < 640 &&
                  startY - totalDistance > 600 &&
                  index > currentLeftNoteIndex
                ) {
                  setCurrentLeftNoteIndex(index);
                  // console.log(JSON.stringify(note?.name));
                  playNote(note?.name, note?.duration);
                }
                return (
                  <div
                    key={index}
                    className="note-block"
                    style={{
                      position: "absolute",
                      left: `${startX}px`,
                      bottom: `${startY - totalDistance}px`,
                      width: BLACK_INDEXES.includes(note?.midi)
                        ? `${noteWidth / 1.5}px`
                        : `${noteWidth - 1}px`,
                      height: `${height}px`,
                      backgroundColor: "#75cbd9",
                      borderRadius: "0.7rem",
                      fontSize: BLACK_INDEXES.includes(note?.midi)
                        ? noteWidth / 3
                        : noteWidth / 2,
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        top: `${height - 25}px`,
                        position: "relative",
                        fontWeight: "bold",
                      }}
                    >
                      {note?.name}
                    </div>
                  </div>
                );
              })}
            {rightNotes?.length > 0 &&
              rightNotes.map((note, index) => {
                const startY = note.time * timeUnit + 1000;
                const height = note.duration * timeUnit;
                const startX = getNoteYPosition(note.midi);

                if (
                  startY - totalDistance < 640 &&
                  startY - totalDistance > 600 &&
                  index > currentRightNoteIndex
                ) {
                  setCurrentRightNoteIndex(index);
                  // console.log(JSON.stringify(note?.name));
                  playNote(note?.name, note?.duration);
                }
                return (
                  <div
                    key={index}
                    className="note-block"
                    style={{
                      position: "absolute",
                      left: `${startX}px`,
                      bottom: `${startY - totalDistance}px`,
                      width: BLACK_INDEXES.includes(note?.midi)
                        ? `${noteWidth / 1.5}px`
                        : `${noteWidth - 1}px`,
                      height: `${height}px`,
                      backgroundColor: "#75d97a",
                      borderRadius: "0.7rem",
                      fontSize: BLACK_INDEXES.includes(note?.midi)
                        ? noteWidth / 3
                        : noteWidth / 2,
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        top: `${height - 25}px`,
                        position: "relative",
                        fontWeight: "bold",
                      }}
                    >
                      {note?.name}
                    </div>
                  </div>
                );
              })}
          </section>

          <section className="text-center">
            <div id="piano" className="text-center">
              {NOTES.map((note, index, array) => {
                const prevNote = index > 0 ? array[index - 1] : null;
                return (
                  <div
                    key={index}
                    className={`key ${note.color}`}
                    style={{
                      fontSize:
                        note?.color === "black"
                          ? noteWidth / 3
                          : noteWidth / 2.4,
                      width:
                        note?.color === "white"
                          ? noteWidth - 1
                          : noteWidth / 1.5 - 0.5,
                      marginLeft:
                        note?.color === "black"
                          ? -noteWidth / 3
                          : prevNote?.color === "black"
                            ? -noteWidth / 3 - 0.5
                            : 0,
                      marginRight: note?.color === "black" ? 0 : 0,
                      position: "relative",
                      border: "0.5px solid black",
                      borderBottomLeftRadius: "0.2rem",
                      borderBottomRightRadius: "0.2rem",
                      borderTop: "2px solid black",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        top: note?.color === "black" ? "4rem" : "8rem",
                        color: note?.color === "black" ? "white" : "black",
                        fontWeight: "bold",
                      }}
                    >
                      {note?.note}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default TutorialPage;
