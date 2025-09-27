import React, { useContext, useEffect, useRef, useState } from "react";
import "../assets/scss/AddMusic.scss";
import { Add, Image, MusicNoteTwoTone } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import { ThemeContext } from "../../api/Theme";
import { useDispatch, useSelector } from "react-redux";
import { setPlaylist } from "../../actions/actions";

function AddMusic() {
  const useStyle = useContext(ThemeContext);
  const imgRef = useRef();
  const audioRef = useRef();
  const dispatch = useDispatch();
  const playlists = useSelector((s) => s.musicReducer.playlists);
  const [imgName, setImgName] = useState(null);
  const [audioName, setAudioName] = useState(null);
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [lang, setLang] = useState("ENGLISH");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.onchange = (e) => {
        if (e.target.files && e.target.files[0])
          setImgName(e.target.files[0].name);
      };
    }
    if (audioRef.current) {
      audioRef.current.onchange = (e) => {
        if (e.target.files && e.target.files[0])
          setAudioName(e.target.files[0].name);
      };
    }
  }, []);

  const pickImg = () => imgRef.current && imgRef.current.click();
  const pickAudio = () => audioRef.current && audioRef.current.click();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!name || !audioName) {
      setError("Name and audio file are required");
      return;
    }
    setSubmitting(true);
    try {
      const base = process.env.REACT_APP_API_BASE || "http://localhost:3001";
      const res = await fetch(`${base}/songs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          author_name: artist || null,
          img: imgName || null,
          lang: lang || null,
          type: null,
          musicName: audioName,
          attribution: null,
        }),
      });
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || "REQUEST_FAILED");
      }
      const created = await res.json();
      // Ensure audioUrl present (backend returns it; fallback build if absent)
      const apiBase = process.env.REACT_APP_API_BASE || "http://localhost:3001";
      const withUrl = created.audioUrl
        ? created
        : {
            ...created,
            audioUrl: created.musicName
              ? `${apiBase}/media/${created.musicName}`
              : null,
          };
      dispatch(setPlaylist([...playlists, withUrl]));
      setSuccess("Added");
      setName("");
      setArtist("");
      setImgName(null);
      setAudioName(null);
    } catch (e2) {
      setError(e2.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={useStyle.component}
      className={"AddMusic"}
    >
      <div className="add-music-sub-container">
        <div className="d1">
          <Button
            onClick={pickImg}
            style={{
              backgroundColor: useStyle.subTheme,
              width: "200px",
              height: "200px",
            }}
            variant={"contained"}
          >
            <Image
              titleAccess={"Select a music cover"}
              style={{ color: "#f0f0f0", width: "150px", height: "150px" }}
            />
          </Button>
          <input
            ref={imgRef}
            accept="image/*"
            type="file"
            hidden
            id={"music-img"}
          />
          <p>{imgName}</p>
          <Button
            onClick={pickAudio}
            style={{
              backgroundColor: useStyle.subTheme,
              width: "200px",
              height: "200px",
            }}
            variant={"contained"}
          >
            <MusicNoteTwoTone
              titleAccess={"Select a music"}
              style={{ color: "#f0f0f0", width: "150px", height: "150px" }}
            />
          </Button>
          <input ref={audioRef} accept="audio/*" hidden type="file" />
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="ENGLISH">English</option>
            <option value="HINDI">Hindi</option>
            <option value="PUNJABI">Punjabi</option>
            <option value="TELUGU">Telugu</option>
            <option value="ANY">Any</option>
          </select>
        </div>
        <div className="d2">
          <div>
            <input
              type="text"
              placeholder={"Song Name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder={"Artist Name"}
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
            <Button
              type="submit"
              disabled={submitting}
              style={{ backgroundColor: useStyle.theme }}
              variant={"contained"}
              endIcon={<Add />}
            >
              {" "}
              {submitting ? "Adding..." : "Add"}{" "}
            </Button>
          </div>
          <div className={"preview"}>
            <h3>Preview</h3>
            <p>Music Cover : {imgName || "-"}</p>
            <p>Music File : {audioName || "-"}</p>
            <p>Music Name : {name || "-"}</p>
            <p>Singer Name : {artist || "-"}</p>
            <p>Language : {lang || "-"}</p>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddMusic;
