import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getChicagoGallery, getMetGallery } from "../api";
import axios from "axios";
import CustomSpinner from "../Components/Spinner";
import { jwtDecode } from "jwt-decode";

export function SeeArtwork() {
  const [artworks, setArtworks] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchArtworks() {
      setLoading(true);
      try {
        let data = await getChicagoGallery(id);
        setArtworks(data.data);
      } catch (error) {
        if (error.response?.status === 404 || error.response?.status === 500) {
          try {
            let metData = await getMetGallery(id);
            setArtworks(metData);
          } catch (errorMet) {}
        }
      }
      setLoading(false);
    }
    fetchArtworks();
  }, [id]);

  async function handleAddToExhibit() {
    const token = localStorage.getItem("User");
    const decoded = jwtDecode(token);
    const userId = decoded._id;
    setIsChecked(!isChecked);

    try {
      await axios.post(
        `https://launchpad-twh3.onrender.com/Users/${userId}/add-artwork`,
        {
          artwork: artworks,
        }
  
      );
      alert("Artwork added to your personal exhibit!");
    } catch (err) {
      console.error("Error adding artwork:", err);
      alert("Failed to add artwork.");
    }
  }

  return (
    <>
      {loading ? (
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <CustomSpinner />
        </div>
      ) : (
        <>
          <div className="singleArtContainer">
            <div className="singleArtContent">
              <div className="singleArtText">
                <div key={artworks.id} style={{ marginBottom: "2rem" }}>
                  <h1>{artworks.title}</h1>
                  <h3>Artist</h3>
                  <p>{artworks.artist_display || artworks.artistDisplayName}</p>
                  <h3>Date</h3>
                  <p>{artworks.date_display || artworks.objectDate}</p>
                  <h3>Description</h3>
                  <p>
                    {artworks.description
                      ?.replace(/<[a-z]{0,}>/gi, "")
                      .replace(/<\/[a-z]{0,}>/gi, "") ||
                      artworks.medium ||
                      "No Description Provided"}
                  </p>
                </div>
              </div>
              <br></br>
              {artworks.image_id || artworks.primaryImage ? (
                <div className="singleImage">
                  <img
                    src={
                      artworks.image_id
                        ? `https://www.artic.edu/iiif/2/${artworks.image_id}/full/843,/0/default.jpg`
                        : artworks.primaryImage
                    }
                    alt={artworks.title || artworks.medium}
                    width="300"
                  />
                </div>
              ) : null}
            </div>
            <div className="addToExhibitBox">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleAddToExhibit}
                disabled={isChecked}
              />
              <label>Add to personal exhibit</label>
            </div>
          </div>
        </>
      )}
    </>
  );
}
