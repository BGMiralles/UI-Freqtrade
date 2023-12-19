import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./GalleryArtists.css";
import { bringTattooArtists } from "../../services/apiCalls";
import { FlipCardArtist } from "../FlipCardArtist/FlipCardArtist";

export const GalleryArtists = () => {
  const [tattooArtists, setTattooArtists] = useState([]);

  useEffect(() => {
    const fetchTattooArtists = async () => {
      try {
        const response = await bringTattooArtists();
        setTattooArtists(response.data.data);
      } catch (error) {
        console.error("Error fetching tattoo artists data:", error);
      }
    };

    fetchTattooArtists();
  }, []);

  return (
    <Container fluid className="d-flex" id="artists">
      <Row className="gallery-container1">
        {tattooArtists.map((artist, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={4}>
            <FlipCardArtist
              tattoo_artist={artist.tattoo_artist}
              description={artist.description}
              photo={artist.photo}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
